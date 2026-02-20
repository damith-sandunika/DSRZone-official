<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\URL;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Product::where('is_active', true)
            ->orderBy('order')
            ->orderBy('id')
            ->get()
            ->map(fn (Product $p) => $this->formatProduct($p));

        return response()->json($products);
    }

    public function show(string $slug): JsonResponse
    {
        $product = Product::where('is_active', true)->where('slug', $slug)->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found.'], 404);
        }

        return response()->json($this->formatProduct($product));
    }

    private function formatProduct(Product $p): array
    {
        return [
            'id' => $p->id,
            'slug' => $p->slug,
            'name' => $p->name,
            'tagline' => $p->tagline,
            'desc' => $p->description,
            'longDesc' => $p->long_description,
            'icon' => $this->normalizeImagePath($p->icon),
            'logo' => $this->normalizeImagePath($p->logo),
            'background_image' => $this->normalizeImagePath($p->background_image),
            'gallery_images' => $this->normalizeImagePaths($p->gallery_images ?? []),
            'background_overlay' => $p->background_overlay !== null ? (int) $p->background_overlay : 35,
            'price_one_time' => $p->price_one_time,
            'price_monthly' => $p->price_monthly,
            'price_note' => $p->price_note,
            'cta_primary_text' => $p->cta_primary_text,
            'cta_primary_url' => $p->cta_primary_url,
            'cta_secondary_text' => $p->cta_secondary_text,
            'cta_secondary_url' => $p->cta_secondary_url,
            'status' => $p->status,
            'accent_color' => $p->accent_color ? trim($p->accent_color) : null,
            'features' => $p->features ?? [],
            'benefits' => $this->normalizeBenefitsIcons($p->benefits ?? []),
            'installation_steps' => $this->normalizeStepsIcons($p->installation_steps ?? []),
            'projects' => $this->formatProductProjects($p),
        ];
    }

    private function formatProductProjects(Product $p): array
    {
        $projects = $p->projects()->where('is_active', true)->limit(6)->get();
        return $projects->map(function ($proj) {
            return [
                'id' => $proj->id,
                'title' => $proj->title,
                'description' => $proj->description,
                'image' => $this->normalizeImagePath($proj->image),
                'category' => $proj->category,
                'client' => $proj->client,
                'project_date' => $proj->project_date?->format('Y-m-d'),
                'project_url' => $proj->project_url,
                'technologies' => $proj->technologies ?? [],
            ];
        })->values()->all();
    }

    /** Turn stored path or filename into full URL. Handles storage paths (products/xyz.jpg) and plain paths (logo.png). */
    private function normalizeImagePath(?string $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }
        $value = trim($value);
        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) {
            return $value;
        }
        // Uploaded files in storage/app/public (products/, projects/, services/)
        if (preg_match('#^(products|projects|services)/#', $value)) {
            return URL::asset('storage/' . $value);
        }
        $path = str_starts_with($value, '/') ? $value : '/images/' . ltrim($value, '/');
        return URL::to($path);
    }

    /** @param array<int, string|null> $paths */
    private function normalizeImagePaths(array $paths): array
    {
        return array_values(array_filter(array_map(
            fn ($p) => $this->normalizeImagePath(is_string($p) ? $p : null),
            $paths
        )));
    }

    private function normalizeBenefitsIcons(array $benefits): array
    {
        return array_map(function ($b) {
            if (is_array($b) && isset($b['icon']) && $b['icon'] !== '') {
                $b['icon'] = $this->normalizeImagePath($b['icon']);
            }
            return $b;
        }, $benefits);
    }

    private function normalizeStepsIcons(array $steps): array
    {
        return array_map(function ($s) {
            if (is_array($s) && isset($s['icon']) && $s['icon'] !== '') {
                $s['icon'] = $this->normalizeImagePath($s['icon']);
            }
            return $s;
        }, $steps);
    }
}
