<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class MediaService
{
    public const DISK = 'public';

    /**
     * Upload an image to the specified directory.
     */
    public function upload(UploadedFile $file, string $directory): string
    {
        $extension = $file->getClientOriginalExtension() ?: 'jpg';
        $filename = Str::uuid() . '.' . $extension;
        $path = $file->storeAs($directory, $filename, self::DISK);

        return $path ?: '';
    }

    /**
     * Normalize stored path into an absolute URL.
     */
    public function url(?string $value): ?string
    {
        if ($value === null || trim($value) === '') {
            return null;
        }

        $value = trim($value);

        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) {
            return $value;
        }

        // Clean prefix if it already has storage/
        $cleanPath = preg_replace('#^storage/#', '', $value);

        if (Storage::disk(self::DISK)->exists($cleanPath)) {
            return URL::asset('storage/' . $cleanPath);
        }

        if (preg_match('#^(products|projects|services|testimonials)/#', $value)) {
            return URL::asset('storage/' . $value);
        }

        $path = str_starts_with($value, '/') ? $value : '/images/' . ltrim($value, '/');
        return URL::to($path);
    }

    /**
     * Delete an existing file from disk to prevent storage leaks.
     */
    public function delete(?string $path): void
    {
        if ($path === null || trim($path) === '') {
            return;
        }

        $cleanPath = preg_replace('#^storage/#', '', trim($path));

        if (Storage::disk(self::DISK)->exists($cleanPath)) {
            Storage::disk(self::DISK)->delete($cleanPath);
        }
    }

    /**
     * Normalize an array of paths.
     * @param array<int, string|null> $paths
     * @return array<int, string>
     */
    public function urlArray(array $paths): array
    {
        return array_values(array_filter(array_map(
            fn ($p) => $this->url(is_string($p) ? $p : null),
            $paths
        )));
    }
}
