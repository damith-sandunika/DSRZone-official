<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(): View
    {
        $products = Product::orderBy('order')->orderBy('id')->get();
        return view('admin.products.index', compact('products'));
    }

    public function create(): View
    {
        return view('admin.products.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:products,slug',
            'tagline' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'long_description' => 'nullable|string',
            'background_overlay' => 'nullable|integer|min:0|max:100',
            'price_one_time' => 'nullable|string|max:50',
            'price_monthly' => 'nullable|string|max:50',
            'price_note' => 'nullable|string|max:255',
            'cta_primary_text' => 'nullable|string|max:100',
            'cta_primary_url' => 'nullable|string|max:500',
            'cta_secondary_text' => 'nullable|string|max:100',
            'cta_secondary_url' => 'nullable|string|max:500',
            'status' => 'in:available,coming_soon',
            'accent_color' => 'nullable|string|max:20',
            'features' => 'nullable|array',
            'features.*' => 'string|max:500',
            'features_text' => 'nullable|string',
            'benefits' => 'nullable|array',
            'benefits.*.icon' => 'nullable|string|max:500',
            'benefits.*.title' => 'nullable|string|max:255',
            'benefits.*.description' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        $data['order'] = $data['order'] ?? 0;
        $data['is_active'] = $request->boolean('is_active');
        $data['features'] = $this->parseFeatures($request);
        $data['benefits'] = $this->parseBenefits($request);
        $data['installation_steps'] = [];
        $data['gallery_images'] = $this->handleGalleryImages($request, []);
        unset($data['features_text']);
        $data['icon'] = $this->handleProductImage($request, 'icon', $request->input('icon'));
        $data['logo'] = $this->handleProductImage($request, 'logo', $request->input('logo'));
        $data['background_image'] = $this->handleProductImage($request, 'background_image', $request->input('background_image'));
        Product::create($data);
        $msg = 'Product created.';
        if ($data['logo']) {
            $msg .= ' Logo saved.';
        }
        if ($data['background_image']) {
            $msg .= ' Background image saved.';
        }
        return redirect()->route('admin.products.index')->with('success', $msg);
    }

    public function edit(Product $product): View
    {
        return view('admin.products.edit', compact('product'));
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug,' . $product->id,
            'tagline' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'long_description' => 'nullable|string',
            'background_overlay' => 'nullable|integer|min:0|max:100',
            'price_one_time' => 'nullable|string|max:50',
            'price_monthly' => 'nullable|string|max:50',
            'price_note' => 'nullable|string|max:255',
            'cta_primary_text' => 'nullable|string|max:100',
            'cta_primary_url' => 'nullable|string|max:500',
            'cta_secondary_text' => 'nullable|string|max:100',
            'cta_secondary_url' => 'nullable|string|max:500',
            'status' => 'in:available,coming_soon',
            'accent_color' => 'nullable|string|max:20',
            'features' => 'nullable|array',
            'features.*' => 'string|max:500',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'benefits' => 'nullable|array',
            'benefits.*.title' => 'nullable|string|max:255',
            'benefits.*.description' => 'nullable|string',
            ]);
        $data['is_active'] = $request->boolean('is_active');
        $data['features'] = $this->parseFeatures($request);
        $data['benefits'] = $this->parseBenefits($request);
        $data['installation_steps'] = $product->installation_steps ?? [];
        $data['gallery_images'] = $this->handleGalleryImages($request, $product->gallery_images ?? []);
        unset($data['features_text']);
        $data['icon'] = $this->handleProductImage($request, 'icon', $product->icon);
        $oldLogo = $product->logo;
        $oldBg = $product->background_image;
        $data['logo'] = $this->handleProductImage($request, 'logo', $product->logo);
        $data['background_image'] = $this->handleProductImage($request, 'background_image', $product->background_image);
        $product->update($data);
        $msg = 'Product updated.';
        if ($data['logo'] && $data['logo'] !== $oldLogo) {
            $msg .= ' Logo saved.';
        }
        if ($data['background_image'] && $data['background_image'] !== $oldBg) {
            $msg .= ' Background image saved.';
        }
        return redirect()->route('admin.products.index')->with('success', $msg);
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Product deleted.');
    }

    private function parseFeatures(Request $request): array
    {
        if ($request->filled('features_text')) {
            $lines = preg_split('/\r\n|\r|\n/', $request->input('features_text'));
            return array_values(array_filter(array_map('trim', $lines)));
        }
        return array_values(array_filter($request->input('features', [])));
    }

    private function parseBenefits(Request $request): array
    {
        $input = $request->input('benefits', []);
        $out = [];
        foreach ($input as $i => $row) {
            $title = isset($row['title']) ? trim((string) $row['title']) : '';
            if ($title === '') {
                continue;
            }
            $icon = '';
            if ($request->hasFile("benefits.{$i}.icon_file")) {
                $request->validate(["benefits.{$i}.icon_file" => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048']);
                $path = $request->file("benefits.{$i}.icon_file")->store('products', 'public');
                $icon = $path ?: '';
            } else {
                $icon = isset($row['icon']) ? trim((string) $row['icon']) : '';
            }
            $out[] = [
                'icon' => $icon,
                'title' => $title,
                'description' => isset($row['description']) ? trim((string) $row['description']) : '',
            ];
        }
        return $out;
    }

    private function parseInstallationSteps(Request $request): array
    {
        $input = $request->input('installation_steps', []);
        $out = [];
        foreach ($input as $i => $row) {
            $title = isset($row['title']) ? trim((string) $row['title']) : '';
            if ($title === '') {
                continue;
            }
            $icon = '';
            if ($request->hasFile("installation_steps.{$i}.icon_file")) {
                $request->validate(["installation_steps.{$i}.icon_file" => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048']);
                $path = $request->file("installation_steps.{$i}.icon_file")->store('products', 'public');
                $icon = $path ?: '';
            } else {
                $icon = isset($row['icon']) ? trim((string) $row['icon']) : '';
            }
            $out[] = [
                'step_number' => str_pad((string) (count($out) + 1), 2, '0', STR_PAD_LEFT),
                'icon' => $icon,
                'title' => $title,
                'description' => isset($row['description']) ? trim((string) $row['description']) : '',
            ];
        }
        return $out;
    }

    /** If a file was uploaded for the field, store it and return the path; otherwise return existing path. */
    private function handleProductImage(Request $request, string $field, ?string $current): ?string
    {
        if (!$request->hasFile($field)) {
            return $current ? trim($current) : null;
        }
        $request->validate([$field => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120']); // 5MB
        $path = $request->file($field)->store('products', 'public');
        return $path ?: ($current ? trim($current) : null);
    }

    /** Merge existing gallery paths (from request) with newly uploaded files. Returns array of storage paths. */
    private function handleGalleryImages(Request $request, array $current): array
    {
        $existing = array_values(array_filter((array) $request->input('gallery_images', [])));
        $newFiles = $request->file('gallery_images_new', []);
        if (!is_array($newFiles)) {
            $newFiles = $newFiles ? [$newFiles] : [];
        }
        $paths = $existing;
        foreach ($newFiles as $file) {
            if ($file && $file->isValid()) {
                $path = $file->store('products', 'public');
                if ($path) {
                    $paths[] = $path;
                }
            }
        }
        return $paths;
    }
}
