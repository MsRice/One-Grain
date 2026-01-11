import type { Request, Response } from 'express';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import admin from '../firebase';
import { rpID } from '../utils/rpConfig';
import type { AuthenticatorTransportFuture } from '@simplewebauthn/server';
import crypto from 'crypto';

function deriveUID(userId: string) {
  return crypto.createHash('sha256').update(userId).digest('hex');
}

export async function startAuthentication(req: Request, res: Response) {
  
  const { userId: rawUserId } = req.body;
  const userId = deriveUID(rawUserId);
  
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }


  const credsSnap = await admin
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('credentials')
    .get();

  if (credsSnap.empty) {
    return res.status(404).json({ error: 'No credentials registered' });
  }

  const allowCredentials = credsSnap.docs.map((doc) => {
    const data = doc.data() as {
      credentialID: string;
      transports?: string[];
    };

    const transports = (data.transports ?? []).filter(
      (t): t is AuthenticatorTransportFuture =>
        ['usb', 'nfc', 'ble', 'internal', 'hybrid'].includes(t)
    );

    return {
      id: data.credentialID,
      type: 'public-key' as const,
      transports,
    };
  });

  
  const options = await generateAuthenticationOptions({
    rpID,
    allowCredentials,
    userVerification: 'required',
  });

  
  await admin.firestore()
    .collection('webauthnChallenges')
    .doc(userId)
    .set({
      challenge: options.challenge,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });


  return res.json(options);
}
