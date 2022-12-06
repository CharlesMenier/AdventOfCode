import Day1 from "./solutions/day01";
import Day2 from "./solutions/day02";
import Day3 from "./solutions/day03";
import Day4 from "./solutions/day04";
import Day5 from "./solutions/day05";
import Day6 from "./solutions/day06";

export default [
    async (req, res) => {
        const solver = new Day1();

        const solution1 = await solver.part1();
        const solution2 = await solver.part2();

        res.render('day', {
            title: solver.title,
            question1: solver.question1,
            question2: solver.question2,
            input: solver.input.raw,
            solution1: '<code>' + solution1 + '</code>',
            solution2: '<code>' + solution2 + '</code>',
        });
    },
    (req, res) => {
        Day2()
            .then(result => {
                res.render('day', {
                    title: 'Day 2: Rock Paper Scissors',
                    question1: 'What would your total score be if everything goes exactly according to your strategy guide?',
                    question2: 'Following the Elf\'s instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?',
                    input1: result.solution1Input,
                    input2: result.solution2Input,
                    solution1: '<code>' + result.solution1 + '</code>',
                    solution2: '<code>' + result.solution2 + '</code>',
                });
            });
    },
    (req, res) => {
        Day3()
            .then(result => {
                res.render('day', {
                    title: 'Day 3: Rucksack Reorganization',
                    question1: 'Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?',
                    question2: 'Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?',
                    input1: result.solution1Input,
                    input2: result.solution2Input,
                    solution1: '<code>' + result.solution1 + '</code>',
                    solution2: '<code>' + result.solution2 + '</code>',
                });
            });
    },
    (req, res) => {
        Day4()
            .then(result => {
                res.render('day', {
                    title: 'Day 4: Camp Cleanup',
                    question1: 'In how many assignment pairs does one range fully contain the other?',
                    question2: 'In how many assignment pairs do the ranges overlap?',
                    input1: result.solution1Input,
                    input2: result.solution2Input,
                    solution1: '<code>' + result.solution1 + '</code>',
                    solution2: '<code>' + result.solution2 + '</code>',
                });
            });
    },
    async (req, res) => {
        const solver = new Day5();

        const [solution1, printable1] = await solver.part1();
        const [solution2, printable2] = await solver.part2();

        res.render('day', {
            title: solver.title,
            question1: solver.question1,
            question2: solver.question2,
            input: solver.input.raw,
            solution1: '<code>' + solution1 + '</code>',
            output1: solver.print(printable1),
            solution2: '<code>' + solution2 + '</code>',
            output2: solver.print(printable2),
        });
    },
    async (req, res) => {
        const solver = new Day6();

        const solution1 = await solver.part1();
        const solution2 = await solver.part2();

        res.render('day', {
            title: solver.title,
            question1: solver.question1,
            question2: solver.question2,
            input: solver.input.raw,
            solution1: '<code>' + solution1 + '</code>',
            solution2: '<code>' + solution2 + '</code>',
        });
    },
    ];