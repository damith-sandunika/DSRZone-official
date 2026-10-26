<?php

namespace App\Actions\Product;

use App\Models\Product;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CreateProductAction
{
    public function __construct(
        protected MediaService $media
    ) {}

    public function execute(Request $request, array $validated): Product
    {
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $validated['order'] = $validated['order'] ?? 0;
        $validated['is_active'] = $request->boolean('is_active');
        $validated['features'] = $this->parseFeatures($request);
        $validated['benefits'] = $this->parseBenefits($request);
        $validated['installation_steps'] = [];
        $validated['gallery_images'] = $this->handleGallery($request);

        if ($request->hasFile('icon')) {
            $validated['icon'] = $this->media->upload($request->file('icon'), 'products');
        }
        if ($request->hasFile('logo')) {
            $validated['logo'] = $this->media->upload($request->file('logo'), 'products');
        }
        if ($request->hasFile('background_image')) {
            $validated['background_image'] = $this->media->upload($request->file('background_image'), 'products');
        }

        $product = Product::create($validated);
        Cache::forget('api_products_list');

        Log::info('Product created', ['id' => $product->id, 'slug' => $product->slug]);
        return $product;
    }

    private function parseFeatures(Request $request): array
    {
        if ($request->filled('features_text')) {
            $lines = preg_split('/\r\n|\r|\n/', (string) $request->input('features_text'));
            return array_values(array_filter(array_map('trim', $lines ?: [])));
        }
        return array_values(array_filter((array) $request->input('features', [])));
    }

    private function parseBenefits(Request $request): array
    {
        $input = (array) $request->input('benefits', []);
        $out = [];
        foreach ($input as $i => $row) {
            $title = trim((string) ($row['title'] ?? ''));
            if ($title === '') continue;

            $icon = trim((string) ($row['icon'] ?? ''));
            if ($request->hasFile("benefits.{$i}.icon_file")) {
                $icon = $this->media->upload($request->file("benefits.{$i}.icon_file"), 'products');
            }

            $out[] = [
                'icon' => $icon,
                'title' => $title,
                'description' => trim((string) ($row['description'] ?? '')),
            ];
        }
        return $out;
    }

    private function handleGallery(Request $request): array
    {
        $paths = array_values(array_filter((array) $request->input('gallery_images', [])));
        $files = $request->file('gallery_images_new', []);
        $files = is_array($files) ? $files : ($files ? [$files] : []);

        foreach ($files as $f) {
            if ($f && $f->isValid()) {
                $paths[] = $this->media->upload($f, 'products');
            }
        }
        return $paths;
    }
}
