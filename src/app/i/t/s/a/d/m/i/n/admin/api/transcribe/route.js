
// // src/app/i/t/s/a/d/m/i/n/admin/api/transcribe/route.js
// import Groq from 'groq-sdk';
// import { writeFile, unlink, mkdtemp } from 'fs/promises';
// import { tmpdir } from 'os';
// import path from 'path';
// import fs from 'fs';

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// export async function POST(request) {
//   let tempFilePath;

//   try {
//     const formData = await request.formData();
//     const file = formData.get('video');
//     const instruction = formData.get('instruction') || '';

//     if (!file) {
//       return Response.json({ error: 'Video file required hai' }, { status: 400 });
//     }

//     const tempDir = await mkdtemp(path.join(tmpdir(), 'transcribe-'));
//     tempFilePath = path.join(tempDir, file.name);
//     const bytes = await file.arrayBuffer();
//     await writeFile(tempFilePath, Buffer.from(bytes));

//     const transcription = await groq.audio.transcriptions.create({
//       file: fs.createReadStream(tempFilePath),
//       model: 'whisper-large-v3-turbo',
//       language: 'ur',
//       response_format: 'text',
//     });

//     let finalScript = transcription;

//     if (instruction && instruction.trim()) {
//       const formatted = await groq.chat.completions.create({
//         model: 'openai/gpt-oss-120b',
//         messages: [
//           {
//             role: 'system',
//             content:
//               'Tum ek script editor ho. User jo instruction de, usi ke hisaab se di gayi transcript ko reformat karo. Sirf final reformatted text wapis do, koi extra explanation mat likhna.',
//           },
//           {
//             role: 'user',
//             content: `Instruction: ${instruction}\n\nTranscript:\n${transcription}`,
//           },
//         ],
//       });
//       finalScript = formatted.choices[0].message.content;
//     }

//     return Response.json({ success: true, script: finalScript, rawTranscript: transcription });
//   } catch (err) {
//     console.error(err);
//     return Response.json({ error: err.message || 'Kuch ghalat ho gaya' }, { status: 500 });
//   } finally {
//     if (tempFilePath) await unlink(tempFilePath).catch(() => {});
//   }
// }



















// // src/app/i/t/s/a/d/m/i/n/admin/api/transcribe/route.js
// import Groq from 'groq-sdk';
// import { writeFile, unlink, mkdtemp } from 'fs/promises';
// import { tmpdir } from 'os';
// import path from 'path';
// import fs from 'fs';

// export async function POST(request) {
//   let tempFilePath;

//   try {
//     const formData = await request.formData();
//     const file = formData.get('video');
//     const instruction = formData.get('instruction') || '';

//     if (!file) {
//       return Response.json({ error: 'Video file required hai' }, { status: 400 });
//     }

//     const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

//     const tempDir = await mkdtemp(path.join(tmpdir(), 'transcribe-'));
//     tempFilePath = path.join(tempDir, file.name);
//     const bytes = await file.arrayBuffer();
//     await writeFile(tempFilePath, Buffer.from(bytes));

//     const transcription = await groq.audio.transcriptions.create({
//       file: fs.createReadStream(tempFilePath),
//       model: 'whisper-large-v3-turbo',
//       language: 'ur',
//       response_format: 'text',
//     });

//     let finalScript = transcription;

//     if (instruction && instruction.trim()) {
//       const formatted = await groq.chat.completions.create({
//         model: 'openai/gpt-oss-120b',
//         messages: [
//           {
//             role: 'system',
//             content:
//               'Tum ek script editor ho. User jo instruction de, usi ke hisaab se di gayi transcript ko reformat karo. Sirf final reformatted text wapis do, koi extra explanation mat likhna.',
//           },
//           {
//             role: 'user',
//             content: `Instruction: ${instruction}\n\nTranscript:\n${transcription}`,
//           },
//         ],
//       });
//       finalScript = formatted.choices[0].message.content;
//     }

//     return Response.json({ success: true, script: finalScript, rawTranscript: transcription });
//   } catch (err) {
//     console.error(err);
//     return Response.json({ error: err.message || 'Kuch ghalat ho gaya' }, { status: 500 });
//   } finally {
//     if (tempFilePath) await unlink(tempFilePath).catch(() => {});
//   }
// }









// src/app/i/t/s/a/d/m/i/n/admin/api/transcribe/route.js
import Groq from 'groq-sdk';
import { writeFile, unlink, mkdtemp } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import fs from 'fs';

export async function POST(request) {
  let tempFilePath;

  try {
    const { videoUrl, instruction } = await request.json();

    if (!videoUrl) {
      return Response.json({ error: 'Video URL required hai' }, { status: 400 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Cloudinary se video download karo (server-to-server fetch, koi body-size limit nahi)
    const videoRes = await fetch(videoUrl);
    if (!videoRes.ok) {
      return Response.json({ error: 'Video Cloudinary se download nahi ho saki' }, { status: 400 });
    }
    const arrayBuffer = await videoRes.arrayBuffer();

    const tempDir = await mkdtemp(path.join(tmpdir(), 'transcribe-'));
    const fileName = videoUrl.split('/').pop().split('?')[0] || 'video.mp4';
    tempFilePath = path.join(tempDir, fileName);
    await writeFile(tempFilePath, Buffer.from(arrayBuffer));

    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: 'whisper-large-v3-turbo',
      language: 'ur',
      response_format: 'text',
    });

    let finalScript = transcription;

    if (instruction && instruction.trim()) {
      const formatted = await groq.chat.completions.create({
        model: 'openai/gpt-oss-120b',
        messages: [
          {
            role: 'system',
            content:
              'Tum ek script editor ho. User jo instruction de, usi ke hisaab se di gayi transcript ko reformat karo. Sirf final reformatted text wapis do, koi extra explanation mat likhna.',
          },
          {
            role: 'user',
            content: `Instruction: ${instruction}\n\nTranscript:\n${transcription}`,
          },
        ],
      });
      finalScript = formatted.choices[0].message.content;
    }

    return Response.json({ success: true, script: finalScript, rawTranscript: transcription });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message || 'Kuch ghalat ho gaya' }, { status: 500 });
  } finally {
    if (tempFilePath) await unlink(tempFilePath).catch(() => {});
  }
}