import cors from 'cors';
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import connectToDatabase from './db/db.js';
import attendenceRouter from './routes/attendence.js';
import authRouter from './routes/auth.js';
import dashboardRouter from './routes/dashboard.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import leaveRouter from './routes/leave.js';
import salaryRouter from './routes/salary.js';
import settingRouter from './routes/setting.js';

// Connect to MongoDB
connectToDatabase();

const app = express();

// CORS
app.use(cors({
    origin: 'https://ems-project1-ui.onrender.com',
    credentials: true
}));

app.use(express.json());
app.use(express.static('public/uploads'));

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/setting', settingRouter);
app.use('/api/attendence', attendenceRouter);
app.use('/api/dashboard', dashboardRouter);

// === Serve Frontend ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Adjust path to Vite's dist output
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// For React Router fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





// import cors from 'cors';
// import express from "express";
// import connectToDatabase from './db/db.js';
// import attendenceRouter from './routes/attendence.js';
// import authRouter from './routes/auth.js';
// import dashboardRouter from './routes/dashboard.js';
// import departmentRouter from './routes/department.js';
// import employeeRouter from './routes/employee.js';
// import leaveRouter from './routes/leave.js';
// import salaryRouter from './routes/salary.js';
// import settingRouter from './routes/setting.js';

// connectToDatabase()
// const app = express()
// app.use(cors({
//     origin: 'https://ems-project1-api.onrender.com',
//     credentials: true
// }))
// app.use(express.json())
// app.use(express.static('public/uploads'))
// app.use('/api/auth', authRouter)
// app.use('/api/department', departmentRouter)
// app.use('/api/employee', employeeRouter)
// app.use('/api/salary', salaryRouter)
// app.use('/api/leave', leaveRouter)
// app.use('/api/setting', settingRouter);
// app.use('/api/attendence', attendenceRouter);
// app.use('/api/dashboard', dashboardRouter);


// // === Serve Frontend ===
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve Vite build from /frontend/dist (adjust if your folder is different)
// app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// // Fallback for React Router
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
// });


// // start server
// const PORT = process.env.PORT || 5000;  
// app.listen(PORT, () => {
//     console.log(`Server is Running on port ${PORT}`)
// })