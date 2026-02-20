@extends('admin.layout')

@section('title', 'Edit Service')

@section('content')
    <h1 class="text-2xl font-semibold text-amber-400 mb-6">Edit Service</h1>
    <form action="{{ route('admin.services.update', $service) }}" method="POST" enctype="multipart/form-data" class="max-w-xl space-y-4">
        @csrf
        @method('PUT')
        <div>
            <label for="title" class="block text-sm text-gray-400 mb-1">Title</label>
            <input type="text" name="title" id="title" value="{{ old('title', $service->title) }}" required class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="description" class="block text-sm text-gray-400 mb-1">Description</label>
            <textarea name="description" id="description" rows="4" required class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">{{ old('description', $service->description) }}</textarea>
        </div>
        <div>
            <label for="image" class="block text-sm text-gray-400 mb-1">Image (optional)</label>
            @php $imgUrl = $service->image && str_starts_with($service->image, 'services/') ? asset('storage/'.$service->image) : null; @endphp
            @if($imgUrl)
                <p class="text-xs text-emerald-400 mb-1">Current:</p>
                <img src="{{ $imgUrl }}" alt="" class="h-20 w-auto object-cover rounded border border-white/10 mb-2">
            @endif
            <input type="file" name="image" id="image" accept="image/*" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none file:mr-2 file:rounded file:border-0 file:bg-amber-500/20 file:px-3 file:py-1 file:text-amber-400">
        </div>
        <div>
            <label for="order" class="block text-sm text-gray-400 mb-1">Order</label>
            <input type="number" name="order" id="order" value="{{ old('order', $service->order) }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <label class="flex items-center gap-2 text-sm text-gray-400">
            <input type="hidden" name="is_active" value="0">
            <input type="checkbox" name="is_active" value="1" {{ old('is_active', $service->is_active) ? 'checked' : '' }} class="rounded border-amber-500/50 text-amber-500 focus:ring-amber-500">
            Active
        </label>
        <div class="flex gap-2">
            <button type="submit" class="rounded bg-amber-500 text-black font-medium px-4 py-2 hover:bg-amber-400 transition">Update</button>
            <a href="{{ route('admin.services.index') }}" class="rounded border border-amber-500/30 px-4 py-2 hover:bg-white/5 transition">Cancel</a>
        </div>
    </form>
@endsection
