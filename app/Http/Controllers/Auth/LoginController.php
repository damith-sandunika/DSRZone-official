<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\View\View;

class LoginController extends Controller
{
    public function showLoginForm(): View
    {
        return view('admin.login');
    }

    public function login(Request $request): RedirectResponse
    {
        $throttleKey = Str::transliterate(Str::lower($request->input('email')) . '|' . $request->ip());

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            Log::warning('Admin login throttled due to too many attempts', [
                'email' => $request->input('email'),
                'ip' => $request->ip(),
                'seconds' => $seconds,
            ]);

            return back()->withErrors([
                'email' => __('Too many login attempts. Please try again in :seconds seconds.', ['seconds' => $seconds]),
            ])->onlyInput('email');
        }

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!Auth::attempt($credentials, $request->boolean('remember'))) {
            RateLimiter::hit($throttleKey, 300); // 5 minutes decay
            Log::warning('Failed admin login attempt', ['email' => $request->input('email'), 'ip' => $request->ip()]);

            return back()->withErrors([
                'email' => __('The provided credentials do not match our records.'),
            ])->onlyInput('email');
        }

        RateLimiter::clear($throttleKey);
        $request->session()->regenerate();

        if (!Auth::user()->is_admin) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            Log::warning('Non-admin user tried to access admin panel', ['email' => $request->input('email'), 'ip' => $request->ip()]);

            return back()->withErrors(['email' => __('Unauthorized.')])->onlyInput('email');
        }

        Log::info('Admin successfully logged in', ['email' => Auth::user()->email, 'ip' => $request->ip()]);
        return redirect()->intended(route('admin.dashboard'));
    }

    public function logout(Request $request): RedirectResponse
    {
        $email = Auth::user()?->email;
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        Log::info('Admin logged out', ['email' => $email, 'ip' => $request->ip()]);
        return redirect()->route('admin.login');
    }
}
