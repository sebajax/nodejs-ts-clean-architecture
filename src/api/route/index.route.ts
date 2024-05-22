import {
  HealthChecker,
  HealthEndpoint,
  LivenessEndpoint,
  ReadinessEndpoint,
} from '@cloudnative/health-connect';
import express, { Request, Response } from 'express';
import { VERSION_NUMBER } from '../../infrastructure/config/environment.config';

const router = express.Router();
const healthCheck = new HealthChecker();

// k8s routes
router.get('/live', LivenessEndpoint(healthCheck));
router.get('/ready', ReadinessEndpoint(healthCheck));
router.get('/health', HealthEndpoint(healthCheck));

// check api
router.get('/status', (_req: Request, res: Response): Response => {
  return res.send(
    `API => [${process.env.API_NAME} ${VERSION_NUMBER}] ENV => (${process.env.NODE_ENV}) STATUS => OK`
  );
});

export default router;
