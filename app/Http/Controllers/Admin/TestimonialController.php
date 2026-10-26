<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TestimonialFormRequest;
use App\Models\Testimonial;
use App\Services\MediaService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;

class TestimonialController extends Controller
{
    public function __construct(
        protected MediaService $media
    ) {}

    public function index(): View
    {
        $testimonials = Testimonial::orderBy('is_active')
            ->orderBy('order')
            ->orderBy('id', 'desc')
            ->paginate(15);

        return view('admin.testimonials.index', compact('testimonials'));
    }

    public function create(): View
    {
        return view('admin.testimonials.create');
    }

    public function store(TestimonialFormRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['order'] = $data['order'] ?? 0;
        $data['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('avatar')) {
            $data['avatar'] = $this->media->upload($request->file('avatar'), 'testimonials');
        }

        if ($request->hasFile('company_logo')) {
            $data['company_logo'] = $this->media->upload($request->file('company_logo'), 'testimonials/company_logos');
        }

        Testimonial::create($data);
        Log::info('Testimonial created by admin', ['name' => $data['name']]);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial created.');
    }

    public function show(Testimonial $testimonial): View
    {
        return view('admin.testimonials.show', compact('testimonial'));
    }

    public function edit(Testimonial $testimonial): View
    {
        return view('admin.testimonials.edit', compact('testimonial'));
    }

    public function update(TestimonialFormRequest $request, Testimonial $testimonial): RedirectResponse
    {
        $data = $request->validated();
        $data['is_active'] = $request->boolean('is_active');

        if ($request->hasFile('avatar')) {
            $this->media->delete($testimonial->avatar);
            $data['avatar'] = $this->media->upload($request->file('avatar'), 'testimonials');
        }

        if ($request->hasFile('company_logo')) {
            $this->media->delete($testimonial->company_logo);
            $data['company_logo'] = $this->media->upload($request->file('company_logo'), 'testimonials/company_logos');
        }

        $testimonial->update($data);
        Log::info('Testimonial updated by admin', ['id' => $testimonial->id]);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial updated.');
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $this->media->delete($testimonial->avatar);
        $this->media->delete($testimonial->company_logo);
        $id = $testimonial->id;
        $testimonial->delete();

        Log::info('Testimonial deleted', ['id' => $id]);
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial deleted.');
    }

    public function approve(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->update(['is_active' => true]);
        Log::info('Testimonial approved', ['id' => $testimonial->id]);

        return redirect()->route('admin.testimonials.index')->with('success', 'Review approved and published.');
    }

    public function reject(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->update(['is_active' => false]);
        Log::info('Testimonial rejected', ['id' => $testimonial->id]);

        return redirect()->route('admin.testimonials.index')->with('success', 'Review hidden from the website.');
    }
}
