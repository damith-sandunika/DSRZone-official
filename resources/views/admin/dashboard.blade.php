@extends('admin.layout')

@section('title', 'Dashboard')

@section('content')
    @include('admin._page_header', [
        'title' => 'Super Admin Dashboard',
        'subtitle' => 'Overview of DSRZone digital operations, client inquiries, and live systems.',
        'actions' => '<a href="' . route('admin.products.create') . '" class="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-[0_4px_12px_rgba(37,99,235,0.2)] transition-all hover:-translate-y-0.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg> Add Product</a>' .
                     '<a href="' . route('admin.projects.create') . '" class="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg> Add Project</a>'
    ])

    {{-- 4 Stat Metric Cards --}}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            </div>
            <div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Products</p>
                <p class="text-2xl font-black text-slate-900 mt-0.5">{{ $stats['products'] }}</p>
            </div>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
            </div>
            <div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Portfolio Projects</p>
                <p class="text-2xl font-black text-slate-900 mt-0.5">{{ $stats['projects'] }}</p>
            </div>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Services</p>
                <p class="text-2xl font-black text-slate-900 mt-0.5">{{ $stats['services'] }}</p>
            </div>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Unread Inquiries</p>
                <p class="text-2xl font-black text-slate-900 mt-0.5">{{ $stats['messages_unread'] }}</p>
            </div>
        </div>
    </div>

    {{-- Main 2-Column Grid --}}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {{-- Left 2-Cols: Recent Messages --}}
        <div class="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
            <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h3 class="font-bold text-slate-900 text-base">Recent Client Inquiries</h3>
                    <p class="text-xs text-slate-500 mt-0.5">Inbound leads from contact form</p>
                </div>
                <a href="{{ route('admin.messages.index') }}" class="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <span>View All Messages</span>
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
            </div>
            <div class="divide-y divide-slate-100">
                @forelse($recentMessages as $msg)
                    <div class="p-5 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                        <div class="min-w-0 pr-4">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="font-bold text-slate-900 text-sm truncate">{{ $msg->name }}</span>
                                @if(!$msg->is_read)
                                    <span class="inline-flex px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-700 ring-1 ring-amber-200/60">New</span>
                                @endif
                            </div>
                            <p class="text-xs text-slate-600 truncate max-w-md">{{ $msg->subject ?: Str::limit($msg->message, 80) }}</p>
                            <p class="text-[11px] text-slate-400 mt-1">{{ $msg->email }} &bull; {{ $msg->created_at->diffForHumans() }}</p>
                        </div>
                        <a href="{{ route('admin.messages.show', $msg) }}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors shrink-0">
                            <span>Read</span>
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                        </a>
                    @empty
                        <div class="p-8 text-center text-slate-400 text-sm">No client messages yet.</div>
                    @endforelse
                </div>
            </div>

            {{-- Right Col: System Actions --}}
            <div class="space-y-6">
                <div class="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6">
                    <h3 class="font-bold text-slate-900 text-base mb-4">Quick Operations</h3>
                    <div class="space-y-3">
                        <a href="{{ route('admin.products.index') }}" class="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-slate-100">
                            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                            </div>
                            <div>
                                <p class="font-bold text-slate-900 text-xs">Manage Products</p>
                                <p class="text-[11px] text-slate-400">Add, edit pricing, landing content</p>
                            </div>
                        </a>

                        <a href="{{ route('admin.projects.index') }}" class="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-slate-100">
                            <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
                            </div>
                            <div>
                                <p class="font-bold text-slate-900 text-xs">Manage Portfolio</p>
                                <p class="text-[11px] text-slate-400">Projects, case studies & map pins</p>
                            </div>
                        </a>

                        <a href="{{ route('admin.testimonials.index') }}" class="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-slate-100">
                            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>
                            </div>
                            <div>
                                <p class="font-bold text-slate-900 text-xs">Review Testimonials</p>
                                <p class="text-[11px] text-slate-400">Approve or reject customer reviews</p>
                            </div>
                        </a>

                        <a href="{{ route('admin.contact.edit') }}" class="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-slate-100">
                            <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                            </div>
                            <div>
                                <p class="font-bold text-slate-900 text-xs">General Contact Info</p>
                                <p class="text-[11px] text-slate-400">Phone, WhatsApp, social links</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
@endsection
