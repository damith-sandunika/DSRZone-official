<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TestimonialController extends Controller
{
    /**
     * Display a listing of active (approved) testimonials.
     */
    public function index(): JsonResponse
    {
        $testimonials = Testimonial::where('is_active', true)
            ->orderBy('order')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json($testimonials);
    }

    /**
     * Store a new testimonial (customer submission). Pending until admin approves.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'product_name' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'contact_details' => 'nullable|string|max:500',
            'testimonial' => 'required|string|max:2000',
            'rating' => 'nullable|integer|min:1|max:5',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        unset($data['avatar']);
        $data['order'] = 0;
        $data['is_active'] = false;

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('testimonials', 'public');
            $data['avatar'] = 'storage/' . $path;
        }

        Testimonial::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Thank you! Your review has been submitted and will appear after approval.',
        ], 201);
    }
}

