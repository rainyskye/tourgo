const fs = require('fs');
const { execSync } = require('child_process');

const envFile = '.env.local';
const gitSha = execSync('git rev-parse --short HEAD').toString().trim();

let envVars = {};

// Read existing .env.local file
if (fs.existsSync(envFile)) {
  const fileContent = fs.readFileSync(envFile, 'utf8');
  fileContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  });
}

// Update or add NEXT_PUBLIC_GIT_SHA
envVars['NEXT_PUBLIC_GIT_SHA'] = gitSha;

// Write updated content back to .env.local
const updatedContent = Object.entries(envVars)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

fs.writeFileSync(envFile, updatedContent);

console.log(`Updated ${envFile} with NEXT_PUBLIC_GIT_SHA=${gitSha}`);