#!/usr/bin/env bash
# Pin the Sound Design videos to IPFS via Pinata, then print filename -> CID.
# Your credentials stay in your shell (env vars) — they are never written to the repo.
#
# Auth (either one):
#   export PINATA_JWT="eyJ...your JWT..."          # recommended (Bearer token)
#   # or:
#   export PINATA_API_KEY="...";  export PINATA_API_SECRET="..."
#
# Run from the project root:
#   bash scripts/pin-to-pinata.sh
#
# Then paste the printed "CID MAP" back, plus your dedicated gateway domain
# (e.g. your-name.mypinata.cloud), and the videos get wired into
# src/content/soundDesign.ts.

set -u
cd "$(dirname "$0")/.." || exit 1
ASSETS="public/assets"
ENDPOINT="https://api.pinata.cloud/pinning/pinFileToIPFS"

# --- Files to pin. Edit this list. Prefer .mp4 (H.264) for cross-browser playback;
# --- the .mov files only play reliably in Safari — re-export them to .mp4 first. ---
FILES=(
  "sd-irradiation.mp4"
  "sd-seabeast.mp4"
  "THE WITCHER S3 E6 - RESOUND (Short).mov"
  "LOVE, DEATH & ROBOTS - Re-Sound Design Démo (720P).mov"
  "SHOWREEL SD 1m.mov"
  "UNREAL - Re-Sound Design Démo (720P).mov"
)

# --- Build the auth header(s) ---
auth_args=()
if [[ -n "${PINATA_JWT:-}" ]]; then
  auth_args=(-H "Authorization: Bearer ${PINATA_JWT}")
elif [[ -n "${PINATA_API_KEY:-}" && -n "${PINATA_API_SECRET:-}" ]]; then
  auth_args=(-H "pinata_api_key: ${PINATA_API_KEY}" -H "pinata_secret_api_key: ${PINATA_API_SECRET}")
else
  echo "ERROR: set PINATA_JWT (or PINATA_API_KEY + PINATA_API_SECRET) first." >&2
  exit 1
fi

echo "Pinning ${#FILES[@]} file(s) to Pinata…"
echo
declare -a MAP
for name in "${FILES[@]}"; do
  path="${ASSETS}/${name}"
  if [[ ! -f "$path" ]]; then
    echo "  SKIP (not found): $name" >&2
    continue
  fi
  sizemb=$(awk "BEGIN{printf \"%.1f\", $(stat -c '%s' "$path")/1048576}")
  echo "  -> ${name} (${sizemb} MB) …"
  resp=$(curl -sS -X POST "$ENDPOINT" \
    "${auth_args[@]}" \
    -F "file=@${path};type=video/mp4" \
    -F "pinataMetadata={\"name\":\"$(basename "$name")\"}" \
    -F "pinataOptions={\"cidVersion\":1}")
  cid=$(printf '%s' "$resp" | grep -oE '"IpfsHash"[[:space:]]*:[[:space:]]*"[^"]+"' | head -1 | sed -E 's/.*"([^"]+)"$/\1/')
  if [[ -n "$cid" ]]; then
    echo "     CID: $cid"
    MAP+=("${name}|${cid}")
  else
    echo "     FAILED. Response: $resp" >&2
  fi
  echo
done

echo "================ CID MAP (paste this back) ================"
for row in "${MAP[@]}"; do
  printf '%s\n' "$row"
done
echo "==========================================================="
