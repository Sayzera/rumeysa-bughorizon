
import crypto from 'crypto';

const generateCsrfToken = () => {
    return crypto.randomBytes(32).toString('hex');
}


export {
    generateCsrfToken
}