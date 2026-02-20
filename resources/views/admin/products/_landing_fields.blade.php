@php
    $product = $product ?? null;
    $benefits = old('benefits', $product ? ($product->benefits ?? []) : []);
    $benefits = is_array($benefits) ? $benefits : [];
    $galleryImages = old('gallery_images', $product ? ($product->gallery_images ?? []) : []);
    $galleryImages = is_array($galleryImages) ? $galleryImages : [];
    $benefitIconUrl = function($icon) {
        if (!$icon) return null;
        if (str_starts_with($icon, 'products/')) return asset('storage/'.$icon);
        if (str_starts_with($icon, 'http')) return $icon;
        return asset(ltrim($icon, '/'));
    };
    $galleryImageUrl = function($path) {
        if (!$path) return null;
        if (str_starts_with($path, 'products/')) return asset('storage/'.$path);
        if (str_starts_with($path, 'http')) return $path;
        return asset(ltrim($path, '/'));
    };
@endphp
<div class="border-t border-amber-500/20 pt-6 mt-6">
    <h2 class="text-lg font-medium text-amber-400 mb-4">Landing page</h2>
    <div class="space-y-4">
        <div>
            <label for="background_image" class="block text-sm text-gray-400 mb-1">Background image (optional)</label>
            @php
                $bgUrl = $product?->background_image ? (str_starts_with($product->background_image, 'products/') ? asset('storage/'.$product->background_image) : (str_starts_with($product->background_image, 'http') ? $product->background_image : asset(ltrim($product->background_image, '/')))) : null;
            @endphp
            @if($bgUrl)
                <p class="text-xs text-emerald-400 mb-1">✓ Saved. Preview:</p>
                <img src="{{ $bgUrl }}" alt="Background" class="h-20 w-full max-w-xs object-cover rounded border border-white/10 mb-2 bg-white/5">
            @endif
            <input type="file" name="background_image" id="background_image" accept="image/*" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none file:mr-2 file:rounded file:border-0 file:bg-amber-500/20 file:px-3 file:py-1 file:text-amber-400">
            <p class="text-xs text-gray-500 mt-1">File box shows &quot;No file chosen&quot; until you pick a new file. Max 5MB.</p>
        </div>
        <div>
            <label for="background_overlay" class="block text-sm text-gray-400 mb-1">Background dark effect (0–100)</label>
            <input type="range" name="background_overlay" id="background_overlay" min="0" max="100" value="{{ old('background_overlay', $product?->background_overlay ?? 35) }}" class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/10 accent-amber-500">
            <p class="text-xs text-gray-500 mt-1"><span id="background_overlay_value">{{ old('background_overlay', $product?->background_overlay ?? 35) }}</span> — Higher = darker overlay on product detail page. 0 = no overlay, 100 = full dark.</p>
            <script>
                (function(){
                    var r = document.getElementById('background_overlay');
                    var v = document.getElementById('background_overlay_value');
                    if (r && v) r.addEventListener('input', function(){ v.textContent = r.value; });
                })();
            </script>
        </div>
    </div>
</div>
<div class="border-t border-amber-500/20 pt-6 mt-6">
    <h2 class="text-lg font-medium text-amber-400 mb-4">Call-to-action buttons</h2>
    <div class="grid grid-cols-2 gap-4">
        <div>
            <label for="cta_primary_text" class="block text-sm text-gray-400 mb-1">Primary button text</label>
            <input type="text" name="cta_primary_text" id="cta_primary_text" value="{{ old('cta_primary_text', $product?->cta_primary_text) }}" placeholder="e.g. Download Demo" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="cta_primary_url" class="block text-sm text-gray-400 mb-1">Primary button URL</label>
            <input type="text" name="cta_primary_url" id="cta_primary_url" value="{{ old('cta_primary_url', $product?->cta_primary_url) }}" placeholder="https://..." class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="cta_secondary_text" class="block text-sm text-gray-400 mb-1">Secondary button text</label>
            <input type="text" name="cta_secondary_text" id="cta_secondary_text" value="{{ old('cta_secondary_text', $product?->cta_secondary_text) }}" placeholder="e.g. Buy Now" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="cta_secondary_url" class="block text-sm text-gray-400 mb-1">Secondary button URL</label>
            <input type="text" name="cta_secondary_url" id="cta_secondary_url" value="{{ old('cta_secondary_url', $product?->cta_secondary_url) }}" placeholder="https://..." class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
    </div>
</div>

<div class="border-t border-amber-500/20 pt-6 mt-6">
    <h2 class="text-lg font-medium text-amber-400 mb-4">Key benefits</h2>
    <p class="text-xs text-gray-500 mb-3">Add or remove rows. Upload an icon image per benefit (or leave empty).</p>
    <div id="benefits-list" class="space-y-3" data-next-index="{{ count($benefits) }}">
        @foreach($benefits as $i => $b)
        <div class="benefit-row rounded border border-amber-500/20 p-3 bg-white/5 flex gap-2 items-start flex-wrap">
            <div class="flex-shrink-0">
                @if($iconUrl = $benefitIconUrl($b['icon'] ?? null))
                    <img src="{{ $iconUrl }}" alt="" class="h-10 w-10 object-contain rounded border border-white/10 mb-1">
                @endif
                <input type="file" name="benefits[{{ $i }}][icon_file]" accept="image/*" class="w-full text-sm text-gray-400 file:mr-1 file:rounded file:border-0 file:bg-amber-500/20 file:px-2 file:py-0.5 file:text-amber-400 file:text-xs">
            </div>
            <input type="hidden" name="benefits[{{ $i }}][icon]" value="{{ $b['icon'] ?? '' }}">
            <div class="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input type="text" name="benefits[{{ $i }}][title]" value="{{ $b['title'] ?? '' }}" placeholder="Title" class="rounded border border-amber-500/30 bg-white/5 px-2 py-1.5 text-white text-sm focus:border-amber-500 focus:outline-none">
                <input type="text" name="benefits[{{ $i }}][description]" value="{{ $b['description'] ?? '' }}" placeholder="Description" class="rounded border border-amber-500/30 bg-white/5 px-2 py-1.5 text-white text-sm focus:border-amber-500 focus:outline-none">
            </div>
            <button type="button" class="remove-benefit text-red-400 hover:text-red-300 text-sm px-2 py-1">Remove</button>
        </div>
        @endforeach
    </div>
    <button type="button" id="add-benefit" class="mt-2 rounded border border-amber-500/30 px-3 py-1.5 text-sm text-amber-400 hover:bg-amber-500/10 transition">+ Add benefit</button>
</div>

<div class="border-t border-amber-500/20 pt-6 mt-6">
    <h2 class="text-lg font-medium text-amber-400 mb-4">Slider / Gallery images</h2>
    <p class="text-xs text-gray-500 mb-3">Images shown in the slider on the product detail page (top right). Click image on site to view full screen.</p>
    <div id="gallery-images-list" class="space-y-2 mb-3">
        @foreach($galleryImages as $i => $path)
        <div class="gallery-image-row flex items-center gap-3 rounded border border-amber-500/20 p-2 bg-white/5">
            <input type="hidden" name="gallery_images[]" value="{{ $path }}">
            @if($url = $galleryImageUrl($path))
                <img src="{{ $url }}" alt="" class="h-14 w-14 object-cover rounded border border-white/10">
            @endif
            <span class="text-sm text-gray-400 flex-1 truncate">{{ $path }}</span>
            <button type="button" class="remove-gallery-image text-red-400 hover:text-red-300 text-sm px-2 py-1">Remove</button>
        </div>
        @endforeach
    </div>
    <label class="block text-sm text-gray-400 mb-1">Add new images</label>
    <input type="file" name="gallery_images_new[]" id="gallery_images_new" accept="image/*" multiple class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none file:mr-2 file:rounded file:border-0 file:bg-amber-500/20 file:px-3 file:py-1 file:text-amber-400">
    <p class="text-xs text-gray-500 mt-1">Select one or more images. Max 5MB each (JPEG, PNG, GIF, WebP).</p>
</div>

<script>
(function() {
    var nextBenefit = document.getElementById('benefits-list').getAttribute('data-next-index') || 0;

    document.getElementById('add-benefit').addEventListener('click', function() {
        var list = document.getElementById('benefits-list');
        var row = document.createElement('div');
        row.className = 'benefit-row rounded border border-amber-500/20 p-3 bg-white/5 flex gap-2 items-start flex-wrap';
        row.innerHTML = '<div class="flex-shrink-0"><input type="file" name="benefits[' + nextBenefit + '][icon_file]" accept="image/*" class="w-full text-sm text-gray-400 file:mr-1 file:rounded file:border-0 file:bg-amber-500/20 file:px-2 file:py-0.5 file:text-amber-400 file:text-xs"></div>' +
            '<input type="hidden" name="benefits[' + nextBenefit + '][icon]" value="">' +
            '<div class="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-2">' +
            '<input type="text" name="benefits[' + nextBenefit + '][title]" value="" placeholder="Title" class="rounded border border-amber-500/30 bg-white/5 px-2 py-1.5 text-white text-sm focus:border-amber-500 focus:outline-none">' +
            '<input type="text" name="benefits[' + nextBenefit + '][description]" value="" placeholder="Description" class="rounded border border-amber-500/30 bg-white/5 px-2 py-1.5 text-white text-sm focus:border-amber-500 focus:outline-none"></div>' +
            '<button type="button" class="remove-benefit text-red-400 hover:text-red-300 text-sm px-2 py-1">Remove</button>';
        list.appendChild(row);
        nextBenefit++;
        list.setAttribute('data-next-index', nextBenefit);
        row.querySelector('.remove-benefit').addEventListener('click', function() { row.remove(); });
    });

    document.getElementById('benefits-list').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-benefit')) e.target.closest('.benefit-row').remove();
    });
    document.getElementById('gallery-images-list').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-gallery-image')) e.target.closest('.gallery-image-row').remove();
    });
})();
</script>
