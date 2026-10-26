<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ServiceController extends Controller
{
    /**
     * List all active services.
     */
    public function index(): JsonResponse
    {
        $services = Cache::remember('api_services_list', 3600, function () {
            return Service::where('is_active', true)
                ->orderBy('order')
                ->orderBy('id')
                ->get();
        });

        return response()->json(ServiceResource::collection($services));
    }
}
