import type { Request, Response } from 'express';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import admin from '../firebase';
import { rpID } from '../utils/rpConfig';

import crypto from 'crypto';

function deriveUID(userId: string) {
  return crypto.createHash('sha256').update(userId).digest('hex');
}
 

export async function startRegistration(req: Request, res: Response) {
  const { userId: rawUserId, email } = req.body;

  if (!rawUserId || !email) {
    return res.status(400).json({ error: 'Missing userId or email' });
  }

  const userId = deriveUID(rawUserId);

  const options = await generateRegistrationOptions({
    rpID,
    rpName: 'One Grain Task Manager',
    userID: Buffer.from(userId, 'utf8'),

    userName: email,
    userDisplayName: email,
    authenticatorSelection: {
      userVerification: 'required',
      residentKey: 'required',
    },
    attestationType: 'none'
  });

  await admin.firestore()
    .collection('webauthnChallenges')
    .doc(userId)
    .set({ 
        challenge: options.challenge ,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

  return res.json(options);
}
