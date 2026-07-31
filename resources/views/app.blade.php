<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <!-- Primary Meta Tags -->
    <title>DSRZone – Premium IT & Graphic Solutions in Sri Lanka</title>
    <meta name="title" content="DSRZone – Premium IT & Graphic Solutions in Sri Lanka">
    <meta name="description" content="DSRZone is a leading digital agency providing state-of-the-art web development, custom software solutions, graphic design, and IT services tailored for your business needs.">
    <meta name="keywords" content="DSRZone, IT Solutions Sri Lanka, Web Development Sri Lanka, Graphic Design Sri Lanka, Custom Software, Digital Agency Sri Lanka, Web Design, UI/UX Design, IT Services">
    <meta name="author" content="DSRZone">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url('/') }}">
    <meta property="og:title" content="DSRZone – Premium IT & Graphic Solutions in Sri Lanka">
    <meta property="og:description" content="Elevate your digital presence with DSRZone's state-of-the-art web development, custom software solutions, and premium graphic design services.">
    <meta property="og:image" content="{{ url('/images/DSRZone logo.png') }}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ url('/') }}">
    <meta property="twitter:title" content="DSRZone – Premium IT & Graphic Solutions in Sri Lanka">
    <meta property="twitter:description" content="Elevate your digital presence with DSRZone's state-of-the-art web development, custom software solutions, and premium graphic design services.">
    <meta property="twitter:image" content="{{ url('/images/DSRZone logo.png') }}">

    <link rel="icon" type="image/png" href="/images/DSRZone logo.png" />
    <link rel="canonical" href="{{ url('/') }}">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="antialiased">
    <div id="app"></div>
</body>
</html>

