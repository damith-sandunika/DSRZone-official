<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Product\CreateProductAction;
use App\Actions\Product\DeleteProductAction;
use App\Actions\Product\UpdateProductAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductFormRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ProductController extends Controller
{
    public function index(): View
    {
        $products = Product::orderBy('order')->orderBy('id')->paginate(15);
        return view('admin.products.index', compact('products'));
    }

    public function create(): View
    {
        return view('admin.products.create');
    }

    public function store(ProductFormRequest $request, CreateProductAction $action): RedirectResponse
    {
        $action->execute($request, $request->validated());
        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

    public function show(Product $product): View
    {
        $product->load(['projects' => fn($q) => $q->orderBy('order')->orderBy('id', 'desc')]);
        return view('admin.products.show', compact('product'));
    }

    public function edit(Product $product): View
    {
        return view('admin.products.edit', compact('product'));
    }

    public function update(ProductFormRequest $request, Product $product, UpdateProductAction $action): RedirectResponse
    {
        $action->execute($request, $product, $request->validated());
        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product, DeleteProductAction $action): RedirectResponse
    {
        $action->execute($product);
        return redirect()->route('admin.products.index')->with('success', 'Product and its media deleted successfully.');
    }
}
