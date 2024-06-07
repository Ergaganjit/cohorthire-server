import { handleJobsRequest } from './routers/jobsRouter';

export default {
    async fetch(request, env) {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Allow all origins
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers });
        }

        return await handleJobsRequest(request, env);
    },
};
