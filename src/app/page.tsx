import { Hero } from '@/components/hero/Hero'
import { SystemsStatement } from '@/components/architecture/SystemsStatement'
import { ArchitectureDiagram } from '@/components/architecture/ArchitectureDiagram'
import { StackConstellation } from '@/components/engineering/StackConstellation'
import { ProjectsSection } from '@/components/projects/ProjectsSection'
import { ExperienceTimeline } from '@/components/experience/ExperienceTimeline'
import { PrinciplesGrid } from '@/components/engineering/PrinciplesGrid'
import { CodeLab } from '@/components/engineering/CodeLab'
import { ApiExplorer } from '@/components/engineering/ApiExplorer'
import { DatabaseER } from '@/components/engineering/DatabaseER'
import { DeploymentPipeline, PerformanceFlowViz } from '@/components/engineering/Pipeline'
import { SecurityRings } from '@/components/engineering/SecurityRings'
import { OpsRealityGrid, PerformanceConcepts } from '@/components/engineering/OpsReality'
import { AboutContent } from '@/components/layout/AboutContent'
import { ContactSection } from '@/components/contact/ContactSection'
import { Section } from '@/components/ui/Section'

export default function HomePage() {
  return (
    <>
      <Hero />
      <SystemsStatement />

      <Section
        id="architecture"
        index="02"
        eyebrow="ARCHITECTURE"
        title="I DESIGN SYSTEMS."
        lede="A reference view of how my systems fit together — hover any component to inspect its role."
      >
        <ArchitectureDiagram />
      </Section>

      <Section
        id="stack"
        index="03"
        eyebrow="TECHNOLOGY STACK"
        title="THE TOOLS BEHIND THE SYSTEMS."
        lede="Technologies I use daily to design, build and operate backend software — mapped as a connected system rather than a checklist."
      >
        <StackConstellation />
      </Section>

      <Section
        id="projects"
        index="04"
        eyebrow="PROJECTS"
        title="SYSTEMS IN PRODUCTION."
        lede="Real platforms with real constraints. Open a case study for the full problem → architecture → outcome breakdown."
      >
        <ProjectsSection />
      </Section>

      <Section
        id="experience"
        index="05"
        eyebrow="EXPERIENCE"
        title="THE ENGINEERING JOURNEY."
      >
        <ExperienceTimeline />
      </Section>

      <Section
        id="principles"
        index="06"
        eyebrow="ENGINEERING PRINCIPLES"
        title="HOW I ENGINEER SOFTWARE."
      >
        <PrinciplesGrid />
      </Section>

      <Section
        index="07"
        eyebrow="CODE LAB"
        title="PRODUCTION-GRADE JAVA."
        lede="Representative patterns from the codebases I write — controllers that stay thin, services that own transactions, queries that respect the database."
      >
        <CodeLab />
      </Section>

      <Section
        index="08"
        eyebrow="DATABASE ARCHITECTURE"
        title="DATA MODELED FOR CORRECTNESS."
        lede="An interactive entity-relationship view of a transactional domain. Hover entities in the scene or the grid below to inspect keys, fields and indexes."
      >
        <DatabaseER />
      </Section>

      <Section
        index="09"
        eyebrow="API EXPLORER"
        title="EXPLORE THE INTERFACE."
        lede="A simulated console showing the request/response contracts of a typical Spring Boot API."
      >
        <ApiExplorer />
      </Section>

      <Section
        index="10"
        eyebrow="PERFORMANCE"
        title="ENGINEERED FOR PRODUCTION."
      >
        <PerformanceFlowViz />
        <PerformanceConcepts />
      </Section>

      <Section
        index="11"
        eyebrow="SECURITY"
        title="SECURITY IS LAYERED, NOT DECORATIVE."
        lede="Defense in depth around every API core — each ring is enforced in code, not just documented."
      >
        <SecurityRings />
      </Section>

      <Section
        id="devops"
        index="12"
        eyebrow="DEVOPS / DEPLOYMENT"
        title="FROM COMMIT TO PRODUCTION."
        lede="The path every change takes — reproducible builds, immutable images and observable rollouts."
      >
        <DeploymentPipeline />
      </Section>

      <Section
        index="13"
        eyebrow="PRODUCTION OPERATIONS"
        title="WHEN SOFTWARE MEETS REALITY."
        lede="Production is where architecture is proven. These are the classes of problems I have diagnosed and resolved."
      >
        <OpsRealityGrid />
      </Section>

      <Section
        id="about"
        index="14"
        eyebrow="ABOUT"
        title="ENGINEER BEHIND THE SYSTEMS."
      >
        <AboutContent />
      </Section>

      <Section
        id="contact"
        index="15"
        eyebrow="CONTACT"
        title={"LET'S BUILD SOMETHING THAT MATTERS."}
        lede="Open to senior backend engineering roles, contract work and interesting system-design problems."
      >
        <ContactSection />
      </Section>
    </>
  )
}
