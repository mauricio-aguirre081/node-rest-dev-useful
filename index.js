import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import accountRouter from './routes/account.js';
import authRouter from './routes/auth.js';
import authSessionRouter from './routes/auth_Session';
import authTokenRouter from './routes/auth_Token';


dotenv.config();

const PORT = process.env.PORT || 3000;
const expressApp = express();

expresAoo.use(cookieParser());
expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use('/account', accountRouter);
expressApp.use('/auth', authRouter);
expressApp.use('/auth-token', authSessionRouter);
expressApp.use('auth-session', authTokenRouter)



expressApp.listen(PORT, () =>
    console.log (`Servidor en puerto ${PORT}`)
);