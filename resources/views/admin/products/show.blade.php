@extends('admin.layout')

@section('title', $product->name)

@section('content')
    @include('admin._page_header', [
        'title' => 'Product Details: ' . $product->name,
        'subtitle' => 'Inspect comprehensive telemetry, landing configuration, and pricing.',
        'actions' => '<a href="' . route('admin.products.index') . '" class="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg> Back to Products</a>' .
                     '<a href="' . url('/products/' . $product->slug) . '" target="_blank" class="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm transition-all"><span>Live Page</span><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>' .
                     '<a href="' . route('admin.products.edit', $product) . '" class="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-[0_4px_12px_rgba(37,99,235,0.2)] transition-all hover:-translate-y-0.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg> Edit Product</a>'
    ])

    @php $media = app(\App\Services\MediaService::class); @endphp

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
            {{-- Main Info Card --}}
            <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <h3 class="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">Product Information</h3>
                <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                        <dt class="font-bold text-slate-400 uppercase tracking-wider mb-1">Tagline</dt>
                        <dd class="text-slate-800 font-semibold">{{ $product->tagline ?: 'None' }}</dd>
                    </div>
                    <div>
                        <dt class="font-bold text-slate-400 uppercase tracking-wider mb-1">Slug</dt>
                        <dd class="text-slate-800 font-mono font-semibold">{{ $product->slug }}</dd>
                    </div>
                    <div class="sm:col-span-2">
                        <dt class="font-bold text-slate-400 uppercase tracking-wider mb-1">Short Description</dt>
                        <dd class="text-slate-700 leading-relaxed">{{ $product->description ?: 'None' }}</dd>
                    </div>
                    <div class="sm:col-span-2">
                        <dt class="font-bold text-slate-400 uppercase tracking-wider mb-1">Long Description</dt>
                        <dd class="text-slate-700 leading-relaxed whitespace-pre-line">{{ $product->long_description ?: 'None' }}</dd>
                    </div>
                </dl>
            </div>

            {{-- Features & Benefits Card --}}
            <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <h3 class="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">Features & Benefits</h3>
                <div class="space-y-4">
                    <div>
                        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Features</h4>
                        <div class="flex flex-wrap gap-2">
                            @forelse($product->features ?? [] as $f)
                                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                                    <svg class="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                                    {{ $f }}
                                </span>
                            @empty
                                <p class="text-xs text-slate-400">No key features listed.</p>
                            @endforelse
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- Right Side Specs & Images --}}
        <div class="space-y-6">
            {{-- Status & Pricing Card --}}
            <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <h3 class="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">Pricing & Status</h3>
                <div class="space-y-4 text-xs">
                    <div class="flex items-center justify-between">
                        <span class="text-slate-500 font-semibold">Publish Status:</span>
                        <span class="font-bold {{ $product->is_active ? 'text-emerald-600' : 'text-slate-400' }}">{{ $product->is_active ? 'Active' : 'Draft' }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-slate-500 font-semibold">Availability:</span>
                        <span class="inline-flex px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700">{{ ucfirst($product->status) }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-slate-500 font-semibold">One-Time Price:</span>
                        <span class="font-bold text-slate-900 text-sm">{{ $product->price_one_time ?: 'Contact us' }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-slate-500 font-semibold">Monthly Price:</span>
                        <span class="font-bold text-slate-900 text-sm">{{ $product->price_monthly ?: 'N/A' }}</span>
                    </div>
                </div>
            </div>

            {{-- Media Assets Card --}}
            <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <h3 class="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">Media Assets</h3>
                <div class="space-y-4">
                    @if($product->logo)
                        <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Product Logo</p>
                            <img src="{{ $media->url($product->logo) }}" alt="Logo" class="w-16 h-16 object-contain rounded-xl border border-slate-200 p-1.5" />
                        </div>
                    @endif
                    @if($product->background_image)
                        <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Background Banner</p>
                            <img src="{{ $media->url($product->background_image) }}" alt="Banner" class="w-full h-28 object-cover rounded-xl border border-slate-200" />
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection
