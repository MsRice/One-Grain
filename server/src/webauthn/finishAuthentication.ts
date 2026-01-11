import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import type { Request, Response } from 'express';
import type { AuthenticatorTransportFuture, WebAuthnCredential } from '@simplewebauthn/server';
import admin from '../firebase';
import { rpID, expectedOrigins } from '../utils/rpConfig';
import crypto from 'crypto';

function deriveUID(userId: string) {
  return crypto.createHash('sha256').update(userId).digest('hex');
}

export async function finishAuthentication(req: Request, res: Response) {
  const { userId: rawUserId, response } = req.body as { userId: string; response: any };

  if (!rawUserId || !response?.id) {
    return res.status(400).json({ error: 'Missing userId or response.id' });
  }

  const userId = deriveUID(rawUserId);

  const challengeDoc = await admin
    .firestore()
    .collection('webauthnChallenges')
    .doc(userId)
    .get();

  const expectedChallenge = challengeDoc.data()?.challenge as string | undefined;
  if (!expectedChallenge) {
    return res.status(400).json({ error: 'Missing challenge' });
  }

  
  const credId = response.id as string; 

  const credDocRef = admin
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('credentials')
    .doc(credId);

  const credDoc = await credDocRef.get();
  if (!credDoc.exists) {
    return res.status(404).json({ error: 'Credential not found' });
  }

  const credData = credDoc.data() as {
    credentialID: string;
    publicKey: string; // base64
    counter: number;
    transports?: string[];
  };

  const transports = (credData.transports ?? [])
  .filter((t): t is AuthenticatorTransportFuture =>
    ['usb', 'nfc', 'ble', 'internal', 'hybrid'].includes(t)
  );


  const credential = {
    id: credData.credentialID,
    publicKey: Buffer.from(credData.publicKey, 'base64'),
    counter: credData.counter ?? 0,
    transports,
  };

  const verification = await verifyAuthenticationResponse({
    response,
    expectedChallenge,
    expectedOrigin: expectedOrigins,
    expectedRPID: rpID,
    credential,
  });

  if (!verification.verified || !verification.authenticationInfo) {
    return res.status(401).json({ error: 'Authentication verification failed' });
  }


  const { newCounter } = verification.authenticationInfo;

  await credDocRef.update({ counter: newCounter });

  
  await admin.firestore().collection('webauthnChallenges').doc(userId).delete();

  const firebaseToken = await admin.auth().createCustomToken(userId);
  return res.json({ token :firebaseToken });
}
