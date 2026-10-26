<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ContactDetailFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    public function rules(): array
    {
        return [
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'location' => ['nullable', 'string', 'max:255'],
            'working_hours' => ['nullable', 'string', 'max:255'],
            'whatsapp' => ['nullable', 'string', 'max:50'],
            'linkedin_url' => ['nullable', 'url', 'max:500'],
            'facebook_url' => ['nullable', 'url', 'max:500'],
            'twitter_url' => ['nullable', 'url', 'max:500'],
            'instagram_url' => ['nullable', 'url', 'max:500'],
            'youtube_url' => ['nullable', 'url', 'max:500'],
        ];
    }
}
