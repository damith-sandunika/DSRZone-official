@extends('admin.layout')

@section('title', 'Add New Testimonial')

@section('content')
    @include('admin._page_header', [
        'title' => 'Add New Client Review',
        'subtitle' => 'Add verified client feedback with client portrait, company logo, phone number, and growth stats.',
        'actions' => '<a href="' . route('admin.testimonials.index') . '" class="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg> Back to Testimonials</a>'
    ])

    <div class="bg-white rounded-2xl border border-slate-200/80 p-6 lg:p-8 shadow-sm max-w-4xl">
        <form action="{{ route('admin.testimonials.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
            @csrf

            <!-- Client Name & Position -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label for="name" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Client Full Name *</label>
                    <input type="text" name="name" id="name" value="{{ old('name') }}" required placeholder="e.g. Kasun Perera" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                </div>
                <div>
                    <label for="position" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Position / Designation *</label>
                    <input type="text" name="position" id="position" value="{{ old('position') }}" required placeholder="e.g. Managing Director / Founder" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                </div>
            </div>

            <!-- Company Name & Phone Number -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label for="company" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Company / Business Name *</label>
                    <input type="text" name="company" id="company" value="{{ old('company') }}" required placeholder="e.g. Rapid Laundromat Group" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                </div>
                <div>
                    <label for="phone" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Telephone / Mobile Number</label>
                    <input type="text" name="phone" id="phone" value="{{ old('phone') }}" placeholder="e.g. +61 412 345 678 or 077 123 4567" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                </div>
            </div>

            <!-- Images: Client Profile Picture & Company Logo -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                <div>
                    <label for="avatar" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Client Profile Photo (Main Spotlight Image) *</label>
                    <input type="file" name="avatar" id="avatar" accept="image/*" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-600 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-bold">
                    <p class="text-[11px] text-slate-400 mt-1">Professional portrait photo of the client (square or portrait ratio).</p>
                </div>
                <div>
                    <label for="company_logo" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Company Logo / Brand Graphic</label>
                    <input type="file" name="company_logo" id="company_logo" accept="image/*" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-600 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-bold">
                    <p class="text-[11px] text-slate-400 mt-1">Company emblem or logo displayed inside the review card.</p>
                </div>
            </div>

            <!-- Review Feedback Text -->
            <div>
                <label for="testimonial" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Testimonial Review Message *</label>
                <textarea name="testimonial" id="testimonial" rows="4" required placeholder="Write the client's detailed review..." class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">{{ old('testimonial') }}</textarea>
            </div>

            <!-- Growth Stat & Star Rating -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                <div>
                    <label for="growth_stat" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Growth Metric / Badge (Optional)</label>
                    <input type="text" name="growth_stat" id="growth_stat" value="{{ old('growth_stat', '50% Faster Operations') }}" placeholder="e.g. 50% Faster Operations or 3x Sales Growth" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none">
                    <p class="text-[11px] text-slate-400 mt-1">Shown in the 3D floating badge next to client portrait.</p>
                </div>
                <div>
                    <label for="rating" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Star Rating</label>
                    <select name="rating" id="rating" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none">
                        <option value="5" selected>★★★★★ (5 Stars - Exceptional)</option>
                        <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                        <option value="3">★★★☆☆ (3 Stars - Good)</option>
                    </select>
                </div>
            </div>

            <!-- Display Order & Active status -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                <div>
                    <label for="order" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Display Order</label>
                    <input type="number" name="order" id="order" value="{{ old('order', 0) }}" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none">
                </div>
                <div class="flex items-center pt-6">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }} class="w-4 h-4 rounded text-blue-600 focus:ring-blue-500">
                        <span class="text-xs font-bold text-slate-700 uppercase tracking-wider">Approved & Published Immediately</span>
                    </label>
                </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <a href="{{ route('admin.testimonials.index') }}" class="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</a>
                <button type="submit" class="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all">Save Testimonial</button>
            </div>
        </form>
    </div>
@endsection
