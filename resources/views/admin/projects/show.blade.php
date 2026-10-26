@extends('admin.layout')

@section('title', $project->title)

@section('content')
    @include('admin._page_header', [
        'title' => 'Project Details: ' . $project->title,
        'subtitle' => 'Inspect comprehensive portfolio case study, technical stack, and client delivery.',
        'actions' => '<a href="' . route('admin.projects.index') . '" class="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg> Back to Projects</a>' .
                     ($project->project_url ? '<a href="' . $project->project_url . '" target="_blank" class="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm transition-all"><span>Live Project</span><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>' : '') .
                     '<a href="' . route('admin.projects.edit', $project) . '" class="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-[0_4px_12px_rgba(37,99,235,0.2)] transition-all hover:-translate-y-0.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg> Edit Project</a>'
    ])

    @php $media = app(\App\Services\MediaService::class); @endphp

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
            {{-- Case Study Problem & Solution --}}
            <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
                <div>
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">The Problem</h3>
                    <div class="bg-red-50/50 border border-red-100 rounded-xl p-4 text-xs text-red-950 leading-relaxed font-medium">
                        {{ $project->problem ?: 'No problem statement recorded.' }}
                    </div>
                </div>

                <div>
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Our Solution</h3>
                    <div class="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 text-xs text-emerald-950 leading-relaxed font-medium">
                        {{ $project->solution ?: 'No solution statement recorded.' }}
                    </div>
                </div>

                <div>
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">General Description</h3>
                    <p class="text-xs text-slate-700 leading-relaxed">{{ $project->description ?: 'No description.' }}</p>
                </div>
            </div>

            {{-- Technologies Used --}}
            <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Technologies Stack</h3>
                <div class="flex flex-wrap gap-2">
                    @forelse($project->technologies ?? [] as $tech)
                        <span class="inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                            {{ $tech }}
                        </span>
                    @empty
                        <span class="text-xs text-slate-400">None specified.</span>
                    @endforelse
                </div>
            </div>
        </div>

        {{-- Right Side Metadata & Banner --}}
        <div class="space-y-6">
            <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <h3 class="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">Project Metadata</h3>
                <dl class="space-y-3.5 text-xs">
                    <div class="flex justify-between">
                        <dt class="text-slate-400 font-bold uppercase tracking-wider">Client:</dt>
                        <dd class="text-slate-900 font-bold">{{ $project->client ?: 'General' }}</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-slate-400 font-bold uppercase tracking-wider">Category:</dt>
                        <dd class="text-slate-900 font-bold">{{ $project->category ?: 'Development' }}</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-slate-400 font-bold uppercase tracking-wider">Related Product:</dt>
                        <dd class="text-slate-900 font-bold">{{ $project->product ? $project->product->name : 'None' }}</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-slate-400 font-bold uppercase tracking-wider">Map City / Pin:</dt>
                        <dd class="text-slate-900 font-bold">{{ $project->map_city ?: 'Sri Lanka' }} (X: {{ $project->map_x ?? '-' }}, Y: {{ $project->map_y ?? '-' }})</dd>
                    </div>
                    <div class="flex justify-between">
                        <dt class="text-slate-400 font-bold uppercase tracking-wider">Date:</dt>
                        <dd class="text-slate-700 font-medium">{{ $project->project_date ? $project->project_date->format('M Y') : 'N/A' }}</dd>
                    </div>
                </dl>
            </div>

            @if($project->image)
                <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                    <h3 class="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">Project Screenshot</h3>
                    <img src="{{ $media->url($project->image) }}" alt="Preview" class="w-full h-44 object-cover rounded-xl border border-slate-200 shadow-sm" />
                </div>
            @endif
        </div>
    </div>
@endsection
