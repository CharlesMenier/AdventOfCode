import express from 'express';
import answer2020 from './2020/routes';
import answer2022 from './2022/routes';
import answer2023 from './2023/routes';
import answer2024 from './2024/routes';

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
});

answer2020.forEach((answer, i) => {
    app.get(`/2020/day/${i + 1}`, answer);
})

answer2022.forEach((answer, i) => {
    app.get(`/2022/day/${i + 1}`, answer);
})

answer2023.forEach((answer, i) => {
    app.get(`/2023/day/${i + 1}`, answer);
})

answer2024.forEach((answer, i) => {
    app.get(`/2024/day/${i + 1}`, answer);
})

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});

