import JSZip from 'jszip';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function createSampleDocxBuffer() {
  const zip = new JSZip();

  const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

  const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p><w:r><w:t>Alex Morgan - Senior Full Stack Engineer</w:t></w:r></w:p>
    <w:p><w:r><w:t>Professional Summary: Results-driven engineer with 5+ years of experience designing and scaling web applications in React, Node.js, and cloud architectures.</w:t></w:r></w:p>
    <w:p><w:r><w:t>Core Skills: JavaScript, TypeScript, React, Express, Python, PostgreSQL, Docker, AWS, Git, CI/CD pipelines.</w:t></w:r></w:p>
    <w:p><w:r><w:t>Professional Experience: Tech Solutions Inc. - Lead Engineer (2021 - Present). Built high-throughput microservices handling 2M daily requests. Optimized API latency by 35%.</w:t></w:r></w:p>
    <w:p><w:r><w:t>Education: Bachelor of Science in Computer Science, University of Washington, 2020. GPA: 3.8/4.0.</w:t></w:r></w:p>
  </w:body>
</w:document>`;

  zip.file('[Content_Types].xml', contentTypesXml);
  zip.file('_rels/.rels', relsXml);
  zip.file('word/document.xml', documentXml);

  return await zip.generateAsync({ type: 'nodebuffer' });
}

export async function createSamplePdfBuffer() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText('Jordan Lee - Senior Software Engineer', {
    x: 50,
    y: 750,
    size: 16,
    font,
    color: rgb(0.1, 0.1, 0.1),
  });

  page.drawText('Professional Summary: Passionate developer with 6 years experience in building cloud services and scalable distributed platforms.', {
    x: 50,
    y: 720,
    size: 11,
    font,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText('Skills: Node.js, React, Python, Docker, Kubernetes, PostgreSQL, AWS, GraphQL, REST APIs, Microservices.', {
    x: 50,
    y: 690,
    size: 11,
    font,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText('Work Experience: Senior Engineer at CloudNet Systems (2020 - Present). Scaled cloud platform to 500k active users and reduced infrastructure cost by 25%.', {
    x: 50,
    y: 660,
    size: 11,
    font,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText('Education: Bachelor of Science in Computer Science, Georgia Tech, graduated with honors in 2019.', {
    x: 50,
    y: 630,
    size: 11,
    font,
    color: rgb(0.2, 0.2, 0.2),
  });

  const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
  return Buffer.from(pdfBytes);
}
