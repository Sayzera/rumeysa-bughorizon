const csrfProtection = (req, res, next) => {
    // Log all cookies for debugging
    // Get CSRF token from cookie
    const csrfTokenFromCookie = req?.cookies?.csrfToken;
    // Get CSRF token from request (either from body or header)
    const csrfTokenFromRequest = req?.body?._csrf || req?.headers?.['x-csrf-token'];


    // Check if tokens exist and match
    if (!csrfTokenFromCookie) {
        console.log('CSRF Error: No token in cookie');
        return res.status(403).json({ 
            error: 'CSRF token cookie bulunamadı',
            details: {
                cookies: req.cookies,
                headers: req.headers
            }
        });
    }

    if (!csrfTokenFromRequest) {
        console.log('CSRF Error: No token in request');
        return res.status(403).json({ 
            error: 'CSRF token request\'te bulunamadı',
            details: {
                body: req.body,
                headers: req.headers
            }
        });
    }

    if (csrfTokenFromCookie !== csrfTokenFromRequest) {
        console.log('CSRF Error: Tokens do not match');
        return res.status(403).json({ 
            error: 'CSRF token eşleşmiyor',
            details: {
                cookieToken: csrfTokenFromCookie,
                requestToken: csrfTokenFromRequest
            }
        });
    }

    // If all checks pass, continue
    next();
}

export {
    csrfProtection
}