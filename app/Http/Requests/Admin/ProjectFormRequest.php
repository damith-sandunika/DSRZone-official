<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ProjectFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    public function rules(): array
    {
        return [
            'product_id' => ['nullable', 'exists:products,id'],
            'title' => ['required', 'string', 'max:255'],
            'logo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:5120'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'description' => ['nullable', 'string'],
            'problem' => ['nullable', 'string'],
            'solution' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:100'],
            'client' => ['nullable', 'string', 'max:255'],
            'project_date' => ['nullable', 'date'],
            'project_url' => ['nullable', 'string', 'max:500'],
            'technologies' => ['nullable', 'array'],
            'technologies.*' => ['string', 'max:100'],
            'technologies_text' => ['nullable', 'string'],
            'order' => ['nullable', 'integer'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'map_x' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'map_y' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'map_city' => ['nullable', 'string', 'max:100'],
        ];
    }
}
