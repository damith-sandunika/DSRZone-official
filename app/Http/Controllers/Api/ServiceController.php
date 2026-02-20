<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\URL;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        $services = Service::where('is_active', true)
            ->orderBy('order')
            ->orderBy('id')
            ->get();

        return response()->json($services->map(fn ($s) => $this->formatService($s)));
    }

    private function formatService(Service $s): array
    {
        return [
            'id' => $s->id,
            'title' => $s->title,
            'description' => $s->description,
            'icon' => $s->icon,
            'image' => $this->normalizeImagePath($s->image),
            'order' => $s->order,
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

