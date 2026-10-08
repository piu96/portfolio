/**
 * Sutrishna Bera - Senior Full Stack & Backend Developer Portfolio
 * Creative Interactive Logic & System Simulator
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      navToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.innerHTML = '☰';
      });
    });
  }

  // 2. Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  });

  // 3. Interactive Theme Picker
  const themeDots = document.querySelectorAll('.theme-dot');
  const savedTheme = localStorage.getItem('sb_portfolio_theme') || 'cyan';
  setTheme(savedTheme);

  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const theme = dot.getAttribute('data-theme');
      setTheme(theme);
    });
  });

  function setTheme(theme) {
    if (theme === 'cyan') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('sb_portfolio_theme', theme);
  }

  // 4. Creative Hero Typewriter Effect
  const typewriterElement = document.getElementById('typewriterText');
  if (typewriterElement) {
    const words = [
      "Senior Backend Engineer",
      "Full-Stack Developer",
      "Microservices & REST APIs",
      "Event-Driven RabbitMQ Systems",
      "Generative AI & RAG Explorer",
      "FastAPI & Node.js Specialist"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const delayBetweenWords = 1800;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, delayBetweenWords);
        return;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

      setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
    }

    typeEffect();
  }

  // 5. Interactive Particle Network Canvas
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 55);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.6 + 0.6;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.18 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // 6. CREATIVE FEATURE 1: Interactive System Architecture Simulator
  const simBtns = document.querySelectorAll('.sim-btn');
  const simNodes = document.querySelectorAll('.system-node');
  const terminalLog = document.getElementById('flowTerminalBody');

  const simulations = {
    order: {
      steps: [
        "🌐 Client: Dispatching POST /api/v1/shipments/book (Parcel Details)",
        "🛡️ API Gateway: JWT validated (TenantID: SB-8419), Rate limit: OK",
        "⚡ FastAPI Core: Computing dynamic rate cards across Delhivery & Ekart",
        "📨 RabbitMQ: Event published `shipment.created` -> Worker picked task",
        "💾 Database: PostgreSQL ledger locked; AWB generated: DEL-9941829"
      ],
      output: `HTTP/1.1 201 Created
{
  "status": "success",
  "tracking_number": "DEL-9941829",
  "carrier": "Delhivery Express B2C",
  "status_code": "IN_TRANSIT",
  "wallet_balance_locked": "₹340.00",
  "execution_time_ms": 28.4
}`
    },
    ai: {
      steps: [
        "🌐 Client: User asks: 'Summarize match trends for Player #18'",
        "🛡️ API Gateway: Session token authorized, Routing to AI Analytics",
        "⚡ FastAPI Core: Prompt formatting & Context vector retrieval",
        "📨 Vector DB / Queue: Similarity search across historical scorecards",
        "💾 Response Synthesis: OpenAI/Claude stream parsed & cached in Redis"
      ],
      output: `HTTP/1.1 200 OK
{
  "player": "Player #18",
  "predicted_strike_rate": 142.8,
  "match_insight": "Strong strike rate against pace in death overs (>185). Optimal batting position: No. 3.",
  "confidence_score": 0.94,
  "execution_time_ms": 64.1
}`
    },
    wallet: {
      steps: [
        "🌐 Client: Merchant initiates payout settlement: ₹15,000.00",
        "🛡️ API Gateway: Dual-factor authentication verified",
        "⚡ Node.js Core: Acquiring atomic distributed mutex lock",
        "📨 RabbitMQ: Publishing payout job to Finance Reconciliation queue",
        "💾 Database: Double-entry debit/credit ledger recorded in PostgreSQL"
      ],
      output: `HTTP/1.1 200 OK
{
  "transaction_id": "TXN-LEDGER-88194",
  "type": "DOUBLE_ENTRY_PAYOUT",
  "amount": "₹15,000.00",
  "debit_account": "ACC_MERCHANT_WALLET",
  "credit_account": "ACC_BANK_PAYOUT",
  "balance_verified": true,
  "lock_released": true,
  "latency_ms": 19.8
}`
    }
  };

  let simRunning = false;

  simBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (simRunning) return;
      simRunning = true;

      simBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const simType = btn.getAttribute('data-sim');
      const simData = simulations[simType] || simulations.order;

      if (!terminalLog) return;
      terminalLog.textContent = "⚡ Initializing simulated request pipeline...\n";

      // Step-by-step node pulse animation
      simNodes.forEach(node => node.classList.remove('active-node'));

      let stepIndex = 0;
      const interval = setInterval(() => {
        if (stepIndex < simNodes.length) {
          simNodes.forEach(n => n.classList.remove('active-node'));
          simNodes[stepIndex].classList.add('active-node');

          terminalLog.textContent += `→ ${simData.steps[stepIndex]}\n`;
          terminalLog.scrollTop = terminalLog.scrollHeight;
          stepIndex++;
        } else {
          clearInterval(interval);
          terminalLog.textContent += `\n[Pipeline Complete] Server Response:\n${simData.output}\n`;
          terminalLog.scrollTop = terminalLog.scrollHeight;
          simRunning = false;
        }
      }, 450);
    });
  });

  // 7. CREATIVE FEATURE 2: Interactive Developer Terminal Widget
  const terminalInput = document.getElementById('devTerminalInput');
  const terminalHistory = document.getElementById('devTerminalHistory');
  const terminalPills = document.querySelectorAll('.t-pill');

  const termCommands = {
    help: "Available commands:\n  • skills    : View technical proficiencies\n  • projects  : List featured live platforms\n  • bio       : Read full background summary\n  • arch      : Microservices & backend architecture breakdown\n  • contact   : Get email & professional links\n  • hire      : Connect with Sutrishna for opportunities\n  • clear     : Clear terminal screen",
    skills: "TECHNICAL STACK:\n  • Backend   : Node.js, Express.js, Python (FastAPI), RESTful APIs, Microservices\n  • Databases : PostgreSQL, MySQL, MongoDB, Sequelize ORM, Mongoose ODM\n  • Queues    : RabbitMQ, Webhooks, Event-Driven Architecture\n  • Cloud/Ops : Docker, AWS EC2, AWS S3, PM2\n  • GenAI     : RAG Architecture, LangChain, Vector DBs, OpenAI & Claude APIs\n  • Frontend  : React.js, JavaScript (ES6+), HTML5, CSS3",
    projects: "FEATURED PLATFORMS:\n  1. ShipTech               → Enterprise Logistics & 6-Carrier Hub (shiptech.in)\n  2. Cricket Stats AI       → AI Predictive Insights via LLMs (cbtfcricstats.ai)\n  3. Global Sports Network  → Real-Time Athlete Community (eagleglobalsportsnetwork.com)\n  4. Rally-Up               → Event Booking & Seat Reservation Engine\n  5. TCFS CRM               → Lead Management & Support Ticket Engine",
    bio: "Sutrishna Bera is a Senior Backend & Full-Stack Developer with 6+ years of experience.\nPassionate about building scalable systems, high-volume message queues, and fail-safe APIs.\nCurrently expanding into Generative AI & RAG retrieval systems.",
    arch: "ARCHITECTURE HIGHLIGHTS:\n  • API Gateways with JWT & Role-Based Access Control\n  • Asynchronous Background Jobs via RabbitMQ queues\n  • Decoupled Courier Adapters for 6+ carrier logistics\n  • Atomic Double-Entry Financial Balance calculations in PostgreSQL\n  • Docker containerization deployed on AWS EC2 & S3",
    contact: "CONNECT WITH SUTRISNA:\n  • Email    : berasutrishna96@gmail.com\n  • LinkedIn : https://linkedin.com/in/sutrishna-bera\n  • GitHub   : https://github.com/piu96\n  • Location : Kolkata, West Bengal, India",
    hire: "🎉 Great choice! Sutrishna is actively open for Senior Backend / Full-Stack opportunities.\n👉 Drop an email directly: berasutrishna96@gmail.com or connect on LinkedIn!"
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      if (terminalHistory) terminalHistory.innerHTML = '';
      return;
    }

    const output = termCommands[cmd] || `command not found: "${cmd}". Type "help" for a list of valid commands.`;

    const logEntry = document.createElement('div');
    logEntry.className = 't-line';
    logEntry.innerHTML = `
      <div><span class="t-prompt">sutrishna@dev:~$</span> <span class="t-cmd">${escapeHTML(cmd)}</span></div>
      <div class="t-output" style="white-space: pre-wrap;">${escapeHTML(output)}</div>
    `;

    if (terminalHistory) {
      terminalHistory.appendChild(logEntry);
      terminalHistory.scrollTop = terminalHistory.scrollHeight;
    }
  }

  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        executeCommand(val);
      }
    });
  }

  terminalPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });

  // 8. Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 9. Copy Email Toast Notification
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'berasutrishna96@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied: ' + email);
      }).catch(() => {
        showToast('✉️ berasutrishna96@gmail.com');
      });
    });
  });

  // 11. CREATIVE FEATURE 3: Interactive Production Codebase & File Tree Explorer
  const codeFiles = {
    'shipments.py': {
      tabName: 'shipments.py',
      lang: 'Python (FastAPI)',
      path: 'services/logistics-fastapi/app/api/v1/shipments.py',
      code: `<span class="code-comment"># services/logistics-fastapi/app/api/v1/shipments.py</span>
<span class="code-keyword">from</span> fastapi <span class="code-keyword">import</span> APIRouter, Depends, HTTPException, status
<span class="code-keyword">from</span> sqlalchemy.ext.asyncio <span class="code-keyword">import</span> AsyncSession
<span class="code-keyword">from</span> app.schemas.shipment <span class="code-keyword">import</span> ShipmentCreate, ShipmentResponse
<span class="code-keyword">from</span> app.services.courier_adapter <span class="code-keyword">import</span> CourierService
<span class="code-keyword">from</span> app.core.queue <span class="code-keyword">import</span> publish_event
<span class="code-keyword">from</span> app.core.database <span class="code-keyword">import</span> get_db

router = <span class="code-fn">APIRouter</span>(prefix=<span class="code-str">"/shipments"</span>, tags=[<span class="code-str">"Shipments"</span>])

<span class="code-var">@router.post</span>(<span class="code-str">"/book"</span>, response_model=ShipmentResponse, status_code=status.HTTP_201_CREATED)
<span class="code-keyword">async def</span> <span class="code-fn">book_shipment</span>(
    payload: ShipmentCreate,
    db: AsyncSession = <span class="code-fn">Depends</span>(get_db)
):
    <span class="code-comment">"""
    Dispatches order booking to selected carrier partner,
    reserves wallet funds atomically, and emits queue event.
    """</span>
    courier = <span class="code-fn">CourierService</span>(carrier_id=payload.carrier_id)
    result = <span class="code-keyword">await</span> courier.<span class="code-fn">create_order</span>(payload)
    
    <span class="code-comment"># Publish to RabbitMQ background processing queue</span>
    <span class="code-keyword">await</span> <span class="code-fn">publish_event</span>(
        queue_name=<span class="code-str">"shipment.tracking"</span>,
        payload={<span class="code-str">"awb"</span>: result.awb_code, <span class="code-str">"tenant_id"</span>: payload.tenant_id}
    )
    
    <span class="code-keyword">return</span> result`
    },
    'courier_adapter.py': {
      tabName: 'courier_adapter.py',
      lang: 'Python',
      path: 'services/logistics-fastapi/app/services/courier_adapter.py',
      code: `<span class="code-comment"># services/logistics-fastapi/app/services/courier_adapter.py</span>
<span class="code-keyword">from</span> abc <span class="code-keyword">import</span> ABC, abstractmethod
<span class="code-keyword">import</span> httpx

<span class="code-keyword">class</span> <span class="code-fn">BaseCourierAdapter</span>(ABC):
    <span class="code-var">@abstractmethod</span>
    <span class="code-keyword">async def</span> <span class="code-fn">generate_waybill</span>(self, order_data: dict) -&gt; dict:
        <span class="code-keyword">pass</span>

<span class="code-keyword">class</span> <span class="code-fn">DelhiveryAdapter</span>(BaseCourierAdapter):
    <span class="code-keyword">def</span> <span class="code-fn">__init__</span>(self, api_token: str):
        self.api_token = api_token
        self.base_url = <span class="code-str">"https://track.delhivery.com/api/cmu"</span>

    <span class="code-keyword">async def</span> <span class="code-fn">generate_waybill</span>(self, order_data: dict) -&gt; dict:
        <span class="code-keyword">async with</span> httpx.<span class="code-fn">AsyncClient</span>(timeout=<span class="code-num">10.0</span>) <span class="code-keyword">as</span> client:
            res = <span class="code-keyword">await</span> client.<span class="code-fn">post</span>(
                f<span class="code-str">"{self.base_url}/create.json"</span>,
                headers={<span class="code-str">"Authorization"</span>: f<span class="code-str">"Token {self.api_token}"</span>},
                json=order_data
            )
            res.<span class="code-fn">raise_for_status</span>()
            <span class="code-keyword">return</span> res.<span class="code-fn">json</span>()`
    },
    'rabbitmq_worker.py': {
      tabName: 'rabbitmq_worker.py',
      lang: 'Python (Async)',
      path: 'services/logistics-fastapi/app/workers/rabbitmq_worker.py',
      code: `<span class="code-comment"># services/logistics-fastapi/app/workers/rabbitmq_worker.py</span>
<span class="code-keyword">import</span> aio_pika
<span class="code-keyword">import</span> json
<span class="code-keyword">import</span> logging

logger = logging.<span class="code-fn">getLogger</span>(<span class="code-str">"worker.tracking"</span>)

<span class="code-keyword">async def</span> <span class="code-fn">process_tracking_log</span>(message: aio_pika.IncomingMessage):
    <span class="code-keyword">async with</span> message.process():
        data = json.<span class="code-fn">loads</span>(message.body)
        awb = data.<span class="code-fn">get</span>(<span class="code-str">"awb"</span>)
        
        <span class="code-comment"># Parse live NDR status &amp; notify merchant webhook</span>
        logger.<span class="code-fn">info</span>(f<span class="code-str">"[RabbitMQ] Processing tracking update for AWB: {awb}"</span>)
        <span class="code-keyword">await</span> <span class="code-fn">update_shipment_status</span>(awb, status=data.<span class="code-fn">get</span>(<span class="code-str">"status"</span>))`
    },
    'server.js': {
      tabName: 'server.js',
      lang: 'JavaScript (Node.js)',
      path: 'services/api-gateway/src/server.js',
      code: `<span class="code-comment">// services/api-gateway/src/server.js</span>
<span class="code-keyword">const</span> express = <span class="code-fn">require</span>(<span class="code-str">'express'</span>);
<span class="code-keyword">const</span> { createProxyMiddleware } = <span class="code-fn">require</span>(<span class="code-str">'http-proxy-middleware'</span>);
<span class="code-keyword">const</span> { verifyJwtToken } = <span class="code-fn">require</span>(<span class="code-str">'./middleware/auth'</span>);

<span class="code-keyword">const</span> app = <span class="code-fn">express</span>();
<span class="code-keyword">const</span> PORT = process.env.PORT || <span class="code-num">8000</span>;

<span class="code-comment">// Unified reverse proxy routing to FastAPI microservice</span>
app.<span class="code-fn">use</span>(
  <span class="code-str">'/api/v1/shipments'</span>,
  verifyJwtToken,
  <span class="code-fn">createProxyMiddleware</span>({
    target: process.env.LOGISTICS_SERVICE_URL || <span class="code-str">'http://localhost:8001'</span>,
    changeOrigin: <span class="code-keyword">true</span>,
  })
);

app.<span class="code-fn">listen</span>(PORT, () =&gt; {
  console.<span class="code-fn">log</span>(<span class="code-str">\`[Gateway] API Gateway listening on port \${PORT}\`</span>);
});`
    },
    'LiveTracker.jsx': {
      tabName: 'LiveTracker.jsx',
      lang: 'React.js (JSX)',
      path: 'frontend-react/src/components/LiveTracker.jsx',
      code: `<span class="code-comment">// frontend-react/src/components/LiveTracker.jsx</span>
<span class="code-keyword">import</span> React, { useState, useEffect } <span class="code-keyword">from</span> <span class="code-str">'react'</span>;
<span class="code-keyword">import</span> { fetchShipmentStatus } <span class="code-keyword">from</span> <span class="code-str">'../services/api'</span>;

<span class="code-keyword">export function</span> <span class="code-fn">LiveTracker</span>({ awbCode }) {
  <span class="code-keyword">const</span> [shipment, setShipment] = <span class="code-fn">useState</span>(<span class="code-keyword">null</span>);
  <span class="code-keyword">const</span> [loading, setLoading] = <span class="code-fn">useState</span>(<span class="code-keyword">true</span>);

  <span class="code-fn">useEffect</span>(() =&gt; {
    <span class="code-keyword">async function</span> <span class="code-fn">loadStatus</span>() {
      <span class="code-keyword">try</span> {
        <span class="code-keyword">const</span> data = <span class="code-keyword">await</span> <span class="code-fn">fetchShipmentStatus</span>(awbCode);
        <span class="code-fn">setShipment</span>(data);
      } <span class="code-keyword">finally</span> {
        <span class="code-fn">setLoading</span>(<span class="code-keyword">false</span>);
      }
    }
    <span class="code-fn">loadStatus</span>();
  }, [awbCode]);

  <span class="code-keyword">if</span> (loading) <span class="code-keyword">return</span> &lt;<span class="code-fn">div</span> className=<span class="code-str">"loader"</span>&gt;Fetching live status...&lt;/<span class="code-fn">div</span>&gt;;

  <span class="code-keyword">return</span> (
    &lt;<span class="code-fn">div</span> className=<span class="code-str">"tracking-card"</span>&gt;
      &lt;<span class="code-fn">h4</span>&gt;AWB: {shipment.awb_code}&lt;/<span class="code-fn">h4</span>&gt;
      &lt;<span class="code-fn">span</span> className=<span class="code-str">"badge"</span>&gt;{shipment.current_status}&lt;/<span class="code-fn">span</span>&gt;
      &lt;<span class="code-fn">p</span>&gt;Carrier: {shipment.carrier_name}&lt;/<span class="code-fn">p</span>&gt;
    &lt;/<span class="code-fn">div</span>&gt;
  );
}`
    },
    'docker-compose.yml': {
      tabName: 'docker-compose.yml',
      lang: 'YAML / Docker',
      path: 'infrastructure/docker-compose.yml',
      code: `<span class="code-comment"># infrastructure/docker-compose.yml</span>
<span class="code-keyword">version</span>: <span class="code-str">'3.8'</span>

<span class="code-keyword">services</span>:
  <span class="code-fn">api-gateway</span>:
    <span class="code-keyword">build</span>: ./services/api-gateway
    <span class="code-keyword">ports</span>:
      - <span class="code-str">"8000:8000"</span>
    <span class="code-keyword">environment</span>:
      - PORT=8000
      - LOGISTICS_SERVICE_URL=http://fastapi-core:8001

  <span class="code-fn">fastapi-core</span>:
    <span class="code-keyword">build</span>: ./services/logistics-fastapi
    <span class="code-keyword">ports</span>:
      - <span class="code-str">"8001:8001"</span>
    <span class="code-keyword">depends_on</span>:
      - postgres
      - rabbitmq

  <span class="code-fn">rabbitmq</span>:
    <span class="code-keyword">image</span>: rabbitmq:3-management-alpine
    <span class="code-keyword">ports</span>:
      - <span class="code-str">"5672:5672"</span>
      - <span class="code-str">"15672:15672"</span>

  <span class="code-fn">postgres</span>:
    <span class="code-keyword">image</span>: postgres:15-alpine
    <span class="code-keyword">volumes</span>:
      - pgdata:/var/lib/postgresql/data

<span class="code-keyword">volumes</span>:
  <span class="code-fn">pgdata</span>:`
    }
  };

  const ideCodeDisplay = document.getElementById('ideCodeDisplay');
  const ideFilePath = document.getElementById('ideFilePath');
  const ideLangTag = document.getElementById('ideLangTag');
  const ideTabsContainer = document.getElementById('ideTabsContainer');
  const treeFiles = document.querySelectorAll('.tree-file');

  function openFile(fileName) {
    const fileData = codeFiles[fileName];
    if (!fileData) return;

    // Update code & headers
    if (ideCodeDisplay) ideCodeDisplay.innerHTML = `<pre>${fileData.code}</pre>`;
    if (ideFilePath) ideFilePath.textContent = fileData.path;
    if (ideLangTag) ideLangTag.textContent = fileData.lang;

    // Update active tree item
    treeFiles.forEach(tf => {
      if (tf.getAttribute('data-file') === fileName) {
        tf.classList.add('active-file');
      } else {
        tf.classList.remove('active-file');
      }
    });

    // Update active tab
    const tabs = document.querySelectorAll('.ide-tab');
    tabs.forEach(tab => {
      if (tab.getAttribute('data-file') === fileName) {
        tab.classList.add('active-tab');
      } else {
        tab.classList.remove('active-tab');
      }
    });
  }

  treeFiles.forEach(item => {
    item.addEventListener('click', () => {
      const fileName = item.getAttribute('data-file');
      openFile(fileName);
    });
  });

  if (ideTabsContainer) {
    ideTabsContainer.addEventListener('click', (e) => {
      const tab = e.target.closest('.ide-tab');
      if (tab) {
        const fileName = tab.getAttribute('data-file');
        openFile(fileName);
      }
    });
  }

  // Load default file
  openFile('shipments.py');

});

