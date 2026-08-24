// // src/app/i/t/s/a/d/m/i/n/admin/api/upload-signature/route.js
// import crypto from 'crypto';

// export async function GET() {
//   try {
//     const timestamp = Math.round(Date.now() / 1000);
//     const apiSecret = process.env.CLOUDINARY_API_SECRET;
//     const apiKey = process.env.CLOUDINARY_API_KEY;
//     const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

//     if (!apiSecret || !apiKey || !cloudName) {
//       return Response.json(
//         { error: 'Cloudinary env variables missing hain' },
//         { status: 500 }
//       );
//     }

//     // Cloudinary ke signed-upload spec ke mutabiq: sha1(paramString + api_secret)
//     // Sirf timestamp hi sign kar rahe hain, folder ya baaki params add karne hon to
//     // yahan aur wahan client dono jagah sath sath add karna hoga (alphabetical order mein).
//     const paramsToSign = `timestamp=${timestamp}`;
//     const signature = crypto
//       .createHash('sha1')
//       .update(paramsToSign + apiSecret)
//       .digest('hex');

//     return Response.json({ timestamp, signature, apiKey, cloudName });
//   } catch (err) {
//     console.error(err);
//     return Response.json({ error: 'Signature banate waqt error aa gaya' }, { status: 500 });
//   }
// }















// src/app/i/t/s/a/d/m/i/n/admin/api/upload-signature/route.js
import crypto from 'crypto';

export async function GET() {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

    if (!apiSecret || !apiKey || !cloudName) {
      return Response.json(
        { error: 'Cloudinary env variables missing hain' },
        { status: 500 }
      );
    }

    // Cloudinary ke signed-upload spec ke mutabiq: sha1(paramString + api_secret)
    // Sirf timestamp hi sign kar rahe hain, folder ya baaki params add karne hon to
    // yahan aur wahan client dono jagah sath sath add karna hoga (alphabetical order mein).
    const paramsToSign = `timestamp=${timestamp}`;
    const signature = crypto
      .createHash('sha1')
      .update(paramsToSign + apiSecret)
      .digest('hex');

    return Response.json({ timestamp, signature, apiKey, cloudName });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Signature banate waqt error aa gaya' }, { status: 500 });
  }
}