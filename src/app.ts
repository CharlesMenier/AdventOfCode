import express from 'express';
import Day1 from './solutions/Day1';
import Day2 from './solutions/Day2';
import Day3 from "./solutions/Day3";
import Day4 from "./solutions/Day4";

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.get('/day/1', (req, res) => {
    Day1()
        .then(result => {
            res.render('day', {
                title: 'Day 1: Report Repair',
                question1: 'Find the two entries that sum to 2020; what do you get if you multiply them together?',
                question2: 'What is the product of the three entries that sum to 2020?',
                input1: result.solution1Input,
                input2: result.solution2Input,
                solution1: '<code>' + result.solution1.join(' * ') + ' = ' + result.solution1.reduce((t, c) => t * c, 1) + '</code>',
                solution2: '<code>' + result.solution2.join(' * ') + ' = ' + result.solution2.reduce((t, c) => t * c, 1) + '</code>',
            });
        });
});

app.get('/day/2', (req, res) => {
    Day2()
        .then(result => {
            res.render('day', {
                title: 'Day 2: Password Philosophy',
                input1: result.solution1Input,
                input2: result.solution2Input,
                solution1: result.solution1,
                solution2: result.solution2,
            });
        });
});

app.get('/day/3', (req, res) => {
    Day3()
        .then(result => {
            res.render('day', {
                title: 'Day 3: Toboggan Trajectory',
                input1: result.solution1Input,
                input2: result.solution2Input,
                solution1: result.solution1,
                solution2: result.solution2,
            });
        });
});

app.get('/day/4', (req, res) => {
    Day4()
       .then(result => {
           res.render('day', {
               title: 'Day 4: Passport Processing',
               input1: result.rawInput,
               input2: result.rawInput,
               solution1: result.solution1,
               solution2: result.solution2,
           });
       })
       .catch(e => console.warn(e));
});

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});

