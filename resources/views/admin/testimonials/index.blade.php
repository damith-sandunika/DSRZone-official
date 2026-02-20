@extends('admin.layout')

@section('title', 'Testimonials')

@section('content')
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>
            </span>
            <h2 class="text-xl font-semibold text-white">Testimonials</h2>
        </div>
        <a href="{{ route('admin.testimonials.create') }}" class="inline-flex items-center gap-2 rounded-xl bg-amber-500 text-black font-medium px-4 py-2.5 hover:bg-amber-400 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add Testimonial
        </a>
    </div>

    <div class="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
        @if($testimonials->isEmpty())
            <div class="p-12 text-center">
                <span class="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 text-gray-500 mx-auto mb-4">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>
                </span>
                <p class="text-gray-400 mb-4">No testimonials yet.</p>
                <a href="{{ route('admin.testimonials.create') }}" class="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium">Add your first testimonial</a>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-white/5 border-b border-white/10">
                        <tr>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Order</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Product</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Company</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                            <th class="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-56">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        @foreach($testimonials as $t)
                            <tr class="hover:bg-white/[0.02] transition-colors">
                                <td class="px-5 py-3 text-gray-300">{{ $t->order }}</td>
                                <td class="px-5 py-3 font-medium text-white">{{ $t->name }}</td>
                                <td class="px-5 py-3 text-gray-400 max-w-[120px] truncate" title="{{ $t->product_name }}">{{ $t->product_name ?? '—' }}</td>
                                <td class="px-5 py-3 text-gray-400 max-w-[120px] truncate" title="{{ $t->company }}">{{ $t->company ?? '—' }}</td>
                                <td class="px-5 py-3 text-gray-400 max-w-[140px] truncate text-xs" title="{{ $t->contact_details }}">{{ $t->contact_details ?? '—' }}</td>
                                <td class="px-5 py-3">
                                    @if($t->is_active)
                                        <span class="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400">Approved</span>
                                    @else
                                        <span class="inline-flex items-center rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-400">Pending</span>
                                    @endif
                                </td>
                                <td class="px-5 py-3">
                                    <div class="flex flex-wrap items-center gap-2">
                                        @if(!$t->is_active)
                                            <form action="{{ route('admin.testimonials.approve', $t) }}" method="POST" class="inline">
                                                @csrf
                                                <button type="submit" class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-400 hover:bg-emerald-500/10 transition">Approve</button>
                                            </form>
                                        @else
                                            <form action="{{ route('admin.testimonials.reject', $t) }}" method="POST" class="inline">
                                                @csrf
                                                <button type="submit" class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-amber-400 hover:bg-amber-500/10 transition">Hide</button>
                                            </form>
                                        @endif
                                        <a href="{{ route('admin.testimonials.edit', $t) }}" class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-amber-400 hover:bg-amber-500/10 transition">Edit</a>
                                        <form action="{{ route('admin.testimonials.destroy', $t) }}" method="POST" class="inline" onsubmit="return confirm('Delete this testimonial?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition">Delete</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </div>
@endsection
