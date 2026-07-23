'use client';

import { FormEvent, useEffect, useState } from 'react';

const services = [
  {
    title: 'Web Apps',
    eyebrow: 'Fast, scalable digital products',
    description: 'Lightning-fast SaaS platforms, internal dashboards, and commerce experiences built to scale.',
    summary: 'We create polished, robust web products with smooth experiences for users and teams alike.',
    highlights: ['React and Next.js apps', 'Performance-first architecture', 'Secure authentication and dashboards'],
    plans: [
      { name: 'Launchpad', price: '₹35,000', details: 'Perfect for MVPs and landing experiences with premium UX.', features: ['Single product experience', 'Email integration', 'Basic analytics'] },
      { name: 'Growth', price: '₹90,000', details: 'Built for ambitious teams that need a scalable custom product.', features: ['Custom user flows', 'AI workflow setup', 'Priority support'] },
      { name: 'Scale', price: '₹1,80,000', details: 'Comprehensive delivery for high-growth operations and automation.', features: ['Full-stack product build', 'Advanced integrations', 'Dedicated delivery team'] },
    ],
  },
  {
    title: 'Machine Learning',
    eyebrow: 'Intelligent prediction systems',
    description: 'Custom predictive models, recommendation engines, and intelligent automation systems.',
    summary: 'We turn business data into decision-ready machine learning solutions that improve daily operations.',
    highlights: ['Forecasting and classification', 'Recommendation systems', 'Data pipelines and automation'],
    plans: [
      { name: 'Insight', price: '₹45,000', details: 'For teams discovering ML value with a practical first deployment.', features: ['Data preparation', 'Model prototype', 'Basic dashboard'] },
      { name: 'Advance', price: '₹1,10,000', details: 'For production-grade learning systems that need reliability.', features: ['Training pipeline', 'Monitoring setup', 'Model retraining'] },
      { name: 'Enterprise', price: '₹2,20,000', details: 'For large-scale intelligent workflows with governance and support.', features: ['Multi-model orchestration', 'Compliance-ready setup', 'Dedicated support'] },
    ],
  },
  {
    title: 'GenAI Products',
    eyebrow: 'Conversational and content intelligence',
    description: 'Conversational assistants, copilots, and content systems tailored to your operations.',
    summary: 'We design GenAI experiences that feel smart, contextual, and useful from the first interaction.',
    highlights: ['AI copilots', 'Knowledge assistants', 'Content generation systems'],
    plans: [
      { name: 'Assist', price: '₹55,000', details: 'Create a focused AI-powered experience for your customers or team.', features: ['Prompt design', 'Chat interface', 'Basic knowledge base'] },
      { name: 'Pro', price: '₹1,25,000', details: 'A richer AI layer with real workflow integration.', features: ['Custom agent workflows', 'Advanced retrieval', 'Usage analytics'] },
      { name: 'Elite', price: '₹2,60,000', details: 'A flagship GenAI system for broader operations and scale.', features: ['Multi-agent orchestration', 'Security controls', 'Premium support'] },
    ],
  },
  {
    title: 'AI Agents',
    eyebrow: 'Autonomous action systems',
    description: 'Autonomous agent workflows that take action across your tools and processes.',
    summary: 'We build agents that automate repetitive work, recommend next steps, and orchestrate tasks intelligently.',
    highlights: ['Workflow automation', 'Tool integrations', 'Actionable decision agents'],
    plans: [
      { name: 'Starter', price: '₹60,000', details: 'Great for introducing automation into a lean team workflow.', features: ['Single-agent setup', 'Tool connection', 'Monitoring'] },
      { name: 'Builder', price: '₹1,40,000', details: 'Robust agents with deeper integrations and smarter triggers.', features: ['Multi-step workflows', 'API integrations', 'Team access controls'] },
      { name: 'Orchestrator', price: '₹2,90,000', details: 'Enterprise-class agent systems for high-value business operations.', features: ['Complex orchestration', 'Security hardening', 'Ongoing optimization'] },
    ],
  },
];

const projects = [
  {
    title: 'Apex Copilot',
    type: 'GenAI / SaaS',
    blurb: 'Built an AI assistant that answers product questions and automates support workflows for a fast-growing startup.',
  },
  {
    title: 'VisionSense',
    type: 'Deep Learning',
    blurb: 'Developed a computer vision pipeline for defect detection that reduced manual review time by 70%.',
  },
  {
    title: 'LedgerLoop',
    type: 'Blockchain',
    blurb: 'Created a transparent audit trail for supply chain data using smart contracts and secure ledgers.',
  },
];

const pricing = [
  {
    name: 'Launch',
    price: '₹35,000',
    description: 'For startups that need a crisp MVP or landing experience.',
    features: ['1-page conversion flow', 'Email integration', 'Basic analytics'],
  },
  {
    name: 'Scale',
    price: '₹90,000',
    description: 'For teams building advanced product experiences and data-driven intelligence.',
    features: ['Custom web app', 'AI workflow setup', 'Priority support'],
  },
  {
    name: 'Enterprise',
    price: '₹1,80,000',
    description: 'For ambitious brands that need a full-stack transformation with automation.',
    features: ['End-to-end product build', 'Multi-agent systems', 'Dedicated delivery team'],
  },
];

export default function HomePage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    projectType: services[0].title,
    message: '',
  });
  const [status, setStatus] = useState<{ text: string; tone: 'success' | 'error' | 'neutral' }>({ text: '', tone: 'neutral' });
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedPlan, setSelectedPlan] = useState(services[0].plans[0]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus({ text: 'Preparing your email...', tone: 'neutral' });

    const mailBody = [
      `Name: ${formState.name}`,
      `Email: ${formState.email}`,
      `Company: ${formState.company || '-'}`,
      `Service: ${formState.projectType}`,
      `Plan: ${selectedPlan.name}`,
      '',
      'Message:',
      formState.message,
    ].join('\n');

    const mailto = `mailto:dushyantmanghani@gmail.com?subject=${encodeURIComponent(`Project Inquiry - ${formState.projectType}`)}&body=${encodeURIComponent(mailBody)}`;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, service: formState.projectType, plan: selectedPlan.name }),
      });

      const data = await response.json();

      if (typeof window !== 'undefined') {
        window.location.href = mailto;
      }

      setStatus({ text: 'Your request has been sent. We will reach out to you soon.', tone: 'success' });
      setFormState({ name: '', email: '', company: '', projectType: selectedService.title, message: '' });
      setSelectedService(services[0]);
      setSelectedPlan(services[0].plans[0]);

      if (!response.ok) {
        setStatus({ text: data.message || 'Your request is not sent. Please try again.', tone: 'error' });
      }
    } catch {
      setStatus({ text: 'Your request is not sent. Please try again.', tone: 'error' });
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-section reveal">
        <nav className="top-nav">
          <div className="brand-mark">MNC Solutions</div>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div>
            <p className="eyebrow">Future-ready software studio</p>
            <h1>We build high-impact digital products that feel intuitive, intelligent, and unforgettable.</h1>
            <p className="hero-copy">
              From web applications and machine learning pipelines to GenAI experiences and AI agents, we create elegant solutions that make your business move faster.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="mailto:dushyantmanghani@gmail.com?subject=Project%20Inquiry%20-%20MNC%20Solutions">
                Reach out now
              </a>
              <a className="secondary-btn" href="#projects">
                See our work
              </a>
            </div>
            <div className="trust-row">
              <div>
                <strong>15+</strong>
                <span>clients satisfied</span>
              </div>
              <div>
                <strong>4+</strong>
                <span>core specialities</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <div className="card-pill">AI • Product • Engineering</div>
            <h3>Built for fast-moving teams and ambitious founders.</h3>
            <ul>
              <li>Modern web apps with premium UX</li>
              <li>GenAI copilots and agent workflows</li>
              <li>ML and deep learning systems</li>
              <li>Blockchain solutions with real impact</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="services" className="section-block reveal">
        <div className="section-title">
          <p className="eyebrow">What we do</p>
          <h2>Technology services crafted for the way modern brands grow.</h2>
        </div>
        <div className="card-grid">
          {services.map((service) => {
            const isActive = selectedService.title === service.title;
            return (
              <button
                key={service.title}
                type="button"
                className={`info-card service-card ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setSelectedService(service);
                  setSelectedPlan(service.plans[0]);
                  setFormState((prev) => ({ ...prev, projectType: service.title }));
                }}
              >
                <p className="service-eyebrow">{service.eyebrow}</p>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </button>
            );
          })}
        </div>

        <div className="detail-panel">
          <div className="detail-copy">
            <p className="eyebrow">Selected service</p>
            <h3>{selectedService.title}</h3>
            <p>{selectedService.summary}</p>
            <ul>
              {selectedService.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="plan-stack">
            {selectedService.plans.map((plan) => {
              const isSelected = selectedPlan.name === plan.name;
              return (
                <button
                  key={plan.name}
                  type="button"
                  className={`plan-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="plan-header">
                    <h4>{plan.name}</h4>
                    <span>{plan.price}</span>
                  </div>
                  <p>{plan.details}</p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="stats-strip reveal">
        <div>
          <strong>15</strong>
          <span>Clients served</span>
        </div>
        <div>
          <strong>100%</strong>
          <span>Focus on product quality</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span>Collaboration mindset</span>
        </div>
      </section>

      <section id="projects" className="section-block reveal">
        <div className="section-title">
          <p className="eyebrow">Selected work</p>
          <h2>Projects built for clients who wanted more than just software.</h2>
        </div>
        <div className="card-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <p className="project-type">{project.type}</p>
              <h3>{project.title}</h3>
              <p>{project.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="section-block reveal">
        <div className="section-title">
          <p className="eyebrow">Pricing</p>
          <h2>Flexible engagement models for startups and established teams.</h2>
        </div>
        <div className="card-grid pricing-grid">
          {pricing.map((tier) => (
            <article key={tier.name} className="pricing-card">
              <h3>{tier.name}</h3>
              <div className="price">{tier.price}</div>
              <p>{tier.description}</p>
              <ul>
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section-block contact-section reveal">
        <div className="section-title">
          <p className="eyebrow">Contact</p>
          <h2>Let’s turn your next big idea into a remarkable product.</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Start a conversation</h3>
            <p>Share your challenge, and we will help you shape the right solution path.</p>
            <a className="primary-btn" href="mailto:dushyantmanghani@gmail.com?subject=Project%20Inquiry%20-%20MNC%20Solutions">
              Mail us directly
            </a>
            <div className="selection-chip">
              <span>Service</span>
              <strong>{formState.projectType}</strong>
            </div>
            <div className="selection-chip">
              <span>Plan</span>
              <strong>{selectedPlan.name}</strong>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                required
                placeholder="Your name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
              <input
                required
                type="email"
                placeholder="Your email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              />
            </div>
            <input
              placeholder="Company"
              value={formState.company}
              onChange={(e) => setFormState({ ...formState, company: e.target.value })}
            />
            <select 
              className="service-select"
              value={formState.projectType}
              onChange={(e) => {
                const service = services.find((item) => item.title === e.target.value) || services[0];
                setFormState({ ...formState, projectType: service.title });
                setSelectedService(service);
                setSelectedPlan(service.plans[0]);
              }}
            >
              {services.map((service) => (
                <option key={service.title} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
            <textarea
              required
              placeholder="Tell us about your idea"
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            />
            <button type="submit" className="primary-btn">Send request</button>
            {status.text ? <p className={`status-text ${status.tone}`}>{status.text}</p> : null}
          </form>
        </div>
      </section>
    </main>
  );
}
