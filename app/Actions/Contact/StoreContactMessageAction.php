<?php

namespace App\Actions\Contact;

use App\Models\ContactMessage;
use Illuminate\Support\Facades\Log;

class StoreContactMessageAction
{
    /**
     * Store and log a new contact message.
     *
     * @param array<string, mixed> $data
     */
    public function execute(array $data): ContactMessage
    {
        $message = ContactMessage::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'subject' => $data['subject'] ?? null,
            'message' => $data['message'],
            'is_read' => false,
        ]);

        Log::info('New contact inquiry submitted', [
            'id' => $message->id,
            'email' => $message->email,
            'name' => $message->name,
            'ip' => request()->ip(),
        ]);

        return $message;
    }
}
