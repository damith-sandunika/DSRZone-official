<?php

namespace App\Http\Controllers\Api;

use App\Actions\Testimonial\SubmitTestimonialAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTestimonialRequest;
use App\Http\Resources\TestimonialResource;
use App\Http\Responses\ApiResponse;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Throwable;

class TestimonialController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of active (approved) testimonials.
     */
    public function index(): JsonResponse
    {
        $testimonials = Testimonial::where('is_active', true)
            ->orderBy('order')
            ->orderBy('id', 'desc')
            ->limit(50)
            ->get();

        return response()->json(TestimonialResource::collection($testimonials));
    }

    /**
     * Store a new testimonial (customer submission).
     */
    public function store(StoreTestimonialRequest $request, SubmitTestimonialAction $action): JsonResponse
    {
        try {
            $action->execute($request->validated(), $request->file('avatar'));

            return $this->successResponse(
                null,
                'Thank you! Your review has been submitted and will appear after approval.',
                201
            );
        } catch (Throwable $e) {
            report($e);
            return $this->errorResponse(
                'Failed to submit your review. Please try again later.',
                500
            );
        }
    }
}
