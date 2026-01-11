import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import webauthnRoutes from './routes/webauthn';

const app = express();
const PORT = process.env.SERVER_PORT || 4000

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use('/webauthn', webauthnRoutes);

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});