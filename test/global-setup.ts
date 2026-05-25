import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

export default async function globalSetup() {
  // Load test environment variables
  dotenv.config({ path: '.env.test' });

  const testDatabaseUrl = process.env.DATABASE_URL;

  if (!testDatabaseUrl) {
    throw new Error('DATABASE_URL not set in .env.test');
  }

  console.log('\n🔧 Setting up test database...');

  try {
    // Run migrations on test DB
    execSync('npx prisma migrate deploy', {
      env: { ...process.env, DATABASE_URL: testDatabaseUrl },
      stdio: 'inherit',
    });

    console.log('✅ Test database ready\n');
  } catch (error) {
    console.error('❌ Failed to setup test database:', error);
    throw error;
  }
}