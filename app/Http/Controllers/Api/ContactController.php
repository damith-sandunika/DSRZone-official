<?php

namespace App\Http\Controllers\Api;

use App\Actions\Contact\StoreContactMessageAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\JsonResponse;
use Throwable;

class ContactController extends Controller
{
    use ApiResponse;

    /**
     * Store a newly created contact message through Action.
     */
    public function store(StoreContactRequest $request, StoreContactMessageAction $action): JsonResponse
    {
        try {
            $action->execute($request->validated());

            return $this->successResponse(
                null,
                'Thank you for your message! We will get back to you soon.',
                201
            );
        } catch (Throwable $e) {
            report($e);
            return $this->errorResponse(
                'We could not process your message right now. Please try again later.',
                500
            );
        }
    }
}
