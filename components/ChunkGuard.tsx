"use client";
import { useEffect } from 'react';

export default function ChunkGuard() {
  useEffect(() => {
    // 1/ purge d'un éventuel Service Worker résiduel
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations?.().then(regs => {
        regs.forEach(r => r.unregister());
      });
    }
    // 2/ reload si un chunk échoue à se charger
    const onError = (e: any) => {
      const msg = e?.message || '';
      if (/ChunkLoadError|Loading chunk .* failed|app-pages-internals/.test(msg)) {
        location.reload();
      }
    };
    window.addEventListener('error', onError);
    return () => window.removeEventListener('error', onError);
  }, []);
  return null;
}