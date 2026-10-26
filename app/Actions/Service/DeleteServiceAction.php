<?php

namespace App\Actions\Service;

use App\Models\Service;
use App\Services\MediaService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class DeleteServiceAction
{
    public function __construct(
        protected MediaService $media
    ) {}

    public function execute(Service $service): void
    {
        $this->media->delete($service->image);

        $id = $service->id;
        $title = $service->title;
        $service->delete();

        Cache::forget('api_services_list');

        Log::info('Service deleted and asset removed', ['id' => $id, 'title' => $title]);
    }
}
