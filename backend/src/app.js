// libraries
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import rootRouter from './api/routes';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';





// resolve path
const ROOT_FOLDER = path.join(__dirname, '..');
const SRC_FOLDER = path.join(ROOT_FOLDER, 'src');

/* Initialize Express app */
const app = express()

/* Request body parser */
app.use(express.json())
app.use(bodyParser.json());

/* Logger */
app.use(morgan('tiny'))


/* Using Session - Cookies */
app.use(cookieParser())

/* Enabling CORS */

app.use(
	cors({
		origin: "*",
		credentials: true,
		methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
		preflightContinue: true,
	})
)



app.use('/api', rootRouter)



app.get('/', (req, res) => res.json({ message: 'Server now is running.', status: HttpStatusCode.OK }))
export default app