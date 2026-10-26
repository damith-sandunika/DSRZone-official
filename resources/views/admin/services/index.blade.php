@extends('admin.layout')

@section('title', 'Services')

@section('content')
    @include('admin._page_header', [
        'title' => 'Services Management',
        'subtitle' => 'Configure digital solutions and services offered to clients.',
        'actions' => '<a href="' . route('admin.services.create') . '" class="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-[0_4px_12px_rgba(37,99,235,0.2)] transition-all hover:-translate-y-0.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg> Add New Service</a>'
    ])

    @php $media = app(\App\Services\MediaService::class); @endphp

    <div class="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        @if($services->isEmpty())
            <div class="p-16 text-center">
                <div class="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto mb-4 flex items-center justify-center">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <h3 class="text-base font-bold text-slate-900">No services added yet</h3>
                <p class="text-xs text-slate-500 mt-1 mb-5">Add the capabilities and digital services your agency provides.</p>
                <a href="{{ route('admin.services.create') }}" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all">Add Service</a>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-slate-50/80 border-b border-slate-200/60">
                        <tr>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Order</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @foreach($services as $s)
                            <tr class="hover:bg-slate-50/60 transition-colors">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3.5">
                                        <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-lg shrink-0">
                                            @if($s->image)
                                                <img src="{{ $media->url($s->image) }}" alt="{{ $s->title }}" class="w-6 h-6 object-contain" />
                                            @else
                                                <span>{{ $s->icon ?: '⚡' }}</span>
                                            @endif
                                        </div>
                                        <a href="{{ route('admin.services.show', $s) }}" class="font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors">{{ $s->title }}</a>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-xs text-slate-500 max-w-sm truncate">{{ $s->description }}</td>
                                <td class="px-6 py-4 text-xs font-semibold text-slate-600">{{ $s->order }}</td>
                                <td class="px-6 py-4">
                                    @if($s->is_active)
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
                                        'viewUrl' => route('admin.services.show', $s),
                                        'editUrl' => route('admin.services.edit', $s),
                                        'deleteUrl' => route('admin.services.destroy', $s),
                                        'deleteLabel' => 'Permanently delete this service and its image?',
                                    ])
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            @if(method_exists($services, 'links') && $services->hasPages())
                <div class="px-6 py-4 border-t border-slate-100 bg-slate-50/40">
                    {{ $services->links() }}
                </div>
            @endif
        @endif
    </div>
@endsection
