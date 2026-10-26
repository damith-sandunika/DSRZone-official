<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TestimonialFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'company_logo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:3072'],
            'product_name' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:100'],
            'growth_stat' => ['nullable', 'string', 'max:150'],
            'social_links' => ['nullable', 'array'],
            'contact_details' => ['nullable', 'string', 'max:500'],
            'testimonial' => ['required', 'string'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
