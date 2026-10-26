export const products = [
    {
        id: 1,
        slug: 'driving-school-system',
        name: 'Driving School',
        tagline: 'Driving School Management System',
        desc: 'A complete solution for driving schools to manage students, instructors, classes, payments and more with ease.',
        icon: '🚗',
        features: ['Student Management', 'Class Scheduling', 'Payments & Reports', 'Instructor Portal'],
    },
    {
        id: 2,
        slug: 'laundry-zone',
        name: 'Laundry Zone',
        tagline: 'Laundry Services Management System',
        desc: 'A complete management system for laundries to handle orders, customers, billing, inventory and delivery with ease.',
        icon: '🧺',
        features: ['Order Management', 'Billing & Payments', 'Inventory Management', 'WhatsApp Notifications'],
    },
    {
        id: 3,
        slug: 'restaurant-pos',
        name: 'Restaurant POS',
        tagline: 'Restaurant Management System',
        desc: 'A complete POS and management system for restaurants to manage orders, billing, menu, inventory and reports.',
        icon: '🍽️',
        features: ['POS & Billing', 'Menu Management', 'Inventory Control', 'Reports & Analytics'],
    },
];

export function getProductBySlug(slug) {
    return products.find((p) => p.slug === slug) || null;
}
