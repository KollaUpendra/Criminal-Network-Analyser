import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  ShieldAlert, 
  ArrowRight, 
  Activity, 
  Target, 
  Network, 
  Globe2, 
  Zap, 
  Search, 
  Eye, 
  Layers, 
  Cpu, 
  Sliders, 
  Lock,
  MessageSquare,
  Crosshair,
  Edit3,
  Type
} from 'lucide-react';

export default function FrontPage() {
  const [mounted, setMounted] = useState(false);
  const [activeFeature, setActiveFeature] = useState<'entity' | 'flow' | 'anomaly' | 'forensics'>('entity');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Background Interactive Tactical Node Network Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create tactical graph nodes
    const nodeCount = Math.floor(Math.min(width, height) / 18);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
      label?: string;
      isThreat?: boolean;
    }> = [];

    const colors = ['#00E5FF', '#00F0FF', '#3B82F6', '#FF3B30', '#64748B'];

    for (let i = 0; i < nodeCount; i++) {
      const isThreat = i % 11 === 0;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: isThreat ? 4.5 : Math.random() * 2.5 + 1.5,
        color: isThreat ? '#FF3B30' : colors[Math.floor(Math.random() * (colors.length - 1))],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        isThreat
      });
    }

    // Signal pulses along edges
    const signals: Array<{
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
      color: string;
    }> = [];

    for (let s = 0; s < 12; s++) {
      const fromIdx = Math.floor(Math.random() * nodes.length);
      let toIdx = Math.floor(Math.random() * nodes.length);
      while (toIdx === fromIdx) toIdx = Math.floor(Math.random() * nodes.length);
      signals.push({
        fromIdx,
        toIdx,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.01,
        color: nodes[fromIdx].isThreat ? '#FF3B30' : '#00E5FF'
      });
    }

    let radarAngle = 0;

    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark background fill
      ctx.fillStyle = '#050811';
      ctx.fillRect(0, 0, width, height);

      // Radial dark mesh overlay
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, Math.max(width, height) / 1.2);
      gradient.addColorStop(0, 'rgba(10, 20, 40, 0.4)');
      gradient.addColorStop(1, 'rgba(5, 8, 17, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Tactical Radar Sweep on Right Side (matching mockup design)
      const radarCenterX = width * 0.78;
      const radarCenterY = height * 0.65;
      const radarRadius = Math.min(width, height) * 0.35;

      ctx.save();
      ctx.beginPath();
      ctx.arc(radarCenterX, radarCenterY, radarRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.07)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(radarCenterX, radarCenterY, radarRadius * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.04)';
      ctx.stroke();

      // Radar conic sweep
      radarAngle += 0.008;
      const sweepGradient = ctx.createConicGradient(radarAngle, radarCenterX, radarCenterY);
      sweepGradient.addColorStop(0, 'rgba(0, 229, 255, 0.12)');
      sweepGradient.addColorStop(0.15, 'rgba(0, 229, 255, 0.02)');
      sweepGradient.addColorStop(0.3, 'transparent');
      sweepGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = sweepGradient;
      ctx.beginPath();
      ctx.arc(radarCenterX, radarCenterY, radarRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw subtle grid crosslines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      // Update and draw node connections
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
        if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

        nodeA.pulse += nodeA.pulseSpeed;

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = nodeA.isThreat || nodeB.isThreat ? `rgba(255, 59, 48, ${alpha * 1.5})` : `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = nodeA.isThreat || nodeB.isThreat ? 1.2 : 0.8;
            ctx.stroke();
          }
        }
      }

      // Update and draw signal pulses along connections
      for (let s = 0; s < signals.length; s++) {
        const sig = signals[s];
        const nA = nodes[sig.fromIdx];
        const nB = nodes[sig.toIdx];
        sig.progress += sig.speed;
        if (sig.progress >= 1) {
          sig.progress = 0;
          sig.fromIdx = Math.floor(Math.random() * nodes.length);
          sig.toIdx = Math.floor(Math.random() * nodes.length);
        }

        const sx = nA.x + (nB.x - nA.x) * sig.progress;
        const sy = nA.y + (nB.y - nA.y) * sig.progress;

        ctx.beginPath();
        ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        ctx.fillStyle = sig.color;
        ctx.shadowColor = sig.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const currentRadius = n.radius + Math.sin(n.pulse) * 0.6;

        // Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = n.isThreat ? 'rgba(255, 59, 48, 0.15)' : 'rgba(0, 229, 255, 0.12)';
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = n.isThreat ? 12 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const featureDetails = {
    entity: {
      title: "AI-Powered Cross-FIR Entity Resolution",
      subtitle: "Resolves aliases, fake phone numbers, benami accounts, and physical addresses across hundreds of FIRs into single unified suspect master profiles.",
      metrics: ["99.4% Match Precision", "Indic Multilingual NLP", "Automatic Alias Linkage"],
      route: "/dashboard?tab=ingestion"
    },
    flow: {
      title: "Multi-Tiered Hawala & Money Flow Tracing",
      subtitle: "Maps dark money trails, shell company transfers, and micro-loan extortion pipelines with automatic flow velocity calculations.",
      metrics: ["Shell Entity Detection", "Bank Feed Ingestion", "Layer-by-Layer Tracing"],
      route: "/dashboard?tab=overview"
    },
    anomaly: {
      title: "Real-Time Anomaly & Threat Scoring Alerts",
      subtitle: "Flags abnormal transaction spikes, tower dump location correlations, and high-risk syndicate kingpin activities in real-time.",
      metrics: ["94/100 Threat Scoring", "Geofence Tower Dump", "Automated Watchlist Alerting"],
      route: "/dashboard?tab=overview"
    },
    forensics: {
      title: "Deep Topological Graph Forensics Engine",
      subtitle: "Interactive Cytoscape & D3 topological graph traversal discovering hidden bridge nodes, centrality metrics, and step-by-step evidence chains.",
      metrics: ["Sub-250ms Traversal", "Court Evidence Chains", "Interactive Canvas Control"],
      route: "/dashboard?tab=graph"
    }
  };

  return (
    <>
      <Head>
        <title>SENTINEL / Network Analysis & Criminal Intelligence Platform</title>
        <meta name="description" content="Sentinel maps hidden networks across persons, accounts, and movements — surfacing the links no analyst would catch by hand." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div suppressHydrationWarning style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#050811',
        color: '#F8FAFC',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* HTML5 Dynamic Canvas Background */}
        <canvas 
          ref={canvasRef} 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* ────────── HEADER ────────── */}
        <header style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.75rem 2.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Logo & Subtitle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ position: 'relative', display: 'flex', width: '10px', height: '10px' }}>
              <span style={{
                position: 'absolute',
                display: 'inline-flex',
                height: '100%',
                width: '100%',
                borderRadius: '50%',
                backgroundColor: '#FF3B30',
                opacity: 0.75,
                animation: 'cctv-rec-blink 1.2s infinite'
              }} />
              <span style={{
                position: 'relative',
                display: 'inline-flex',
                borderRadius: '50%',
                height: '10px',
                width: '10px',
                backgroundColor: '#FF3B30'
              }} />
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ 
                fontSize: '1.15rem', 
                fontWeight: 800, 
                letterSpacing: '2px', 
                color: '#FFFFFF',
                textTransform: 'uppercase'
              }}>
                SENTINEL
              </span>
              <span style={{ 
                fontSize: '0.8rem', 
                color: 'rgba(255, 255, 255, 0.35)', 
                letterSpacing: '1.5px', 
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 500
              }}>
                / NETWORK ANALYSIS
              </span>
            </div>
          </div>

          {/* Right Header Navigation Link */}
          <Link 
            href="/dashboard" 
            style={{
              fontSize: '0.85rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              letterSpacing: '1px',
              color: 'rgba(255, 255, 255, 0.75)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'color 0.2s ease, transform 0.2s ease',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backgroundColor: 'rgba(255, 255, 255, 0.03)'
            }}
            className="hover:text-cyan-400"
          >
            OPEN CONSOLE <ArrowRight size={14} color="#00E5FF" />
          </Link>
        </header>

        {/* ────────── MAIN HERO CONTENT ────────── */}
        <main style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '3rem 1.5rem 2rem 1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          flex: 1
        }}>
          {/* Status Badge Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.4rem 1rem',
            borderRadius: '100px',
            backgroundColor: 'rgba(0, 229, 255, 0.05)',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.1)',
            marginBottom: '2.25rem'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#00E5FF',
              boxShadow: '0 0 8px #00E5FF'
            }} />
            <span style={{
              fontSize: '0.75rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              letterSpacing: '2px',
              color: '#00E5FF',
              textTransform: 'uppercase'
            }}>
              LIVE ANALYSIS · 12,408 NODES INDEXED
            </span>
          </div>

          {/* Main Headline (Exact Copy of Mockup Image) */}
          <h1 style={{
            fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-1.5px',
            color: '#FFFFFF',
            marginBottom: '1.75rem',
            maxWidth: '960px'
          }}>
            Every connection <br />
            leaves a <span style={{
              color: '#FF3B30',
              textShadow: '0 0 30px rgba(255, 59, 48, 0.45)',
              display: 'inline-block'
            }}>trace.</span>
          </h1>

          {/* Paragraph Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem, 1.35vw, 1.2rem)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '680px',
            margin: '0 auto 2.75rem auto',
            fontWeight: 400
          }}>
            Sentinel maps hidden networks across persons, accounts, and movements — surfacing the links no analyst would catch by hand. One graph. No dead ends.
          </p>

          {/* Call-to-Action & Metadata Metric */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.75rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem'
          }}>
            <Link 
              href="/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: '#00E5FF',
                color: '#050811',
                fontWeight: 800,
                fontSize: '0.95rem',
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '1px',
                padding: '1.1rem 2.25rem',
                borderRadius: '100px',
                textDecoration: 'none',
                boxShadow: '0 0 35px rgba(0, 229, 255, 0.45)',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 50px rgba(0, 229, 255, 0.65)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 229, 255, 0.45)';
              }}
            >
              ENTER COMMAND CENTER →
            </Link>

            <span style={{
              fontSize: '0.78rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
              letterSpacing: '1.5px',
              color: 'rgba(255, 255, 255, 0.4)',
              textTransform: 'uppercase'
            }}>
              1,204 CASES MAPPED THIS QUARTER
            </span>
          </div>

          {/* Interactive Feature Pills Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            maxWidth: '900px',
            margin: '0 auto 1.5rem auto'
          }}>
            {[
              { id: 'entity', label: 'ENTITY RESOLUTION' },
              { id: 'flow', label: 'FLOW TRACING' },
              { id: 'anomaly', label: 'ANOMALY ALERTS' },
              { id: 'forensics', label: 'GRAPH FORENSICS' }
            ].map(f => {
              const isActive = activeFeature === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFeature(f.id as any)}
                  style={{
                    backgroundColor: isActive ? 'rgba(0, 229, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: isActive ? '1px solid rgba(0, 229, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isActive ? '#00E5FF' : 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.75rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    letterSpacing: '1.5px',
                    padding: '0.65rem 1.35rem',
                    borderRadius: '100px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 0 15px rgba(0, 229, 255, 0.15)' : 'none'
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Interactive Feature Highlight Detail Panel */}
          <div style={{
            width: '100%',
            maxWidth: '780px',
            backgroundColor: 'rgba(11, 16, 30, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 229, 255, 0.18)',
            borderRadius: '16px',
            padding: '1.5rem 1.75rem',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00E5FF' }} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {featureDetails[activeFeature].title}
                </h3>
              </div>

              <Link href={featureDetails[activeFeature].route} style={{
                fontSize: '0.75rem',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                color: '#00E5FF',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                Launch in Console →
              </Link>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.5 }}>
              {featureDetails[activeFeature].subtitle}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '0.25rem' }}>
              {featureDetails[activeFeature].metrics.map((m, idx) => (
                <span key={idx} style={{
                  fontSize: '0.72rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  ✓ {m}
                </span>
              ))}
            </div>
          </div>
        </main>

        {/* ────────── BOTTOM LIVE TICKER RIBBON (Matches User Image) ────────── */}
        <footer style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          backgroundColor: 'rgba(5, 8, 17, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.85rem 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.72rem',
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '1.5px',
          color: 'rgba(255, 255, 255, 0.45)',
          textTransform: 'uppercase'
        }}>
          {/* Left Ticker Status Items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#00E5FF' }}>◆</span>
              <span>MOVEMENT CORRELATION RESOLVED</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#00E5FF' }}>◆</span>
              <span>CONFIRMATION REFINED v2.4.1</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#00E5FF' }}>◆</span>
              <span>WATCHLIST SYNC COMPLETE — 442 SUBJECTS</span>
            </div>
          </div>

          {/* Tactical Floating Toolbar Icons (Matching Image Bottom Center Controls) */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '0.35rem 0.85rem',
            borderRadius: '100px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
          }}>
            <span title="Targeting Crosshair"><Crosshair size={14} color="#00E5FF" style={{ cursor: 'pointer' }} /></span>
            <span title="Text Annotations"><Type size={14} color="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }} /></span>
            <span title="Draw Graph Links"><Edit3 size={14} color="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }} /></span>
            <span title="Intelligence Log"><MessageSquare size={14} color="rgba(255, 255, 255, 0.7)" style={{ cursor: 'pointer' }} /></span>
          </div>

          {/* Right Status Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
            <span>SYSTEM ONLINE · 100% OPERATIONAL</span>
          </div>
        </footer>
      </div>
    </>
  );
}
