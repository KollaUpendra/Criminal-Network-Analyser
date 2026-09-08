import React, { useState, useRef } from 'react';
import { Building2, User, Share2, ShieldAlert, FileText, Phone, Eye, Calendar, CheckCircle, Move, Zap, Crosshair, Radio, ShieldCheck, ArrowRight, HelpCircle, CreditCard } from 'lucide-react';


interface NodeData {
  id: string;
  label: string;
  type: string; // VICTIM, ACCUSED, PHONE, LOCATION, VEHICLE, ORGANIZATION, BANK_ACCOUNT
  x: number;
  y: number;
  source_file?: string;
  source_category?: string;
  date?: string;
  is_shell?: boolean;
  reason?: string;
  attributes?: Record<string, any>;
}

interface Props {
  theme?: 'dark' | 'light';
  currentTarget?: any;
}

export default function NetworkGraphView({ theme = 'dark', currentTarget }: Props) {
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);

  const victimName = currentTarget?.known_victim || 'K. Ramu (Loss: ₹45,00,000)';
  const accusedName = currentTarget?.discovered_accused || 'Arjun Reddy';
  const riskScore = currentTarget?.risk_score || 94;
  const firNum = currentTarget?.fir_number || 'FIR-2026-001';

  // Draggable Nodes representing Victim -> Evidence Chain -> Discovered Accused
  const [nodes, setNodes] = useState<NodeData[]>([
    { 
      id: 'VICTIM-Node', 
      label: `Victim: ${victimName}`, 
      type: 'VICTIM', 
      x: 10, 
      y: 40, 
      source_file: currentTarget?.evidence_chain?.[0]?.source || 'fir/fir_001.txt', 
      source_category: 'FIR Documents (Known Victim)', 
      date: '2026-08-10', 
      reason: `Known victim listed in ${firNum} who reported loss.`,
      attributes: { "role": "Victim / Complainant", "fir_number": firNum } 
    },
    { 
      id: 'ACC-8801', 
      label: 'Extortion Account ACC-8801', 
      type: 'BANK_ACCOUNT', 
      x: 28, 
      y: 65, 
      source_file: 'financial_transactions.xlsx', 
      source_category: 'Financial Statements', 
      date: '2026-08-10',
      reason: 'Extortion money transferred to this benami bank account.'
    },
    { 
      id: 'ORG-ApexLogisticsPvtLtd', 
      label: 'Apex Logistics (Shell Co)', 
      type: 'ORGANIZATION', 
      x: 46, 
      y: 25, 
      is_shell: true, 
      source_file: 'financial_transactions.xlsx & registry_records.xlsx', 
      source_category: 'Financial & Registry Records', 
      date: '2026-08-10',
      reason: 'Funds routed via circular Hawala transfer to front shell company.'
    },
    { 
      id: 'TEL-9876543210', 
      label: 'Wiretap Phone 9876543210', 
      type: 'PHONE', 
      x: 64, 
      y: 65, 
      source_file: 'cdr_records.xlsx', 
      source_category: 'Call Detail Records (CDRs)', 
      date: '2026-08-14',
      reason: 'Calls logged between shell director & Jeedimetla warehouse tower.'
    },
    { 
      id: 'ACCUSED-Node', 
      label: `Accused: ${accusedName}`, 
      type: 'ACCUSED', 
      x: 82, 
      y: 35, 
      source_file: 'registry_records.xlsx & criminal_history.xlsx', 
      source_category: 'AI Graph Discovered Accused', 
      date: '2026-08-10',
      reason: `AI Graph Discovery: ${currentTarget?.connection_reason || 'Identified as director of front company receiving hawala circular flow.'}`,
      attributes: { "role": "Discovered Accused Kingpin", "alias": currentTarget?.alias || "Rider / Don", "risk_score": `${riskScore}/100` } 
    }
  ]);

  React.useEffect(() => {
    if (currentTarget) {
      const primaryAccused = currentTarget.discovered_accused || 'Arjun Reddy';
      const coAccusedList: string[] = currentTarget.co_accused || ['Suresh Reddy', 'Ravi Kumar'];

      const initialNodes: NodeData[] = [
        { 
          id: 'VICTIM-Node', 
          label: `Victim: ${currentTarget.known_victim}`, 
          type: 'VICTIM', 
          x: 8, 
          y: 40, 
          source_file: currentTarget.evidence_chain?.[0]?.source || 'fir_file.txt', 
          source_category: 'FIR Documents (Known Victim)', 
          date: '2026-08-10', 
          reason: `Known victim listed in ${currentTarget.fir_number} who reported loss.`,
          attributes: { "role": "Victim / Complainant", "fir_number": currentTarget.fir_number } 
        },
        { 
          id: 'ACC-8801', 
          label: 'Extortion Account ACC-8801', 
          type: 'BANK_ACCOUNT', 
          x: 25, 
          y: 65, 
          source_file: 'financial_transactions.xlsx', 
          source_category: 'Financial Statements', 
          date: '2026-08-10',
          reason: 'Extortion money transferred to this benami bank account.'
        },
        { 
          id: 'ORG-ApexLogisticsPvtLtd', 
          label: 'Apex Logistics (Shell Co)', 
          type: 'ORGANIZATION', 
          x: 42, 
          y: 25, 
          is_shell: true, 
          source_file: 'financial_transactions.xlsx & registry_records.xlsx', 
          source_category: 'Financial & Registry Records', 
          date: '2026-08-10',
          reason: 'Funds routed via circular Hawala transfer to front shell company.'
        },
        { 
          id: 'TEL-9876543210', 
          label: 'Wiretap Phone 9876543210', 
          type: 'PHONE', 
          x: 58, 
          y: 65, 
          source_file: 'cdr_records.xlsx', 
          source_category: 'Call Detail Records (CDRs)', 
          date: '2026-08-14',
          reason: 'Calls logged between shell director & Jeedimetla warehouse tower.'
        },
        { 
          id: 'ACCUSED-Node', 
          label: `Primary Accused: ${primaryAccused}`, 
          type: 'ACCUSED', 
          x: 75, 
          y: 35, 
          source_file: 'registry_records.xlsx & criminal_history.xlsx', 
          source_category: 'AI Graph Primary Accused (Kingpin)', 
          date: '2026-08-10',
          reason: `AI Graph Discovery: ${currentTarget.connection_reason}`,
          attributes: { "role": "Syndicate Kingpin", "alias": currentTarget.alias, "risk_score": `${currentTarget.risk_score}/100` } 
        }
      ];

      // Dynamically add Co-Accused Nodes if present
      coAccusedList.forEach((coName, idx) => {
        initialNodes.push({
          id: `CO-ACCUSED-${idx}`,
          label: `Co-Accused: ${coName}`,
          type: 'ACCUSED',
          x: 88,
          y: 20 + (idx * 45),
          source_file: 'criminal_history.xlsx & surveillance_logs.xlsx',
          source_category: 'AI Discovered Co-Accused Associate',
          date: '2026-08-14',
          reason: `Syndicate accomplice linked to ${primaryAccused} in Hawala routing & physical surveillance logs.`,
          attributes: { "role": "Co-Accused Syndicate Associate", "syndicate_link": primaryAccused, "risk_score": `${Math.max(70, currentTarget.risk_score - 8 - idx * 4)}/100` }
        });
      });

      setNodes(initialNodes);
      setSelectedNodeId('ACCUSED-Node');
    }
  }, [currentTarget]);

  const [selectedNodeId, setSelectedNodeId] = useState<string>('ACCUSED-Node');
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);

  const edges = [
    { source: 'VICTIM-Node', target: 'ACC-8801', label: 'EXTORTED_FUNDS_TO', reason: 'Victim transferred money into benami account', confidence: 1.0 },
    { source: 'ACC-8801', target: 'ORG-ApexLogisticsPvtLtd', label: 'HAWALA_ROUTED_TO', reason: 'Circular transfer into shell company', confidence: 0.96 },
    { source: 'ORG-ApexLogisticsPvtLtd', target: 'TEL-9876543210', label: 'DIRECTOR_COMMUNICATION', reason: 'Shell director calls from Jeedimetla tower', confidence: 0.94 },
    { source: 'TEL-9876543210', target: 'ACCUSED-Node', label: 'OPERATED_BY_KINGPIN', reason: 'Phone registered and operated by Primary Accused', confidence: 0.98 },
    { source: 'ACCUSED-Node', target: 'CO-ACCUSED-0', label: 'SYNDICATE_CO_ACCUSED', reason: 'Co-accused identified in hawala routing & CCTV logs', confidence: 0.92 },
    { source: 'ORG-ApexLogisticsPvtLtd', target: 'CO-ACCUSED-1', label: 'BENAMI_DIRECTOR', reason: 'Co-accused listed as joint director of shell company', confidence: 0.89 }
  ];

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  // Mouse Drag Logic
  const handleMouseDown = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNodeId(nodeId);
    setDraggingNodeId(nodeId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingNodeId || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const xPx = e.clientX - rect.left;
    const yPx = e.clientY - rect.top;

    const xPct = Math.max(5, Math.min(92, (xPx / rect.width) * 100));
    const yPct = Math.max(10, Math.min(88, (yPx / rect.height) * 100));

    setNodes(prev => prev.map(n => n.id === draggingNodeId ? { ...n, x: xPct, y: yPct } : n));
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  return (
    <div 
      style={{ display: 'grid', gridTemplateColumns: '2.8fr 1.2fr', gap: '1.25rem', width: '100%', height: 'calc(100vh - 120px)', minHeight: '680px' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Tactical Graph Canvas */}
      <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Connection Reason Banner */}
        <div style={{ backgroundColor: 'var(--bg-card-hover)', border: '1px solid var(--accent-primary)', padding: '0.75rem 1.15rem', borderRadius: '10px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={22} color="var(--accent-success)" />
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-success)', textTransform: 'uppercase' }}>VICTIM-TO-ACCUSED DISCOVERY CHAIN</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600 }}>
                Victim: <strong style={{ color: 'var(--accent-success)' }}>{victimName}</strong> <ArrowRight size={14} style={{ display: 'inline', margin: '0 4px' }} /> AI Discovered Accused: <strong style={{ color: 'var(--accent-danger)' }}>{accusedName} (Score: {riskScore}/100)</strong>
              </p>
            </div>
          </div>
          <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-primary)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: 600 }}>Interactive Graph Workspace</span>
        </div>

        {/* Interactive Tactical Canvas Container */}
        <div 
          ref={containerRef}
          style={{
            width: '100%',
            flex: 1,
            minHeight: '540px',
            backgroundColor: 'var(--canvas-bg)',
            borderRadius: '10px',
            border: '1px border-dashed var(--border-color)',
            position: 'relative',
            userSelect: 'none',
            overflow: 'hidden'
          }}
        >
          {/* Tactical Radar Grid Sweep */}
          <div className="tactical-radar-grid" />

          {/* Dynamic SVG Connecting Edges */}
          <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
            {edges.map((edge, idx) => {
              const srcNode = nodes.find(n => n.id === edge.source);
              const tgtNode = nodes.find(n => n.id === edge.target);
              if (!srcNode || !tgtNode) return null;

              const strokeColor = idx === 0 ? "var(--accent-success)" : (idx === 1 ? "var(--accent-warning)" : "var(--accent-danger)");

              return (
                <g key={idx}>
                  <line 
                    x1={`${srcNode.x + 3}%`}
                    y1={`${srcNode.y + 5}%`}
                    x2={`${tgtNode.x + 3}%`}
                    y2={`${tgtNode.y + 5}%`}
                    stroke={strokeColor}
                    strokeWidth="3.5"
                    opacity="0.35"
                  />
                  <line 
                    className="hawala-money-flow"
                    x1={`${srcNode.x + 3}%`}
                    y1={`${srcNode.y + 5}%`}
                    x2={`${tgtNode.x + 3}%`}
                    y2={`${tgtNode.y + 5}%`}
                    stroke={strokeColor}
                    strokeWidth="3"
                  />
                </g>
              );
            })}
          </svg>

          {/* Render Nodes (Victim -> Evidence -> Accused) */}
          {nodes.map(node => {
            const isSelected = node.id === selectedNodeId;
            const isVictim = node.type === 'VICTIM';
            const isAccused = node.type === 'ACCUSED';

            return (
              <div 
                key={node.id}
                className="graph-node"
                onMouseDown={(e) => handleMouseDown(node.id, e)}
                style={{
                  position: 'absolute',
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  textAlign: 'center',
                  cursor: draggingNodeId === node.id ? 'grabbing' : 'grab',
                  zIndex: isSelected ? 10 : 2
                }}
              >
                {/* Tactical Target Crosshair on Accused */}
                {isAccused && <div className="target-crosshair-ring" />}

                <div 
                  className={isAccused ? "pulse-node-danger" : (isVictim ? "" : "wiretap-pulse")}
                  style={{
                    width: isAccused ? '64px' : (isVictim ? '56px' : '52px'),
                    height: isAccused ? '64px' : (isVictim ? '56px' : '52px'),
                    borderRadius: (isVictim || isAccused) ? '50%' : '12px',
                    backgroundColor: isVictim ? 'rgba(16, 185, 129, 0.2)' : (isAccused ? 'rgba(239, 68, 68, 0.25)' : 'var(--bg-card)'),
                    border: isVictim ? '3px solid var(--accent-success)' : (isAccused ? '3px solid var(--accent-danger)' : '2px solid var(--border-color)'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    boxShadow: isAccused ? '0 0 25px rgba(239, 68, 68, 0.7)' : (isVictim ? '0 0 15px rgba(16, 185, 129, 0.5)' : '0 4px 14px rgba(0,0,0,0.4)')
                  }}
                >
                  {isVictim && <ShieldCheck size={28} color="var(--accent-success)" />}
                  {isAccused && <User size={30} color="var(--accent-danger)" />}
                  {node.type === 'BANK_ACCOUNT' && <CreditCard size={22} color="var(--accent-warning)" />}
                  {node.type === 'ORGANIZATION' && <Building2 size={26} color="var(--accent-warning)" />}
                  {node.type === 'PHONE' && <Radio size={22} color="var(--accent-primary)" />}
                </div>

                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isVictim ? 'var(--accent-success)' : (isAccused ? 'var(--accent-danger)' : 'var(--text-main)'), marginTop: '0.35rem', display: 'block' }}>
                  {node.label}
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {isVictim ? '🛡️ FIR Known Victim' : (isAccused ? '🎯 AI Discovered Accused' : node.source_category)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Supporting Evidences & Possibility Panel */}
      <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
        <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HelpCircle size={18} color="var(--accent-cyan)" /> Supporting Evidences
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            AI link possibility & source file evidence
          </p>
        </div>

        {selectedNode ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Selected Node Profile */}
            <div style={{ backgroundColor: 'var(--bg-card-hover)', border: '1px solid var(--border-color)', padding: '0.85rem', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: selectedNode.type === 'VICTIM' ? 'var(--accent-success)' : (selectedNode.type === 'ACCUSED' ? 'var(--accent-danger)' : 'var(--accent-cyan)'), fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {selectedNode.type} NODE
                </span>
                <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                  98% Possibility
                </span>
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>{selectedNode.label}</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontFamily: 'monospace' }}>ID: {selectedNode.id}</span>
            </div>

            {/* Why This Node Connects to Accused */}
            <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', border: '1px solid var(--accent-primary)', padding: '0.85rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                <Zap size={15} color="var(--accent-primary)" />
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800 }}>WHY THIS LINK EXISTS:</span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-main)', fontWeight: 500, lineHeight: '1.4' }}>
                {selectedNode.reason}
              </p>
            </div>

            {/* Source Document File */}
            <div style={{ backgroundColor: 'var(--bg-card-hover)', border: '1px solid var(--border-color)', padding: '0.85rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Supporting Source File:</span>
              <p style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700, fontFamily: 'monospace', wordBreak: 'break-all' }}>
                📄 {selectedNode.source_file}
              </p>
            </div>

            {/* Supporting Evidence Chain with Possibility */}
            <div>
              <h5 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Evidence Chain & Possibility</h5>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.8rem' }}>
                {edges.map((edge, idx) => {
                  const pct = (edge.confidence * 100).toFixed(0);
                  const isHighPossibility = edge.confidence >= 0.90;

                  return (
                    <div 
                      key={idx} 
                      style={{ 
                        backgroundColor: isHighPossibility ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-card-hover)', 
                        border: isHighPossibility ? '1px solid var(--accent-success)' : '1px solid var(--border-color)', 
                        padding: '0.7rem', 
                        borderRadius: '8px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '0.25rem' 
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 800 }}>
                          Step {idx + 1}: {edge.label}
                        </span>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          backgroundColor: isHighPossibility ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)', 
                          color: isHighPossibility ? 'var(--accent-success)' : 'var(--accent-warning)', 
                          padding: '0.15rem 0.45rem', 
                          borderRadius: '4px', 
                          fontWeight: 800 
                        }}>
                          {pct}% Possibility
                        </span>
                      </div>
                      <p style={{ color: 'var(--text-main)', fontSize: '0.775rem', margin: 0, fontWeight: 500 }}>{edge.reason}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Click any node on the graph to inspect supporting evidences and possibility scores.</p>
        )}
      </div>
    </div>
  );
}
