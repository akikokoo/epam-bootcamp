const bcrypt = require('../node_modules/bcrypt');
const { execSync } = require('child_process');
const path = require('path');

const dbPath = path.join(__dirname, '../prisma/dev.db');

async function main() {
  const hash = await bcrypt.hash('Admin1234!', 10);
  console.log('Generated hash:', hash);

  const verify = await bcrypt.compare('Admin1234!', hash);
  console.log('Verification:', verify);

  // Use sqlite3 CLI to update
  const sql = `UPDATE User SET passwordHash = '${hash}' WHERE email = 'admin@innovatepam.local';`;
  execSync(`sqlite3 "${dbPath}" "${sql}"`);

  const result = execSync(`sqlite3 "${dbPath}" "SELECT email, passwordHash FROM User WHERE email = 'admin@innovatepam.local';"`).toString();
  console.log('DB row:', result);
}

main().catch(console.error);
