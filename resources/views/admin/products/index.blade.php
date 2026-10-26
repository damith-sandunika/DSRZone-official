@extends('admin.layout')

@section('title', 'Products')

@section('content')
    @include('admin._page_header', [
        'title' => 'Products & SaaS Solutions',
        'subtitle' => 'Configure software systems, pricing tiers, and public landing pages.',
        'actions' => '<a href="' . route('admin.products.create') . '" class="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-[0_4px_12px_rgba(37,99,235,0.2)] transition-all hover:-translate-y-0.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg> Add New Product</a>'
    ])

    <div class="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        @if($products->isEmpty())
            <div class="p-16 text-center">
                <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto mb-4 flex items-center justify-center">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                </div>
                <h3 class="text-base font-bold text-slate-900">No products added yet</h3>
                <p class="text-xs text-slate-500 mt-1 mb-5">Create your first software solution to feature on the website.</p>
                <a href="{{ route('admin.products.create') }}" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all">Create Product</a>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-slate-50/80 border-b border-slate-200/60">
                        <tr>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Slug</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Order</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Published</th>
                            <th class="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @foreach($products as $p)
                            <tr class="hover:bg-slate-50/60 transition-colors">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3.5">
                                        <div class="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 overflow-hidden">
                                            @if($p->logo || $p->icon)
                                                <img src="{{ app(\App\Services\MediaService::class)->url($p->logo ?: $p->icon) }}" alt="{{ $p->name }}" class="w-7 h-7 object-contain" />
                                            @else
                                                <span class="text-xs font-black text-slate-400">{{ strtoupper(substr($p->name, 0, 2)) }}</span>
                                            @endif
                                        </div>
                                        <div>
                                            <a href="{{ route('admin.products.show', $p) }}" class="font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors block">{{ $p->name }}</a>
                                            <span class="text-xs text-slate-400 truncate max-w-xs block">{{ $p->tagline ?: 'No tagline' }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-xs font-medium text-slate-500 font-mono">{{ $p->slug }}</td>
                                <td class="px-6 py-4 text-xs font-semibold text-slate-600">{{ $p->order }}</td>
                                <td class="px-6 py-4">
                                    <span class="inline-flex px-2.5 py-1 rounded-full text-[10px] font-extrabold {{ $p->status === 'available' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60' : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/60' }}">
                                        {{ ucfirst(str_replace('_', ' ', $p->status)) }}
                                    </span>
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
                                        'viewUrl' => route('admin.products.show', $p),
                                        'editUrl' => route('admin.products.edit', $p),
                                        'deleteUrl' => route('admin.products.destroy', $p),
                                        'deleteLabel' => 'Permanently delete this product and its associated media?',
                                    ])
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            @if(method_exists($products, 'links') && $products->hasPages())
                <div class="px-6 py-4 border-t border-slate-100 bg-slate-50/40">
                    {{ $products->links() }}
                </div>
            @endif
        @endif
    </div>
@endsection
