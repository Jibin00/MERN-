  import express from 'express';
  import notesRoutes from './routes/notesRoutes.js';
  import { connectDB } from './config/db.js';
  import dotenv from 'dotenv';
  // import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';

  dotenv.config();

  // console.log(process.env.MONGO_URI);
  const app = express();

  const PORT = process.env.PORT || 5001;

  app.use(express.json());// to parse JSON request bodies
  // app.use(rateLimiter)
  app.use(cors());
  app.use("/api/notes", notesRoutes);
  
  // Middleware for logging requests
  // app.use((req, res, next) => {
    //   console.log(`we have a ${req.method} request for ${req.url}`);
    //   next();
    // });
  
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log('Server is running on port ', PORT);
    });
  });
    
