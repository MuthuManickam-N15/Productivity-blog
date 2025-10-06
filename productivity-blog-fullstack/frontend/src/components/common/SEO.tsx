import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export default function SEO({
  title,
  description,
  image = '/default-og.jpg',
  url = '',
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags,
}: SEOProps) {
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';
  const fullURL = url ? `${siteURL}${url}` : siteURL;
  const fullImage = image.startsWith('http') ? image : `${siteURL}${image}`;

  const articleSchema = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": fullImage,
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "author": {
      "@type": "Person",
      "name": author || "ProductivityHub Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ProductivityHub",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteURL}/logo.png`
      }
    },
    "keywords": tags?.join(', ')
  } : null;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullURL} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullURL} />
      <meta property="og:site_name" content="ProductivityHub" />
      
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
          {tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Schema.org JSON-LD */}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
    </Head>
  );
}