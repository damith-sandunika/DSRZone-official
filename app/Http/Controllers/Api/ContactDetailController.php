<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactDetail;
use Illuminate\Http\JsonResponse;

class ContactDetailController extends Controller
{
    /**
     * Return contact details for the Contact Us section (email, phone, social, WhatsApp).
     */
    public function index(): JsonResponse
    {
        $contact = ContactDetail::get();
        return response()->json([
            'email' => $contact->email,
            'phone' => $contact->phone,
            'linkedin_url' => $contact->linkedin_url,
            'facebook_url' => $contact->facebook_url,
            'whatsapp' => $contact->whatsapp,
        ]);
    }
}
