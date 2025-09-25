'use client';
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div style={{padding:'2rem'}}>
          <h1>Oups, Ikabay a trébuché</h1>
          <p>On recharge l'app pour resynchroniser les chunks.</p>
          <pre style={{whiteSpace:'pre-wrap', background:'#f6f6f6', padding:'1rem', borderRadius:8}}>
            {String(error?.message || error)}
          </pre>
          <button onClick={() => reset()} style={{padding:'8px 12px', border:'1px solid #ddd', borderRadius:8}}>
            Recharger
          </button>
        </div>
      </body>
    </html>
  );
}