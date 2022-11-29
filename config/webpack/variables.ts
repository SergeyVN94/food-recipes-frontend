import path from 'path';

export const baseDir = path.join(__dirname, '../..');
export const isProduction = process.env.NODE_ENV === 'production';
export const PATHS = {
  baseDir,
  src: path.join(baseDir, 'src'),
  build: path.join(baseDir, 'build'),
};
export const PORT = process.env.PORT ?? 3100;
