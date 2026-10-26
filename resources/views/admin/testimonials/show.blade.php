@extends('admin.layout')

@section('title', 'Review from ' . $testimonial->name)

@section('content')
    @php
        $approveBtn = $testimonial->is_active
            ? '<form method="POST" action="' . route('admin.testimonials.reject', $testimonial) . '" class="inline">'.csrf_field().'<button type="submit" class="px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-all">Unpublish Review</button></form>'
            : '<form method="POST" action="' . route('admin.testimonials.approve', $testimonial) . '" class="inline">'.csrf_field().'<button type="submit" class="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all">Approve & Publish</button></form>';
    @endphp

    @include('admin._page_header', [
        'title' => 'Client Testimonial: ' . $testimonial->name,
        'subtitle' => 'Inspect endorsement details, review rating, corporate designation, and approval status.',
        'actions' => '<a href="' . route('admin.testimonials.index') . '" class="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg> Back to Testimonials</a>' .
                     $approveBtn .
                     '<a href="' . route('admin.testimonials.edit', $testimonial) . '" class="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-[0_4px_12px_rgba(37,99,235,0.2)] transition-all hover:-translate-y-0.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg> Edit Review</a>'
    ])

    @php $media = app(\App\Services\MediaService::class); @endphp

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <h3 class="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">Review Feedback</h3>
                <p class="text-sm text-slate-700 leading-relaxed italic whitespace-pre-line">&ldquo;{{ $testimonial->testimonial }}&rdquo;</p>
            </div>
        </div>

        <div class="space-y-6">
            <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <h3 class="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">Client Details</h3>
                <div class="flex items-center gap-3.5 mb-4 pb-4 border-b border-slate-100">
                    <div class="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                        @if($testimonial->avatar)
                            <img src="{{ $media->url($testimonial->avatar) }}" alt="{{ $testimonial->name }}" class="w-full h-full object-cover">
                        @else
                            <span class="text-sm font-black text-slate-400">{{ strtoupper(substr($testimonial->name, 0, 1)) }}</span>
                        @endif
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-900 text-sm">{{ $testimonial->name }}</h4>
                        <p class="text-xs text-slate-500">{{ $testimonial->position ?: 'Client' }} &bull; {{ $testimonial->company ?: 'General' }}</p>
                    </div>
                </div>

                <dl class="space-y-3 text-xs">
                    <div class="flex justify-between">
                        <dt class="text-slate-400 font-bold uppercase tracking-wider">Rating:</dt>
                        <dd class="text-amber-500 font-bold">★ {{ $testimonial->rating ?? 5 }}/5</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-slate-400 font-bold uppercase tracking-wider">Product:</dt>
                        <dd class="text-slate-800 font-bold">{{ $testimonial->product_name ?: 'General DSRZone' }}</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-slate-400 font-bold uppercase tracking-wider">Submitted Date:</dt>
                        <dd class="text-slate-600 font-medium">{{ $testimonial->created_at->format('M d, Y') }}</dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
@endsection
