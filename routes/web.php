<?php

use App\Http\Controllers\Admin\ContactDetailController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\TestimonialController as AdminTestimonialController;
use App\Http\Controllers\Auth\LoginController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;

// Admin authentication with brute-force rate limit
Route::get('admin/login', [LoginController::class, 'showLoginForm'])->name('admin.login');
Route::post('admin/login', [LoginController::class, 'login'])->middleware('throttle:5,1');

// Admin panel (auth + is_admin)
Route::prefix('admin')->middleware(['web', 'auth', 'admin'])->name('admin.')->group(function () {
    Route::post('logout', [LoginController::class, 'logout'])->name('logout');
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('services', AdminServiceController::class);
    Route::resource('products', AdminProductController::class);
    Route::resource('projects', AdminProjectController::class);
    Route::resource('testimonials', AdminTestimonialController::class);
    Route::post('testimonials/{testimonial}/approve', [AdminTestimonialController::class, 'approve'])->name('testimonials.approve');
    Route::post('testimonials/{testimonial}/reject', [AdminTestimonialController::class, 'reject'])->name('testimonials.reject');
    Route::get('messages', [ContactMessageController::class, 'index'])->name('messages.index');
    Route::get('messages/{message}', [ContactMessageController::class, 'show'])->name('messages.show');
    Route::delete('messages/{message}', [ContactMessageController::class, 'destroy'])->name('messages.destroy');
    Route::get('contact', [ContactDetailController::class, 'edit'])->name('contact.edit');
    Route::put('contact', [ContactDetailController::class, 'update'])->name('contact.update');
});

// SPA routes with dynamic OpenGraph meta support for products
Route::get('/', function () {
    return view('app');
});

Route::get('/products/{slug}', function (string $slug) {
    $metaProduct = Product::where('is_active', true)->where('slug', $slug)->first();
    return view('app', compact('metaProduct'));
})->where('slug', '[a-zA-Z0-9\-]+');

// SPA catch-all for client-side routing
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
