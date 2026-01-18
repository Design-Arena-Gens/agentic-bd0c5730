'use client';

import { useMemo, useState } from 'react';
import type { NamePlot } from '@/lib/namePlot';
import { createNamePlot } from '@/lib/namePlot';

const DEFAULT_NAME = 'Ada Lovelace';

export default function Page() {
  const [input, setInput] = useState(DEFAULT_NAME);
  const plot = useMemo<NamePlot>(() => createNamePlot(input), [input]);

  return (
    <main
      style={{
        width: 'min(960px, 90vw)',
        margin: '4rem auto',
        padding: '2.5rem',
        background: 'rgba(15, 23, 42, 0.75)',
        borderRadius: '18px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <h1
        style={{
          fontSize: '2.75rem',
          marginBottom: '1.5rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textAlign: 'center',
        }}
      >
        Name Plotter
      </h1>
      <p
        style={{
          marginBottom: '2rem',
          color: '#cbd5f5',
          fontSize: '1.05rem',
          textAlign: 'center',
        }}
      >
        Visualise the letter frequency of any human name. Works in your browser and via the bundled CLI.
      </p>
      <label
        htmlFor="name-input"
        style={{
          display: 'block',
          marginBottom: '0.75rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          fontSize: '0.85rem',
          color: '#94a3b8',
          fontWeight: 600,
        }}
      >
        Name
      </label>
      <input
        id="name-input"
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Enter a name"
        style={{
          width: '100%',
          padding: '1rem 1.25rem',
          marginBottom: '2.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(148, 163, 184, 0.25)',
          background: 'rgba(15, 23, 42, 0.55)',
          color: '#e2e8f0',
          fontSize: '1.05rem',
        }}
      />
      <PlotResult plot={plot} />
      <CliReminder />
    </main>
  );
}

function PlotResult({ plot }: { plot: NamePlot }) {
  if (!plot.totalLetters) {
    return (
      <div
        style={{
          padding: '1.5rem',
          borderRadius: '12px',
          background: 'rgba(30, 41, 59, 0.8)',
          color: '#f8fafc',
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        Enter at least one alphabetical character to generate a plot.
      </div>
    );
  }

  const maxCount = Math.max(...plot.bars.map((bar) => bar.count));

  return (
    <section>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '1.25rem',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Letter frequency</h2>
        <span style={{ color: '#a5b4fc' }}>Analyzed letters: {plot.totalLetters}</span>
      </div>
      <div
        style={{
          display: 'grid',
          gap: '0.75rem',
        }}
      >
        {plot.bars.map((bar) => {
          const width = `${Math.max(8, (bar.count / maxCount) * 100)}%`;
          return (
            <div
              key={bar.letter}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'rgba(30, 41, 59, 0.75)',
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(148, 163, 184, 0.15)',
              }}
            >
              <span
                style={{
                  width: '3ch',
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: '#c7d2fe',
                }}
              >
                {bar.letter}
              </span>
              <div
                aria-hidden
                style={{
                  flex: 1,
                  height: '0.75rem',
                  borderRadius: '999px',
                  background: 'rgba(59, 130, 246, 0.2)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width,
                    height: '100%',
                    borderRadius: 'inherit',
                    background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
                  }}
                />
              </div>
              <span style={{ minWidth: '4ch', textAlign: 'right' }}>{bar.count}</span>
              <span style={{ minWidth: '6ch', textAlign: 'right', color: '#a5b4fc' }}>
                {(bar.percentage * 100).toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CliReminder() {
  return (
    <section
      style={{
        marginTop: '3rem',
        padding: '1.5rem',
        borderRadius: '12px',
        background: 'rgba(30, 41, 59, 0.8)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '0.75rem' }}>CLI companion</h3>
      <p style={{ margin: 0, color: '#cbd5f5', lineHeight: 1.6 }}>
        Run <code>npm run plot-name -- &quot;Ada Lovelace&quot;</code> to generate the same plot in your terminal. Use
        <code>&nbsp;--json</code> for structured output.
      </p>
    </section>
  );
}
