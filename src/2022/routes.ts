import Day1 from "./solutions/day01";

export default [
    (req, res) => {
        Day1()
            .then(result => {
                res.render('day', {
                    title: 'Day 1: Calorie Counting',
                    question1: 'Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?',
                    question2: 'Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?',
                    input1: result.solution1Input,
                    input2: result.solution2Input,
                    solution1: '<code>' + result.solution1 + '</code>',
                    solution2: '<code>' + result.solution2 + '</code>',
                });
            });
    },
    ];