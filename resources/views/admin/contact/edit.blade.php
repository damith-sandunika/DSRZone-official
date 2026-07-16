@extends('admin.layout')

@section('title', 'Contact details')

@section('content')
    <p class="text-gray-400 mb-6">These details appear in the Contact Us section on the website (email, phone, LinkedIn, Facebook, WhatsApp).</p>
    <form action="{{ route('admin.contact.update') }}" method="POST" class="max-w-xl space-y-4">
        @csrf
        @method('PUT')
        <div>
            <label for="email" class="block text-sm text-gray-400 mb-1">Email address</label>
            <input type="email" name="email" id="email" value="{{ old('email', $contact->email) }}" placeholder="contact@example.com" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="phone" class="block text-sm text-gray-400 mb-1">Phone number</label>
            <input type="text" name="phone" id="phone" value="{{ old('phone', $contact->phone) }}" placeholder="+1 234 567 8900" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="linkedin_url" class="block text-sm text-gray-400 mb-1">LinkedIn profile URL</label>
            <input type="url" name="linkedin_url" id="linkedin_url" value="{{ old('linkedin_url', $contact->linkedin_url) }}" placeholder="https://linkedin.com/in/..." class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="facebook_url" class="block text-sm text-gray-400 mb-1">Facebook profile URL</label>
            <input type="url" name="facebook_url" id="facebook_url" value="{{ old('facebook_url', $contact->facebook_url) }}" placeholder="https://facebook.com/..." class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="twitter_url" class="block text-sm text-gray-400 mb-1">Twitter profile URL</label>
            <input type="url" name="twitter_url" id="twitter_url" value="{{ old('twitter_url', $contact->twitter_url) }}" placeholder="https://twitter.com/..." class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="instagram_url" class="block text-sm text-gray-400 mb-1">Instagram profile URL</label>
            <input type="url" name="instagram_url" id="instagram_url" value="{{ old('instagram_url', $contact->instagram_url) }}" placeholder="https://instagram.com/..." class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="youtube_url" class="block text-sm text-gray-400 mb-1">YouTube channel URL</label>
            <input type="url" name="youtube_url" id="youtube_url" value="{{ old('youtube_url', $contact->youtube_url) }}" placeholder="https://youtube.com/..." class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
        </div>
        <div>
            <label for="whatsapp" class="block text-sm text-gray-400 mb-1">WhatsApp</label>
            <input type="text" name="whatsapp" id="whatsapp" value="{{ old('whatsapp', $contact->whatsapp) }}" placeholder="+1234567890 or full wa.me link" class="w-full rounded border border-amber-500/30 bg-white/5 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
            <p class="text-xs text-gray-500 mt-1">Use phone number with country code (e.g. +1234567890) or full link (e.g. https://wa.me/1234567890).</p>
        </div>
        <div class="flex gap-2">
            <button type="submit" class="rounded bg-amber-500 text-black font-medium px-4 py-2 hover:bg-amber-400 transition">Update contact details</button>
            <a href="{{ route('admin.dashboard') }}" class="rounded border border-amber-500/30 px-4 py-2 hover:bg-white/5 transition">Back to dashboard</a>
        </div>
    </form>
@endsection
