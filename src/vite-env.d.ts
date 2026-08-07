/// <reference types="vite/client" />

interface ImportMetaEnv {
  // The contact/guidance forms no longer use a client-side key — they POST to
  // /api/contact on the Worker, which holds the Cloudflare Email Service creds
  // server-side (see worker/contact.ts + docs/deploy.md).
  /** IPFS gateway base for the Sound Design videos (e.g. https://name.mypinata.cloud). */
  readonly VITE_IPFS_GATEWAY?: string;
  /** Dedicated-gateway access token (Pinata gateway key — NOT the pinning JWT). */
  readonly VITE_IPFS_GATEWAY_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
