<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Http\Responses\ApiResponse;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    use ApiResponse;

    /**
     * List all active products with cached eager-loaded projects.
     */
    public function index(): JsonResponse
    {
        $products = Cache::remember('api_products_list', 3600, function () {
            return Product::with(['projects' => function ($query) {
                $query->where('is_active', true)->orderBy('order')->orderBy('id', 'desc')->limit(6);
            }])
            ->where('is_active', true)
            ->orderBy('order')
            ->orderBy('id')
            ->get();
        });

        return response()->json(ProductResource::collection($products));
    }

    /**
     * Show a single active product by slug.
     */
    public function show(string $slug): JsonResponse
    {
        $product = Cache::remember("api_product_{$slug}", 3600, function () use ($slug) {
            return Product::with(['projects' => function ($query) {
                $query->where('is_active', true)->orderBy('order')->orderBy('id', 'desc')->limit(6);
            }])
            ->where('is_active', true)
            ->where('slug', $slug)
            ->first();
        });

        if (!$product) {
            return $this->errorResponse('Product not found.', 404);
        }

        return response()->json(new ProductResource($product));
    }
}
