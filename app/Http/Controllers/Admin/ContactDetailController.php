<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactDetail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ContactDetailController extends Controller
{
    public function edit(): View
    {
        $contact = ContactDetail::get();
        return view('admin.contact.edit', compact('contact'));
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'linkedin_url' => 'nullable|url|max:500',
            'facebook_url' => 'nullable|url|max:500',
            'twitter_url' => 'nullable|url|max:500',
            'instagram_url' => 'nullable|url|max:500',
            'youtube_url' => 'nullable|url|max:500',
            'whatsapp' => 'nullable|string|max:100',
        ]);

        $contact = ContactDetail::get();
        $contact->update($data);

        return redirect()->route('admin.contact.edit')->with('success', 'Contact details updated.');
    }
}
