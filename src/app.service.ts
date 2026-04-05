import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Blue Green ELB</title>
  <style>
    :root {
      --bg-1: #050816;
      --bg-2: #0b1023;
      --bg-3: #161b33;
      --text: #f8fafc;
      --muted: #cbd5e1;
      --line: rgba(255, 255, 255, 0.12);
      --glass: rgba(255, 255, 255, 0.08);
      --glass-strong: rgba(255, 255, 255, 0.12);
      --accent-1: #60a5fa;
      --accent-2: #22d3ee;
      --accent-3: #a78bfa;
      --success: #22c55e;
      --warning: #f59e0b;
      --shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
      --mx: 50vw;
      --my: 50vh;
    }

    * {
      box-sizing: border-box;
    }

    html, body {
      width: 100%;
      min-height: 100%;
      margin: 0;
      padding: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at var(--mx) var(--my), rgba(96, 165, 250, 0.16), transparent 22%),
        radial-gradient(circle at 15% 20%, rgba(34, 211, 238, 0.15), transparent 20%),
        radial-gradient(circle at 80% 30%, rgba(167, 139, 250, 0.16), transparent 20%),
        linear-gradient(135deg, var(--bg-1), var(--bg-2) 50%, var(--bg-3));
      overflow: hidden;
    }

    body::before,
    body::after {
      content: '';
      position: fixed;
      inset: auto;
      border-radius: 999px;
      filter: blur(70px);
      opacity: 0.45;
      pointer-events: none;
      z-index: 0;
      animation: drift 14s ease-in-out infinite;
    }

    body::before {
      width: 360px;
      height: 360px;
      top: -80px;
      left: -100px;
      background: linear-gradient(135deg, rgba(96, 165, 250, 0.5), rgba(34, 211, 238, 0.15));
    }

    body::after {
      width: 420px;
      height: 420px;
      right: -120px;
      bottom: -120px;
      background: linear-gradient(135deg, rgba(167, 139, 250, 0.45), rgba(96, 165, 250, 0.1));
      animation-delay: -6s;
    }

    .grid {
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      background-size: 36px 36px;
      mask-image: radial-gradient(circle at center, black 35%, transparent 85%);
      opacity: 0.18;
      pointer-events: none;
      z-index: 0;
    }

    .particles {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    }

    .particle {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.65);
      box-shadow: 0 0 18px rgba(255, 255, 255, 0.55);
      animation: floatUp linear infinite;
      opacity: 0.7;
    }

    .scene {
      position: relative;
      z-index: 2;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
      perspective: 1600px;
    }

    .halo {
      position: absolute;
      width: 760px;
      height: 760px;
      border-radius: 50%;
      background:
        radial-gradient(circle, rgba(96, 165, 250, 0.18), transparent 42%),
        radial-gradient(circle at 65% 35%, rgba(34, 211, 238, 0.15), transparent 28%),
        radial-gradient(circle at 35% 65%, rgba(167, 139, 250, 0.15), transparent 28%);
      filter: blur(18px);
      transform: translateZ(-200px);
      animation: pulse 7s ease-in-out infinite;
      pointer-events: none;
    }

    .card {
      position: relative;
      width: min(1080px, 100%);
      border: 1px solid var(--line);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.05));
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-radius: 28px;
      box-shadow: var(--shadow);
      overflow: hidden;
      transform-style: preserve-3d;
      transition: transform 160ms ease, box-shadow 160ms ease;
      animation: floatCard 6s ease-in-out infinite;
    }

    .card::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.14), transparent 30%, transparent 70%, rgba(255, 255, 255, 0.08));
      pointer-events: none;
    }

    .card::after {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: 28px;
      padding: 1px;
      background: linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05), rgba(96,165,250,0.35));
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 18px 22px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.03);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 700;
      letter-spacing: 0.04em;
    }

    .brand-mark {
      width: 40px;
      height: 40px;
      border-radius: 14px;
      background:
        linear-gradient(135deg, rgba(96, 165, 250, 0.95), rgba(34, 211, 238, 0.95) 50%, rgba(167, 139, 250, 0.95));
      display: grid;
      place-items: center;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        0 12px 30px rgba(96, 165, 250, 0.28);
      transform: translateZ(30px);
    }

    .brand-mark span {
      font-size: 14px;
      font-weight: 900;
      color: #ffffff;
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #e2e8f0;
      font-size: 13px;
    }

    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--success);
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
      animation: blink 2s infinite;
    }

    .content {
      display: grid;
      grid-template-columns: 1.25fr 0.95fr;
      gap: 24px;
      padding: 28px;
    }

    .hero {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 18px;
      transform: translateZ(60px);
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      width: fit-content;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255,255,255,0.08);
      color: #dbeafe;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .eyebrow-line {
      width: 18px;
      height: 2px;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--accent-1), var(--accent-2), var(--accent-3));
    }

    h1 {
      margin: 0;
      font-size: clamp(40px, 6vw, 78px);
      line-height: 0.95;
      letter-spacing: -0.04em;
    }

    .gradient-text {
      background: linear-gradient(90deg, #ffffff 0%, #c4b5fd 30%, #67e8f9 65%, #93c5fd 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      display: inline-block;
      filter: drop-shadow(0 8px 28px rgba(147, 197, 253, 0.18));
    }

    .subtitle {
      margin: 0;
      color: var(--muted);
      font-size: 18px;
      line-height: 1.7;
      max-width: 700px;
    }

    .message {
      margin-top: 8px;
      padding: 18px 20px;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.08);
      background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04));
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
      font-size: 16px;
      color: #f8fafc;
    }

    .message strong {
      color: #7dd3fc;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-top: 10px;
    }

    .btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-width: 170px;
      padding: 15px 20px;
      border-radius: 16px;
      text-decoration: none;
      font-weight: 700;
      font-size: 15px;
      transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
      overflow: hidden;
      border: 1px solid transparent;
    }

    .btn:hover {
      transform: translateY(-2px);
    }

    .btn-primary {
      color: #08111f;
      background: linear-gradient(135deg, #ffffff, #c4b5fd, #67e8f9);
      box-shadow: 0 16px 35px rgba(103, 232, 249, 0.18);
    }

    .btn-secondary {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255,255,255,0.12);
      backdrop-filter: blur(14px);
    }

    .panel-wrap {
      display: grid;
      gap: 16px;
      transform: translateZ(40px);
    }

    .panel {
      border-radius: 22px;
      padding: 18px;
      border: 1px solid rgba(255,255,255,0.08);
      background: linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04));
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
    }

    .panel-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
      color: #f8fafc;
      font-weight: 700;
    }

    .mini-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .mini-card {
      border-radius: 18px;
      padding: 14px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
    }

    .mini-label {
      font-size: 12px;
      color: #cbd5e1;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .mini-value {
      margin-top: 8px;
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
    }

    .bar {
      margin-top: 12px;
      width: 100%;
      height: 10px;
      border-radius: 999px;
      background: rgba(255,255,255,0.08);
      overflow: hidden;
    }

    .bar > span {
      display: block;
      width: 86%;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--accent-1), var(--accent-2), var(--accent-3));
      animation: loadBar 3s ease-in-out infinite;
    }

    .footer {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 14px;
      padding: 0 28px 24px;
      color: #cbd5e1;
      font-size: 14px;
    }

    .footer strong {
      color: #ffffff;
    }

    .clock {
      font-variant-numeric: tabular-nums;
      font-weight: 700;
      color: #e2e8f0;
    }

    @keyframes floatCard {
      0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
      50% { transform: translateY(-8px) rotateX(1deg) rotateY(-1deg); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.75; }
      50% { transform: scale(1.05); opacity: 1; }
    }

    @keyframes drift {
      0%, 100% { transform: translate3d(0, 0, 0); }
      50% { transform: translate3d(24px, 18px, 0); }
    }

    @keyframes blink {
      0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
      70% { box-shadow: 0 0 0 12px rgba(34, 197, 94, 0); }
      100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
    }

    @keyframes floatUp {
      from {
        transform: translateY(110vh) scale(0.8);
        opacity: 0;
      }
      10% {
        opacity: 0.75;
      }
      to {
        transform: translateY(-15vh) scale(1.15);
        opacity: 0;
      }
    }

    @keyframes loadBar {
      0%, 100% { width: 78%; }
      50% { width: 92%; }
    }

    @media (max-width: 900px) {
      .content {
        grid-template-columns: 1fr;
      }

      h1 {
        font-size: clamp(34px, 12vw, 58px);
      }

      .subtitle {
        font-size: 16px;
      }

      .footer {
        padding-bottom: 22px;
      }
    }

    @media (max-width: 520px) {
      .topbar,
      .content,
      .footer {
        padding-left: 16px;
        padding-right: 16px;
      }

      .mini-grid {
        grid-template-columns: 1fr;
      }

      .btn {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="grid"></div>
  <div class="particles" id="particles"></div>

  <main class="scene">
    <div class="halo"></div>

    <section class="card" id="tiltCard">
      <div class="topbar">
        <div class="brand">
          <div class="brand-mark"><span>BG</span></div>
          <div>BLUE • GREEN • ELB</div>
        </div>

        <div class="status">
          <span class="status-dot"></span>
          Live deployment healthy
        </div>
      </div>

      <div class="content">
        <div class="hero">
          <div class="eyebrow">
            <span class="eyebrow-line"></span>
            premium deployment experience
          </div>

          <h1>
            <span class="gradient-text">Hello World!</span><br />
            Reimagined.
          </h1>

          <p class="subtitle">
            A premium, cinematic, high-end landing view generated directly from your NestJS service.
            Smooth motion, layered glassmorphism, live status feel, and polished enterprise presentation.
          </p>

          <div class="message">
            <strong>Message:</strong> HELLO from blue-green-elb
          </div>

          <div class="actions">
            <a href="#" class="btn btn-primary">Launch Experience</a>
            <a href="#" class="btn btn-secondary">View Deployment Status</a>
          </div>
        </div>

        <div class="panel-wrap">
          <div class="panel">
            <div class="panel-title">
              <span>Runtime Highlights</span>
              <span>v1.0</span>
            </div>

            <div class="mini-grid">
              <div class="mini-card">
                <div class="mini-label">Environment</div>
                <div class="mini-value">Production</div>
              </div>

              <div class="mini-card">
                <div class="mini-label">Strategy</div>
                <div class="mini-value">Blue / Green</div>
              </div>

              <div class="mini-card">
                <div class="mini-label">Balancer</div>
                <div class="mini-value">ELB</div>
              </div>

              <div class="mini-card">
                <div class="mini-label">Health</div>
                <div class="mini-value">Excellent</div>
              </div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-title">
              <span>Traffic Confidence</span>
              <span>86%</span>
            </div>
            <div class="bar"><span></span></div>
          </div>

          <div class="panel">
            <div class="panel-title">
              <span>Live System Clock</span>
              <span class="clock" id="clock">--:--:--</span>
            </div>
            <div style="color:#cbd5e1; line-height:1.7;">
              This page is rendered directly from <strong>app.service.ts</strong> with no extra frontend dependency.
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div>Powered by <strong>NestJS</strong> • Premium motion UI • Glassmorphism • 3D tilt</div>
        <div>© <span id="year"></span> Blue Green ELB Experience</div>
      </div>
    </section>
  </main>

  <script>
    (function () {
      var root = document.documentElement;
      var card = document.getElementById('tiltCard');
      var particles = document.getElementById('particles');
      var clock = document.getElementById('clock');
      var year = document.getElementById('year');

      if (year) {
        year.textContent = String(new Date().getFullYear());
      }

      function updateClock() {
        var now = new Date();
        var hh = String(now.getHours()).padStart(2, '0');
        var mm = String(now.getMinutes()).padStart(2, '0');
        var ss = String(now.getSeconds()).padStart(2, '0');
        if (clock) {
          clock.textContent = hh + ':' + mm + ':' + ss;
        }
      }

      updateClock();
      setInterval(updateClock, 1000);

      function handleMove(event) {
        var x = event.clientX;
        var y = event.clientY;

        root.style.setProperty('--mx', x + 'px');
        root.style.setProperty('--my', y + 'px');

        if (!card) {
          return;
        }

        var rect = card.getBoundingClientRect();
        var px = (x - rect.left) / rect.width;
        var py = (y - rect.top) / rect.height;

        var rotateY = (px - 0.5) * 12;
        var rotateX = (0.5 - py) * 12;

        card.style.transform =
          'rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-4px)';
      }

      function resetTilt() {
        if (card) {
          card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
        }
      }

      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseleave', resetTilt);

      function createParticle() {
        if (!particles) {
          return;
        }

        var p = document.createElement('span');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDuration = 8 + Math.random() * 10 + 's';
        p.style.animationDelay = Math.random() * 6 + 's';
        p.style.opacity = String(0.2 + Math.random() * 0.7);
        p.style.transform = 'scale(' + (0.7 + Math.random() * 1.4).toFixed(2) + ')';

        particles.appendChild(p);

        setTimeout(function () {
          if (p.parentNode) {
            p.parentNode.removeChild(p);
          }
        }, 18000);
      }

      for (var i = 0; i < 28; i++) {
        createParticle();
      }

      setInterval(createParticle, 650);
    })();
  </script>
</body>
</html>
    `;
  }
}