<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ContactDetailController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TestimonialController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware('throttle:60,1')->group(function () {
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{slug}', [ProductController::class, 'show']);
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/featured', [ProjectController::class, 'featured']);
    Route::get('/testimonials', [TestimonialController::class, 'index']);
    Route::get('/contact-details', [ContactDetailController::class, 'index']);

    // Strict rate limiting on write endpoints to prevent bot spam
    Route::post('/testimonials', [TestimonialController::class, 'store'])->middleware('throttle:5,1');
    Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:5,1');
});
