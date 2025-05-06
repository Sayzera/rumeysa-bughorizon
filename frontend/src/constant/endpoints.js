import { List } from "@mui/material";


export const endpoints = {
    login: "/api/auth/login",
    register: "/api/auth/register",
    createVulnerability: "/api/sql-table/create",
    missconfigrationCheck: '/api/missconfigration/check',
    getCSRF: '/api/csrf/get',
    testCSRFSecure: '/api/csrf/secure-action',
    testCSRFNotSecure: '/api/csrf/not-secure-action'
}