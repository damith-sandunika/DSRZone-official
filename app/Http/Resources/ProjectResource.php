<?php

namespace App\Http\Resources;

use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
            'product_id' => $this->product_id,
            'product' => $this->product ? [
                'id' => $this->product->id,
                'name' => $this->product->name,
                'slug' => $this->product->slug,
            ] : null,
            'title' => $this->title,
            'description' => $this->description,
            'problem' => $this->problem,
            'solution' => $this->solution,
            'image' => $media->url($this->image),
            'logo' => $media->url($this->logo),
            'category' => $this->category,
            'client' => $this->client,
            'project_date' => $this->project_date?->format('Y-m-d'),
            'project_url' => $this->project_url,
            'technologies' => $this->technologies ?? [],
            'map_x' => $this->map_x,
            'map_y' => $this->map_y,
            'map_city' => $this->map_city,
            'accent_color' => $this->accent_color,
        ];
    }
}
