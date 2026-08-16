// // src/app/i/t/s/a/d/m/i/n/admin/api/training/route.js
// import { getTraining, saveTraining } from '../../lib/trainingStore';

// export async function GET() {
//   return Response.json({ instructions: getTraining() });
// }

// export async function POST(request) {
//   const { instructions } = await request.json();
//   saveTraining(instructions);
//   return Response.json({ success: true });
// }













// src/app/i/t/s/a/d/m/i/n/admin/api/training/route.js
import { getTraining, saveTraining } from '../../lib/trainingStore';

export async function GET() {
  const instructions = await getTraining();
  return Response.json({ instructions });
}

export async function POST(request) {
  const { instructions } = await request.json();
  await saveTraining(instructions);
  return Response.json({ success: true });
}