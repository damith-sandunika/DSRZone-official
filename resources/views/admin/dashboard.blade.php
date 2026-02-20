@extends('admin.layout')

@section('title', 'Dashboard')

@section('content')
    <div class="mb-8">
        <p class="text-gray-400">Overview of your content and recent activity.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        <a href="{{ route('admin.services.index') }}" class="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-200">
            <span class="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </span>
            <div class="text-2xl font-bold text-white">{{ $stats['services'] }}</div>
            <div class="text-sm text-gray-400">Services</div>
        </a>
        <a href="{{ route('admin.products.index') }}" class="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-200">
            <span class="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            </span>
            <div class="text-2xl font-bold text-white">{{ $stats['products'] }}</div>
            <div class="text-sm text-gray-400">Products</div>
        </a>
        <a href="{{ route('admin.projects.index') }}" class="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-200">
            <span class="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
            </span>
            <div class="text-2xl font-bold text-white">{{ $stats['projects'] }}</div>
            <div class="text-sm text-gray-400">Projects</div>
        </a>
        <a href="{{ route('admin.testimonials.index') }}" class="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-200">
            <span class="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>
            </span>
            <div class="text-2xl font-bold text-white">{{ $stats['testimonials'] }}</div>
            <div class="text-sm text-gray-400">Testimonials</div>
        </a>
        <a href="{{ route('admin.messages.index') }}" class="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-200 {{ $stats['messages_unread'] > 0 ? 'ring-1 ring-amber-500/30' : '' }}">
            <span class="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 mb-3 group-hover:scale-105 transition-transform relative">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                @if($stats['messages_unread'] > 0)
                    <span class="absolute -top-1 -right-1 flex h-4 w-4"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span class="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[10px] font-bold text-black items-center justify-center">{{ $stats['messages_unread'] > 9 ? '9+' : $stats['messages_unread'] }}</span></span>
                @endif
            </span>
            <div class="text-2xl font-bold text-white">{{ $stats['messages_unread'] }}</div>
            <div class="text-sm text-gray-400">Unread messages</div>
        </a>
    </div>

    <div class="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <div class="px-5 py-4 border-b border-white/10 flex items-center gap-3">
            <span class="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </span>
            <h2 class="text-lg font-semibold text-white">Recent messages</h2>
            <a href="{{ route('admin.messages.index') }}" class="ml-auto text-sm text-amber-400 hover:text-amber-300">View all</a>
        </div>
        <div class="divide-y divide-white/5">
            @forelse($recentMessages as $msg)
                <a href="{{ route('admin.messages.show', $msg) }}" class="flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-colors {{ !$msg->is_read ? 'bg-amber-500/5' : '' }}">
                    <span class="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-amber-400 shrink-0 text-sm font-medium">{{ strtoupper(substr($msg->name ?? '?', 0, 1)) }}</span>
                    <div class="min-w-0 flex-1">
                        <div class="font-medium text-white truncate">{{ $msg->name }} &middot; {{ $msg->email }}</div>
                        <div class="text-sm text-gray-400 truncate">{{ Str::limit($msg->subject ?? $msg->message, 55) }}</div>
                    </div>
                    @if(!$msg->is_read)
                        <span class="shrink-0 w-2 h-2 rounded-full bg-amber-400"></span>
                    @endif
                    <svg class="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
            @empty
                <div class="px-5 py-8 text-center text-gray-500">
                    <svg class="w-12 h-12 mx-auto text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                    <p>No messages yet.</p>
                </div>
            @endforelse
        </div>
    </div>
@endsection
