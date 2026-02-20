<?php

use App\Http\Controllers\Admin\ContactDetailController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\TestimonialController as AdminTestimonialController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;

// Admin login (must be before SPA catch-all)
Route::get('admin/login', [LoginController::class, 'showLoginForm'])->name('admin.login');
Route::post('admin/login', [LoginController::class, 'login']);

// Admin panel (auth + is_admin)
Route::prefix('admin')->middleware(['web', 'auth', 'admin'])->name('admin.')->group(function () {
    Route::post('logout', [LoginController::class, 'logout'])->name('logout');
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('services', AdminServiceController::class)->except(['show']);
    Route::resource('products', AdminProductController::class)->except(['show']);
    Route::resource('projects', AdminProjectController::class)->except(['show']);
    Route::resource('testimonials', AdminTestimonialController::class)->except(['show']);
    Route::post('testimonials/{testimonial}/approve', [AdminTestimonialController::class, 'approve'])->name('testimonials.approve');
    Route::post('testimonials/{testimonial}/reject', [AdminTestimonialController::class, 'reject'])->name('testimonials.reject');
    Route::get('messages', [ContactMessageController::class, 'index'])->name('messages.index');
    Route::get('messages/{message}', [ContactMessageController::class, 'show'])->name('messages.show');
    Route::delete('messages/{message}', [ContactMessageController::class, 'destroy'])->name('messages.destroy');
    Route::get('contact', [ContactDetailController::class, 'edit'])->name('contact.edit');
    Route::put('contact', [ContactDetailController::class, 'update'])->name('contact.update');
});

// SPA: serve app view for home and product pages so they always load
Route::get('/', function () {
    return view('app');
});
Route::get('/products/{slug}', function () {
    return view('app');
})->where('slug', '[a-zA-Z0-9\-]+');

// SPA catch-all for any other client route (must be last)
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
