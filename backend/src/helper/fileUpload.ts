// src/multer.config.ts

import * as path from 'path';
import * as multer from 'multer';
// Define multer options for file upload
export const multerOptions = {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads'));
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
      }
    })
  };