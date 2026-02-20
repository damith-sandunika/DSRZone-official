export const products = [
    {
        id: 1,
        slug: 'digital-branding-suite',
        name: 'Digital Branding Suite',
        tagline: 'Logo, identity & brand guidelines',
        desc: 'Complete brand identity packages for startups and enterprises. Stand out with a cohesive visual identity.',
        longDesc: 'Our Digital Branding Suite gives you a complete visual identity: logo design, color palette, typography, and brand guidelines. We work with you to capture your vision and deliver assets you can use across all touchpoints—web, print, and social.',
        icon: '◆',
        status: 'available', // 'available' | 'coming_soon'
        features: [
            'Logo design & variations',
            'Brand guidelines document',
            'Color palette & typography',
            'Social media kit',
            'Business card & letterhead',
        ],
    },
    {
        id: 2,
        slug: 'web-app-development',
        name: 'Web & App Development',
        tagline: 'Custom software & platforms',
        desc: 'From responsive websites to full-scale web and mobile applications. Built with modern stacks.',
        longDesc: 'We build custom web and mobile applications tailored to your business. From responsive marketing sites to full-scale SaaS platforms and native or cross-platform apps, we use modern stacks and best practices to deliver fast, scalable solutions.',
        icon: '◇',
        status: 'available',
        features: [
            'Responsive websites',
            'Web applications (React, Laravel)',
            'Mobile apps (iOS & Android)',
            'API development',
            'Maintenance & support',
        ],
    },
    {
        id: 3,
        slug: 'graphic-visual-design',
        name: 'Graphic & Visual Design',
        tagline: 'Print & digital assets',
        desc: 'Brochures, social graphics, UI design, and marketing collateral. Pixel-perfect delivery.',
        longDesc: 'Get print and digital assets that match your brand. We deliver brochures, flyers, social media graphics, UI/UX design, and marketing collateral with pixel-perfect quality and fast turnaround.',
        icon: '◈',
        status: 'available',
        features: [
            'Brochures & flyers',
            'Social media graphics',
            'UI/UX design',
            'Illustration & icon sets',
            'Marketing collateral',
        ],
    },
];

export function getProductBySlug(slug) {
    return products.find((p) => p.slug === slug) || null;
}
