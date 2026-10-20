import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // JSON body parser with 50mb limit for user image uploads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  const publicImagesDir = path.resolve(__dirname, 'public/images');
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  // Serve static images directly from public/images
  app.use('/images', express.static(publicImagesDir));

  // Endpoint to check if user has already uploaded a real photo
  app.get('/api/barbershop-image', (_req, res) => {
    const realImgPath = path.join(publicImagesDir, 'foto_real_barbearia.jpg');
    if (fs.existsSync(realImgPath)) {
      const stats = fs.statSync(realImgPath);
      return res.json({
        exists: true,
        url: `/images/foto_real_barbearia.jpg?v=${Math.floor(stats.mtimeMs)}`
      });
    }
    return res.json({ exists: false });
  });

  // Endpoint to save real barbershop image uploaded by developer/user
  app.post('/api/save-barbershop-image', (req, res) => {
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64 || typeof imageBase64 !== 'string') {
        return res.status(400).json({ error: 'Nenhuma imagem enviada.' });
      }

      // Extract binary from base64 data URL
      const matches = imageBase64.match(/^data:image\/[a-zA-Z0-9+.-]+;base64,(.+)$/);
      let buffer: Buffer;
      if (matches && matches[1]) {
        buffer = Buffer.from(matches[1], 'base64');
      } else {
        buffer = Buffer.from(imageBase64, 'base64');
      }

      // Save to public/images/foto_real_barbearia.jpg
      const destPath = path.join(publicImagesDir, 'foto_real_barbearia.jpg');
      fs.writeFileSync(destPath, buffer);

      // Also copy to src/assets/images if folder exists
      const srcImagesDir = path.resolve(__dirname, 'src/assets/images');
      if (fs.existsSync(srcImagesDir)) {
        fs.writeFileSync(path.join(srcImagesDir, 'foto_real_barbearia.jpg'), buffer);
      }

      const timestamp = Date.now();
      return res.json({
        success: true,
        url: `/images/foto_real_barbearia.jpg?v=${timestamp}`
      });
    } catch (error: any) {
      console.error('Erro ao salvar imagem no servidor:', error);
      return res.status(500).json({ error: 'Erro ao salvar a imagem no disco.' });
    }
  });

  // In development, mount Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve built dist folder
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
