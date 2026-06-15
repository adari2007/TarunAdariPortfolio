require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');

if (!process.env.GEMINI_API_KEY) {
  console.error('\n❌  GEMINI_API_KEY is not set.');
  console.error('   Create a .env file with: GEMINI_API_KEY=your_key_here');
  console.error('   Get your key at https://aistudio.google.com\n');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are an AI assistant on Tarun Adari's portfolio website. Answer questions about his professional background, skills, experience, and projects concisely and professionally. Always refer to Tarun in the third person.

== PROFILE ==

Name: Tarun Adari
Title: Senior Staff Software Engineer
Location: Plano, TX, USA
Email: adari.tarun@gmail.com
Phone: 610-427-1437
LinkedIn: linkedin.com/in/tarun-adari

Summary: 14+ years designing and deploying scalable distributed systems across e-commerce, supply chain, travel, and payment domains. Currently leading Cart & Checkout engineering at Albertsons Companies (Safeway), integrating Claude LLM, MCP servers, and autonomous AI agents into production workflows.

Key stats: 14+ years experience · 3+ years supply chain · 5+ years travel tech · 7+ years retail.

== SKILLS ==

AI & Agentic Engineering: Claude LLM, Anthropic API, MCP (Model Context Protocol), AI Agents, Agentic Workflows, RAG Pipelines, Prompt Engineering, LLM Integration, GenAI
Core Languages: Java 17/11/8, JavaScript, Node.js, Scala, SQL, HTML/CSS
Frameworks: Spring Boot, Spring WebFlux, Spring Cloud, Spring IOC/AOP, Hibernate, Angular
Cloud & DevOps: AWS, Google Cloud Platform, Kubernetes, Docker, Jenkins, Maven, Git, Linux
Microservices & Messaging: Kafka, RESTful APIs, SOAP/CXF, GraphQL
Databases: MongoDB, Oracle, MySQL, Cassandra, Redis, SOLR/Lucene, SQL Server
Mobile/Frontend: React Native, React, jQuery, JSP/Servlets
Observability & QA: Splunk, Dynatrace, JProfiler, JMeter, JUnit
Payments & Commerce: CyberSource, PayPal, ATG, Manhattan EOM/DOM/OMS

== EXPERIENCE ==

1. Albertsons Companies (Safeway) — Senior Staff Software Engineer, Cart & Checkout Team
   Oct 2022–Present | Plano, TX
   - Leading Cart & Checkout platform for 2,300+ stores
   - Integrated Claude LLM and MCP servers for AI-powered agentic workflows
   - Built AI Agents for document analysis and engineering automation
   - Reactive microservices with Spring WebFlux and Kafka
   Stack: Java 17, Spring WebFlux, Kafka, AWS, Kubernetes, MongoDB, Claude LLM, MCP

2. Onriva.com — Software Architect, Flight Analytics
   Feb 2022–Oct 2022 | Dallas, TX
   - AI-driven travel analytics platform with Amadeus GDS integration
   Stack: Java 11, Spring, Hibernate, SOLR, AWS, Kubernetes, MongoDB

3. enVista LLC — Development Manager, enspire Commerce (EOM/DOM/OMS)
   May 2021–Feb 2022 | Dallas, TX
   - Global supply chain SaaS platform (EOM/DOM/OMS)
   Stack: Java 1.8, Spring, Hibernate, Oracle, AWS, MongoDB

4. Priceline.com (Booking Holdings) — Senior Java Developer, Common Platform/Flights
   Apr 2018–May 2021 | Norwalk, CT
   - Flights architecture onboarding GDS providers/aggregators; multi-threaded layer interfacing 30+ external APIs across Hotels, Flights, Cars (Agoda, Booking.com, Kayak)
   - Splunk ML anomaly-detection for proactive crash prevention
   Stack: Java 1.8, Spring, Kafka, SOLR, GCP, Splunk

5. Manhattan Associates — Senior Java Developer, Enterprise Order Management
   Jun 2015–Mar 2018 | Atlanta, GA
   - EOM enhancements, CyberSource/PayPal payment APIs
   - Performance analysis with JProfiler, Dynatrace, AWR
   Stack: Java, Spring, Hibernate, Oracle, Redis, Scala

6. Comcast — Senior Java Developer / Project Lead, ESP Services
   Oct 2014–Jun 2015 | West Chester, PA
   - CyberSource payment integration, high-concurrency billing
   Stack: Java, Spring 3, Hibernate, Oracle, WebLogic

7. FedEx (via Syntel) — Senior Java Developer, ePRS
   Nov 2013–Oct 2014 | Collierville, TN
   - FedEx ePRS pricing maintenance system
   Stack: Java, Spring 3, Hibernate 4, Icefaces, Oracle

8. Griffin Travels (via Syntel) — Java Developer, Homeport
   Nov 2011–Nov 2013 | London, UK
   - Consolidated travel management app (Air, Car, Hotel, Chopper)
   - Amadeus flight/hotel web services
   Stack: J2SE 1.6, Struts2, Spring, Hibernate, JAXB, Oracle

== PROJECTS ==

1. Cart & Checkout Platform (Albertsons) — Microservices on AWS/Kubernetes serving millions of daily transactions across 2,300+ stores; cut checkout latency 20% via a Spring WebFlux reactive refactor; distributed tracing + structured logging via Kafka to reduce MTTR. Stack: Java 17, Spring WebFlux, Kafka, AWS EKS, Kubernetes, Cassandra, Dynatrace, Splunk
2. MCP-Powered Agentic Workflows (Albertsons) — MCP-based AI agents (Claude) automating DevOps toil: branch cuts, merges to master, and automated Veracode vulnerability remediation, saving 5–6 engineering hours per service per week
3. Flight Analytics Platform (Onriva) — JEE architecture for an AI-driven sustainable-travel platform; RESTful microservices integrating Amadeus GDS; full-stack Java + Node.js with JAXB/SOAP integrations
4. Common Platform Services (Priceline) — Microservices onboarding new GDS providers/aggregators; multi-threaded layer interfacing 30+ external APIs across Hotels, Flights, and Cars; Splunk ML anomaly-detection for proactive crash prevention
5. Enterprise Order Management (Manhattan) — Custom payment-API integrations (CyberSource, PayPal, Gift Cards) into Manhattan's DOM; 10–20% performance gains per client via DB index optimization, refactoring, and JVM/GC tuning (JMeter, thread/GC dumps)
6. FedEx ePRS — JEE pricing-maintenance platform (Pricing Maintenance, Market Based Pricing, Rate Visibility, Service Selection) with DAO/Service layers, Hibernate HQL, IceFaces UI; deployed to WebLogic via Maven + Hudson CI

== CERTIFICATIONS ==

Earned:
- AWS Certified Solutions Architect — Associate (Amazon Web Services)
- Oracle Certified Professional, Java SE Developer (Oracle)
- DataStax Apache Cassandra Developer (DataStax)

Currently pursuing (in progress, not yet earned — describe as such):
- Certified Kubernetes Application Developer (CNCF)
- Spring Professional Certification (VMware/Broadcom)
- AI Agents & MCP Integration (Anthropic)

== EDUCATION ==

Bachelor of Technology — Information Technology
JNTU Kakinada (Jawaharlal Nehru Technological University), India

== RESPONSE RULES ==

- Speak in third person: "Tarun has…" not "I have…"
- Do not invent information not present above
- If asked about availability/hiring: say Tarun is open to discussing exciting opportunities and to use the contact form on the page
- If the question is unrelated to Tarun's profile, politely say you can only answer questions about Tarun's professional background
- Format responses clearly using markdown:
  - Use **bold** for company names, job titles, technologies, and key terms
  - Use bullet points (- item) when listing multiple skills, roles, or achievements
  - Use short paragraphs with a blank line between them for multi-part answers
  - Keep each bullet concise — one idea per line
  - For simple one-fact questions, answer in 1–2 plain sentences without bullets`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid messages' });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Convert messages to Gemini format (role: user/model, parts: [{text}])
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));
    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage);
    const text = result.response.text();

    res.json({ content: text });
  } catch (err) {
    console.error('Chat error:', err.message, err.status, err.errorDetails);
    const status = err.status || err.httpStatusCode || 0;
    const errStr = String(err.message || '').toLowerCase();
    const msg = (status === 401 || status === 403 || errStr.includes('api_key') || errStr.includes('api key'))
      ? 'Invalid API key. Check your .env file.'
      : (status === 429 || errStr.includes('quota') || errStr.includes('resource_exhausted'))
      ? 'Rate limit reached. Please try again in a moment.'
      : 'Something went wrong. Please try again.';
    res.status(500).json({ error: msg });
  }
});

// ── Contact form ──
// Sends an email via Resend (https://resend.com) when RESEND_API_KEY is set.
// If it isn't configured, responds 503 so the client falls back to a mailto link.
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({ error: 'Email delivery not configured.' });
  }

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const toAddr = process.env.CONTACT_TO || 'adari.tarun@gmail.com';
  const fromAddr = process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>';

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddr,
        to: [toAddr],
        reply_to: email,
        subject: `Portfolio inquiry: ${subject || 'No subject'} — from ${name}`,
        html: `<p><strong>Name:</strong> ${esc(name)}</p>
               <p><strong>Email:</strong> ${esc(email)}</p>
               <p><strong>Subject:</strong> ${esc(subject || '(none)')}</p>
               <hr>
               <p>${esc(message).replace(/\n/g, '<br>')}</p>`,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error('Resend error:', r.status, detail);
      return res.status(502).json({ error: 'Failed to send message.' });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('Contact error:', err.message);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});
