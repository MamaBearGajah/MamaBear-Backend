import { execSync } from 'child_process';

export default async function globalTeardown() {
  console.log('\n🧹 Cleaning up test database...');

  try {
    // Drop all data after test run
    execSync('npx prisma migrate reset --force --skip-seed', {
      env: { ...process.env },
      stdio: 'inherit',
    });

    console.log('✅ Test database cleaned\n');
  } catch (error) {
    // Non-fatal — log and continue
    console.warn('⚠️  Could not clean test database:', error);
  }
}