/**
 * Verified sample resumes for testing Phase 4 templates and layouts
 */

export const studentResume = {
  personalInfo: {
    fullName: 'Aarav Sharma',
    headline: 'Computer Science Undergraduate | Full-Stack Enthusiast',
    email: 'aarav.sharma@university.edu',
    phone: '+1 (555) 234-5678',
    location: 'Boston, MA',
    linkedin: 'linkedin.com/in/aaravsharma-cs',
    github: 'github.com/aaravsharma',
    portfolio: 'https://aaravsharma.dev',
    summary:
      'Motivated third-year Computer Science student at Boston University with strong foundations in data structures, algorithms, and web application engineering. Proven track record of winning hackathons and leading academic study groups.',
  },
  education: [
    {
      id: 'edu-s1',
      degree: 'B.S. in Computer Science',
      institution: 'Boston University',
      fieldOfStudy: 'Computer Science',
      startDate: '2023-09',
      endDate: '2027-05',
      current: true,
      grade: '3.92 / 4.0 GPA',
      coursework: 'Data Structures & Algorithms, Computer Systems, Database Management, Discrete Mathematics',
    },
  ],
  experience: [
    {
      id: 'exp-s1',
      jobTitle: 'Undergraduate Teaching Assistant',
      company: 'Boston University CS Department',
      employmentType: 'Part-time',
      startDate: '2025-01',
      endDate: '2025-05',
      current: false,
      responsibilities:
        '• Mentored 60+ undergraduate students in introductory Python and data structure fundamentals.\n• Conducted weekly lab sessions and graded programming assignments with detailed actionable feedback.',
      achievements: 'Awarded Department TA of the Semester for student support excellence.',
      technologies: 'Python, Git, Gradescope',
    },
  ],
  projects: [
    {
      id: 'proj-s1',
      title: 'CampusRide - University Carpooling Platform',
      problemSolved: 'Solves expensive daily commuter transit for off-campus college students.',
      description: 'A mobile-first web app that matches university students sharing similar commuter routes.',
      technologies: 'React, Node.js, Express, MongoDB, Tailwind CSS',
      contributions:
        '• Designed responsive search and driver request workflows.\n• Implemented JWT authentication restricted to verified .edu email domains.',
      githubUrl: 'github.com/aaravsharma/campusride',
      liveUrl: 'https://campusride-bu.vercel.app',
      results: 'Used by 250+ active campus commuters in fall 2025.',
    },
  ],
  skills: {
    programmingLanguages: 'JavaScript, TypeScript, Python, C++, SQL',
    frameworks: 'React, Express.js, Node.js, Tailwind CSS',
    databasesTools: 'PostgreSQL, MongoDB, Git, Docker, Postman',
    softSkills: 'Analytical Thinking, Peer Tutoring, Technical Writing, Team Collaboration',
  },
  additional: {
    certifications: [
      { name: 'Meta Front-End Developer Professional Certificate', issuer: 'Coursera', issueDate: '2024' },
    ],
    codingProfiles: [
      { platform: 'LeetCode', highlight: '200+ Solved (Top 15%)', username: 'aarav_codes' },
      { platform: 'HackMIT 2024', highlight: 'Finalist - Best Education Hack', username: '' },
    ],
    achievements: [
      { title: "Dean's High Honors List", date: '2024', description: 'Awarded for maintaining >3.8 GPA across all semesters.' },
    ],
    publications: [],
    volunteer: [
      { role: 'Volunteer Webmaster', organization: 'BU Robotics Club', description: 'Maintained the student organization website.' },
    ],
    coursework: 'Object-Oriented Design, Operating Systems, Linear Algebra',
    languages: [
      { language: 'English', proficiency: 'Native / Bilingual' },
      { language: 'Hindi', proficiency: 'Fluent' },
    ],
  },
};

export const fresherResume = {
  personalInfo: {
    fullName: 'Priya Patel',
    headline: 'Associate Software Engineer | React & Cloud Backend',
    email: 'priya.patel@alumni.edu',
    phone: '+1 (555) 987-6543',
    location: 'San Jose, CA',
    linkedin: 'linkedin.com/in/priyapatel-swe',
    github: 'github.com/priyapatel',
    portfolio: 'https://priyapatel.io',
    summary:
      'Recent Computer Science graduate with hands-on internship experience in full-stack web development and REST API design. Skilled in developing clean, modular frontend interfaces and containerized microservices.',
  },
  education: [
    {
      id: 'edu-f1',
      degree: 'B.Tech in Computer Engineering',
      institution: 'San Jose State University',
      fieldOfStudy: 'Computer Engineering',
      startDate: '2021-08',
      endDate: '2025-05',
      current: false,
      grade: '3.85 / 4.0 GPA',
      coursework: 'Cloud Computing, Software Engineering, Distributed Systems, Web Architecture',
    },
  ],
  experience: [
    {
      id: 'exp-f1',
      jobTitle: 'Software Engineering Intern',
      company: 'CloudScale Dynamics',
      employmentType: 'Internship',
      startDate: '2024-06',
      endDate: '2024-08',
      current: false,
      responsibilities:
        '• Engineered 12 reusable React dashboard components for the internal customer telemetry portal.\n• Automated unit test coverage from 62% to 88% using Jest and React Testing Library.\n• Fixed critical latency bug in customer export service.',
      achievements: 'Received full-time return offer upon graduation.',
      technologies: 'React, TypeScript, Jest, AWS S3, Redux Toolkit',
    },
  ],
  projects: [
    {
      id: 'proj-f1',
      title: 'DevCollab - Real-Time Collaborative Markdown Editor',
      problemSolved: 'Enables engineering teams to co-author documentation simultaneously with low latency.',
      description: 'Distributed WebSocket-based markdown documentation platform with syntax highlighting.',
      technologies: 'React, Node.js, WebSockets, Redis, Tailwind CSS',
      contributions:
        '• Implemented Operational Transformation algorithm for conflict-free concurrent editing.\n• Created instant markdown preview engine supporting code snippets and tables.',
      githubUrl: 'github.com/priyapatel/devcollab',
      liveUrl: 'https://devcollab.fly.dev',
      results: 'Over 1,200 GitHub stars and 5,000 monthly page views.',
    },
  ],
  skills: {
    programmingLanguages: 'JavaScript, TypeScript, Go, Python, HTML5, CSS3',
    frameworks: 'React, Next.js, Express.js, Fastify',
    databasesTools: 'PostgreSQL, Redis, Docker, Git, AWS Lambda, Linux',
    softSkills: 'Agile/Scrum, Code Review, Continuous Integration, Problem Solving',
  },
  additional: {
    certifications: [
      { name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', issueDate: '2025' },
    ],
    codingProfiles: [
      { platform: 'LeetCode', highlight: '450+ Questions Solved (Rating: 1820)', username: 'priyapatel_cs' },
    ],
    achievements: [],
    publications: [],
    volunteer: [],
    coursework: 'Distributed Databases, Network Security',
    languages: [
      { language: 'English', proficiency: 'Fluent' },
      { language: 'Gujarati', proficiency: 'Native' },
    ],
  },
};

export const experiencedResume = {
  personalInfo: {
    fullName: 'Marcus Vance',
    headline: 'Senior Full-Stack Engineer | Systems Architect',
    email: 'marcus.vance@englead.com',
    phone: '+1 (555) 765-4321',
    location: 'Seattle, WA',
    linkedin: 'linkedin.com/in/marcusvance',
    github: 'github.com/marcusvance',
    portfolio: 'https://marcusvance.tech',
    summary:
      'Staff-level Software Engineer with 7+ years of experience leading cross-functional teams in high-traffic SaaS environments. Expert in distributed architectures, React performance optimization, and fault-tolerant cloud services.',
  },
  education: [
    {
      id: 'edu-e1',
      degree: 'M.S. in Computer Science',
      institution: 'University of Washington',
      fieldOfStudy: 'Distributed Systems',
      startDate: '2017-09',
      endDate: '2019-06',
      current: false,
      grade: '3.95 GPA',
      coursework: 'Advanced Distributed Systems, Cloud Architecture',
    },
  ],
  experience: [
    {
      id: 'exp-e1',
      jobTitle: 'Senior Software Engineer',
      company: 'Enterprise Cloud Technologies',
      employmentType: 'Full-time',
      startDate: '2022-01',
      endDate: '',
      current: true,
      responsibilities:
        '• Architected event-driven microservices processing 45M+ daily transactions with 99.99% uptime.\n• Spearheaded frontend migration from legacy monolith to Next.js, reducing LCP by 48% across 2M active users.\n• Mentored 8 junior and mid-level engineers through bi-weekly design reviews and architecture sprints.',
      achievements: 'Decreased cloud compute infrastructure spend by $180,000 annually.',
      technologies: 'React, Node.js, Go, Kubernetes, Kafka, AWS, GraphQL',
    },
    {
      id: 'exp-e2',
      jobTitle: 'Full-Stack Software Engineer',
      company: 'Apex Data Platforms',
      employmentType: 'Full-time',
      startDate: '2019-07',
      endDate: '2021-12',
      current: false,
      responsibilities:
        '• Designed and maintained public developer REST APIs serving 800+ B2B enterprise partners.\n• Built real-time analytics dashboards utilizing React, D3.js, and WebSockets.',
      achievements: 'Scaled customer onboardings from 15 days to 2 hours via automated pipeline.',
      technologies: 'React, TypeScript, Express, PostgreSQL, Redis, Docker',
    },
  ],
  projects: [
    {
      id: 'proj-e1',
      title: 'StreamKV - High-Throughput In-Memory Key-Value Store',
      problemSolved: 'Addressed microsecond cache invalidation across distributed edge clusters.',
      description: 'Lightweight distributed caching server written in Go implementing the Raft consensus protocol.',
      technologies: 'Go, Raft Protocol, gRPC, Protobuf, Docker',
      contributions:
        '• Benchmarked sub-millisecond p99 latency under 100,000 concurrent client connections.\n• Authored exhaustive fuzz-testing suites for partition recovery validation.',
      githubUrl: 'github.com/marcusvance/streamkv',
      liveUrl: '',
      results: 'Adopted in production across 3 internal edge services.',
    },
  ],
  skills: {
    programmingLanguages: 'Go, TypeScript, JavaScript, Python, C++, SQL',
    frameworks: 'React, Next.js, Node.js, GraphQL, gRPC',
    databasesTools: 'Kubernetes, Docker, Kafka, PostgreSQL, Redis, AWS, Terraform',
    softSkills: 'Engineering Leadership, Architecture Design, Mentorship, Disaster Recovery',
  },
  additional: {
    certifications: [
      { name: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF', issueDate: '2023' },
      { name: 'AWS Certified DevOps Engineer – Professional', issuer: 'Amazon Web Services', issueDate: '2022' },
    ],
    codingProfiles: [],
    achievements: [
      { title: 'Patented Adaptive Query Routing Engine', date: '2023', description: 'US Patent #11,842,912' },
    ],
    publications: [
      {
        title: 'Low-Latency Cache Invalidation in Distributed Edge Clusters',
        publisher: 'IEEE Cloud Conference',
        date: '2021',
        url: 'https://doi.org/10.1109/CLOUD.2021.0042',
      },
    ],
    volunteer: [],
    coursework: '',
    languages: [{ language: 'English', proficiency: 'Native' }],
  },
};

export const emptyOptionalResume = {
  personalInfo: {
    fullName: 'Jordan Taylor',
    headline: '',
    email: 'jordan.taylor@example.com',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
  },
  education: [
    {
      id: 'edu-1',
      degree: 'High School Diploma',
      institution: 'Central High School',
      fieldOfStudy: '',
      startDate: '2020',
      endDate: '2024',
      current: false,
      grade: '',
      coursework: '',
    },
  ],
  experience: [],
  projects: [],
  skills: {
    programmingLanguages: 'Python, HTML, CSS',
    frameworks: '',
    databasesTools: '',
    softSkills: '',
  },
  additional: {
    certifications: [],
    achievements: [],
    publications: [],
    codingProfiles: [],
    volunteer: [],
    coursework: '',
    languages: [],
  },
};
