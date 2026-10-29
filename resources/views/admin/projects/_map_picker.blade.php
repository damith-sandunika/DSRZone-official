@php
    $currentX = old('map_x', isset($project) ? $project->map_x : null);
    $currentY = old('map_y', isset($project) ? $project->map_y : null);
    $currentCity = old('map_city', isset($project) ? $project->map_city : '');
@endphp

<div class="pt-6 border-t border-slate-100">
    <div class="flex items-center justify-between mb-3">
        <div>
            <label class="block text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
                <span>Sri Lanka Map Pin Placement</span>
            </label>
            <p class="text-xs text-slate-500 mt-0.5">Click directly on the map to set the project's pin location and enter the District / City name.</p>
        </div>
        <button type="button" id="btn_clear_map_pin" class="text-xs font-bold text-slate-400 hover:text-red-600 transition-colors">
            Clear Pin
        </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-inner items-center">
        {{-- ── LEFT: INTERACTIVE MAP VIEWER ── --}}
        <div class="md:col-span-6 flex flex-col items-center justify-center">
            <div class="relative w-full max-w-[260px] sm:max-w-[280px] bg-[#02050e] rounded-2xl p-3 border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.15)] overflow-hidden">
                {{-- Background Grid --}}
                <div class="absolute inset-0 opacity-[0.06] pointer-events-none" style="background-image: linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px); background-size: 20px 20px;"></div>

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
                        <div class="absolute -inset-2 rounded-full bg-cyan-400/40 animate-ping"></div>
                        <div class="relative w-5 h-5 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-white p-0.5 shadow-[0_0_15px_#00f0ff] ring-2 ring-white">
                            <div class="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                                <div class="w-1.5 h-1.5 rounded-full bg-cyan-300"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-2.5 text-center">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-medium text-cyan-300">
                        <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span id="sl_coords_display">
                            @if(is_numeric($currentX) && is_numeric($currentY))
                                Pin X: {{ number_format($currentX, 1) }}%, Y: {{ number_format($currentY, 1) }}%
                            @else
                                Click on map to place pin
                            @endif
                        </span>
                    </span>
                </div>
            </div>
        </div>

        {{-- ── RIGHT: MANUAL INPUTS ── --}}
        <div class="md:col-span-6 space-y-4">
            <div>
                <label for="map_city" class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    District / City Name *
                </label>
                <input
                    type="text"
                    name="map_city"
                    id="map_city"
                    value="{{ $currentCity }}"
                    placeholder="e.g. Colombo, Kandy, Galle, Kurunegala"
                    class="w-full rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-2.5 text-sm font-semibold text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                >
                <p class="text-[11px] text-slate-400 mt-1">Enter the client's city or district to show on the website map.</p>
            </div>

            <div class="grid grid-cols-2 gap-3 pt-2">
                <div>
                    <label for="map_x" class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Map X Coordinate (%)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        name="map_x"
                        id="map_x"
                        value="{{ $currentX }}"
                        placeholder="Auto on map click"
                        class="w-full rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-2 text-xs font-mono font-bold text-cyan-300 outline-none focus:border-cyan-400"
                    >
                </div>
                <div>
                    <label for="map_y" class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Map Y Coordinate (%)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        name="map_y"
                        id="map_y"
                        value="{{ $currentY }}"
                        placeholder="Auto on map click"
                        class="w-full rounded-xl border border-slate-700 bg-slate-800/90 px-3 py-2 text-xs font-mono font-bold text-cyan-300 outline-none focus:border-cyan-400"
                    >
                </div>
            </div>

            <div class="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-blue-200/90 leading-relaxed">
                📍 Click anywhere on the map to automatically fill the X and Y coordinates.
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
        const coordsDisplay = document.getElementById('sl_coords_display');
        const btnClear = document.getElementById('btn_clear_map_pin');

        function updatePin(x, y) {
            x = Math.max(0, Math.min(100, parseFloat(x) || 0));
            y = Math.max(0, Math.min(100, parseFloat(y) || 0));

            inputX.value = x.toFixed(1);
            inputY.value = y.toFixed(1);

            mapPin.style.left = x.toFixed(1) + '%';
            mapPin.style.top = y.toFixed(1) + '%';
            mapPin.classList.remove('hidden');

            coordsDisplay.textContent = `Pin X: ${x.toFixed(1)}%, Y: ${y.toFixed(1)}%`;
        }

        if (mapContainer) {
            mapContainer.addEventListener('click', function (e) {
                const rect = mapContainer.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                updatePin(x, y);
            });
        }

        [inputX, inputY].forEach(input => {
            if (input) {
                input.addEventListener('input', function () {
                    const x = parseFloat(inputX.value);
                    const y = parseFloat(inputY.value);
                    if (!isNaN(x) && !isNaN(y)) {
                        updatePin(x, y);
                    }
                });
            }
        });

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
