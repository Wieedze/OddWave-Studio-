// Structured data and canonical URLs for search engines and AI answer
// engines. Pure derivations from src/content/seo.ts, no DOM access.

import {
  GOOGLE_MAPS_URL,
  OG_IMAGE_PATH,
  PAGE_SEO,
  SERVICE_AREA,
  SITE_EMAIL,
  SITE_NAME,
  SITE_SAME_AS,
  SITE_URL,
} from '@/content/seo';

/** Offer names exposed in the LocalBusiness catalog (matches the site's services). */
const OFFERED_SERVICES: readonly string[] = [
  'Mastering',
  'Stem mastering',
  'Mixage',
  'Enregistrement',
  'Production musicale',
  'Sound design',
  "Accompagnement d'artistes",
];

export class SeoService {
  /** Absolute canonical URL for a route path (only '/' keeps a trailing slash). */
  static canonicalUrl(path: string): string {
    return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  }

  /**
   * schema.org LocalBusiness description of the studio, serialized for a
   * JSON-LD script tag. Service-area business shape: town and area served,
   * deliberately no street address.
   */
  static localBusinessJsonLd(): string {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#studio`,
      name: SITE_NAME,
      description: PAGE_SEO.home.description,
      url: `${SITE_URL}/`,
      email: SITE_EMAIL,
      image: `${SITE_URL}${OG_IMAGE_PATH}`,
      sameAs: [...SITE_SAME_AS],
      hasMap: GOOGLE_MAPS_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SERVICE_AREA.locality,
        postalCode: SERVICE_AREA.postalCode,
        addressRegion: SERVICE_AREA.region,
        addressCountry: SERVICE_AREA.country,
      },
      areaServed: [
        ...SERVICE_AREA.cities.map((name) => ({ '@type': 'City', name })),
        ...SERVICE_AREA.departments.map((name) => ({ '@type': 'AdministrativeArea', name })),
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Prestations studio',
        itemListElement: OFFERED_SERVICES.map((name) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name },
        })),
      },
    });
  }
}
