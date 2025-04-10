import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const migrations = [
    '1742585192798_03-21-2025-create-user.cjs',
    '1742585352078_add-fullname-to-user.cjs',
    '1742726503402_init.cjs',
    '1743021800554_init.cjs'
];

async function runMigrations() {
    try {
        for (const migration of migrations) {
            console.log(`Running migration: ${migration}`);
            const { stdout, stderr } = await execAsync(`node ${path.join(__dirname, 'migrations', migration)}`);
            console.log(stdout);
            if (stderr) console.error(stderr);
        }
        console.log('All migrations completed successfully!');
    } catch (error) {
        console.error('Error running migrations:', error);
    }
}

runMigrations(); 