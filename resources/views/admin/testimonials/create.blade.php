@extends('admin.layout')

@section('title', 'Add Testimonial')

@section('content')
    <h1 class="text-2xl font-semibold text-amber-400 mb-6">Add Testimonial</h1>
    <form action="{{ route('admin.testimonials.store') }}" method="POST" enctype="multipart/form-data" class="max-w-xl space-y-4">
        @csrf
        <div>
            <label for="name" class="block text-sm text-gray-400 mb-1">Name *</label>
            <input type="text" name="name" id="name" value="{{ old('name') }}" required class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="product_name" class="block text-sm text-gray-400 mb-1">Product name</label>
            <input type="text" name="product_name" id="product_name" value="{{ old('product_name') }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" placeholder="e.g. Smarty Menu">
        </div>
        <div>
            <label for="position" class="block text-sm text-gray-400 mb-1">Position</label>
            <input type="text" name="position" id="position" value="{{ old('position') }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="company" class="block text-sm text-gray-400 mb-1">Company</label>
            <input type="text" name="company" id="company" value="{{ old('company') }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="contact_details" class="block text-sm text-gray-400 mb-1">Contact details</label>
            <input type="text" name="contact_details" id="contact_details" value="{{ old('contact_details') }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none" placeholder="Email or phone">
        </div>
        <div>
            <label for="testimonial" class="block text-sm text-gray-400 mb-1">Review text *</label>
            <textarea name="testimonial" id="testimonial" rows="4" required class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">{{ old('testimonial') }}</textarea>
        </div>
        <div>
            <label for="avatar" class="block text-sm text-gray-400 mb-1">Profile photo</label>
            <input type="file" name="avatar" id="avatar" accept="image/jpeg,image/png,image/jpg,image/gif,image/webp" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none file:mr-2 file:rounded file:border-0 file:bg-amber-500/20 file:px-3 file:py-1 file:text-amber-400">
            <p class="mt-1 text-xs text-gray-500">JPEG, PNG, GIF or WebP, max 2MB</p>
        </div>
        <div>
            <label for="rating" class="block text-sm text-gray-400 mb-1">Rating (1-5)</label>
            <input type="number" name="rating" id="rating" min="1" max="5" value="{{ old('rating') }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="order" class="block text-sm text-gray-400 mb-1">Order</label>
            <input type="number" name="order" id="order" value="{{ old('order', 0) }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <label class="flex items-center gap-2 text-sm text-gray-400">
            <input type="hidden" name="is_active" value="0">
            <input type="checkbox" name="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }} class="rounded border-amber-500/50 text-amber-500 focus:ring-amber-500">
            Active
        </label>
        <div class="flex gap-2">
            <button type="submit" class="rounded bg-amber-500 text-black font-medium px-4 py-2 hover:bg-amber-400 transition">Create</button>
            <a href="{{ route('admin.testimonials.index') }}" class="rounded border border-amber-500/30 px-4 py-2 hover:bg-white/5 transition">Cancel</a>
        </div>
    </form>
@endsection
