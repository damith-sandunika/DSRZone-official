@extends('admin.layout')

@section('title', 'Edit Product')

@section('content')
    <h1 class="text-2xl font-semibold text-amber-400 mb-6">Edit Product</h1>
    <form action="{{ route('admin.products.update', $product) }}" method="POST" enctype="multipart/form-data" class="max-w-xl space-y-4">
        @csrf
        @method('PUT')
        <div>
            <label for="name" class="block text-sm text-gray-400 mb-1">Name</label>
            <input type="text" name="name" id="name" value="{{ old('name', $product->name) }}" required class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="slug" class="block text-sm text-gray-400 mb-1">Slug</label>
            <input type="text" name="slug" id="slug" value="{{ old('slug', $product->slug) }}" required class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="tagline" class="block text-sm text-gray-400 mb-1">Tagline</label>
            <input type="text" name="tagline" id="tagline" value="{{ old('tagline', $product->tagline) }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="description" class="block text-sm text-gray-400 mb-1">Short description</label>
            <textarea name="description" id="description" rows="2" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">{{ old('description', $product->description) }}</textarea>
        </div>
        <div>
            <label for="long_description" class="block text-sm text-gray-400 mb-1">Long description</label>
            <textarea name="long_description" id="long_description" rows="4" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">{{ old('long_description', $product->long_description) }}</textarea>
        </div>
        <div>
            <label for="icon" class="block text-sm text-gray-400 mb-1">Product icon (optional)</label>
            @php
                $iconUrl = $product->icon && str_starts_with($product->icon, 'products/') ? asset('storage/'.$product->icon) : null;
            @endphp
            @if($iconUrl)
                <p class="text-xs text-emerald-400 mb-1">✓ Saved. Preview:</p>
                <img src="{{ $iconUrl }}" alt="Icon" class="h-12 w-12 object-contain rounded border border-white/10 mb-2 bg-white/5">
            @elseif($product->icon)
                <p class="text-xs text-gray-500 mb-1">Current: {{ $product->icon }}</p>
            @endif
            <input type="file" name="icon" id="icon" accept="image/*" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none file:mr-2 file:rounded file:border-0 file:bg-amber-500/20 file:px-3 file:py-1 file:text-amber-400">
            <p class="text-xs text-gray-500 mt-1">Upload a small icon image. Max 5MB.</p>
        </div>
        <div>
            <label for="logo" class="block text-sm text-gray-400 mb-1">Product logo (optional)</label>
            @php
                $logoUrl = $product->logo ? (str_starts_with($product->logo, 'products/') ? asset('storage/'.$product->logo) : (str_starts_with($product->logo, 'http') ? $product->logo : asset(ltrim($product->logo, '/')))) : null;
            @endphp
            @if($logoUrl)
                <p class="text-xs text-emerald-400 mb-1">✓ Saved. Preview:</p>
                <img src="{{ $logoUrl }}" alt="Logo" class="h-16 w-16 object-contain rounded border border-white/10 mb-2 bg-white/5">
            @endif
            <input type="file" name="logo" id="logo" accept="image/*" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none file:mr-2 file:rounded file:border-0 file:bg-amber-500/20 file:px-3 file:py-1 file:text-amber-400">
            <p class="text-xs text-gray-500 mt-1">The file box will always show &quot;No file chosen&quot; until you pick a new file. Choose a file only to replace the image above. Max 5MB (JPEG, PNG, GIF, WebP).</p>
        </div>
        @include('admin.products._landing_fields', ['product' => $product])
        <div>
            <label for="accent_color" class="block text-sm text-gray-400 mb-1">Accent color (hex)</label>
            <div class="flex gap-2 items-center">
                <input type="color" id="accent_color_swatch" value="{{ old('accent_color', $product->accent_color ?? '#f59e0b') }}" class="h-10 w-14 rounded border border-amber-500/30 bg-white/5 cursor-pointer" aria-label="Pick color">
                <input type="text" name="accent_color" id="accent_color" value="{{ old('accent_color', $product->accent_color ?? '#f59e0b') }}" placeholder="#f59e0b" maxlength="20" class="flex-1 rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
            </div>
            <p class="text-xs text-gray-500 mt-1">Used for buttons and highlights on the product detail page.</p>
            <script>
                (function(){
                    var swatch = document.getElementById('accent_color_swatch');
                    var text = document.getElementById('accent_color');
                    if (!swatch || !text) return;
                    swatch.addEventListener('input', function(){ text.value = swatch.value; });
                    text.addEventListener('input', function(){
                        if (/^#[0-9A-Fa-f]{6}$/.test(text.value)) swatch.value = text.value;
                    });
                })();
            </script>
        </div>
        <div>
            <label for="status" class="block text-sm text-gray-400 mb-1">Status</label>
            <select name="status" id="status" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
                <option value="available" {{ old('status', $product->status) === 'available' ? 'selected' : '' }}>Available</option>
                <option value="coming_soon" {{ old('status', $product->status) === 'coming_soon' ? 'selected' : '' }}>Coming soon</option>
            </select>
        </div>
        <div>
            <label class="block text-sm text-gray-400 mb-1">Features (one per line)</label>
            <textarea name="features_text" id="features_text" rows="5" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">{{ old('features_text', is_array(old('features')) ? implode("\n", old('features')) : implode("\n", $product->features ?? [])) }}</textarea>
        </div>
        <div>
            <label for="order" class="block text-sm text-gray-400 mb-1">Order</label>
            <input type="number" name="order" id="order" value="{{ old('order', $product->order) }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <label class="flex items-center gap-2 text-sm text-gray-400">
            <input type="hidden" name="is_active" value="0">
            <input type="checkbox" name="is_active" value="1" {{ old('is_active', $product->is_active) ? 'checked' : '' }} class="rounded border-amber-500/50 text-amber-500 focus:ring-amber-500">
            Active
        </label>
        <div class="flex gap-2">
            <button type="submit" class="rounded bg-amber-500 text-black font-medium px-4 py-2 hover:bg-amber-400 transition">Update</button>
            <a href="{{ route('admin.products.index') }}" class="rounded border border-amber-500/30 px-4 py-2 hover:bg-white/5 transition">Cancel</a>
        </div>
    </form>
@endsection
