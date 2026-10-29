@extends('admin.layout')

@section('title', 'Edit ' . $project->title)

@section('content')
    @include('admin._page_header', [
        'title' => 'Edit Project: ' . $project->title,
        'subtitle' => 'Modify ' . $project->title . ' case study, screenshots, technologies, and live URLs.',
        'actions' => '<a href="' . route('admin.projects.index') . '" class="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg> Back to Projects</a>'
    ])

    @php $media = app(\App\Services\MediaService::class); @endphp

    <div class="bg-white rounded-2xl border border-slate-200/80 p-6 lg:p-8 shadow-sm max-w-4xl">
        <form action="{{ route('admin.projects.update', $project) }}" method="POST" enctype="multipart/form-data" class="space-y-6">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label for="title" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Project Title *</label>
                    <input type="text" name="title" id="title" value="{{ old('title', $project->title) }}" required class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                </div>
                <div>
                    <label for="product_id" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Related Product</label>
                    <select name="product_id" id="product_id" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none">
                        <option value="">None / Independent Project</option>
                        @foreach(\App\Models\Product::orderBy('name')->get() as $prod)
                            <option value="{{ $prod->id }}" {{ old('product_id', $project->product_id) == $prod->id ? 'selected' : '' }}>{{ $prod->name }}</option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label for="client" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Client Name / Business</label>
                    <input type="text" name="client" id="client" value="{{ old('client', $project->client) }}" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                </div>
                <div>
                    <label for="category" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Category</label>
                    <input type="text" name="category" id="category" value="{{ old('category', $project->category) }}" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label for="problem" class="block text-xs font-bold text-red-600 uppercase tracking-wider mb-1.5">The Problem Faced</label>
                    <textarea name="problem" id="problem" rows="3" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">{{ old('problem', $project->problem) }}</textarea>
                </div>
                <div>
                    <label for="solution" class="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1.5">Our Engineered Solution</label>
                    <textarea name="solution" id="solution" rows="3" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">{{ old('solution', $project->solution) }}</textarea>
                </div>
            </div>

            <div>
                <label for="technologies_text" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Technologies (comma-separated)</label>
                <input type="text" name="technologies_text" id="technologies_text" value="{{ old('technologies_text', is_array($project->technologies) ? implode(', ', $project->technologies) : '') }}" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                <div>
                    <label for="image" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Project Cover Image</label>
                    @if($project->image)
                        <div class="mb-2">
                            <img src="{{ $media->url($project->image) }}" alt="Current Image" class="h-16 w-32 object-cover rounded-xl border border-slate-200">
                        </div>
                    @endif
                    <input type="file" name="image" id="image" accept="image/*" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-xs text-slate-600 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-bold">
                </div>
                <div>
                    <label for="logo" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Project Logo</label>
                    @if($project->logo)
                        <div class="mb-2">
                            <img src="{{ $media->url($project->logo) }}" alt="Current Logo" class="h-12 w-12 object-contain rounded-xl border border-slate-200 p-1">
                        </div>
                    @endif
                    <input type="file" name="logo" id="logo" accept="image/*" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-xs text-slate-600 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-bold">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-slate-100">
                <div>
                    <label for="accent_color" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Brand / Accent Color</label>
                    <div class="flex items-center gap-2">
                        <input type="color" id="accent_color_picker" value="{{ old('accent_color', $project->accent_color ?? '#0070f3') }}" class="w-10 h-10 rounded-lg cursor-pointer border border-slate-200 p-0.5 bg-white" onchange="document.getElementById('accent_color').value = this.value">
                        <input type="text" name="accent_color" id="accent_color" value="{{ old('accent_color', $project->accent_color ?? '#0070f3') }}" placeholder="#0070f3" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm font-mono text-slate-800 focus:bg-white focus:border-blue-500 outline-none">
                    </div>
                </div>
                <div>
                    <label for="order" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Display Order</label>
                    <input type="number" name="order" id="order" value="{{ old('order', $project->order) }}" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none">
                </div>
                <div class="flex items-center gap-6 pt-6">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="is_featured" value="1" {{ old('is_featured', $project->is_featured) ? 'checked' : '' }} class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500">
                        <span class="text-xs font-bold text-slate-700 uppercase tracking-wider">Featured</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="is_active" value="1" {{ old('is_active', $project->is_active) ? 'checked' : '' }} class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500">
                        <span class="text-xs font-bold text-slate-700 uppercase tracking-wider">Active</span>
                    </label>
                </div>
            </div>

            {{-- ── INTERACTIVE SRI LANKA MAP PIN PICKER ── --}}
            @include('admin.projects._map_picker')

            <div class="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <a href="{{ route('admin.projects.index') }}" class="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</a>
                <button type="submit" class="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all">Update Project</button>
            </div>
        </form>
    </div>
@endsection
