<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
            'website_hp' => ['nullable', 'string', 'max:0'], // Honeypot field
        ];
    }

    protected function passedValidation(): void
    {
        // If the honeypot field is filled, silently reject or abort
        if ($this->filled('website_hp')) {
            throw ValidationException::withMessages([
                'website_hp' => ['Spam detected.'],
            ]);
        }
    }
}
