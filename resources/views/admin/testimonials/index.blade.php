@extends('admin.layout')

@section('title', 'Testimonials')

@section('content')
    @include('admin._page_header', [
        'title' => 'Client Testimonials & Endorsements',
        'subtitle' => 'Manage verified client reviews, star ratings, and publication approvals.',
        'actions' => '<a href="' . route('admin.testimonials.create') . '" class="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-[0_4px_12px_rgba(37,99,235,0.2)] transition-all hover:-translate-y-0.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg> Add Testimonial</a>'
    ])

    @php $media = app(\App\Services\MediaService::class); @endphp

    <div class="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        @if($testimonials->isEmpty())
            <div class="p-16 text-center">
                <div class="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto mb-4 flex items-center justify-center">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>
                </div>
                <h3 class="text-base font-bold text-slate-900">No testimonials recorded</h3>
                <p class="text-xs text-slate-500 mt-1 mb-5">Feedback submitted on the website will appear here for review.</p>
                <a href="{{ route('admin.testimonials.create') }}" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all">Add First Review</a>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-slate-50/80 border-b border-slate-200/60">
                        <tr>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Review</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Approval</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @foreach($testimonials as $t)
                            <tr class="hover:bg-slate-50/60 transition-colors">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-full bg-slate-100 border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center">
                                            @if($t->avatar)
                                                <img src="{{ $media->url($t->avatar) }}" alt="{{ $t->name }}" class="w-full h-full object-cover">
                                            @else
                                                <span class="text-xs font-black text-slate-400">{{ strtoupper(substr($t->name, 0, 1)) }}</span>
                                            @endif
                                        </div>
                                        <div>
                                            <a href="{{ route('admin.testimonials.show', $t) }}" class="font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors block">{{ $t->name }}</a>
                                            <p class="text-[11px] text-slate-400">{{ $t->position ? $t->position . ', ' : '' }}{{ $t->company ?: 'Client' }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-xs text-slate-600 max-w-xs truncate">{{ $t->testimonial }}</td>
                                <td class="px-6 py-4">
                                    <span class="inline-flex items-center gap-1 text-xs font-bold text-amber-500">
                                        ★ {{ $t->rating ?? 5 }}/5
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    @if($t->is_active)
                                        <form method="POST" action="{{ route('admin.testimonials.reject', $t) }}" class="inline">
                                            @csrf
                                            <button type="submit" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60 hover:bg-red-50 hover:text-red-700 hover:ring-red-200 transition-all" title="Click to unpublish">
                                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Approved
                                            </button>
                                        </form>
                                    @else
                                        <form method="POST" action="{{ route('admin.testimonials.approve', $t) }}" class="inline">
                                            @csrf
                                            <button type="submit" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-700 ring-1 ring-amber-200/60 hover:bg-emerald-50 hover:text-emerald-700 hover:ring-emerald-200 transition-all" title="Click to approve">
                                                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pending Review
                                            </button>
                                        </form>
                                    @endif
                                </td>
                                <td class="px-6 py-4 text-right">
                                    @include('admin._table_actions', [
                                        'viewUrl' => route('admin.testimonials.show', $t),
                                        'editUrl' => route('admin.testimonials.edit', $t),
                                        'deleteUrl' => route('admin.testimonials.destroy', $t),
                                        'deleteLabel' => 'Permanently delete this testimonial?',
                                    ])
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            @if(method_exists($testimonials, 'links') && $testimonials->hasPages())
                <div class="px-6 py-4 border-t border-slate-100 bg-slate-50/40">
                    {{ $testimonials->links() }}
                </div>
            @endif
        @endif
    </div>
@endsection
