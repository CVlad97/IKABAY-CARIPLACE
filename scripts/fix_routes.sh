#!/usr/bin/env bash
set -euo pipefail
b='app/[locale]'
fix_pair () {
  local name="$1"
  local root="$b/$name"
  local store="$b/(store)/$name"
  if [ -d "$root" ] && [ -d "$store" ]; then
    echo "[fix] Duplicate /$name → keep (store)/$name, remove root"
    rm -rf "$root"
  else
    echo "[ok] No duplicate for /$name"
  fi
}
fix_pair "jeux"
fix_pair "cart"
fix_pair "checkout"
