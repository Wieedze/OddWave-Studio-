/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms access key (tied to the pro email). See ContactService. */
  readonly VITE_WEB3FORMS_KEY?: string;
  /** IPFS gateway base for the Sound Design videos (e.g. https://name.mypinata.cloud). */
  readonly VITE_IPFS_GATEWAY?: string;
  /** Dedicated-gateway access token (Pinata gateway key — NOT the pinning JWT). */
  readonly VITE_IPFS_GATEWAY_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
