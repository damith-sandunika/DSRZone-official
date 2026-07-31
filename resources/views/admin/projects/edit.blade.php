@extends('admin.layout')

@section('title', 'Edit Project')

@section('content')
    <h1 class="text-2xl font-semibold text-amber-400 mb-6">Edit Project</h1>
    <form action="{{ route('admin.projects.update', $project) }}" method="POST" enctype="multipart/form-data" class="max-w-xl space-y-4">
        @csrf
        @method('PUT')
        @if ($errors->any())
            <div class="p-4 mb-4 text-sm text-red-400 bg-red-900/20 rounded-lg border border-red-500/30">
                <ul class="list-disc pl-5">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <div>
            <label for="product_id" class="block text-sm text-gray-400 mb-1">Link to product (optional)</label>
            <select name="product_id" id="product_id" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
                <option value="">— None —</option>
                @foreach(\App\Models\Product::orderBy('name')->get() as $prod)
                    <option value="{{ $prod->id }}" {{ old('product_id', $project->product_id) == $prod->id ? 'selected' : '' }}>{{ $prod->name }}</option>
                @endforeach
            </select>
        </div>
        <div>
            <label for="title" class="block text-sm text-gray-400 mb-1">Title</label>
            <input type="text" name="title" id="title" value="{{ old('title', $project->title) }}" required class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="description" class="block text-sm text-gray-400 mb-1">Description</label>
            <textarea name="description" id="description" rows="3" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">{{ old('description', $project->description) }}</textarea>
        </div>
        <div>
            <label for="problem" class="block text-sm text-gray-400 mb-1">Problem / Challenge faced</label>
            <textarea name="problem" id="problem" rows="3" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">{{ old('problem', $project->problem) }}</textarea>
        </div>
        <div>
            <label for="solution" class="block text-sm text-gray-400 mb-1">Our Solution</label>
            <textarea name="solution" id="solution" rows="3" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">{{ old('solution', $project->solution) }}</textarea>
        </div>
        <div>
            <label for="image" class="block text-sm text-gray-400 mb-1">Image (optional)</label>
            @php $imgUrl = $project->image && str_starts_with($project->image, 'projects/') ? asset('storage/'.$project->image) : null; @endphp
            @if($imgUrl)
                <p class="text-xs text-emerald-400 mb-1">Current image:</p>
                <img src="{{ $imgUrl }}" alt="" class="h-24 w-auto object-cover rounded border border-white/10 mb-2">
            @endif
            <input type="file" name="image" id="image" accept="image/*" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none file:mr-2 file:rounded file:border-0 file:bg-amber-500/20 file:px-3 file:py-1 file:text-amber-400">
        </div>
        <div>
            <label for="logo" class="block text-sm text-gray-400 mb-1">Client Logo (optional)</label>
            @php $logoUrl = $project->logo && str_starts_with($project->logo, 'projects/logos/') ? asset('storage/'.$project->logo) : null; @endphp
            @if($logoUrl)
                <p class="text-xs text-emerald-400 mb-1">Current logo:</p>
                <img src="{{ $logoUrl }}" alt="" class="h-16 w-auto object-contain rounded border border-white/10 mb-2 bg-white/10 p-1">
            @endif
            <input type="file" name="logo" id="logo" accept="image/*" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none file:mr-2 file:rounded file:border-0 file:bg-amber-500/20 file:px-3 file:py-1 file:text-amber-400">
            <p class="text-xs text-gray-500 mt-1">Max 5MB. JPEG, PNG, GIF, WebP, SVG. (Shows on frontend slider)</p>
        </div>
        <div>
            <label for="category" class="block text-sm text-gray-400 mb-1">Category</label>
            <input type="text" name="category" id="category" value="{{ old('category', $project->category) }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="client" class="block text-sm text-gray-400 mb-1">Client</label>
            <input type="text" name="client" id="client" value="{{ old('client', $project->client) }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="project_date" class="block text-sm text-gray-400 mb-1">Project date</label>
            <input type="date" name="project_date" id="project_date" value="{{ old('project_date', $project->project_date?->format('Y-m-d')) }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="project_url" class="block text-sm text-gray-400 mb-1">Project URL</label>
            <input type="url" name="project_url" id="project_url" value="{{ old('project_url', $project->project_url) }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label class="block text-sm text-gray-400 mb-1">Technologies (one per line)</label>
            <textarea name="technologies_text" id="technologies_text" rows="3" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">{{ old('technologies_text', is_array($project->technologies) ? implode("\n", $project->technologies) : '') }}</textarea>
        </div>
        <div>
            <label for="order" class="block text-sm text-gray-400 mb-1">Order</label>
            <input type="number" name="order" id="order" value="{{ old('order', $project->order) }}" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>

        {{-- ── Map Location Picker ── --}}
        <div>
            <label class="block text-sm text-gray-400 mb-2">📍 Map Location (click on map to move pin)</label>
            <div class="relative inline-block border border-amber-500/30 rounded overflow-hidden cursor-crosshair" style="max-width:320px;width:100%">
                <img id="map-picker-img" src="/images/sri lanka Map.png" alt="Sri Lanka Map"
                     style="width:100%;display:block;background:#06090f;filter:drop-shadow(0 0 8px rgba(59,130,246,0.4))">
                <div id="map-pin" style="display:none;position:absolute;width:14px;height:14px;border-radius:50%;background:#3b82f6;border:2px solid #93c5fd;box-shadow:0 0 10px rgba(59,130,246,0.8);transform:translate(-50%,-50%);pointer-events:none"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1" id="map-coords-label">No location selected</p>
            <input type="hidden" name="map_x" id="map_x" value="{{ old('map_x', $project->map_x) }}">
            <input type="hidden" name="map_y" id="map_y" value="{{ old('map_y', $project->map_y) }}">
            <div class="mt-2">
                <label for="map_city" class="block text-xs text-gray-400 mb-1">City / Location name</label>
                <input type="text" name="map_city" id="map_city" value="{{ old('map_city', $project->map_city) }}"
                       placeholder="e.g. Colombo"
                       class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white text-sm focus:border-amber-500 focus:outline-none">
            </div>
        </div>
        <script>
            (function(){
                const img = document.getElementById('map-picker-img');
                const pin = document.getElementById('map-pin');
                const xIn = document.getElementById('map_x');
                const yIn = document.getElementById('map_y');
                const lbl = document.getElementById('map-coords-label');
                function setPin(x, y) {
                    pin.style.display = 'block';
                    pin.style.left = x + '%';
                    pin.style.top  = y + '%';
                    xIn.value = x.toFixed(2);
                    yIn.value = y.toFixed(2);
                    lbl.textContent = 'Location set: ' + x.toFixed(1) + '%, ' + y.toFixed(1) + '%';
                    lbl.style.color = '#60a5fa';
                }
                img.parentElement.addEventListener('click', function(e){
                    const r = img.getBoundingClientRect();
                    setPin((e.clientX - r.left) / r.width * 100, (e.clientY - r.top) / r.height * 100);
                });
                const ox = xIn.value, oy = yIn.value;
                if(ox && oy) setPin(parseFloat(ox), parseFloat(oy));
            })();
        </script>
        <label class="flex items-center gap-2 text-sm text-gray-400">
            <input type="hidden" name="is_featured" value="0">
            <input type="checkbox" name="is_featured" value="1" {{ old('is_featured', $project->is_featured) ? 'checked' : '' }} class="rounded border-amber-500/50 text-amber-500 focus:ring-amber-500">
            Featured
        </label>
        <label class="flex items-center gap-2 text-sm text-gray-400">
            <input type="hidden" name="is_active" value="0">
            <input type="checkbox" name="is_active" value="1" {{ old('is_active', $project->is_active) ? 'checked' : '' }} class="rounded border-amber-500/50 text-amber-500 focus:ring-amber-500">
            Active
        </label>
        <div class="flex gap-2">
            <button type="submit" class="rounded bg-amber-500 text-black font-medium px-4 py-2 hover:bg-amber-400 transition">Update</button>
            <a href="{{ route('admin.projects.index') }}" class="rounded border border-amber-500/30 px-4 py-2 hover:bg-white/5 transition">Cancel</a>
        </div>
    </form>
@endsection
