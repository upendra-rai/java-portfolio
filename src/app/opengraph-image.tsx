import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const revalidate = false

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#050608',
          color: '#F5F7FA',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: '#FF6B2C',
            }}
          />

          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: '#8B93A1',
            }}
          >
            JAVA SOFTWARE ENGINEER
          </div>
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          Upendra Rai
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            color: '#8B93A1',
          }}
        >
          Spring Boot · Distributed Systems · Payment Infrastructure · APIs ·
          Databases
        </div>

        <div
          style={{
            marginTop: 48,
            display: 'flex',
            gap: 14,
          }}
        >
          {[
            'JAVA',
            'SPRING BOOT',
            'REST',
            'SQL',
            'REDIS',
            'DOCKER',
            'AWS',
          ].map((technology) => (
            <div
              key={technology}
              style={{
                border: '1px solid rgba(245,247,250,0.25)',
                borderRadius: 4,
                padding: '8px 16px',
                fontSize: 17,
                color: '#8B93A1',
              }}
            >
              {technology}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}