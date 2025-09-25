# ===============================
# Script de démarrage Ikabay
# ===============================

$ProjectRoot = Split-Path -Parent $PSCommandPath
$NODE_PATH = "C:\Users\vladimir_caraibe-mar\Portable\node\node-v20.10.0-win-x64"

Write-Host ">>> Node path: $NODE_PATH"

if (-not (Test-Path "$NODE_PATH\node.exe")) {
  Write-Error "node.exe introuvable dans $NODE_PATH. Vérifie l'installation portable."
  exit 1
}

Write-Host ">>> Vérification Node/NPM..."
& "$NODE_PATH\node.exe" -v
& "$NODE_PATH\npm.cmd" -v

Set-Location $ProjectRoot

Write-Host ">>> Installation des dépendances (npm install)..."
& "$NODE_PATH\npm.cmd" install

if ($LASTEXITCODE -ne 0) {
  Write-Error "npm install a échoué. Regarde les erreurs ci-dessus."
  exit 1
}

Write-Host ">>> Lancement du serveur (npm run dev)..."
& "$NODE_PATH\npm.cmd" run dev
