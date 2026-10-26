<?php

namespace App\Actions\Product;

use App\Models\Product;
use App\Services\MediaService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class DeleteProductAction
{
    public function __construct(
        protected MediaService $media
    ) {}

    public function execute(Product $product): void
    {
        $this->media->delete($product->icon);
        $this->media->delete($product->logo);
        $this->media->delete($product->background_image);

        foreach ($product->gallery_images ?? [] as $img) {
            $this->media->delete($img);
        }

        foreach ($product->benefits ?? [] as $benefit) {
            if (!empty($benefit['icon'])) {
                $this->media->delete($benefit['icon']);
            }
        }

        $slug = $product->slug;
        $id = $product->id;
        $product->delete();

        Cache::forget('api_products_list');
        Cache::forget("api_product_{$slug}");

        Log::info('Product deleted and assets removed', ['id' => $id, 'slug' => $slug]);
    }
}
