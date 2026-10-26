@extends('admin.layout')

@section('title', 'Client Messages')

@section('content')
    @include('admin._page_header', [
        'title' => 'Client Inquiries & Leads',
        'subtitle' => 'Manage and respond to inbound messages from the website contact form.'
    ])

    <div class="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        @if($messages->isEmpty())
            <div class="p-16 text-center">
                <div class="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto mb-4 flex items-center justify-center">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <h3 class="text-base font-bold text-slate-900">No inquiries yet</h3>
                <p class="text-xs text-slate-500 mt-1">When prospective clients submit the contact form, messages will appear here.</p>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-slate-50/80 border-b border-slate-200/60">
                        <tr>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Sender</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Subject & Preview</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Date Received</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @foreach($messages as $msg)
                            <tr class="hover:bg-slate-50/60 transition-colors {{ !$msg->is_read ? 'bg-blue-50/20' : '' }}">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-9 h-9 rounded-xl {{ !$msg->is_read ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500' }} flex items-center justify-center font-bold text-xs shrink-0">
                                            {{ strtoupper(substr($msg->name, 0, 1)) }}
                                        </div>
                                        <div>
                                            <a href="{{ route('admin.messages.show', $msg) }}" class="font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors block">{{ $msg->name }}</a>
                                            <p class="text-xs text-slate-400 font-medium">{{ $msg->email }} {{ $msg->phone ? '&bull; ' . $msg->phone : '' }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 max-w-xs">
                                    <p class="text-xs font-bold text-slate-800 truncate">{{ $msg->subject ?: 'General Inquiry' }}</p>
                                    <p class="text-xs text-slate-500 truncate mt-0.5">{{ Str::limit($msg->message, 70) }}</p>
                                </td>
                                <td class="px-6 py-4">
                                    @if(!$msg->is_read)
                                        <span class="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 ring-1 ring-blue-200/60">New Unread</span>
                                    @else
                                        <span class="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">Read</span>
                                    @endif
                                </td>
                                <td class="px-6 py-4 text-xs text-slate-500 font-medium whitespace-nowrap">
                                    {{ $msg->created_at->format('M d, Y h:i A') }}
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex items-center justify-end gap-1.5">
                                        <a href="{{ route('admin.messages.show', $msg) }}" class="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Read message">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                        </a>
                                        <button type="button" onclick="openAdminDeleteModal('{{ route('admin.messages.destroy', $msg) }}', 'Delete this message permanently?')" class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            @if(method_exists($messages, 'links') && $messages->hasPages())
                <div class="px-6 py-4 border-t border-slate-100 bg-slate-50/40">
                    {{ $messages->links() }}
                </div>
            @endif
        @endif
    </div>
@endsection
