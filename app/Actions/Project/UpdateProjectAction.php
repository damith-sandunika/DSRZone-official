<?php

namespace App\Actions\Project;

use App\Models\Project;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class UpdateProjectAction
{
    public function __construct(
        protected MediaService $media
    ) {}

    public function execute(Request $request, Project $project, array $validated): Project
    {
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['is_active'] = $request->boolean('is_active');
        $validated['technologies'] = $this->parseTechnologies($request);

        if ($request->hasFile('image')) {
            $this->media->delete($project->image);
            $validated['image'] = $this->media->upload($request->file('image'), 'projects');
        }

        if ($request->hasFile('logo')) {
            $this->media->delete($project->logo);
            $validated['logo'] = $this->media->upload($request->file('logo'), 'projects');
        }

        $project->update($validated);
        Cache::forget('api_projects_list');
        Cache::forget('api_projects_featured');

        Log::info('Project updated', ['id' => $project->id, 'title' => $project->title]);
        return $project;
    }

    private function parseTechnologies(Request $request): array
    {
        if ($request->filled('technologies_text')) {
            $items = explode(',', (string) $request->input('technologies_text'));
            return array_values(array_filter(array_map('trim', $items)));
        }
        return array_values(array_filter((array) $request->input('technologies', [])));
    }
}
