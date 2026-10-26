<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ContactDetailFormRequest;
use App\Models\ContactDetail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\View\View;

class ContactDetailController extends Controller
{
    public function edit(): View
    {
        $contact = ContactDetail::get();
        return view('admin.contact.edit', compact('contact'));
    }

    public function update(ContactDetailFormRequest $request): RedirectResponse
    {
        $contact = ContactDetail::get();
        $contact->update($request->validated());

        Cache::forget('api_contact_details');

        return redirect()->route('admin.contact.edit')->with('success', 'Contact details updated.');
    }
}
