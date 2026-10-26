<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    public function rules(): array
    {
        $productId = $this->route('product')?->id;

        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('products', 'slug')->ignore($productId)],
            'tagline' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'long_description' => ['nullable', 'string'],
            'background_overlay' => ['nullable', 'integer', 'min:0', 'max:100'],
            'price_one_time' => ['nullable', 'string', 'max:50'],
            'price_monthly' => ['nullable', 'string', 'max:50'],
            'price_note' => ['nullable', 'string', 'max:255'],
            'cta_primary_text' => ['nullable', 'string', 'max:100'],
            'cta_primary_url' => ['nullable', 'string', 'max:500'],
            'cta_secondary_text' => ['nullable', 'string', 'max:100'],
            'cta_secondary_url' => ['nullable', 'string', 'max:500'],
            'status' => ['nullable', 'in:available,coming_soon'],
            'accent_color' => ['nullable', 'string', 'max:20'],
            'features' => ['nullable', 'array'],
            'features.*' => ['string', 'max:500'],
            'features_text' => ['nullable', 'string'],
            'benefits' => ['nullable', 'array'],
            'order' => ['nullable', 'integer'],
            'is_active' => ['boolean'],
            'icon' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'logo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'background_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'gallery_images_new.*' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
        ];
    }
}
