<?php

namespace App\Actions\Testimonial;

use App\Models\Testimonial;
use App\Services\MediaService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;

class SubmitTestimonialAction
{
    public function __construct(
        protected MediaService $media
    ) {}

    /**
     * Submit customer review pending approval.
     *
     * @param array<string, mixed> $data
     * @param UploadedFile|null $avatar
     */
    public function execute(array $data, ?UploadedFile $avatar = null): Testimonial
    {
        $avatarPath = null;
        if ($avatar) {
            $avatarPath = $this->media->upload($avatar, 'testimonials');
        }

        $testimonial = Testimonial::create([
            'name' => $data['name'],
            'position' => $data['position'] ?? null,
            'company' => $data['company'] ?? null,
            'product_name' => $data['product_name'] ?? null,
            'contact_details' => $data['contact_details'] ?? null,
            'testimonial' => $data['testimonial'],
            'avatar' => $avatarPath,
            'rating' => $data['rating'] ?? 5,
            'order' => 0,
            'is_active' => false,
        ]);

        Log::info('New customer testimonial submitted for approval', [
            'id' => $testimonial->id,
            'name' => $testimonial->name,
            'ip' => request()->ip(),
        ]);

        return $testimonial;
    }
}
