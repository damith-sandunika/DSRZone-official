<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @php
        $siteUrl = config('app.url', 'https://dsrzone.com');
        $pageTitle = isset($metaProduct) && $metaProduct
            ? e($metaProduct->name) . ' – DSRZone (DSR) Enterprise Software Solutions'
            : 'DSRZone (DSR) – Leading IT & Software Solutions in Sri Lanka | Web & App Development';

        $pageDesc = isset($metaProduct) && $metaProduct
            ? e($metaProduct->tagline ?: Str::limit($metaProduct->description, 160))
            : 'DSRZone (DSR) is Sri Lanka\'s premier technology powerhouse specializing in custom software development, enterprise business systems, modern web development, mobile apps, ERP, CRM, and cloud solutions. Born to Innovate.';

        $mediaService = app(\App\Services\MediaService::class);
        $pageImg = isset($metaProduct) && $metaProduct && $metaProduct->background_image
            ? $mediaService->url($metaProduct->background_image)
            : url('/images/dsrzone-official-logo.png');

        $canonicalUrl = url()->current();

        $schemaData = [
            '@context' => 'https://schema.org',
            '@graph' => [
                [
                    '@type' => 'Organization',
                    '@id' => $siteUrl . '/#organization',
                    'name' => 'DSRZone',
                    'alternateName' => ['DSR', 'DSR Zone', 'DSR Technologies', 'DSR IT Solutions'],
                    'url' => $siteUrl,
                    'logo' => [
                        '@type' => 'ImageObject',
                        'url' => url('/images/dsrzone-official-logo.png'),
                        'caption' => 'DSRZone Logo'
                    ],
                    'founder' => [
                        '@type' => 'Person',
                        'name' => 'Damith Sandunika',
                        'jobTitle' => 'Founder & Lead Architect',
                        'image' => url('/images/dsrzone-founder-damith-sandunika.png')
                    ],
                    'address' => [
                        '@type' => 'PostalAddress',
                        'addressLocality' => 'Colombo',
                        'addressCountry' => 'LK'
                    ],
                    'contactPoint' => [
                        '@type' => 'ContactPoint',
                        'telephone' => '+94-76-699-4965',
                        'contactType' => 'customer service',
                        'email' => 'sldigitalsystem@gmail.com',
                        'areaServed' => ['LK', 'Global'],
                        'availableLanguage' => ['English', 'Sinhala']
                    ],
                    'sameAs' => [
                        'https://facebook.com/dsrzone',
                        'https://linkedin.com/company/dsrzone',
                        'https://instagram.com/dsrzone',
                        'https://youtube.com/@dsrzone'
                    ]
                ],
                [
                    '@type' => 'WebSite',
                    '@id' => $siteUrl . '/#website',
                    'url' => $siteUrl,
                    'name' => 'DSRZone',
                    'alternateName' => 'DSR',
                    'description' => 'Leading IT & Software Solutions in Sri Lanka',
                    'publisher' => [
                        '@id' => $siteUrl . '/#organization'
                    ],
                    'inLanguage' => 'en-US'
                ],
                [
                    '@type' => 'ProfessionalService',
                    '@id' => $siteUrl . '/#service',
                    'name' => 'DSRZone Software Solutions',
                    'alternateName' => 'DSR Solutions',
                    'url' => $siteUrl,
                    'priceRange' => '$$',
                    'telephone' => '+94-76-699-4965',
                    'address' => [
                        '@type' => 'PostalAddress',
                        'addressLocality' => 'Colombo',
                        'addressRegion' => 'Western Province',
                        'addressCountry' => 'Sri Lanka'
                    ],
                    'openingHoursSpecification' => [
                        '@type' => 'OpeningHoursSpecification',
                        'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                        'opens' => '09:00',
                        'closes' => '18:00'
                    ]
                ]
            ]
        ];
    @endphp

    <!-- ── PRIMARY SEARCH ENGINE OPTIMIZATION (SEO) META TAGS ── -->
    <title>{{ $pageTitle }}</title>
    <meta name="title" content="{{ $pageTitle }}">
    <meta name="description" content="{{ $pageDesc }}">
    <meta name="keywords" content="DSR, DSRZone, DSR Zone, DSR IT, DSR Software, DSR Sri Lanka, IT Solutions Sri Lanka, Web Development Sri Lanka, Custom Software Sri Lanka, ERP Sri Lanka, CRM Sri Lanka, Mobile App Development Colombo, Software Company Sri Lanka, Digital Agency Sri Lanka, DSR Tech, Web Systems, Cloud Solutions Sri Lanka, Enterprise Systems, Damith Sandunika">
    <meta name="author" content="DSRZone (DSR)">
    <meta name="publisher" content="DSRZone">
    <meta name="application-name" content="DSRZone">
    <meta name="theme-color" content="#02050e">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">

    <!-- ── LOCAL SEO & GEO TARGETING FOR SRI LANKA ── -->
    <meta name="geo.region" content="LK-11">
    <meta name="geo.placename" content="Colombo, Sri Lanka">
    <meta name="geo.position" content="6.9271;79.8612">
    <meta name="ICBM" content="6.9271, 79.8612">

    <!-- ── OPEN GRAPH / FACEBOOK / LINKEDIN / WHATSAPP PREVIEWS ── -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="DSRZone | DSR Official">
    <meta property="og:url" content="{{ $canonicalUrl }}">
    <meta property="og:title" content="{{ $pageTitle }}">
    <meta property="og:description" content="{{ $pageDesc }}">
    <meta property="og:image" content="{{ $pageImg }}">
    <meta property="og:image:alt" content="DSRZone - Born to Innovate Software Platform">
    <meta property="og:locale" content="en_US">

    <!-- ── TWITTER CARD PREVIEWS ── -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@dsrzone">
    <meta name="twitter:creator" content="@dsrzone">
    <meta name="twitter:url" content="{{ $canonicalUrl }}">
    <meta name="twitter:title" content="{{ $pageTitle }}">
    <meta name="twitter:description" content="{{ $pageDesc }}">
    <meta name="twitter:image" content="{{ $pageImg }}">
    <meta name="twitter:image:alt" content="DSRZone (DSR) Enterprise Software Platform">

    <!-- ── CANONICAL & FAVICON ── -->
    <link rel="canonical" href="{{ $canonicalUrl }}">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/dsrzone-favicon.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/images/dsrzone-favicon.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/images/dsrzone-favicon.png">
    <link rel="shortcut icon" href="/favicon.ico">

    <!-- ── GOOGLE FONTS PRECONNECT ── -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- ── GOOGLE STRUCTURED DATA (JSON-LD SCHEMA) ── -->
    <script type="application/ld+json">
    {!! json_encode($schemaData, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
    </script>

    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="antialiased bg-[#02050e] text-white selection:bg-blue-600 selection:text-white">
    <div id="app"></div>
</body>
</html>
