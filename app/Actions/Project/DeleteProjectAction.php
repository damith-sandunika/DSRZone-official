<?php

namespace App\Actions\Project;

use App\Models\Project;
use App\Services\MediaService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class DeleteProjectAction
{
    public function __construct(
        protected MediaService $media
    ) {}

    public function execute(Project $project): void
    {
        $this->media->delete($project->image);
        $this->media->delete($project->logo);

        $id = $project->id;
        $title = $project->title;
        $project->delete();

        Cache::forget('api_projects_list');
        Cache::forget('api_projects_featured');

        Log::info('Project deleted and assets cleaned', ['id' => $id, 'title' => $title]);
    }
}
