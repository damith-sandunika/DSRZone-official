@extends('admin.layout')

@section('title', 'Messages')

@section('content')
    <div class="flex items-center gap-3 mb-6">
        <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </span>
        <h2 class="text-xl font-semibold text-white">Contact Messages</h2>
    </div>

    <div class="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
        @if($messages->isEmpty())
            <div class="p-12 text-center">
                <span class="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 text-gray-500 mx-auto mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </span>
                <p class="text-gray-400">No messages yet.</p>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-white/5 border-b border-white/10">
                        <tr>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">From</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Read</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-44">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        @foreach($messages as $m)
                            <tr class="hover:bg-white/[0.02] transition-colors {{ !$m->is_read ? 'bg-amber-500/5' : '' }}">
                                <td class="px-5 py-3 text-gray-300">{{ $m->name }} &lt;{{ $m->email }}&gt;</td>
                                <td class="px-5 py-3 font-medium text-white">{{ Str::limit($m->subject ?? $m->message, 40) }}</td>
                                <td class="px-5 py-3 text-gray-400 text-sm">{{ $m->created_at->format('M j, Y H:i') }}</td>
                                <td class="px-5 py-3">
                                    @if($m->is_read)
                                        <span class="text-gray-500">Yes</span>
                                    @else
                                        <span class="inline-flex items-center gap-1 text-amber-400 text-sm"><span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Unread</span>
                                    @endif
                                </td>
                                <td class="px-5 py-3">
                                    <div class="flex items-center gap-2">
                                        <a href="{{ route('admin.messages.show', $m) }}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-amber-400 hover:bg-amber-500/10 transition-colors">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                            View
                                        </a>
                                        <form action="{{ route('admin.messages.destroy', $m) }}" method="POST" class="inline">
                                            @csrf
                                            @method('DELETE')
                                            <button type="button" class="js-confirm-delete inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors" data-confirm-message="Delete this message?">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <div class="px-5 py-3 border-t border-white/10">
                {{ $messages->links() }}
            </div>
        @endif
    </div>
@endsection
