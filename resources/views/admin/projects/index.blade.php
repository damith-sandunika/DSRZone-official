@extends('admin.layout')

@section('title', 'Projects')

@section('content')
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
            </span>
            <h2 class="text-xl font-semibold text-white">Projects</h2>
        </div>
        <a href="{{ route('admin.projects.create') }}" class="inline-flex items-center gap-2 rounded-xl bg-amber-500 text-black font-medium px-4 py-2.5 hover:bg-amber-400 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add Project
        </a>
    </div>

    <div class="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
        @if($projects->isEmpty())
            <div class="p-12 text-center">
                <span class="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 text-gray-500 mx-auto mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
                </span>
                <p class="text-gray-400 mb-4">No projects yet.</p>
                <a href="{{ route('admin.projects.create') }}" class="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium">Add your first project</a>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-white/5 border-b border-white/10">
                        <tr>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Order</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Featured</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Active</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-44">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        @foreach($projects as $p)
                            <tr class="hover:bg-white/[0.02] transition-colors">
                                <td class="px-5 py-3 text-gray-300">{{ $p->order }}</td>
                                <td class="px-5 py-3 font-medium text-white">{{ $p->title }}</td>
                                <td class="px-5 py-3 text-gray-400">{{ $p->category ?? '—' }}</td>
                                <td class="px-5 py-3">{{ $p->is_featured ? 'Yes' : 'No' }}</td>
                                <td class="px-5 py-3 text-gray-400">{{ $p->is_active ? 'Yes' : 'No' }}</td>
                                <td class="px-5 py-3">
                                    @include('admin._table_actions', [
                                        'editUrl' => route('admin.projects.edit', $p),
                                        'deleteUrl' => route('admin.projects.destroy', $p),
                                        'deleteLabel' => 'Delete this project?',
                                    ])
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </div>
@endsection
