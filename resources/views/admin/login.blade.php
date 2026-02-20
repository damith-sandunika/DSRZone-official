<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Admin Login – Sldigitasystem</title>
    @vite(['resources/css/app.css'])
</head>
<body class="bg-[#0a0c12] text-gray-200 min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md rounded-2xl border border-white/10 bg-[#080a0f] shadow-2xl overflow-hidden">
        <div class="p-8">
            <div class="flex items-center gap-3 mb-6">
                <span class="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </span>
                <div>
                    <h1 class="text-xl font-semibold text-white">Admin Login</h1>
                    <p class="text-sm text-gray-400">Sldigitasystem</p>
                </div>
            </div>
            @if($errors->any())
                <div class="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 flex items-start gap-3">
                    <svg class="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <div class="text-sm text-red-300">
                        @foreach($errors->all() as $e) <p>{{ $e }}</p> @endforeach
                    </div>
                </div>
            @endif
            <form method="POST" action="{{ url('admin/login') }}" class="space-y-4">
                @csrf
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
                        </span>
                        <input type="email" name="email" id="email" value="{{ old('email') }}" required autofocus
                            class="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 focus:outline-none transition">
                    </div>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        </span>
                        <input type="password" name="password" id="password" required
                            class="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 focus:outline-none transition">
                    </div>
                </div>
                <label class="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                    <input type="checkbox" name="remember" class="rounded border-white/20 bg-white/5 text-amber-500 focus:ring-amber-500">
                    Remember me
                </label>
                <button type="submit" class="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 text-black font-semibold py-3 hover:bg-amber-400 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
                    Sign in
                </button>
            </form>
        </div>
    </div>
</body>
</html>
