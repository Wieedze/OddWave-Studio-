// Per-page <head> tags: title, description, canonical, Open Graph and the
// LocalBusiness JSON-LD. Rendered once per page, resolved at pre-render time.

import { Head } from 'vite-react-ssg';
import {
  OG_IMAGE_ALT,
  OG_IMAGE_PATH,
  PAGE_SEO,
  SITE_NAME,
  SITE_URL,
  type PageSeoKey,
} from '@/content/seo';
import { SeoService } from '@/services';

interface SeoProps {
  /** Which route's metadata to render. */
  page: PageSeoKey;
}

export function Seo({ page }: SeoProps) {
  const { path, title, description } = PAGE_SEO[page];
  const url = SeoService.canonicalUrl(path);
  const image = `${SITE_URL}${OG_IMAGE_PATH}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={OG_IMAGE_ALT} />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{SeoService.localBusinessJsonLd()}</script>
    </Head>
  );
}
