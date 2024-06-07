import { Router } from 'itty-router';
import { 
  fetchAllCandidates, 
  fetchCandidateById, 
  createCandidate, 
  deleteCandidateById, 
  updateCandidateById 
} from '../controllers/candidatesController';

const candidatesRouter = Router();

// GET all candidates
candidatesRouter.get('/', async ({ env }) => {
  try {
    const candidates = await fetchAllCandidates(env);
    return new Response(JSON.stringify(candidates), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

// GET candidate by ID
candidatesRouter.get('/:id', async ({ params, env }) => {
  const candidateId = params.id;
  try {
    const candidate = await fetchCandidateById(env, candidateId);
    return new Response(JSON.stringify(candidate), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 404 });
  }
});

// POST new candidate
candidatesRouter.post('/', async ({ request, env }) => {
  try {
    const candidateData = await request.json();
    await createCandidate(env, candidateData);
    return new Response('Candidate created successfully', { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

// DELETE candidate by ID
candidatesRouter.delete('/:id', async ({ params, env }) => {
  const candidateId = params.id;
  try {
    await deleteCandidateById(env, candidateId);
    return new Response('Candidate deleted successfully', { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

// PUT (update) candidate by ID
candidatesRouter.put('/:id', async ({ params, request, env }) => {
  const candidateId = params.id;
  try {
    const candidateData = await request.json();
    await updateCandidateById(env, candidateId, candidateData);
    return new Response('Candidate updated successfully', { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

export default candidatesRouter;
