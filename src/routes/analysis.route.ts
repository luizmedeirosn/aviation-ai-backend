import { Router } from 'express';
import { uploadTranscript } from '../controllers/analysis.controller.js';

const UPLOAD_ROUTE: string = '/upload-transcript';

const router: Router = Router();
router.post(UPLOAD_ROUTE, uploadTranscript);
export default router;
