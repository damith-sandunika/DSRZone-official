<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;

class TestimonialController extends Controller
{
    public function index(): View
    {
        $testimonials = Testimonial::orderBy('is_active')->orderBy('order')->orderBy('id', 'desc')->get();
        return view('admin.testimonials.index', compact('testimonials'));
    }

    public function create(): View
    {
        return view('admin.testimonials.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'product_name' => 'nullable|string|max:255',
            'contact_details' => 'nullable|string|max:500',
            'testimonial' => 'required|string',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'rating' => 'nullable|integer|min:1|max:5',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);
        $data['order'] = $data['order'] ?? 0;
        $data['is_active'] = $request->boolean('is_active');
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('testimonials', 'public');
            $data['avatar'] = 'storage/' . $path;
        } else {
            unset($data['avatar']);
        }
        Testimonial::create($data);
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial created.');
    }

    public function edit(Testimonial $testimonial): View
    {
        return view('admin.testimonials.edit', compact('testimonial'));
    }

    public function update(Request $request, Testimonial $testimonial): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'product_name' => 'nullable|string|max:255',
            'contact_details' => 'nullable|string|max:500',
            'testimonial' => 'required|string',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'rating' => 'nullable|integer|min:1|max:5',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);
        $data['is_active'] = $request->boolean('is_active');
        if ($request->hasFile('avatar')) {
            if ($testimonial->avatar && str_starts_with($testimonial->avatar, 'storage/')) {
                Storage::disk('public')->delete(str_replace('storage/', '', $testimonial->avatar));
            }
            $path = $request->file('avatar')->store('testimonials', 'public');
            $data['avatar'] = 'storage/' . $path;
        } else {
            unset($data['avatar']);
        }
        $testimonial->update($data);
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial updated.');
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        if ($testimonial->avatar && str_starts_with($testimonial->avatar, 'storage/')) {
            Storage::disk('public')->delete(str_replace('storage/', '', $testimonial->avatar));
        }
        $testimonial->delete();
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial deleted.');
    }

    public function approve(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->update(['is_active' => true]);
        return redirect()->route('admin.testimonials.index')->with('success', 'Review approved and now visible on the website.');
    }

    public function reject(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->update(['is_active' => false]);
        return redirect()->route('admin.testimonials.index')->with('success', 'Review hidden from the website.');
    }
}
