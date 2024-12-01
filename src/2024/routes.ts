import Day1 from "./solutions/day01";

export default [
    async (req, res) => {
        const solver = new Day1();

        const solution1 = await solver.part1();
        const solution2 = await solver.part2();

        res.render('day', {
            toto: 'test 123',
            title: solver.title,
            question1: solver.question1,
            question2: solver.question2,
            input: solver.input.raw,
            solution1: '<code>' + solution1 + '</code>',
            solution2: '<code>' + solution2 + '</code>',
        });
    },

];