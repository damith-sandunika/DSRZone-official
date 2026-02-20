<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Admin') – Sldigitasystem</title>
    @vite(['resources/css/app.css'])
    <style>
        [x-cloak], .admin-toast-hidden, .admin-modal-hidden { display: none !important; }
        .admin-toast { animation: admin-slide-in 0.3s ease; }
        .admin-modal-backdrop { animation: admin-fade-in 0.2s ease; }
        .admin-modal-panel { animation: admin-scale-in 0.25s ease; }
        @keyframes admin-slide-in { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes admin-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes admin-scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    </style>
</head>
<body class="bg-[#0a0c12] text-gray-200 min-h-screen">
    <div class="flex min-h-screen">
        {{-- Sidebar --}}
        <aside class="w-60 min-h-screen border-r border-white/10 bg-[#080a0f] flex flex-col shrink-0">
            <div class="p-5 border-b border-white/10">
                <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3">
                    <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                    </span>
                    <span class="font-semibold text-white">Admin</span>
                </a>
            </div>
            <nav class="p-3 flex-1 space-y-0.5">
                <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm transition-colors {{ request()->routeIs('admin.dashboard') ? 'bg-amber-500/20 text-amber-400' : 'text-gray-400 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                    Dashboard
                </a>
                <a href="{{ route('admin.services.index') }}" class="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm transition-colors {{ request()->routeIs('admin.services.*') ? 'bg-amber-500/20 text-amber-400' : 'text-gray-400 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    Services
                </a>
                <a href="{{ route('admin.products.index') }}" class="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm transition-colors {{ request()->routeIs('admin.products.*') ? 'bg-amber-500/20 text-amber-400' : 'text-gray-400 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    Products
                </a>
                <a href="{{ route('admin.projects.index') }}" class="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm transition-colors {{ request()->routeIs('admin.projects.*') ? 'bg-amber-500/20 text-amber-400' : 'text-gray-400 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
                    Projects
                </a>
                <a href="{{ route('admin.testimonials.index') }}" class="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm transition-colors {{ request()->routeIs('admin.testimonials.*') ? 'bg-amber-500/20 text-amber-400' : 'text-gray-400 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>
                    Testimonials
                </a>
                <a href="{{ route('admin.messages.index') }}" class="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm transition-colors {{ request()->routeIs('admin.messages.*') ? 'bg-amber-500/20 text-amber-400' : 'text-gray-400 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    Messages
                </a>
                <a href="{{ route('admin.contact.edit') }}" class="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm transition-colors {{ request()->routeIs('admin.contact.*') ? 'bg-amber-500/20 text-amber-400' : 'text-gray-400 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    Contact
                </a>
            </nav>
            <div class="p-3 border-t border-white/10">
                <form method="POST" action="{{ route('admin.logout') }}">
                    @csrf
                    <button type="submit" class="flex items-center gap-3 w-full py-2.5 px-3 rounded-lg text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
                        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                        Logout
                    </button>
                </form>
            </div>
        </aside>

        {{-- Main content --}}
        <div class="flex-1 flex flex-col min-w-0">
            <header class="h-14 border-b border-white/10 bg-[#080a0f]/80 flex items-center px-6 shrink-0">
                <h1 class="text-lg font-semibold text-white">@yield('title', 'Admin')</h1>
            </header>
            <main class="flex-1 p-6 overflow-auto">
                {{-- Toast (success/error) --}}
                @if(session('success'))
                    <div id="admin-toast" role="alert" class="admin-toast fixed top-4 right-4 z-[100] max-w-sm rounded-xl border border-emerald-500/30 bg-[#0a0c12] shadow-xl px-4 py-3 flex items-start gap-3">
                        <span class="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/20 shrink-0">
                            <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        </span>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-emerald-300">{{ session('success') }}</p>
                        </div>
                        <button type="button" onclick="this.closest('#admin-toast').remove()" class="text-gray-500 hover:text-white p-1 rounded" aria-label="Close">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>
                @endif
                @if($errors->any())
                    <div id="admin-toast-error" role="alert" class="admin-toast fixed top-4 right-4 z-[100] max-w-sm rounded-xl border border-red-500/30 bg-[#0a0c12] shadow-xl px-4 py-3 flex items-start gap-3">
                        <span class="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/20 shrink-0">
                            <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </span>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-red-300 mb-1">Please fix the errors below.</p>
                            <ul class="list-disc list-inside text-xs text-gray-400">
                                @foreach($errors->all() as $e) <li>{{ $e }}</li> @endforeach
                            </ul>
                        </div>
                        <button type="button" onclick="this.closest('#admin-toast-error').remove()" class="text-gray-500 hover:text-white p-1 rounded" aria-label="Close">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>
                @endif
                @yield('content')
            </main>
        </div>
    </div>

    {{-- Delete confirmation modal --}}
    <div id="admin-delete-modal" class="admin-modal-hidden fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div class="admin-modal-backdrop absolute inset-0 bg-black/60" onclick="window.adminCloseDeleteModal()"></div>
        <div class="admin-modal-panel relative rounded-2xl border border-white/10 bg-[#0f1116] shadow-2xl max-w-sm w-full p-6">
            <div class="flex items-center gap-3 mb-4">
                <span class="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/20">
                    <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </span>
                <h3 class="text-lg font-semibold text-white">Confirm delete</h3>
            </div>
            <p id="admin-delete-message" class="text-gray-400 text-sm mb-6">Are you sure you want to delete this item?</p>
            <div class="flex gap-3 justify-end">
                <button type="button" onclick="window.adminCloseDeleteModal()" class="px-4 py-2 rounded-lg border border-white/20 text-gray-300 hover:bg-white/5 transition">Cancel</button>
                <form id="admin-delete-form" method="POST" class="inline">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition">Delete</button>
                </form>
            </div>
        </div>
    </div>

    <script>
        (function() {
            var toast = document.getElementById('admin-toast');
            var toastError = document.getElementById('admin-toast-error');
            if (toast) setTimeout(function() { toast.remove(); }, 5000);
            if (toastError) setTimeout(function() { toastError.remove(); }, 8000);

            window.adminOpenDeleteModal = function(form, message) {
                var modal = document.getElementById('admin-delete-modal');
                var formEl = document.getElementById('admin-delete-form');
                var msgEl = document.getElementById('admin-delete-message');
                if (!modal || !formEl || !msgEl) return;
                formEl.action = form.action;
                msgEl.textContent = message || 'Are you sure you want to delete this item?';
                modal.classList.remove('admin-modal-hidden');
                document.body.style.overflow = 'hidden';
            };
            window.adminCloseDeleteModal = function() {
                var modal = document.getElementById('admin-delete-modal');
                if (modal) {
                    modal.classList.add('admin-modal-hidden');
                    document.body.style.overflow = '';
                }
            };
            document.querySelectorAll('.js-confirm-delete').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var form = btn.closest('form');
                    if (!form) return;
                    window.adminOpenDeleteModal(form, btn.getAttribute('data-confirm-message') || 'Are you sure you want to delete this item?');
                });
            });
        })();
    </script>
    @stack('scripts')
</body>
</html>
