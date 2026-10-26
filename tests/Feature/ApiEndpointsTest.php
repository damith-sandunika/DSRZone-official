<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\Product;
use App\Models\Project;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiEndpointsTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_fetch_services(): void
    {
        Service::create([
            'title' => 'Web Engineering',
            'description' => 'Scalable enterprise solutions',
            'is_active' => true,
            'order' => 1,
        ]);

        $response = $this->getJson('/api/v1/services');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => ['id', 'title', 'description', 'icon', 'image', 'order']
        ]);
    }

    public function test_can_fetch_products(): void
    {
        Product::create([
            'name' => 'Smart Menu',
            'slug' => 'smart-menu',
            'is_active' => true,
            'order' => 1,
        ]);

        $response = $this->getJson('/api/v1/products');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => ['id', 'slug', 'name', 'status', 'features', 'benefits', 'projects']
        ]);
    }

    public function test_can_fetch_projects(): void
    {
        Project::create([
            'title' => 'Retail POS Platform',
            'description' => 'Realtime multi-branch sync',
            'is_active' => true,
            'order' => 1,
        ]);

        $response = $this->getJson('/api/v1/projects');
        $response->assertStatus(200);
    }

    public function test_contact_form_submits_successfully(): void
    {
        $payload = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+94771234567',
            'subject' => 'Project Inquiry',
            'message' => 'Looking for enterprise system architecture.',
        ];

        $response = $this->postJson('/api/v1/contact', $payload);
        $response->assertStatus(201);
        $response->assertJson([
            'success' => true,
        ]);

        $this->assertDatabaseHas('contact_messages', [
            'email' => 'john@example.com',
            'name' => 'John Doe',
        ]);
    }

    public function test_contact_form_rejects_honeypot_spam(): void
    {
        $payload = [
            'name' => 'Spam Bot',
            'email' => 'bot@spammer.com',
            'message' => 'Buy cheap medications',
            'website_hp' => 'http://spamlink.com',
        ];

        $response = $this->postJson('/api/v1/contact', $payload);
        $response->assertStatus(422);

        $this->assertDatabaseMissing('contact_messages', [
            'email' => 'bot@spammer.com',
        ]);
    }

    public function test_testimonial_submits_as_inactive_pending_approval(): void
    {
        $payload = [
            'name' => 'CEO Sri Lanka',
            'company' => 'Apex Corp',
            'testimonial' => 'Outstanding digital transformation and quality delivery.',
            'rating' => 5,
        ];

        $response = $this->postJson('/api/v1/testimonials', $payload);
        $response->assertStatus(201);
        $response->assertJson([
            'success' => true,
        ]);

        $this->assertDatabaseHas('testimonials', [
            'name' => 'CEO Sri Lanka',
            'is_active' => false,
        ]);
    }

    public function test_admin_cannot_login_with_invalid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@test.com',
            'password' => bcrypt('correct-password'),
            'is_admin' => true,
        ]);

        $response = $this->post('/admin/login', [
            'email' => 'admin@test.com',
            'password' => 'wrong-password',
        ]);

        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }
}
