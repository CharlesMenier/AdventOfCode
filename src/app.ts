import express from 'express';
import Day1 from './solutions/Day1';
import Day2 from './solutions/Day2';
import Day3 from "./solutions/Day3";

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});
app.get('/day1', (req, res) => {
    Day1().then(s => res.send(s));
});

app.get('/day2', (req, res) => {
    Day2().then(s => res.send(s));
});

app.get('/day3', (req, res) => {
    Day3().then(s => res.send(s));
});

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});

