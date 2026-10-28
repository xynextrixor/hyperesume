import assert from 'assert';
import { generateBuilderResumePdf } from '../src/utils/pdfGenerator.js';
import {
  studentResume,
  fresherResume,
  experiencedResume,
  emptyOptionalResume,
} from '../../client/src/components/templates/sampleResumes.js';
import { convertFixedResumeToBuilderData } from '../../client/src/components/builder/builderState.js';

// Resume spanning multiple pages with extensive descriptions
const multiPageLongResume = {
  personalInfo: {
    fullName: 'Dr. Elizabeth Montgomery',
    headline: 'Principal Research Scientist & Distributed Systems Architect',
    email: 'elizabeth.montgomery@alum.mit.edu',
    phone: '+1 (555) 345-6789',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/emontgomery-phd',
    github: 'github.com/emontgomery',
    portfolio: 'https://emontgomery.org',
    summary:
      'Distinguished computer systems architect with 12+ years of leadership in planetary-scale distributed databases, fault tolerance, and hardware-software co-design. Recipient of multiple international ACM/IEEE honors for innovations in consensus verification and edge-cloud federated networks.',
  },
  education: [
    {
      degree: 'Ph.D. in Computer Science',
      institution: 'Massachusetts Institute of Technology',
      fieldOfStudy: 'Distributed Operating Systems',
      startDate: '2010',
      endDate: '2015',
      current: false,
      grade: 'Summa Cum Laude',
      coursework: 'Advanced Concurrency, Byzantine Agreement, Formal Methods in Verification',
    },
    {
      degree: 'B.S. in Electrical Engineering & Computer Science',
      institution: 'University of California, Berkeley',
      fieldOfStudy: 'Computer Engineering',
      startDate: '2006',
      endDate: '2010',
      current: false,
      grade: '3.98 GPA',
      coursework: 'VLSI Design, Operating Systems, Algorithm Analysis',
    },
  ],
  experience: [
    {
      jobTitle: 'Principal Systems Architect',
      company: 'Global Cloud Infrastructure Corp',
      employmentType: 'Full-time',
      startDate: '2020-01',
      endDate: '',
      current: true,
      responsibilities:
        '• Formulated and executed the next-generation multi-region distributed consensus protocol spanning 18 global cloud regions and 60,000 physical server nodes.\n• Orchestrated a distributed team of 45 senior systems engineers, kernel programmers, and site reliability directors across three continents.\n• Established formal TLA+ specifications for real-time leader election and quorum validation, eliminating critical network partition split-brain occurrences.\n• Championed internal developer productivity initiatives that reduced microservice deployment cycle latency from 45 minutes to 3.2 minutes.',
      achievements: 'Engineered infrastructure scaling that handled over 120 billion daily queries with 99.999% SLA reliability.',
      technologies: 'Rust, C++, Go, TLA+, Linux eBPF, Kubernetes, Raft, Paxos, Kafka',
    },
    {
      jobTitle: 'Senior Staff Infrastructure Engineer',
      company: 'Datastream Technologies Inc.',
      employmentType: 'Full-time',
      startDate: '2015-06',
      endDate: '2019-12',
      current: false,
      responsibilities:
        '• Designed zero-copy memory transport pipeline using Linux io_uring and DPDK, yielding a 4.2x increase in throughput across high-frequency financial telemetry pipelines.\n• Supervised disaster recovery validation exercises simulating catastrophic submarine cable cuts and regional data center failures.\n• Co-authored enterprise cloud governance and data sovereignty frameworks adhering strictly to GDPR and HIPAA compliance mandates.',
      achievements: 'Decreased global latency p99.9 from 18ms to 2.4ms across inter-cluster traffic.',
      technologies: 'C++, Linux Kernel, DPDK, io_uring, PostgreSQL, Terraform',
    },
  ],
  projects: [
    {
      title: 'AetherFS - Planet-Scale Content-Addressable Storage File System',
      problemSolved: 'Replaces centralized blob storage with an immutable, self-healing peer-to-peer storage fabric.',
      description: 'An open-source distributed file system featuring cryptographic integrity verification, Reed-Solomon erasure coding, and zero-trust node authentication.',
      technologies: 'Rust, WebAssembly, libp2p, RocksDB, gRPC',
      contributions:
        '• Authored the complete deterministic block-allocator and multi-tiered cache eviction algorithm.\n• Conducted large-scale simulations with Chaos Mesh simulating 30% packet loss and adversarial Byzantine node partitions.',
      githubUrl: 'github.com/emontgomery/aetherfs',
      liveUrl: 'https://aetherfs.network',
      results: 'Adopted by 4 international university research consortiums managing 14 petabytes of climate observation data.',
    },
    {
      title: 'FormalSpec - Automated TLA+ Model Checker for Distributed Microservices',
      problemSolved: 'Detects distributed concurrency bugs before production rollout.',
      description: 'A developer toolkit that translates TypeScript/Go service state machines directly into verified formal mathematical models.',
      technologies: 'Go, TLA+, TypeScript, Docker',
      contributions: 'Implemented the AST parsing pipeline and counter-example trace visualizer.',
      githubUrl: 'github.com/emontgomery/formalspec',
      liveUrl: '',
      results: 'Uncovered 7 previously undetected edge-case race conditions in flagship cloud services.',
    },
  ],
  skills: {
    programmingLanguages: 'Rust, C++, Go, Python, C, SQL, TypeScript, Assembly (x86_64, ARM64)',
    frameworks: 'gRPC, Protobuf, DPDK, io_uring, Tokio, Actix, React, Next.js',
    databasesTools: 'PostgreSQL, RocksDB, Redis, Kubernetes, Docker, eBPF, Linux Kernel, Terraform, AWS, GCP',
    softSkills: 'Strategic Architectural Roadmap, Cross-Continental Leadership, Executive Technical Communication, Patent Filing',
  },
  additional: {
    certifications: [
      { name: 'IEEE Fellow in Computer Architecture', issuer: 'IEEE', issueDate: '2023' },
      { name: 'Certified Information Systems Security Professional (CISSP)', issuer: 'ISC2', issueDate: '2019' },
    ],
    publications: [
      { title: 'Deterministic Byzantine Fault Tolerance under Extreme Asynchrony', publisher: 'ACM SOSP Proceedings', date: '2022' },
      { title: 'Zero-Copy Microsecond Networking with Linux io_uring', publisher: 'USENIX ATC', date: '2019' },
    ],
    achievements: [
      { title: 'National Science Foundation Graduate Fellowship', date: '2012', description: 'Awarded for doctoral thesis proposal in distributed systems.' },
      { title: 'Best Paper Award - IEEE International Conference on Cloud Engineering', date: '2020', description: 'For research on fault-tolerant quorum protocols.' },
    ],
    codingProfiles: [
      { platform: 'ACM Digital Library', highlight: 'Author Profile (14 Publications, 2,800+ Citations)', username: '' },
    ],
    volunteer: [
      { role: 'Program Committee Chair', organization: 'USENIX NSDI', description: 'Coordinated peer-review for 350+ submitted systems research papers.' },
    ],
    coursework: 'Advanced Distributed Consensus, Cryptographic Protocols, Parallel Computation',
    languages: [
      { language: 'English', proficiency: 'Native' },
      { language: 'German', proficiency: 'Professional Working' },
    ],
  },
};

async function runTemplateTests() {
  console.log('====================================================');
  console.log('🧪 Starting Phase 4 Template Matrix Test Suite');
  console.log('====================================================\n');

  const templates = ['modern', 'professional', 'ats'];
  const testResumes = [
    { name: 'Student Resume', data: studentResume },
    { name: 'Fresher Resume', data: fresherResume },
    { name: 'Experienced Candidate Resume', data: experiencedResume },
    { name: 'Empty Optional Sections Resume', data: emptyOptionalResume },
    { name: 'Multi-Page Long Description Resume', data: multiPageLongResume },
  ];

  let passedTests = 0;
  let totalTests = 0;

  for (const tpl of templates) {
    console.log(`[Template: ${tpl.toUpperCase()}]`);
    for (const testCase of testResumes) {
      totalTests++;
      try {
        const buffer = await generateBuilderResumePdf({
          resumeData: testCase.data,
          templateId: tpl,
          customization: {
            accentColor: tpl === 'modern' ? '#059669' : tpl === 'professional' ? '#1e293b' : '#000000',
          },
        });

        assert.ok(Buffer.isBuffer(buffer), 'Should be a buffer');
        assert.ok(buffer.length > 800, `PDF size should be substantial (got ${buffer.length} bytes)`);
        assert.strictEqual(buffer.subarray(0, 4).toString(), '%PDF', 'Must start with %PDF magic header');

        console.log(`  ✓ Successfully generated PDF for ${testCase.name} (${(buffer.length / 1024).toFixed(1)} KB)`);
        passedTests++;
      } catch (err) {
        console.error(`  ✗ FAILED ${testCase.name} on ${tpl}:`, err.message);
        throw err;
      }
    }
    console.log('');
  }

  console.log('[Workflow 1 Bridge: convertFixedResumeToBuilderData]');
  const sampleFixedResume = {
    fullName: 'David K. Miller',
    professionalSummary: 'Full-stack software engineer with 3+ years experience building cloud services in TypeScript and Node.js.',
    contact: {
      email: 'david.miller@example.com',
      phone: '+1 (555) 777-8899',
      location: 'Austin, TX',
      linkedin: 'https://linkedin.com/in/davidmiller',
      github: 'https://github.com/davidmiller',
      portfolio: 'https://davidmiller.dev',
    },
    sections: [
      {
        heading: 'Technical Skills',
        items: [
          'Languages: JavaScript, TypeScript, Python, SQL',
          'Frameworks: React, Next.js, Express, Tailwind CSS',
          'Tools & Cloud: PostgreSQL, Docker, AWS (S3, Lambda), Git',
        ],
      },
      {
        heading: 'Professional Experience',
        items: [
          'Senior Software Engineer at CloudNova (2022 - Present): Architected microservices with 99.9% uptime.',
          'Software Engineer Intern at ByteWorks (2021): Optimized SQL queries reducing report generation time by 60%.',
        ],
      },
      {
        heading: 'Education',
        items: [
          'B.S. in Computer Science, University of Texas at Austin, 2018 - 2022',
        ],
      },
      {
        heading: 'Projects',
        items: [
          'Automated Code Review Bot: Built a GitHub App analyzing pull requests using LLMs.',
        ],
      },
      {
        heading: 'Certifications',
        items: ['AWS Certified Solutions Architect - Associate'],
      },
      {
        heading: 'Achievements',
        items: ['1st Place in Austin Tech Hackathon 2023'],
      },
    ],
    missingInformation: [],
    changeSummary: ['Enhanced bullet points with quantifiable impact metrics'],
  };

  const convertedBuilderData = convertFixedResumeToBuilderData(sampleFixedResume);
  assert.strictEqual(convertedBuilderData.personalInfo.fullName, 'David K. Miller');
  assert.strictEqual(convertedBuilderData.personalInfo.email, 'david.miller@example.com');
  assert.strictEqual(convertedBuilderData.skills.programmingLanguages, 'JavaScript, TypeScript, Python, SQL');
  assert.ok(convertedBuilderData.education.length > 0, 'Education should be populated');
  assert.ok(convertedBuilderData.experience.length > 0, 'Experience should be populated');
  assert.ok(convertedBuilderData.projects.length > 0, 'Projects should be populated');
  assert.ok(convertedBuilderData.additional.certifications.length > 0, 'Certifications should be populated');
  assert.ok(convertedBuilderData.additional.achievements.length > 0, 'Achievements should be populated');
  console.log('  ✓ Converted fixed resume schema accurately into builder state');
  totalTests++;
  passedTests++;

  // Test that the converted builder data renders cleanly into A4 PDF for all 3 templates
  for (const tpl of templates) {
    totalTests++;
    const buffer = await generateBuilderResumePdf({
      resumeData: convertedBuilderData,
      templateId: tpl,
      customization: {
        accentColor: tpl === 'modern' ? '#059669' : tpl === 'professional' ? '#1e293b' : '#000000',
      },
    });
    assert.ok(Buffer.isBuffer(buffer));
    assert.strictEqual(buffer.subarray(0, 4).toString(), '%PDF');
    console.log(`  ✓ Successfully exported converted resume to ${tpl.toUpperCase()} PDF (${(buffer.length / 1024).toFixed(1)} KB)`);
    passedTests++;
  }

  // Test safe fallback with empty/null fixed resume
  totalTests++;
  const emptyConversion = convertFixedResumeToBuilderData(null);
  assert.strictEqual(emptyConversion.personalInfo.fullName, '');
  assert.ok(Array.isArray(emptyConversion.education));
  console.log('  ✓ Safely handles null/empty fixed resume without crashing');
  passedTests++;

  console.log('');
  console.log('====================================================');
  console.log(`📊 Template Matrix Results: ${passedTests}/${totalTests} Passed (100% Success)`);
  console.log('====================================================');
}

runTemplateTests().catch((err) => {
  console.error('Fatal error in template test suite:', err);
  process.exit(1);
});
