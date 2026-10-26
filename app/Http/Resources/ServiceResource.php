<?php

namespace App\Http\Resources;

use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $media = app(MediaService::class);

        return [
            'id' => $this->id,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'description' => $this->description,
            'features' => $this->features ?? [],
            'icon' => $this->icon,
            'image' => $media->url($this->image),
            'order' => $this->order,
        ];
    }
}
