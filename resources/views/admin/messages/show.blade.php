@extends('admin.layout')

@section('title', 'Message from ' . $message->name)

@section('content')
    @include('admin._page_header', [
        'title' => 'Client Inquiry: ' . $message->name,
        'subtitle' => 'Received on ' . $message->created_at->format('M d, Y \a\t h:i A') . ' • Lead ID #' . $message->id,
        'actions' => '<a href="' . route('admin.messages.index') . '" class="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg> Back to Messages</a>' .
                     '<a href="mailto:' . $message->email . '?subject=Re: Inquiry on DSRZone" class="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-[0_4px_12px_rgba(37,99,235,0.2)] transition-all hover:-translate-y-0.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> Direct Reply</a>'
    ])

    <div class="bg-white rounded-2xl border border-slate-200/80 p-6 lg:p-8 shadow-sm max-w-3xl space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-100 gap-4">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 font-black text-base flex items-center justify-center shrink-0 border border-blue-100">
                    {{ strtoupper(substr($message->name, 0, 1)) }}
                </div>
                <div>
                    <h3 class="text-base font-bold text-slate-900">{{ $message->name }}</h3>
                    <p class="text-xs text-slate-500 font-medium">
                        <a href="mailto:{{ $message->email }}" class="text-blue-600 hover:underline">{{ $message->email }}</a>
                        @if($message->phone) &bull; <a href="tel:{{ $message->phone }}" class="text-slate-700 hover:underline">{{ $message->phone }}</a> @endif
                    </p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <a href="mailto:{{ $message->email }}?subject=Re: {{ rawurlencode($message->subject ?: 'DSRZone Inquiry') }}" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md shadow-blue-500/20 transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <span>Reply via Email</span>
                </a>
                <button type="button" onclick="openAdminDeleteModal('{{ route('admin.messages.destroy', $message) }}', 'Delete this message permanently?')" class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Delete">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
            </div>
        </div>

        <div>
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subject</h4>
            <p class="text-sm font-bold text-slate-900">{{ $message->subject ?: 'No subject specified' }}</p>
        </div>

        <div>
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message Content</h4>
            <div class="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                {{ $message->message }}
            </div>
        </div>
    </div>
@endsection
