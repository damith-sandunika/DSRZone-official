<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Project\CreateProjectAction;
use App\Actions\Project\DeleteProjectAction;
use App\Actions\Project\UpdateProjectAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProjectFormRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ProjectController extends Controller
{
    public function index(): View
    {
        $projects = Project::with('product:id,name')->orderBy('order')->orderBy('id', 'desc')->paginate(15);
        return view('admin.projects.index', compact('projects'));
    }

    public function create(): View
    {
        return view('admin.projects.create');
    }

    public function store(ProjectFormRequest $request, CreateProjectAction $action): RedirectResponse
    {
        $action->execute($request, $request->validated());
        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function show(Project $project): View
    {
        $project->load('product');
        return view('admin.projects.show', compact('project'));
    }

    public function edit(Project $project): View
    {
        return view('admin.projects.edit', compact('project'));
    }

    public function update(ProjectFormRequest $request, Project $project, UpdateProjectAction $action): RedirectResponse
    {
        $action->execute($request, $project, $request->validated());
        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project, DeleteProjectAction $action): RedirectResponse
    {
        $action->execute($project);
        return redirect()->route('admin.projects.index')->with('success', 'Project and its media deleted successfully.');
    }
}
