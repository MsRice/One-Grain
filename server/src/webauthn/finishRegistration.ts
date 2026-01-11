import { verifyRegistrationResponse } from '@simplewebauthn/server';
import type { Request, Response } from 'express';
import admin from '../firebase';
import { rpID, expectedOrigins } from '../utils/rpConfig';
import crypto from 'crypto';

function deriveUID(userId: string) {
  return crypto.createHash('sha256').update(userId).digest('hex');
}

export async function finishRegistration(req: Request, res: Response) {
  const { userId: rawUserId, response } = req.body;

  if (!rawUserId || typeof rawUserId !== 'string') {
    return res.status(400).json({ error: 'Missing userId' });
  }

   const userId = deriveUID(rawUserId);

  const challengeDoc = await admin.firestore()
    .collection('webauthnChallenges')
    .doc(userId)
    .get();

  const expectedChallenge = challengeDoc.data()?.challenge;
  if (!expectedChallenge) {
    return res.status(400).json({ error: 'Missing challenge' });
  }


  const verification = await verifyRegistrationResponse({
    response,
    expectedChallenge,
    expectedOrigin: expectedOrigins,
    expectedRPID: rpID,
  });

  if (!verification.verified || !verification.registrationInfo) {
    return res.status(400).json({ error: 'Verification failed' });
  }

  const { credential } = verification.registrationInfo
  const firebaseToken = await admin.auth().createCustomToken(userId);

  await admin.firestore()
    .collection('users')
    .doc(userId)
    .collection('credentials')
    .doc(credential.id)
    .set({
        credentialID: credential.id,
        publicKey: Buffer.from(credential.publicKey).toString('base64'),
        counter: credential.counter ?? 0, 
        transports: credential.transports ?? [],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });


  await admin.firestore()
    .collection('webauthnChallenges')
    .doc(userId)
    .delete();

  

  res.json({uid:userId, token:firebaseToken,});
}
