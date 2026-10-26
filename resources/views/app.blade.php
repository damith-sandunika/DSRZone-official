<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @php
        $pageTitle = isset($metaProduct) && $metaProduct
            ? e($metaProduct->name) . ' – DSRZone'
            : 'DSRZone – Premium IT & Graphic Solutions in Sri Lanka';
        $pageDesc = isset($metaProduct) && $metaProduct
            ? e($metaProduct->tagline ?: Str::limit($metaProduct->description, 160))
            : 'DSRZone is a leading digital agency providing state-of-the-art web development, custom software solutions, graphic design, and IT services.';
        $mediaService = app(\App\Services\MediaService::class);
        $pageImg = isset($metaProduct) && $metaProduct && $metaProduct->background_image
            ? $mediaService->url($metaProduct->background_image)
            : url('/images/DSRZone logo.png');
    @endphp

    <title>{{ $pageTitle }}</title>
    <meta name="title" content="{{ $pageTitle }}">
    <meta name="description" content="{{ $pageDesc }}">
    <meta name="keywords" content="DSRZone, IT Solutions Sri Lanka, Web Development Sri Lanka, Custom Software, Digital Agency Sri Lanka">
    <meta name="author" content="DSRZone">
    <meta name="robots" content="index, follow">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="{{ $pageTitle }}">
    <meta property="og:description" content="{{ $pageDesc }}">
    <meta property="og:image" content="{{ $pageImg }}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ url()->current() }}">
    <meta property="twitter:title" content="{{ $pageTitle }}">
    <meta property="twitter:description" content="{{ $pageDesc }}">
    <meta property="twitter:image" content="{{ $pageImg }}">

    <link rel="icon" type="image/png" href="/images/DSRZone logo.png" />
    <link rel="canonical" href="{{ url()->current() }}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="antialiased">
    <div id="app"></div>
</body>
</html>
