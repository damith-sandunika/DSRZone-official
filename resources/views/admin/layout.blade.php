<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Dashboard') – DSRZone Super Admin</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

    @vite(['resources/css/app.css'])
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        [x-cloak], .admin-toast-hidden, .admin-modal-hidden { display: none !important; }
        .admin-toast { animation: admin-slide-in 0.3s ease; }
        .admin-modal-backdrop { animation: admin-fade-in 0.2s ease; }
        .admin-modal-panel { animation: admin-scale-in 0.25s ease; }
        @keyframes admin-slide-in { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes admin-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes admin-scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    </style>
</head>
<body class="bg-[#f8fafc] text-slate-800 antialiased min-h-screen flex">
    {{-- Sidebar --}}
    <aside class="w-64 min-h-screen bg-white/90 backdrop-blur-xl border-r border-slate-200/80 flex flex-col shrink-0 sticky top-0 h-screen z-50">
        {{-- Brand Logo --}}
        <div class="p-6 border-b border-slate-100 flex flex-col items-center text-center bg-slate-50/40">
            <div class="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xl shadow-blue-500/15 ring-4 ring-white mb-2.5 text-blue-600 overflow-hidden">
                <img src="/images/dsrzone-favicon.png" alt="DSRZone Logo" class="w-full h-full object-cover rounded-2xl" />
            </div>
            <div class="text-base font-black text-slate-900 tracking-tight leading-tight">DSRZone</div>
            <div class="text-[9px] font-extrabold text-blue-600 uppercase tracking-widest mt-1">Super Admin Portal</div>
        </div>

        {{-- Nav Items --}}
        <nav class="p-4 flex-1 space-y-1.5 overflow-y-auto">
            @php
                $navs = [
                    ['route' => 'admin.dashboard', 'is' => 'admin.dashboard', 'label' => 'Dashboard', 'icon' => 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'],
                    ['route' => 'admin.services.index', 'is' => 'admin.services.*', 'label' => 'Services', 'icon' => 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
                    ['route' => 'admin.products.index', 'is' => 'admin.products.*', 'label' => 'Products', 'icon' => 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'],
                    ['route' => 'admin.projects.index', 'is' => 'admin.projects.*', 'label' => 'Projects', 'icon' => 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'],
                    ['route' => 'admin.testimonials.index', 'is' => 'admin.testimonials.*', 'label' => 'Testimonials', 'icon' => 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'],
                    ['route' => 'admin.messages.index', 'is' => 'admin.messages.*', 'label' => 'Messages', 'icon' => 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
                    ['route' => 'admin.contact.edit', 'is' => 'admin.contact.*', 'label' => 'Contact Details', 'icon' => 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'],
                ];
                $unreadCount = \App\Models\ContactMessage::where('is_read', false)->count();
            @endphp

            @foreach($navs as $nav)
                @php $active = request()->routeIs($nav['is']); @endphp
                <a href="{{ route($nav['route']) }}" class="flex items-center justify-between py-2.5 px-3.5 rounded-xl text-[13px] font-semibold transition-all duration-200 {{ $active ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100/60 font-bold' : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-900' }}">
                    <div class="flex items-center gap-3">
                        <svg class="w-4 h-4 shrink-0 {{ $active ? 'text-blue-600' : 'text-slate-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{{ $nav['icon'] }}"/></svg>
                        <span>{{ $nav['label'] }}</span>
                    </div>
                    @if($nav['route'] === 'admin.messages.index' && $unreadCount > 0)
                        <span class="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white shadow-sm">{{ $unreadCount }}</span>
                    @endif
                </a>
            @endforeach
        </nav>

        {{-- Sidebar Footer --}}
        <div class="p-4 border-t border-slate-100 text-center bg-slate-50/50">
            <div class="text-[11px] font-extrabold text-blue-600 tracking-widest uppercase mb-0.5">Powered by DSRZone</div>
            <div class="text-[9px] font-extrabold text-slate-400 tracking-widest uppercase">Enterprise Admin Operations</div>
        </div>
    </aside>

    {{-- Main Content Column --}}
    <div class="flex-1 flex flex-col min-w-0">
        {{-- Top Header Bar --}}
        <header class="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-40">
            <div class="flex items-center gap-3">
                <div>
                    <h2 class="text-base font-black text-slate-900 leading-none tracking-tight uppercase">DSRZone System</h2>
                    <div class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        Live Node &bull; Operational
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <a href="{{ url('/') }}" target="_blank" class="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200/80 px-3.5 py-2 rounded-xl transition-all">
                    <span>View Public Website</span>
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </a>

                <div class="flex items-center gap-2.5 pl-3 border-l border-slate-200">
                    <div class="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs shadow-md shadow-blue-500/20">
                        {{ strtoupper(substr(auth()->user()->name ?? 'A', 0, 1)) }}
                    </div>
                    <div class="hidden md:block text-left">
                        <p class="text-xs font-bold text-slate-900 leading-tight">{{ auth()->user()->name ?? 'Administrator' }}</p>
                        <p class="text-[10px] font-semibold text-slate-400">Super Admin</p>
                    </div>

                    <form method="POST" action="{{ route('admin.logout') }}" class="ml-2">
                        @csrf
                        <button type="submit" class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Logout">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                        </button>
                    </form>
                </div>
            </div>
        </header>

        {{-- Main Page Content --}}
        <main class="flex-1 p-6 lg:p-8 overflow-auto">
            {{-- Flash Alert Toasts --}}
            @if(session('success'))
                <div id="admin-toast" class="admin-toast fixed top-5 right-5 z-[100] max-w-sm rounded-2xl border border-emerald-200 bg-white shadow-xl shadow-emerald-500/10 p-4 flex items-start gap-3">
                    <span class="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    <div class="flex-1 min-w-0">
                        <p class="text-xs font-bold text-emerald-800">Success</p>
                        <p class="text-xs text-slate-600 mt-0.5">{{ session('success') }}</p>
                    </div>
                    <button type="button" onclick="this.closest('#admin-toast').remove()" class="text-slate-400 hover:text-slate-600 p-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
            @endif

            @if(isset($errors) && $errors->any())
                <div id="admin-toast-error" class="admin-toast fixed top-5 right-5 z-[100] max-w-sm rounded-2xl border border-red-200 bg-white shadow-xl shadow-red-500/10 p-4 flex items-start gap-3">
                    <span class="flex items-center justify-center w-8 h-8 rounded-xl bg-red-50 text-red-600 shrink-0">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </span>
                    <div class="flex-1 min-w-0">
                        <p class="text-xs font-bold text-red-800">Validation Error</p>
                        <p class="text-xs text-slate-600 mt-0.5">Please check and correct the fields.</p>
                    </div>
                    <button type="button" onclick="this.closest('#admin-toast-error').remove()" class="text-slate-400 hover:text-slate-600 p-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
            @endif

            @yield('content')
        </main>
    </div>

    {{-- Universal Delete Confirmation Modal --}}
    <div id="admin-delete-modal" class="admin-modal-hidden fixed inset-0 z-[150] flex items-center justify-center p-4">
        <div class="admin-modal-backdrop fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onclick="closeAdminDeleteModal()"></div>
        <div class="admin-modal-panel relative bg-white rounded-2xl border border-slate-200 p-6 max-w-md w-full shadow-2xl z-10">
            <div class="flex items-center gap-3.5 mb-4">
                <div class="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </div>
                <div>
                    <h4 class="font-bold text-slate-900 text-base">Confirm Deletion</h4>
                    <p id="admin-delete-modal-msg" class="text-xs text-slate-500 mt-0.5">Are you sure you want to permanently delete this item?</p>
                </div>
            </div>
            <div class="flex items-center justify-end gap-3 mt-6">
                <button type="button" onclick="closeAdminDeleteModal()" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
                <form id="admin-delete-modal-form" method="POST" action="">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20 transition-colors">Delete Permanently</button>
                </form>
            </div>
        </div>
    </div>

    <script>
        function openAdminDeleteModal(actionUrl, msg) {
            document.getElementById('admin-delete-modal-form').action = actionUrl;
            if (msg) document.getElementById('admin-delete-modal-msg').textContent = msg;
            document.getElementById('admin-delete-modal').classList.remove('admin-modal-hidden');
        }
        function closeAdminDeleteModal() {
            document.getElementById('admin-delete-modal').classList.add('admin-modal-hidden');
        }
    </script>
</body>
</html>
