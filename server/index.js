// Imports

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';
import { checkCaptcha } from './middleware/checkCaptcha.js';
// Configurations

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// These two lines of code are used in Node.js to get the current file's absolute path and its directory path.

// __filename is a special variable in Node.js that gives you the absolute path of the current file that is being executed.

// fileURLToPath() is a utility function that converts a URL to a file path. The import.meta.url property contains the URL of the current module's file.

// __dirname is a special variable in Node.js that gives you the absolute path of the directory that contains the current file.

// path.dirname() is a method from the Node.js path module that extracts the directory path from a file path.

// So, when these two lines of code are used together, fileURLToPath(import.meta.url) converts the URL to a file path, and path.dirname() extracts the directory path from that file path. Finally, __dirname and __filename can be used to get the directory and the file paths, respectively, of the current file being executed.

dotenv.config();

const app = express();

app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
// This line of code sets the Cross-Origin Resource Policy (CORP) header in HTTP responses sent by the application using the Helmet middleware in Node.js.
app.use(morgan('common'));
// By using the morgan middleware with the "common" format, you can easily log HTTP requests in a standardized format, making it easier to analyze and troubleshoot the application's performance and security.
app.use(bodyParser.json({ limit: '30mb', extended: true }));
// This code sets up the body-parser middleware to handle JSON data in the request body. The json() method of the body-parser module is used to create a new middleware function that parses JSON data in the request body. The limit option is set to '30mb' to restrict the maximum size of the request body to 30 megabytes, and the extended option is set to true to enable parsing of nested objects.
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// File storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// routes with files
app.post('/auth/register', checkCaptcha, upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

// routes
app.use('/auth', checkCaptcha, authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// mongoose setup
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log('DB connected');
      console.log(`Server up and running: http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(`${err} did not connect`));
