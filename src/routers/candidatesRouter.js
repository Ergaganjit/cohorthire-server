import * as candidatesController from '../controllers/candidatesController';

export async function handleCandidatesRequest(request, env) {
    const { method, url } = request;
    const { pathname } = new URL(url);

    if (method === 'GET') {
        if (pathname === "/api/candidates") {
            return await candidatesController.getAllCandidates(env);
        } else if (pathname.startsWith("/api/candidates/") && pathname.split("/").length === 4) {
            const candidateId = pathname.split("/")[3];
            return await candidatesController.getCandidateById(candidateId, env);
        }
    } else if (method === 'POST' && pathname === "/api/candidates") {
        const body = await request.json();
        return await candidatesController.createCandidate(body, env);
    } else if ((method === 'PUT' || method === 'PATCH') && pathname.startsWith("/api/candidates/") && pathname.split("/").length === 4) {
        const candidateId = pathname.split("/")[3];
        const body = await request.json();
        return await candidatesController.updateCandidate(candidateId, body, env);
    } else if (method === 'DELETE' && pathname.startsWith("/api/candidates/") && pathname.split("/").length === 4) {
        const candidateId = pathname.split("/")[3];
        return await candidatesController.deleteCandidate(candidateId, env);
    }

    return new Response("Method not allowed or path not found", { status: 405 });
}
