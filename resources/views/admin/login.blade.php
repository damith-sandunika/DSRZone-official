<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Admin Sign In – DSRZone</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

    @vite(['resources/css/app.css'])
    <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
</head>
<body class="bg-[#f8fafc] text-slate-800 min-h-screen flex items-center justify-center p-4 antialiased">
    <div class="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-2xl shadow-blue-500/10 p-8 sm:p-10">
        {{-- Brand Logo --}}
        <div class="flex flex-col items-center text-center mb-8">
            <div class="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-xl shadow-blue-500/15 ring-4 ring-white mb-3.5 text-blue-600 border border-slate-100">
                <img src="/images/DSRZone logo.png" alt="DSRZone Logo" class="w-11 h-11 object-contain" />
            </div>
            <h1 class="text-xl font-black text-slate-900 tracking-tight">DSRZone Super Admin</h1>
            <p class="text-xs font-semibold text-slate-500 mt-1">Sign in with your enterprise credentials to manage systems.</p>
        </div>

        @if($errors->any())
            <div class="mb-6 rounded-2xl border border-red-200 bg-red-50/50 p-4 flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">!</div>
                <div class="text-xs font-semibold text-red-700">
                    @foreach($errors->all() as $e) <p>{{ $e }}</p> @endforeach
                </div>
            </div>
        @endif

        <form method="POST" action="{{ url('admin/login') }}" class="space-y-4">
            @csrf

            <div>
                <label for="email" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
                <input type="email" name="email" id="email" value="{{ old('email', 'admin@example.com') }}" required autofocus
                    placeholder="admin@dsrzone.com"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
            </div>

            <div>
                <label for="password" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
                <input type="password" name="password" id="password" required
                    placeholder="••••••••"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
            </div>

            <div class="flex items-center justify-between text-xs pt-1">
                <label class="flex items-center gap-2 cursor-pointer text-slate-600 font-semibold">
                    <input type="checkbox" name="remember" class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300">
                    <span>Remember this device</span>
                </label>
            </div>

            <button type="submit" class="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all">
                <span>Sign in to Dashboard</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
        </form>

        <div class="mt-8 pt-6 border-t border-slate-100 text-center">
            <a href="{{ url('/') }}" class="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors inline-flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                <span>Back to DSRZone Website</span>
            </a>
        </div>
    </div>
</body>
</html>
