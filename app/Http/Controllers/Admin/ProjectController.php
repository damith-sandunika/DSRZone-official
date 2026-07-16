<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index(): View
    {
        $projects = Project::orderBy('order')->orderBy('id')->get();
        return view('admin.projects.index', compact('projects'));
    }

    public function create(): View
    {
        return view('admin.projects.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['is_featured'] = $request->boolean('is_featured');
        $data['is_active'] = $request->boolean('is_active');
        $data['image'] = $this->handleImage($request, null);
        Project::create($data);
        return redirect()->route('admin.projects.index')->with('success', 'Project created.');
    }

    public function edit(Project $project): View
    {
        return view('admin.projects.edit', compact('project'));
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $data = $this->validated($request);
        $data['is_featured'] = $request->boolean('is_featured');
        $data['is_active'] = $request->boolean('is_active');
        $data['image'] = $this->handleImage($request, $project->image);
        $project->update($data);
        return redirect()->route('admin.projects.index')->with('success', 'Project updated.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();
        return redirect()->route('admin.projects.index')->with('success', 'Project deleted.');
    }

    private function validated(Request $request): array
    {
        $data = $request->validate([
            'product_id' => 'nullable|exists:products,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'problem' => 'nullable|string',
            'solution' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'client' => 'nullable|string|max:255',
            'project_date' => 'nullable|date',
            'project_url' => 'nullable|string|max:500',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:100',
            'technologies_text' => 'nullable|string',
            'order' => 'nullable|integer',
            'map_x' => 'nullable|numeric|min:0|max:100',
            'map_y' => 'nullable|numeric|min:0|max:100',
            'map_city' => 'nullable|string|max:100',
        ]);
        $data['order'] = $data['order'] ?? 0;
        $data['technologies'] = $this->parseTechnologies($request);
        unset($data['technologies_text']);
        return $data;
    }

    private function handleImage(Request $request, ?string $current): ?string
    {
        if (!$request->hasFile('image')) {
            return $current ? trim($current) : null;
        }
        $request->validate(['image' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120']);
        $path = $request->file('image')->store('projects', 'public');
        return $path ?: $current;
    }

    private function parseTechnologies(Request $request): array
    {
        if ($request->filled('technologies_text')) {
            $lines = preg_split('/\r\n|\r|\n/', $request->input('technologies_text'));
            return array_values(array_filter(array_map('trim', $lines)));
        }
        return array_values(array_filter($request->input('technologies', [])));
    }
}
