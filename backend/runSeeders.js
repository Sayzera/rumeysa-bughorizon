import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const seeders = [
    '001_initial_data.cjs'
];

async function runSeeders() {
    try {
        for (const seeder of seeders) {
            console.log(`Running seeder: ${seeder}`);
            const { stdout, stderr } = await execAsync(`node ${path.join(__dirname, 'db', 'seeders', seeder)}`);
            console.log(stdout);
            if (stderr) console.error(stderr);
        }
        console.log('All seeders completed successfully!');
    } catch (error) {
        console.error('Error running seeders:', error);
    }
}

runSeeders(); 