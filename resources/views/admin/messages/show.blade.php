@extends('admin.layout')

@section('title', 'Message')

@section('content')
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <a href="{{ route('admin.messages.index') }}" class="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to messages
        </a>
        <form action="{{ route('admin.messages.destroy', $message) }}" method="POST" class="inline">
            @csrf
            @method('DELETE')
            <button type="button" class="js-confirm-delete inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors" data-confirm-message="Delete this message?">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                Delete message
            </button>
        </form>
    </div>
    <div class="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden max-w-2xl">
        <div class="px-6 py-4 border-b border-white/10 flex items-center gap-3">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 text-sm font-medium">{{ strtoupper(substr($message->name ?? '?', 0, 1)) }}</span>
            <div>
                <h2 class="font-semibold text-white">{{ $message->name }}</h2>
                <p class="text-sm text-gray-400">{{ $message->email }}</p>
            </div>
        </div>
        <div class="p-6 space-y-4 text-sm">
            @if($message->phone)
                <p><span class="text-gray-500">Phone:</span> <span class="text-gray-300">{{ $message->phone }}</span></p>
            @endif
            @if($message->subject)
                <p><span class="text-gray-500">Subject:</span> <span class="text-gray-300">{{ $message->subject }}</span></p>
            @endif
            <p><span class="text-gray-500">Date:</span> <span class="text-gray-400">{{ $message->created_at->format('M j, Y H:i') }}</span></p>
        </div>
        <div class="px-6 pb-6 pt-2 border-t border-white/10">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Message</p>
            <div class="rounded-lg bg-white/5 border border-white/5 p-4 whitespace-pre-wrap text-gray-300">{{ $message->message }}</div>
        </div>
    </div>
@endsection
