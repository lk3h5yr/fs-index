import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const rootDir = process.cwd();
const dockerComposePath = join(rootDir, 'infra', 'docker-compose.yml');

console.log('🚀 Starting development environment...\n');

// Helper function to check if Docker is available
function isDockerAvailable() {
  try {
    execSync('docker --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Step 1: Start Docker services
if (existsSync(dockerComposePath)) {
  if (isDockerAvailable()) {
    console.log('📦 Starting Docker services (Redis + MailHog)...');
    try {
      execSync(`docker compose -f ${dockerComposePath} up -d`, {
        stdio: 'inherit',
        cwd: rootDir,
      });
      console.log('✅ Docker services started\n');
    } catch (error) {
      console.warn('⚠️  Failed to start Docker services:', error.message);
      console.warn('⚠️  Continuing without Docker services...\n');
      console.warn('⚠️  Note: Redis and MailHog will not be available.\n');
      console.warn('⚠️  Please install Docker Desktop or ensure Docker is in your PATH.\n');
    }
  } else {
    console.warn('⚠️  Docker is not available or not in PATH.');
    console.warn('⚠️  Skipping Docker services (Redis + MailHog)...\n');
    console.warn('⚠️  Note: Some features may not work without Redis and MailHog.\n');
    console.warn('⚠️  To install Docker: https://www.docker.com/products/docker-desktop\n');
  }
} else {
  console.warn('⚠️  Docker compose file not found, skipping...\n');
}

// Step 2: Start all apps with Turbo (excluding worker)
console.log('🎯 Starting all applications with Turbo...');
console.log('⚠️  Note: Worker is disabled. To enable, uncomment worker code.');
try {
  // 排除 worker，只啟動其他服務
  execSync('npx turbo run dev --parallel --filter=!@fs-index/worker', {
    stdio: 'inherit',
    cwd: rootDir,
  });
} catch (error) {
  console.error('❌ Failed to start applications:', error.message);
  process.exit(1);
}
