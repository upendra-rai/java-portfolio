export const ABOUT_PARAGRAPHS = [
  'I am a Java software engineer who specializes in the backend — the part of the system users never see but always feel. My work centers on Spring Boot services, well-modeled relational databases, and APIs that stay correct when traffic spikes or dependencies fail.',
  'I care about distributed systems fundamentals: clear transaction boundaries, idempotent operations, honest retries and observability that makes production debuggable. Payment infrastructure taught me that correctness is a feature — every edge case eventually happens.',
  'From API design and database modeling to deployment pipelines and monitoring, I engineer the full path from idea to reliable production system.',
] as const

export const ABOUT_FOCUS = [
  'Backend Engineering',
  'Java / Spring Boot',
  'Distributed Systems',
  'API Design',
  'Databases & Modeling',
  'Production Operations',
] as const

export interface ResumeItem {
  title: string
  subtitle: string
  period: string
  points: string[]
}

export const RESUME = {
  name: 'UPENDRA RAI',
  role: 'Software Development Engineer',
  contact: {
    phone: '+91 9554118595',
    email: 'upendrarai02@gmail.com',
    linkedin: 'linkedin.com/in/upendrarai',
    github: 'github.com/upendrarai',
    location: 'Bangalore, India',
  },
  summary:
    'Highly skilled Developer with 4+ years of hands-on experience in designing, developing and deploying robust, scalable applications using Java, Spring Boot and Hibernate. Adept at building high-performance RESTful APIs and seamlessly integrating backend systems with relational databases such as MySQL. Proficient in version control and collaborative development using Git and GitHub. Passionate about writing clean, maintainable code and solving complex technical challenges. Strong team player with a proven track record of delivering high-quality solutions on time. Eager to contribute to innovative projects and continuously grow as a developer in a dynamic environment.',
  skills: {
    'Core Java':
      'Java, Java 8, Object-Oriented Programming, Collections, Multithreading, JUnit, SDLC, Distributed Systems, Hexagonal Design Pattern',
    'Backend & Frameworks':
      'Spring Boot, Spring Security, Microservices, RESTful APIs / Web Services, JPA / Hibernate, API Gateway, Feign Client',
    Databases: 'MySQL, PostgreSQL, MongoDB, Redis',
    'DevOps & Cloud':
      'Docker, Jenkins, CI/CD, Linux Deployment, AWS (S3, Cloud Services), Cloud Computing',
    'Payments & Integrations':
      'PhonePe, RazorPay, Stripe Payment Gateways, Third-Party Map Integration, Email & Mobile SMS Integration',
    'Tools & Practices':
      'Git/GitHub, Bitbucket, Maven, Gradle, JSON, JIRA, Agile, Debugging, AI Tools (Claude, Gemini, OpenAI, Ollama)',
  },
  experience: [
    {
      title: 'Software Development Engineer',
      subtitle: 'Weeky Trips — Remote',
      period: '2023 — Present',
      lead: 'Led and managed complex IT projects with a keen focus on optimal timing, functionality and delivery. Developed, implemented and maintained a robust Spring Boot-based application designed to efficiently manage operations, ensuring seamless performance and scalability.',
      points: [
        'Led end-to-end management of complex IT projects, ensuring timely delivery, robust functionality and seamless integration across systems.',
        'Spearheaded backend development for multiple projects, designing and implementing scalable, high-performance REST APIs using Spring Boot.',
        'Architected and implemented microservices to improve application modularity, scalability and maintainability.',
        'Enhanced application security by integrating JWT authentication and role-based access control, while maintaining public access for specific endpoints.',
        'Reduced transaction errors by 99% through robust error-handling strategies and the implementation of Spring Security.',
        'Integrated third-party APIs, including payment gateways and external service providers, to streamline operations and enhance functionality.',
        'Designed and optimized database schemas for MySQL/PostgreSQL, ensuring high performance and efficient data management.',
        'Improved system reliability to 99.9% uptime by implementing advanced logging, monitoring and error-handling mechanisms.',
        'Optimized backend performance by monitoring services, identifying bottlenecks and implementing performance enhancements.',
        'Deployed and maintained backend services on Linux-based infrastructure, ensuring scalability and high availability.',
        'Collaborated closely with front-end teams to ensure seamless integration and successful end-to-end project delivery.',
        'Ensured code quality through rigorous unit testing and code reviews, maintaining high standards of development practices.',
      ],
    },
    {
      title: 'Junior Software Developer',
      subtitle: 'Guava Trees Softech Pvt. Ltd. — Bhopal, MP, India',
      period: '2021 — 2023',
      lead: 'Assisted in the development and maintenance of a Spring Boot-based application, contributing to the optimization of business processes and ensuring smooth project delivery.',
      points: [
        'Collaborated with cross-functional development teams to apply core Java programming concepts in real-world projects, contributing to the delivery of high-quality software solutions.',
        'Supported the design, development and debugging of Java-based applications, working under the mentorship of senior developers to ensure robust and efficient code.',
        'Gained hands-on experience with the Spring Boot framework, building and testing RESTful APIs to support backend functionality.',
        'Resolved bugs and technical issues promptly, improving application performance and enhancing the end-user experience.',
        'Adopted industry best practices for writing clean, modular and maintainable code, ensuring scalability and ease of future updates.',
        'Conducted testing and troubleshooting of software components to identify and resolve issues, ensuring seamless functionality and reliability.',
        'Actively participated in team discussions to understand project requirements, provide input and align development efforts with business goals.',
        'Expanded technical expertise by exploring and implementing relevant tools, technologies and methodologies to support project objectives.',
        'Contributed to the development lifecycle by assisting in code reviews, documentation and continuous improvement of software processes.',
      ],
    },
  ],
  projects: [
    {
      name: 'Payment Gateway System',
      note: 'Currently working on',
      link: '',
      description:
        'A robust and scalable platform built to power secure, real-time digital transactions with modular architecture comprising Admin, Merchant, Payment Processing, Scheduler and Callback services. Designed to handle high-volume transaction loads, ensure payment reliability and automate financial operations.',
      points: [
        'Solely responsible for the complete backend development, deployment and maintenance of the entire system — from implementing features to managing production environments.',
        'Developed all core modules including merchant onboarding, admin operations, real-time transaction flow, automated scheduling and secure callback processing.',
        'Built a high-performance scheduler system for settlement retries, payout automation and report generation.',
        'Integrated multiple third-party banking/payment APIs with robust exception handling and transactional integrity.',
        'Designed the MySQL database schema to support scalability, high availability and efficient querying.',
        'Implemented real-time alerting and notification systems via SMS and email for critical payment updates.',
        'Handled complete production lifecycle: deployment, monitoring, debugging, incident resolution and post-deployment support — ensuring zero downtime and high system reliability.',
        'Worked independently without any team support, showcasing strong ownership, problem-solving and self-management capabilities.',
      ],
      modules: 'Payment · Payout · Admin · Merchant · Scheduler · Callback',
      tech: 'Java, Spring Boot, REST API, Maven, Microservices, MySQL, Git/GitHub, Banking API Integrations, Linux, Scheduler Services, Callback Services, SMS/Email Notifications, Production Monitoring & Support',
    },
    {
      name: 'WeekyTrips — Tour & Travel Booking Platform',
      note: '',
      link: 'https://weekytrips.com',
      description:
        'Tour & travel booking platform built with Java, Spring Boot, Microservices and MySQL. Implements holiday packages, itinerary management, bookings, customer inquiries and payment gateway integration with secure REST APIs and optimized database performance.',
      points: [
        'Developed the entire backend of the project using Java, Spring Boot and REST APIs.',
        'Built scalable and maintainable database solutions using MySQL.',
        'Integrated notification services for booking updates and alerts.',
        'Optimized performance and ensured high availability and fault tolerance.',
        'Deployed the backend services and ensured smooth post-deployment support.',
      ],
      modules: '',
      tech: 'Java, Spring Boot, Maven, Microservices, MySQL, Git/GitHub, PhonePe Payment Gateway, Linux, Third-Party Map Integration, Email & Mobile SMS Integration',
    },
    {
      name: 'Madina-Apps',
      note: '',
      link: 'https://madinaapps.com',
      description:
        'A donation platform facilitating charitable contributions — users explore causes, make secure donations and track their impact, with transparency by showcasing projects and outcomes.',
      points: [],
      modules:
        'Payment · Admin · Notification (Facebook, WhatsApp, Instagram, Email) · Service',
      tech: 'Java, Spring Boot, Maven, Microservices, MySQL, Git/GitHub, Stripe Payment Gateway, AWS CI/CD, Third-Party Map Integration, Email & Mobile SMS Integration',
    },
  ],
  education: [
    {
      school: 'Vedica Institute Of Technology, Bhopal',
      degree: 'Bachelor of Engineering — Computer Science',
      score: '7.9 CGPA',
      period: '2018 — 2022',
    },
    {
      school: 'C.R.T.S.V.M Inter College, U.P.',
      degree: 'SSLC',
      score: '83%',
      period: '2016 — 2017',
    },
  ],
  strengths: [
    {
      title: 'Creative Problem Solving',
      detail:
        'Utilize creative solutions to tackle challenges, evident in the 100% increase in project delivery efficiency at Proctom Technology Pvt Ltd.',
    },
    {
      title: 'Strong Leadership',
      detail:
        'Experienced in leading and mentoring teams, resulting in highly efficient project execution.',
    },
    {
      title: 'Efficient Resource Allocation',
      detail:
        'Spearheaded the reorganization of resource allocation in projects, resulting in a 50% cost reduction.',
    },
  ],
} as const
