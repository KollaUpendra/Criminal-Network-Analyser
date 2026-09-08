import React from 'react';
import { Clock, Eye, Phone, CreditCard, MessageSquare } from 'lucide-react';

export default function TimelineOverlay() {
  const timelineEvents = [
    {
      time: '2026-08-10 14:30',
      type: 'Financial',
      icon: CreditCard,
      color: 'var(--accent-warning)',
      title: 'Hawala Transfer Initiated (TX-9011)',
      description: '₹45,00,000 transferred from ACC-8801 (Ravi Kumar) to Apex Logistics Pvt Ltd.',
      source: 'Bank Transaction Feed'
    },
    {
      time: '2026-08-14 21:15',
      type: 'CDR Call',
      icon: Phone,
      color: 'var(--accent-primary)',
      title: 'High-Duration CDR Call (340s)',
      description: 'Ravi Kumar (9876543210) called Suresh Reddy (9123456789) from Warehouse Rd tower.',
      source: 'Tower Dump Analysis'
    },
    {
      time: '2026-08-14 21:35',
      type: 'Surveillance',
      icon: Eye,
      color: 'var(--accent-danger)',
      title: 'CCTV Sighting at Jeedimetla Warehouse',
      description: 'Ravi Kumar and Suresh Reddy observed meeting near vehicle TS09AB1234. (88% Confidence)',
      source: 'Surveillance CCTV Metadata'
    },
    {
      time: '2026-08-14 22:00',
      type: 'SOCMINT',
      icon: MessageSquare,
      color: 'var(--accent-cyan)',
      title: 'Flagged Telegram Channel Post',
      description: 'Account @shadow_broker_hyd posted: "Hawala routing completed for Apex Logistics."',
      source: 'Telegram Export Feed'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
          <Clock size={20} color="var(--accent-cyan)" /> Multi-Source Timeline Correlation
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Chronological fusion of Surveillance, CDRs, Transactions, and Social Signals</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '19px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--border-color)' }} />

        {timelineEvents.map((evt, idx) => {
          const Icon = evt.icon;
          return (
            <div key={idx} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
              <div style={{
                backgroundColor: 'var(--bg-card)',
                border: `2px solid ${evt.color}`,
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon size={18} color={evt.color} />
              </div>

              <div style={{ backgroundColor: 'var(--bg-card-hover)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '8px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: evt.color }}>{evt.type.toUpperCase()}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{evt.time}</span>
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{evt.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{evt.description}</p>
                <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Source: {evt.source}</span>
                  <span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>Verified Link</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
