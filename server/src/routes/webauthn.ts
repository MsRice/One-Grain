import { Router } from 'express';
import { startRegistration } from '../webauthn/startRegistration';
import { finishRegistration } from '../webauthn/finishRegistration';
import { startAuthentication } from '../webauthn/startAuthentication';
import { finishAuthentication } from '../webauthn/finishAuthentication';


const router = Router();

router.post('/register/start', startRegistration);
router.post('/register/finish', finishRegistration);
router.post('/auth/start', startAuthentication);
router.post('/auth/finish', finishAuthentication);

export default router;
