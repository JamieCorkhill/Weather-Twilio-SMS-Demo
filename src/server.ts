import express from 'express';
import { getWeatherForSMS } from './weather/weather';

const PORT = parseInt(process.env.PORT as string) || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/sms', getWeatherForSMS);

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
