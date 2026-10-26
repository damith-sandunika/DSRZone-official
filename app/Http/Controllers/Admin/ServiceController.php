<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Service\CreateServiceAction;
use App\Actions\Service\DeleteServiceAction;
use App\Actions\Service\UpdateServiceAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ServiceFormRequest;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ServiceController extends Controller
{
    public function index(): View
    {
        $services = Service::orderBy('order')->orderBy('id')->paginate(15);
        return view('admin.services.index', compact('services'));
    }

    public function create(): View
    {
        return view('admin.services.create');
    }

    public function store(ServiceFormRequest $request, CreateServiceAction $action): RedirectResponse
    {
        $action->execute($request, $request->validated());
        return redirect()->route('admin.services.index')->with('success', 'Service created successfully.');
    }

    public function show(Service $service): View
    {
        return view('admin.services.show', compact('service'));
    }

    public function edit(Service $service): View
    {
        return view('admin.services.edit', compact('service'));
    }

    public function update(ServiceFormRequest $request, Service $service, UpdateServiceAction $action): RedirectResponse
    {
        $action->execute($request, $service, $request->validated());
        return redirect()->route('admin.services.index')->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service, DeleteServiceAction $action): RedirectResponse
    {
        $action->execute($service);
        return redirect()->route('admin.services.index')->with('success', 'Service and its media deleted successfully.');
    }
}
