@extends('admin.layout')

@section('title', $service->title)

@section('content')
    @include('admin._page_header', [
        'title' => 'Service Details: ' . $service->title,
        'subtitle' => 'Inspect complete digital service specifications and configuration.',
        'actions' => '<a href="' . route('admin.services.index') . '" class="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg> Back to Services</a>' .
                     '<a href="' . route('admin.services.edit', $service) . '" class="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-[0_4px_12px_rgba(37,99,235,0.2)] transition-all hover:-translate-y-0.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg> Edit Service</a>'
    ])

    @php $media = app(\App\Services\MediaService::class); @endphp

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <h3 class="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">Service Description</h3>
                <p class="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{{ $service->description }}</p>
            </div>
        </div>

        <div class="space-y-6">
            <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <h3 class="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">Service Attributes</h3>
                <dl class="space-y-3.5 text-xs">
                    <div class="flex justify-between">
                        <dt class="text-slate-400 font-bold uppercase tracking-wider">Icon / Symbol:</dt>
                        <dd class="text-base font-bold text-slate-900">{{ $service->icon ?: '⚡' }}</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-slate-400 font-bold uppercase tracking-wider">Display Order:</dt>
                        <dd class="text-slate-900 font-bold">{{ $service->order }}</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-slate-400 font-bold uppercase tracking-wider">Status:</dt>
                        <dd class="font-bold {{ $service->is_active ? 'text-emerald-600' : 'text-slate-400' }}">{{ $service->is_active ? 'Active' : 'Draft' }}</dd>
                    </div>
                </dl>
            </div>

            @if($service->image)
                <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                    <h3 class="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">Service Graphic</h3>
                    <img src="{{ $media->url($service->image) }}" alt="Preview" class="w-full h-36 object-contain rounded-xl border border-slate-200 p-2" />
                </div>
            @endif
        </div>
    </div>
@endsection
