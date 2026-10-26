<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    /**
     * Send a standardized successful JSON response.
     */
    protected function successResponse(mixed $data = null, string $message = 'Success', int $statusCode = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    /**
     * Send a standardized error JSON response.
     */
    protected function errorResponse(string $message = 'An error occurred', int $statusCode = 400, mixed $errors = null): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $message,
        ];

        if ($errors !== null) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $statusCode);
    }
}
