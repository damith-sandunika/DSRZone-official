{{-- Pricing Fields --}}
<div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
    <div>
        <label for="price_one_time" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">One-time price (e.g. Rs. 45,000)</label>
        <input type="text" name="price_one_time" id="price_one_time" value="{{ old('price_one_time', $product->price_one_time ?? '') }}" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
    </div>
    <div>
        <label for="price_monthly" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Monthly price (e.g. Rs. 4,500/mo)</label>
        <input type="text" name="price_monthly" id="price_monthly" value="{{ old('price_monthly', $product->price_monthly ?? '') }}" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
    </div>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
    <div>
        <label for="cta_primary_text" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Primary CTA Button Text</label>
        <input type="text" name="cta_primary_text" id="cta_primary_text" value="{{ old('cta_primary_text', $product->cta_primary_text ?? 'Get Started') }}" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
    </div>
    <div>
        <label for="cta_primary_url" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Primary CTA Button URL</label>
        <input type="text" name="cta_primary_url" id="cta_primary_url" value="{{ old('cta_primary_url', $product->cta_primary_url ?? '#contact') }}" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
    </div>
</div>

{{-- Media Fields --}}
<div class="space-y-4 pt-4 border-t border-slate-100">

    <div>
        <label for="background_overlay" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Background Dark Overlay (0–100%)</label>
        <input type="number" name="background_overlay" id="background_overlay" min="0" max="100" value="{{ old('background_overlay', $product->background_overlay ?? 35) }}" class="w-32 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none">
    </div>

    <div>
        <label for="gallery_images_new" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Gallery Screenshots</label>
        <input type="file" name="gallery_images_new[]" id="gallery_images_new" multiple accept="image/*" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-xs text-slate-600 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-bold">
    </div>
</div>
