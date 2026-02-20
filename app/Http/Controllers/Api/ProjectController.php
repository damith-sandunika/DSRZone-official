<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\URL;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = Project::with('product:id,name,slug')
            ->where('is_active', true)
            ->orderBy('order')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json($projects->map(fn ($p) => $this->formatProject($p)));
    }

    public function featured(): JsonResponse
    {
        $projects = Project::with('product:id,name,slug')
            ->where('is_active', true)
            ->where('is_featured', true)
            ->orderBy('order')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json($projects->map(fn ($p) => $this->formatProject($p)));
    }

    private function formatProject(Project $p): array
    {
        return [
            'id' => $p->id,
            'product_id' => $p->product_id,
            'product' => $p->product ? ['id' => $p->product->id, 'name' => $p->product->name, 'slug' => $p->product->slug] : null,
            'title' => $p->title,
            'description' => $p->description,
            'image' => $this->normalizeImagePath($p->image),
            'category' => $p->category,
            'client' => $p->client,
            'project_date' => $p->project_date?->format('Y-m-d'),
            'project_url' => $p->project_url,
            'technologies' => $p->technologies ?? [],
        ];
    }

    private function normalizeImagePath(?string $value): ?string
    {
        if ($value === null || $value === '') return null;
        $value = trim($value);
        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) return $value;
        if (preg_match('#^(products|projects|services)/#', $value)) return URL::asset('storage/' . $value);
        return URL::to(str_starts_with($value, '/') ? $value : '/images/' . ltrim($value, '/'));
    }
}

