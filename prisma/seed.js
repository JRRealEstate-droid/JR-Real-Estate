const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding JR Real Estate Varanasi database...');

  // 1. Seed Super Admin User (Director Umesh Yadav)
  const adminUser = await prisma.user.upsert({
    where: { email: 'director@jrrealestate.in' },
    update: {},
    create: {
      id: 'usr-owner-umesh-yadav',
      email: 'director@jrrealestate.in',
      fullName: 'Mr. Umesh Yadav',
      phone: '8948301111',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });
  console.log('Super Admin user seeded:', adminUser.email);

  // 2. Seed Prime Localities in Varanasi
  const localitiesData = [
    { name: 'Pandeypur Chauraha', slug: 'pandeypur-chauraha', pincode: '221002', isFeatured: true, displayOrder: 1 },
    { name: 'Shivpur', slug: 'shivpur', pincode: '221003', isFeatured: true, displayOrder: 2 },
    { name: 'Sigra', slug: 'sigra', pincode: '221010', isFeatured: true, displayOrder: 3 },
    { name: 'Paharia', slug: 'paharia', pincode: '221007', isFeatured: true, displayOrder: 4 },
    { name: 'Orderly Bazar', slug: 'orderly-bazar', pincode: '221002', isFeatured: true, displayOrder: 5 },
    { name: 'Sarnath', slug: 'sarnath', pincode: '221007', isFeatured: true, displayOrder: 6 },
    { name: 'Mahmoorganj', slug: 'mahmoorganj', pincode: '221010', isFeatured: true, displayOrder: 7 },
    { name: 'Nadesar', slug: 'nadesar', pincode: '221002', isFeatured: false, displayOrder: 8 },
    { name: 'Lanka (BHU Area)', slug: 'lanka-bhu', pincode: '221005', isFeatured: false, displayOrder: 9 },
    { name: 'Rohania', slug: 'rohania', pincode: '221108', isFeatured: false, displayOrder: 10 },
    { name: 'Babatpur (Airport Road)', slug: 'babatpur-airport-road', pincode: '221006', isFeatured: true, displayOrder: 11 },
  ];

  for (const loc of localitiesData) {
    await prisma.locality.upsert({
      where: { slug: loc.slug },
      update: {},
      create: loc,
    });
  }
  console.log('Varanasi localities seeded.');

  // 3. Seed Amenities
  const amenitiesData = [
    { name: '30ft Wide Paved Road', slug: '30ft-wide-road' },
    { name: 'VDA Approved Layout', slug: 'vda-approved' },
    { name: '24x7 Security & CCTV', slug: '24x7-security' },
    { name: 'Covered Car Parking', slug: 'covered-car-parking' },
    { name: 'Automatic Lift', slug: 'automatic-lift' },
    { name: 'Power Backup', slug: 'power-backup' },
    { name: 'Municipal Water Connection', slug: 'water-connection' },
    { name: 'Gated Residential Society', slug: 'gated-society' },
    { name: 'Immediate Registry Ready', slug: 'immediate-registry' },
  ];

  for (const am of amenitiesData) {
    await prisma.amenity.upsert({
      where: { slug: am.slug },
      update: {},
      create: am,
    });
  }
  console.log('Amenities seeded.');

  console.log('JR Real Estate database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

