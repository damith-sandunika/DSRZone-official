@extends('admin.layout')

@section('title', 'Add New Service')

@section('content')
    @include('admin._page_header', [
        'title' => 'Add New Service',
        'subtitle' => 'Define a digital service capability provided by DSRZone.',
        'actions' => '<a href="' . route('admin.services.index') . '" class="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg> Back to Services</a>'
    ])

    <div class="bg-white rounded-2xl border border-slate-200/80 p-6 lg:p-8 shadow-sm max-w-4xl">
        <form action="{{ route('admin.services.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
            @csrf

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div class="sm:col-span-2">
                    <label for="title" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Service Title *</label>
                    <input type="text" name="title" id="title" value="{{ old('title') }}" required placeholder="e.g. Web Development" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                </div>
                <div>
                    <label for="icon" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Icon / Emoji</label>
                    <input type="text" name="icon" id="icon" value="{{ old('icon', '🌐') }}" placeholder="e.g. 🌐, 📱, ⚙️, 📢" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                </div>
            </div>

            <div>
                <label for="subtitle" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Tagline / Short Subtitle</label>
                <input type="text" name="subtitle" id="subtitle" value="{{ old('subtitle') }}" placeholder="e.g. Modern & high-performance websites" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                <p class="text-[11px] text-slate-400 mt-1">This subtitle is shown under the service title in the left-hand timeline list.</p>
            </div>

            <div>
                <label for="description" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Service Overview Description *</label>
                <textarea name="description" id="description" rows="3" required placeholder="Describe what this service covers..." class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">{{ old('description') }}</textarea>
            </div>

            <!-- Service Feature Highlights (3 Key Points) -->
            <div class="pt-4 border-t border-slate-100">
                <div class="mb-3">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wider">Key Feature Highlights (Shown in 3D Card)</h3>
                    <p class="text-[11px] text-slate-500">Provide up to 3 strong selling points for this service.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    @for($i = 0; $i < 3; $i++)
                        @php
                            $defaultTitles = ['Fast & Responsive', 'Modern UI/UX', 'Secure & Scalable'];
                            $defaultDescs = ['Optimized for all devices', 'Clean and user-friendly designs', 'Built with best practices'];
                        @endphp
                        <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                            <span class="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-600">Feature {{ $i + 1 }}</span>
                            <div>
                                <label class="block text-[11px] font-bold text-slate-600 mb-1">Title</label>
                                <input type="text" name="features[{{ $i }}][title]" value="{{ old("features.$i.title", $defaultTitles[$i] ?? '') }}" placeholder="e.g. Fast & Responsive" class="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 focus:border-blue-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-[11px] font-bold text-slate-600 mb-1">Short Description</label>
                                <input type="text" name="features[{{ $i }}][description]" value="{{ old("features.$i.description", $defaultDescs[$i] ?? '') }}" placeholder="e.g. Optimized for all devices" class="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 focus:border-blue-500 outline-none">
                            </div>
                        </div>
                    @endfor
                </div>
            </div>

            <!-- Graphic Image for Service Card Showcase -->
            <div class="pt-4 border-t border-slate-100">
                <label for="image" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Service Showcase Image (Displayed Full-Width on Service Card) *</label>
                <input type="file" name="image" id="image" accept="image/*" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-600 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-bold">
                <p class="text-[11px] text-slate-400 mt-1">Recommended: 16:9 or 16:10 high-resolution graphic/screenshot. Displayed full-width on the service card.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                <div>
                    <label for="order" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Display Order</label>
                    <input type="number" name="order" id="order" value="{{ old('order', 0) }}" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none">
                </div>
                <div class="flex items-center pt-6">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }} class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500">
                        <span class="text-xs font-bold text-slate-700 uppercase tracking-wider">Active & Visible</span>
                    </label>
                </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <a href="{{ route('admin.services.index') }}" class="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</a>
                <button type="submit" class="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all">Create Service</button>
            </div>
        </form>
    </div>
@endsection
