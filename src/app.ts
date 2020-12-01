import express from 'express';
import Day1 from './solutions/Day1';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});
app.get('/day1', (req, res) => {
    Day1().then(s => res.send(s));
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});

