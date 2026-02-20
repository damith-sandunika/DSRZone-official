@extends('admin.layout')

@section('title', 'Edit Testimonial')

@section('content')
    <h1 class="text-2xl font-semibold text-amber-400 mb-6">Edit Testimonial</h1>
    <form action="{{ route('admin.testimonials.update', $testimonial) }}" method="POST" enctype="multipart/form-data" class="max-w-xl space-y-4">
        @csrf
        @method('PUT')
        <div>
            <label for="name" class="block text-sm text-gray-400 mb-1">Name *</label>
            <input type="text" name="name" id="name" value="{{ old('name', $testimonial->name) }}" required class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="product_name" class="block text-sm text-gray-400 mb-1">Product name</label>
            <input type="text" name="product_name" id="product_name" value="{{ old('product_name', $testimonial->product_name) }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="position" class="block text-sm text-gray-400 mb-1">Position</label>
            <input type="text" name="position" id="position" value="{{ old('position', $testimonial->position) }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="company" class="block text-sm text-gray-400 mb-1">Company</label>
            <input type="text" name="company" id="company" value="{{ old('company', $testimonial->company) }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="contact_details" class="block text-sm text-gray-400 mb-1">Contact details</label>
            <input type="text" name="contact_details" id="contact_details" value="{{ old('contact_details', $testimonial->contact_details) }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="testimonial" class="block text-sm text-gray-400 mb-1">Review text *</label>
            <textarea name="testimonial" id="testimonial" rows="4" required class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">{{ old('testimonial', $testimonial->testimonial) }}</textarea>
        </div>
        <div>
            <label for="avatar" class="block text-sm text-gray-400 mb-1">Profile photo</label>
            @if($testimonial->avatar)
                <p class="text-xs text-gray-500 mb-1">Current: <a href="{{ asset($testimonial->avatar) }}" target="_blank" class="text-amber-400 hover:underline">View</a></p>
            @endif
            <input type="file" name="avatar" id="avatar" accept="image/jpeg,image/png,image/jpg,image/gif,image/webp" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none file:mr-2 file:rounded file:border-0 file:bg-amber-500/20 file:px-3 file:py-1 file:text-amber-400">
            <p class="mt-1 text-xs text-gray-500">Leave empty to keep current. JPEG, PNG, GIF or WebP, max 2MB</p>
        </div>
        <div>
            <label for="rating" class="block text-sm text-gray-400 mb-1">Rating (1-5)</label>
            <input type="number" name="rating" id="rating" min="1" max="5" value="{{ old('rating', $testimonial->rating) }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="order" class="block text-sm text-gray-400 mb-1">Order</label>
            <input type="number" name="order" id="order" value="{{ old('order', $testimonial->order) }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <label class="flex items-center gap-2 text-sm text-gray-400">
            <input type="hidden" name="is_active" value="0">
            <input type="checkbox" name="is_active" value="1" {{ old('is_active', $testimonial->is_active) ? 'checked' : '' }} class="rounded border-amber-500/50 text-amber-500 focus:ring-amber-500">
            Active
        </label>
        <div class="flex gap-2">
            <button type="submit" class="rounded bg-amber-500 text-black font-medium px-4 py-2 hover:bg-amber-400 transition">Update</button>
            <a href="{{ route('admin.testimonials.index') }}" class="rounded border border-amber-500/30 px-4 py-2 hover:bg-white/5 transition">Cancel</a>
        </div>
    </form>
@endsection
