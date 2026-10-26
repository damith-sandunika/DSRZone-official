@extends('admin.layout')

@section('title', 'Contact Details Settings')

@section('content')
    @include('admin._page_header', [
        'title' => 'Company & Contact Settings',
        'subtitle' => 'Configure official telephone, email, location, working hours, and corporate social channels displayed on the website.'
    ])

    <div class="bg-white rounded-2xl border border-slate-200/80 p-6 lg:p-8 shadow-sm max-w-4xl">
        <form action="{{ route('admin.contact.update') }}" method="POST" class="space-y-6">
            @csrf
            @method('PUT')

            <!-- Email & Direct Telephone -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label for="email" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Primary Email Address *</label>
                    <input type="email" name="email" id="email" value="{{ old('email', $contact->email) }}" placeholder="hello@dsrzone.com" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                </div>
                <div>
                    <label for="phone" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Direct Telephone (Call Us) *</label>
                    <input type="text" name="phone" id="phone" value="{{ old('phone', $contact->phone) }}" placeholder="+94 77 000 0000" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                </div>
            </div>

            <!-- Location & Working Hours -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label for="location" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Office / Headquarters Location *</label>
                    <input type="text" name="location" id="location" value="{{ old('location', $contact->location ?? 'Colombo, Sri Lanka') }}" placeholder="e.g. Colombo, Sri Lanka" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                </div>
                <div>
                    <label for="working_hours" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Working Hours *</label>
                    <input type="text" name="working_hours" id="working_hours" value="{{ old('working_hours', $contact->working_hours ?? 'Mon - Fri | 9.00 AM - 6.00 PM') }}" placeholder="e.g. Mon - Fri | 9.00 AM - 6.00 PM" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                </div>
            </div>

            <div>
                <label for="whatsapp" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">WhatsApp Number / Direct Chat</label>
                <input type="text" name="whatsapp" id="whatsapp" value="{{ old('whatsapp', $contact->whatsapp) }}" placeholder="+94 77 000 0000" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
            </div>

            <div class="pt-4 border-t border-slate-100 space-y-4">
                <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wider">Social Channels & Official Links</h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label for="facebook_url" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Facebook Page URL</label>
                        <input type="url" name="facebook_url" id="facebook_url" value="{{ old('facebook_url', $contact->facebook_url) }}" placeholder="https://facebook.com/dsrzone" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                    </div>
                    <div>
                        <label for="linkedin_url" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">LinkedIn Profile URL</label>
                        <input type="url" name="linkedin_url" id="linkedin_url" value="{{ old('linkedin_url', $contact->linkedin_url) }}" placeholder="https://linkedin.com/company/dsrzone" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                        <label for="instagram_url" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Instagram URL</label>
                        <input type="url" name="instagram_url" id="instagram_url" value="{{ old('instagram_url', $contact->instagram_url) }}" placeholder="https://instagram.com/dsrzone" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                    </div>
                    <div>
                        <label for="youtube_url" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">YouTube Channel URL</label>
                        <input type="url" name="youtube_url" id="youtube_url" value="{{ old('youtube_url', $contact->youtube_url) }}" placeholder="https://youtube.com/@dsrzone" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                    </div>
                    <div>
                        <label for="twitter_url" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Twitter / X URL</label>
                        <input type="url" name="twitter_url" id="twitter_url" value="{{ old('twitter_url', $contact->twitter_url) }}" placeholder="https://x.com/dsrzone" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all">
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button type="submit" class="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all">Save Contact Details</button>
            </div>
        </form>
    </div>
@endsection
