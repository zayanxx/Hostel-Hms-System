// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { rateLimiter } from './middleware/rateLimit.middleware.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import billingroutes from './routes/BillingRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import maintenanceRoutes from './routes/MaintenanceRoutes.js';
import residentroutes from './routes/residentroutes.js';
import roomroutes from './routes/roomroutes.js';
import suggestionRoutes from './routes/suggestionRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',  // your React dev server origin
  credentials: true,                 // if you want to send cookies or auth headers
};

// Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/billing', billingroutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/residents', residentroutes);
app.use('/api/rooms', roomroutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/payments', paymentRoutes);

// Health Check
app.get('/', (req, res) => {
  res.status(200).send('✅ Hostel Management System API is running');
});

// Handle 404
app.use(notFound);

// Error Handler
app.use(errorHandler);

export default app;