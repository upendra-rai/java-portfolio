'use client'

import { Suspense, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, Html, Line, Sparkles } from '@react-three/drei'
import { motion } from 'framer-motion'
import type { DbEntity } from '@/data/database'
import { DB_ENTITIES, DB_RELATIONS } from '@/data/database'

function entityById(id: string) {
  return DB_ENTITIES.find((e) => e.id === id)
}

const V = new THREE.Vector3()

function Packet({ from, to, offset }: { from: DbEntity; to: DbEntity; offset: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  const a = useMemo(() => new THREE.Vector3(...from.position), [from])
  const b = useMemo(() => new THREE.Vector3(...to.position), [to])

  useFrame(({ clock }) => {
    const t = ((clock.elapsedTime * 0.12 + offset) % 1 + 1) % 1
    ref.current.position.lerpVectors(a, b, t)
  })

  return (
    <mesh ref={ref} scale={0.5}>
      <sphereGeometry args={[0.09, 8, 8]} />
      <meshBasicMaterial color="#FF6B2C" />
    </mesh>
  )
}

function EntityBox({
  entity,
  hovered,
  onHover,
}: {
  entity: DbEntity
  hovered: boolean
  onHover: (e: DbEntity | null) => void
}) {
  const group = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    const target = hovered ? 1.12 : 1
    const s = THREE.MathUtils.damp(group.current.scale.x, target, 8, delta)
    group.current.scale.setScalar(s)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, hovered ? 0.18 : 0, 6, delta)
  })

  return (
    <group
      ref={group}
      position={entity.position}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(entity)
      }}
      onPointerOut={() => onHover(null)}
    >
      <mesh>
        <boxGeometry args={[1.75, 0.55, 1]} />
        <meshStandardMaterial
          color="#141922"
          emissive={hovered ? '#FF6B2C' : '#000000'}
          emissiveIntensity={hovered ? 0.22 : 0}
          metalness={0.45}
          roughness={0.4}
        />
        <Edges color={hovered ? '#FF6B2C' : 'rgba(245,247,250,0.28)'} />
      </mesh>
      <Html center distanceFactor={10} position={[0, 0.62, 0]} className="select-none" zIndexRange={[20, 0]}>
        <span className="pointer-events-none whitespace-nowrap font-mono text-[9px] tracking-[0.2em] text-fg/85">
          {entity.table}
        </span>
      </Html>
    </group>
  )
}

function Rig() {
  useFrame((state, delta) => {
    const cam = state.camera
    cam.position.x = THREE.MathUtils.damp(cam.position.x, state.pointer.x * 1.1, 1.8, delta)
    cam.position.y = THREE.MathUtils.damp(cam.position.y, 4.6 - state.pointer.y * 0.6, 1.8, delta)
    cam.lookAt(0, 0, 0)
  })
  return null
}

export default function DatabaseScene({
  onHover,
  particleCount = 220,
}: {
  onHover: (e: DbEntity | null) => void
  particleCount?: number
}) {
  const [hoverId, setHoverId] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="h-full w-full"
      data-cursor={hoverId ? 'node' : undefined}
    >
      <Canvas
        dpr={[1, 1.6]}
        camera={{ fov: 40, position: [0, 4.6, 10] }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[6, 9, 5]} intensity={1} />
          <Rig />

          {DB_RELATIONS.map(([a, b], i) => {
            const from = entityById(a)
            const to = entityById(b)
            if (!from || !to) return null
            return (
              <Line
                key={`${a}-${b}`}
                points={[from.position, to.position]}
                color={hoverId === a || hoverId === b ? '#FF6B2C' : '#8B93A1'}
                transparent
                opacity={hoverId === a || hoverId === b ? 0.75 : 0.22}
                lineWidth={1}
              >
                <Packet from={from} to={to} offset={i * 0.37} />
              </Line>
            )
          })}

          {DB_ENTITIES.map((entity) => (
            <EntityBox
              key={entity.id}
              entity={entity}
              hovered={hoverId === entity.id}
              onHover={(e) => {
                setHoverId(e?.id ?? null)
                onHover(e)
              }}
            />
          ))}

          <Sparkles count={particleCount > 0 ? 26 : 0} scale={16} size={1.4} speed={0.2} color="#8B93A1" opacity={0.35} />

          <gridHelper args={[24, 24, '#1c212b', '#12161d']} position={[0, -1.2, 0]} />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}

export function dbDistanceSort(entities: DbEntity[]) {
  return [...entities].sort((a, b) =>
    V.set(...a.position).length() - V.set(...b.position).length(),
  )
}
