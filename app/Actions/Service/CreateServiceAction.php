<?php

namespace App\Actions\Service;

use App\Models\Service;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class CreateServiceAction
{
    public function __construct(
        protected MediaService $media
    ) {}

    public function execute(Request $request, array $validated): Service
    {
        $validated['order'] = $validated['order'] ?? 0;
        $validated['is_active'] = $request->boolean('is_active');

        if (isset($validated['features']) && is_array($validated['features'])) {
            $validated['features'] = array_values(array_filter($validated['features'], function ($item) {
                return !empty($item['title']) || !empty($item['description']);
            }));
        }

        if ($request->hasFile('image')) {
            $validated['image'] = $this->media->upload($request->file('image'), 'services');
        }

        $service = Service::create($validated);
        Cache::forget('api_services_list');

        Log::info('Service created', ['id' => $service->id, 'title' => $service->title]);
        return $service;
    }
}
