'use client';
export default function Error({ error, reset }) {
  return (
    <div style={{padding:'2rem'}}>
      <h1>Une erreur est survenue</h1>
      <pre style={{whiteSpace:'pre-wrap', background:'#f6f6f6', padding:'1rem', borderRadius:8}}>
        {String(error?.message || error)}
      </pre>
      <button onClick={() => reset()} style={{padding:'8px 12px', border:'1px solid #ddd', borderRadius:8}}>
        Réessayer
      </button>
    </div>
  );
}