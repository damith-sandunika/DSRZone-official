<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactDetailResource;
use App\Models\ContactDetail;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ContactDetailController extends Controller
{
    /**
     * Return contact details with caching.
     */
    public function index(): JsonResponse
    {
        $contact = Cache::remember('api_contact_details', 3600, function () {
            return ContactDetail::get();
        });

        return response()->json(new ContactDetailResource($contact));
    }
}
