@extends('admin.layout')

@section('title', 'Projects')

@section('content')
    @include('admin._page_header', [
        'title' => 'Portfolio Projects',
        'subtitle' => 'Manage client deliverables, case studies, and enterprise solutions.',
        'actions' => '<a href="' . route('admin.projects.create') . '" class="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-[0_4px_12px_rgba(37,99,235,0.2)] transition-all hover:-translate-y-0.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg> Add New Project</a>'
    ])

    @php $media = app(\App\Services\MediaService::class); @endphp

    <div class="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        @if($projects->isEmpty())
            <div class="p-16 text-center">
                <div class="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 mx-auto mb-4 flex items-center justify-center">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
                </div>
                <h3 class="text-base font-bold text-slate-900">No projects added yet</h3>
                <p class="text-xs text-slate-500 mt-1 mb-5">Showcase your successful client case studies and deployments.</p>
                <a href="{{ route('admin.projects.create') }}" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all">Add Project</a>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-slate-50/80 border-b border-slate-200/60">
                        <tr>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Project</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Client & Category</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Order</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Featured</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @foreach($projects as $p)
                            <tr class="hover:bg-slate-50/60 transition-colors">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3.5">
                                        <div class="w-12 h-10 rounded-xl bg-slate-100 border border-slate-200/80 overflow-hidden shrink-0">
                                            @if($p->image)
                                                <img src="{{ $media->url($p->image) }}" alt="{{ $p->title }}" class="w-full h-full object-cover" />
                                            @else
                                                <div class="w-full h-full flex items-center justify-center text-xs font-bold text-slate-400">N/A</div>
                                            @endif
                                        </div>
                                        <div>
                                            <a href="{{ route('admin.projects.show', $p) }}" class="font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors block">{{ $p->title }}</a>
                                            <span class="text-xs text-slate-400 truncate max-w-xs block">{{ $p->product ? $p->product->name : 'Independent Project' }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <p class="text-xs font-bold text-slate-800">{{ $p->client ?: 'General Client' }}</p>
                                    <p class="text-[11px] text-slate-400 mt-0.5">{{ $p->category ?: 'Enterprise' }}</p>
                                </td>
                                <td class="px-6 py-4 text-xs font-semibold text-slate-600">{{ $p->order }}</td>
                                <td class="px-6 py-4">
                                    @if($p->is_featured)
                                        <span class="inline-flex px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 ring-1 ring-blue-200/60">Featured</span>
                                    @else
                                        <span class="text-xs text-slate-400">Regular</span>
                                    @endif
                                </td>
                                <td class="px-6 py-4">
                                    @if($p->is_active)
                                        <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                                        </span>
                                    @else
                                        <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                                            <span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Draft
                                        </span>
                                    @endif
                                </td>
                                <td class="px-6 py-4 text-right">
                                    @include('admin._table_actions', [
                                        'viewUrl' => route('admin.projects.show', $p),
                                        'editUrl' => route('admin.projects.edit', $p),
                                        'deleteUrl' => route('admin.projects.destroy', $p),
                                        'deleteLabel' => 'Permanently delete this project and its media?',
                                    ])
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            @if(method_exists($projects, 'links') && $projects->hasPages())
                <div class="px-6 py-4 border-t border-slate-100 bg-slate-50/40">
                    {{ $projects->links() }}
                </div>
            @endif
        @endif
    </div>
@endsection
