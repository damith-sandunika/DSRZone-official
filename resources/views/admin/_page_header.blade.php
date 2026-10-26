<div class="mb-6 relative z-30 w-full">
    <div class="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-slate-200 relative flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden">
        {{-- SmartPetCare Iconic Right Geometric Layered Pattern --}}
        <div class="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
            <div class="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-50/80 to-transparent pointer-events-none"></div>
            <div class="absolute right-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none opacity-60">
                <div class="w-24 h-24 bg-blue-100/50 rotate-45 translate-x-12 rounded-lg"></div>
                <div class="w-36 h-36 bg-blue-200/50 rotate-45 translate-x-6 -ml-8 rounded-xl"></div>
                <div class="w-48 h-48 bg-blue-300/40 rotate-45 -ml-12 rounded-2xl"></div>
                <div class="w-32 h-32 bg-blue-400/30 rotate-45 -ml-16 rounded-lg"></div>
            </div>
        </div>

        {{-- Left Title & Subtitle --}}
        <div class="relative z-10 w-full flex-1">
            <div class="flex flex-col gap-0.5">
                <h1 class="text-xl font-bold text-slate-900 tracking-tight">{{ $title }}</h1>
                @if(!empty($subtitle))
                    <p class="text-slate-500 text-sm font-medium">{{ $subtitle }}</p>
                @endif
            </div>
        </div>

        {{-- Right Actions (Desktop) --}}
        @if(isset($actions))
            <div class="relative z-10 hidden md:flex items-center gap-3 shrink-0">
                {!! $actions !!}
            </div>
        @endif
    </div>

    {{-- Right Actions (Mobile) --}}
    @if(isset($actions))
        <div class="mt-4 md:hidden w-full flex flex-col gap-3 items-end">
            {!! $actions !!}
        </div>
    @endif
</div>
