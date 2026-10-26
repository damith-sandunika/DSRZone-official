@extends('admin.layout')

@section('title', 'Add New Product')

@section('content')
    @include('admin._page_header', [
        'title' => 'Add New Product',
        'subtitle' => 'Create a software solution and configure its landing page specs.',
        'actions' => '<a href="' . route('admin.products.index') . '" class="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg> Back to Products</a>'
    ])

    <div class="bg-white rounded-2xl border border-slate-200/80 p-6 lg:p-8 shadow-sm max-w-4xl">
        <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
            @csrf

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label for="name" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Product Name *</label>
                    <input type="text" name="name" id="name" value="{{ old('name') }}" required placeholder="e.g. Smart POS System" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
                </div>
                <div>
                    <label for="slug" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Slug (Auto-generated if empty)</label>
                    <input type="text" name="slug" id="slug" value="{{ old('slug') }}" placeholder="smart-pos-system" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
                </div>
            </div>

            <div>
                <label for="tagline" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Tagline</label>
                <input type="text" name="tagline" id="tagline" value="{{ old('tagline') }}" placeholder="e.g. Next-Generation Retail Automation" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label for="description" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Short Description</label>
                    <textarea name="description" id="description" rows="3" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">{{ old('description') }}</textarea>
                </div>
                <div>
                    <label for="long_description" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Long Description</label>
                    <textarea name="long_description" id="long_description" rows="3" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">{{ old('long_description') }}</textarea>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                <div>
                    <label for="logo" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Product Logo</label>
                    <input type="file" name="logo" id="logo" accept="image/*" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-xs text-slate-600 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-bold">
                </div>
                <div>
                    <label for="background_image" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Product Background Image</label>
                    <input type="file" name="background_image" id="background_image" accept="image/*" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-xs text-slate-600 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-bold">
                </div>
            </div>

            @include('admin.products._landing_fields')

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-slate-100">
                <div>
                    <label for="status" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Status</label>
                    <select name="status" id="status" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none">
                        <option value="available" {{ old('status') === 'available' ? 'selected' : '' }}>Available</option>
                        <option value="coming_soon" {{ old('status') === 'coming_soon' ? 'selected' : '' }}>Coming Soon</option>
                    </select>
                </div>
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
                <a href="{{ route('admin.products.index') }}" class="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</a>
                <button type="submit" class="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all">Create Product</button>
            </div>
        </form>
    </div>
@endsection
