<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProjectController extends Controller
{
    /**
     * List active projects. Supports optional ?limit= query parameter.
     */
    public function index(Request $request): JsonResponse
    {
        $limit = $request->query('limit');
        $cacheKey = $limit ? "api_projects_list_limit_{$limit}" : 'api_projects_list';

        $projects = Cache::remember($cacheKey, 3600, function () use ($limit) {
            $query = Project::with('product:id,name,slug')
                ->where('is_active', true)
                ->orderBy('order')
                ->orderBy('id', 'desc');

            if ($limit && is_numeric($limit)) {
                $query->limit((int) $limit);
            }

            return $query->get();
        });

        return response()->json(ProjectResource::collection($projects));
    }

    /**
     * List active featured projects.
     */
    public function featured(): JsonResponse
    {
        $projects = Cache::remember('api_projects_featured', 3600, function () {
            return Project::with('product:id,name,slug')
                ->where('is_active', true)
                ->where('is_featured', true)
                ->orderBy('order')
                ->orderBy('id', 'desc')
                ->get();
        });

        return response()->json(ProjectResource::collection($projects));
    }
}
