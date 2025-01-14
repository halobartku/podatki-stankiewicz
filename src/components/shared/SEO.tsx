import { Helmet } from 'react-helmet-async'
import { siteMetadata } from '../../config/metadata'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  noIndex?: boolean
}

export function SEO({
  title = siteMetadata.title,
  description = siteMetadata.description,
  canonical = siteMetadata.siteUrl,
  ogImage,
  noIndex = false
}: SEOProps) {
  const ogImageUrl = ogImage || siteMetadata.openGraph.images[0].url
  const fullImageUrl = ogImageUrl.startsWith('http') ? ogImageUrl : `${siteMetadata.siteUrl}${ogImageUrl}`

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={siteMetadata.keywords.join(', ')} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="language" content={siteMetadata.language} />

      {/* Mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#862B44" />
      <meta name="format-detection" content="telephone=yes" />

      {/* Security */}
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={siteMetadata.openGraph.type} />
      <meta property="og:site_name" content={siteMetadata.openGraph.siteName} />
      <meta property="og:locale" content={siteMetadata.openGraph.locale} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content={String(siteMetadata.openGraph.images[0].width)} />
      <meta property="og:image:height" content={String(siteMetadata.openGraph.images[0].height)} />
      <meta property="og:image:type" content={siteMetadata.openGraph.images[0].type} />
      <meta property="og:image:alt" content={siteMetadata.openGraph.images[0].alt} />
      {siteMetadata.facebook.appId && (
        <meta property="fb:app_id" content={siteMetadata.facebook.appId} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content={siteMetadata.twitter.card} />
      <meta name="twitter:site" content={siteMetadata.twitter.site} />
      <meta name="twitter:creator" content={siteMetadata.twitter.creator} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={siteMetadata.openGraph.images[0].alt} />

      {/* Local business metadata */}
      <meta name="geo.region" content="PL-WN" />
      <meta name="geo.placename" content="Elbląg" />
      <meta name="geo.position" content="54.1559;19.4044" />
      <meta name="ICBM" content="54.1559, 19.4044" />
      <meta name="author" content={siteMetadata.company.name} />
      <meta name="copyright" content={`© ${new Date().getFullYear()} ${siteMetadata.company.name}`} />

      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${siteMetadata.siteUrl}/#organization`,
          name: siteMetadata.company.name,
          description: siteMetadata.description,
          url: siteMetadata.siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${siteMetadata.siteUrl}/logo.png`,
            width: '512',
            height: '512'
          },
          image: {
            '@type': 'ImageObject',
            url: fullImageUrl,
            width: String(siteMetadata.openGraph.images[0].width),
            height: String(siteMetadata.openGraph.images[0].height)
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteMetadata.company.address,
            addressLocality: 'Elbląg',
            postalCode: '82-300',
            addressRegion: 'warmińsko-mazurskie',
            addressCountry: 'PL'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '54.1559',
            longitude: '19.4044'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '',
            email: '',
            contactType: 'customer service',
            areaServed: 'PL',
            availableLanguage: ['Polish']
          },
          sameAs: [
            // Add social media profiles when available
          ],
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:00',
              closes: '16:00'
            }
          ],
          priceRange: '$$',
          vatID: siteMetadata.company.registration.nip,
          taxID: siteMetadata.company.registration.regon,
          foundingDate: '2020',
          founder: {
            '@type': 'Person',
            name: siteMetadata.company.owner
          },
          areaServed: {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: '54.1559',
              longitude: '19.4044'
            },
            geoRadius: '50000'
          },
          makesOffer: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Usługi księgowe',
                description: 'Kompleksowa obsługa księgowa firm i osób prywatnych'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Konsultacje podatkowe',
                description: 'Profesjonalne konsultacje w zakresie podatków'
              }
            }
          ]
        })}
      </script>
    </Helmet>
  )
}
