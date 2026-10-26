<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class StoreTestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'product_name' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'contact_details' => ['nullable', 'string', 'max:500'],
            'testimonial' => ['required', 'string', 'max:2000'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
            'website_hp' => ['nullable', 'string', 'max:0'], // Honeypot field
        ];
    }

    protected function passedValidation(): void
    {
        if ($this->filled('website_hp')) {
            throw ValidationException::withMessages([
                'website_hp' => ['Spam detected.'],
            ]);
        }
    }
}
