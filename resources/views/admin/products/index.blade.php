@extends('admin.layout')

@section('title', 'Products')

@section('content')
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            </span>
            <h2 class="text-xl font-semibold text-white">Products</h2>
        </div>
        <a href="{{ route('admin.products.create') }}" class="inline-flex items-center gap-2 rounded-xl bg-amber-500 text-black font-medium px-4 py-2.5 hover:bg-amber-400 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add Product
        </a>
    </div>

    <div class="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
        @if($products->isEmpty())
            <div class="p-12 text-center">
                <span class="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 text-gray-500 mx-auto mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                </span>
                <p class="text-gray-400 mb-4">No products yet.</p>
                <a href="{{ route('admin.products.create') }}" class="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium">Add your first product</a>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-white/5 border-b border-white/10">
                        <tr>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Order</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Slug</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Active</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-44">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        @foreach($products as $p)
                            <tr class="hover:bg-white/[0.02] transition-colors">
                                <td class="px-5 py-3 text-gray-300">{{ $p->order }}</td>
                                <td class="px-5 py-3 font-medium text-white">{{ $p->name }}</td>
                                <td class="px-5 py-3 text-gray-400 text-sm">{{ $p->slug }}</td>
                                <td class="px-5 py-3"><span class="inline-flex px-2 py-0.5 rounded text-xs font-medium {{ $p->status === 'available' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400' }}">{{ $p->status }}</span></td>
                                <td class="px-5 py-3 text-gray-400">{{ $p->is_active ? 'Yes' : 'No' }}</td>
                                <td class="px-5 py-3">
                                    @include('admin._table_actions', [
                                        'editUrl' => route('admin.products.edit', $p),
                                        'deleteUrl' => route('admin.products.destroy', $p),
                                        'deleteLabel' => 'Delete this product? This cannot be undone.',
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
