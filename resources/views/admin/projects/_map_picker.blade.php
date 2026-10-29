@php
    $currentX = old('map_x', isset($project) ? $project->map_x : null);
    $currentY = old('map_y', isset($project) ? $project->map_y : null);
    $currentCity = old('map_city', isset($project) ? $project->map_city : 'Colombo');
@endphp

<div class="pt-6 border-t border-slate-100">
    <div class="flex items-center justify-between mb-3">
        <div>
            <label class="block text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
                <span>Sri Lanka Map Pin Placement</span>
            </label>
            <p class="text-xs text-slate-500 mt-0.5">Click directly on the map below or pick a city preset to place this project pin on the website's live interactive map.</p>
        </div>
        <button type="button" id="btn_clear_map_pin" class="text-[11px] font-bold text-slate-400 hover:text-red-600 transition-colors">
            Clear Pin
        </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-inner">
        {{-- ── LEFT: INTERACTIVE MAP VIEWER ── --}}
        <div class="lg:col-span-6 flex flex-col items-center justify-center">
            <div class="relative w-full max-w-[280px] sm:max-w-[310px] bg-[#02050e] rounded-2xl p-4 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden">
                {{-- Background Grid --}}
                <div class="absolute inset-0 opacity-[0.07] pointer-events-none" style="background-image: linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px); background-size: 20px 20px;"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl pointer-events-none"></div>

                {{-- Interactive Map Click Target --}}
                <div id="sl_map_container" class="relative w-full cursor-crosshair select-none group">
                    <img
                        id="sl_map_image"
                        src="/images/dsrzone-sri-lanka-coverage-map.png"
                        alt="Sri Lanka Coverage Map"
                        class="w-full h-auto block select-none pointer-events-none filter drop-shadow-[0_0_15px_rgba(0,166,255,0.7)] brightness-110"
                        draggable="false"
                    />

                    {{-- Live Placed Pin --}}
                    <div
                        id="sl_map_pin"
                        class="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-150 {{ is_numeric($currentX) && is_numeric($currentY) ? '' : 'hidden' }}"
                        style="left: {{ $currentX ?? 41.5 }}%; top: {{ $currentY ?? 61.5 }}%; z-index: 30;"
                    >
                        {{-- Outer Pulse Ring --}}
                        <div class="absolute -inset-2 rounded-full bg-cyan-400/40 animate-ping"></div>
                        <div class="relative w-5 h-5 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-white p-0.5 shadow-[0_0_15px_#00f0ff] ring-2 ring-white">
                            <div class="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                                <div class="w-1.5 h-1.5 rounded-full bg-cyan-300"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-3 text-center">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-medium text-cyan-300">
                        <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span id="sl_coords_display">
                            @if(is_numeric($currentX) && is_numeric($currentY))
                                Coordinates: X: {{ number_format($currentX, 1) }}%, Y: {{ number_format($currentY, 1) }}%
                            @else
                                Click on map to place pin
                            @endif
                        </span>
                    </span>
                </div>
            </div>
        </div>

        {{-- ── RIGHT: INPUTS & PRESETS ── --}}
        <div class="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <div class="sm:col-span-1">
                        <label for="map_x" class="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">Map X (%)</label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            name="map_x"
                            id="map_x"
                            value="{{ $currentX }}"
                            placeholder="41.5"
                            class="w-full rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-2 text-xs font-mono font-bold text-cyan-300 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        >
                    </div>
                    <div class="sm:col-span-1">
                        <label for="map_y" class="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">Map Y (%)</label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            name="map_y"
                            id="map_y"
                            value="{{ $currentY }}"
                            placeholder="61.5"
                            class="w-full rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-2 text-xs font-mono font-bold text-cyan-300 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        >
                    </div>
                    <div class="sm:col-span-1">
                        <label for="map_city" class="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">City Label</label>
                        <input
                            type="text"
                            name="map_city"
                            id="map_city"
                            value="{{ $currentCity }}"
                            placeholder="Colombo"
                            class="w-full rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-2 text-xs font-bold text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        >
                    </div>
                </div>

                {{-- Preset City Buttons --}}
                <div class="mt-3">
                    <div class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                        Quick City Presets (1-Click Placement):
                    </div>
                    <div class="flex flex-wrap gap-1.5" id="city_presets_container">
                        @php
                            $presetCities = [
                                ['name' => 'Colombo', 'x' => 41.5, 'y' => 61.5],
                                ['name' => 'Gampaha', 'x' => 42.0, 'y' => 56.5],
                                ['name' => 'Kandy', 'x' => 52.0, 'y' => 52.5],
                                ['name' => 'Galle', 'x' => 45.0, 'y' => 82.5],
                                ['name' => 'Matara', 'x' => 51.5, 'y' => 88.5],
                                ['name' => 'Kurunegala', 'x' => 47.5, 'y' => 48.0],
                                ['name' => 'Dambulla', 'x' => 53.0, 'y' => 42.0],
                                ['name' => 'Anuradhapura', 'x' => 48.0, 'y' => 28.0],
                                ['name' => 'Jaffna', 'x' => 46.5, 'y' => 11.5],
                                ['name' => 'Negombo', 'x' => 40.0, 'y' => 54.0],
                                ['name' => 'Bentota', 'x' => 43.5, 'y' => 72.0],
                                ['name' => 'Batticaloa', 'x' => 74.0, 'y' => 52.0],
                                ['name' => 'Nuwara Eliya', 'x' => 53.5, 'y' => 60.0],
                                ['name' => 'Ratnapura', 'x' => 47.0, 'y' => 67.0],
                                ['name' => 'Trincomalee', 'x' => 64.0, 'y' => 27.5],
                            ];
                        @endphp
                        @foreach($presetCities as $city)
                            <button
                                type="button"
                                class="btn-city-preset px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 text-slate-300 hover:bg-cyan-500 hover:text-white border border-slate-700/80 transition-all hover:scale-105"
                                data-city="{{ $city['name'] }}"
                                data-x="{{ $city['x'] }}"
                                data-y="{{ $city['y'] }}"
                            >
                                {{ $city['name'] }}
                            </button>
                        @endforeach
                    </div>
                </div>
            </div>

            <div class="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-[11px] text-blue-200/90 leading-relaxed">
                💡 <strong>Tip:</strong> The live pin will appear directly on the website homepage map at this coordinate with smooth pulse animations and your project's details on click.
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const mapContainer = document.getElementById('sl_map_container');
        const mapPin = document.getElementById('sl_map_pin');
        const inputX = document.getElementById('map_x');
        const inputY = document.getElementById('map_y');
        const inputCity = document.getElementById('map_city');
        const coordsDisplay = document.getElementById('sl_coords_display');
        const btnClear = document.getElementById('btn_clear_map_pin');

        function updatePinPosition(x, y, cityName = null) {
            x = Math.max(0, Math.min(100, parseFloat(x) || 0));
            y = Math.max(0, Math.min(100, parseFloat(y) || 0));

            inputX.value = x.toFixed(1);
            inputY.value = y.toFixed(1);

            if (cityName) {
                inputCity.value = cityName;
            }

            mapPin.style.left = x.toFixed(1) + '%';
            mapPin.style.top = y.toFixed(1) + '%';
            mapPin.classList.remove('hidden');

            const cityLabel = inputCity.value ? ` (${inputCity.value})` : '';
            coordsDisplay.textContent = `Coordinates: X: ${x.toFixed(1)}%, Y: ${y.toFixed(1)}%${cityLabel}`;
        }

        // Click on map to place pin
        if (mapContainer) {
            mapContainer.addEventListener('click', function (e) {
                const rect = mapContainer.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                updatePinPosition(x, y);
            });
        }

        // Input changes update pin live
        [inputX, inputY].forEach(input => {
            if (input) {
                input.addEventListener('input', function () {
                    const x = parseFloat(inputX.value);
                    const y = parseFloat(inputY.value);
                    if (!isNaN(x) && !isNaN(y)) {
                        updatePinPosition(x, y);
                    }
                });
            }
        });

        // Preset City Buttons
        document.querySelectorAll('.btn-city-preset').forEach(btn => {
            btn.addEventListener('click', function () {
                const x = this.dataset.x;
                const y = this.dataset.y;
                const city = this.dataset.city;
                updatePinPosition(x, y, city);
            });
        });

        // Clear pin button
        if (btnClear) {
            btnClear.addEventListener('click', function () {
                inputX.value = '';
                inputY.value = '';
                mapPin.classList.add('hidden');
                coordsDisplay.textContent = 'Click on map to place pin';
            });
        }
    });
</script>
