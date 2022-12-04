import Day1 from "./solutions/day01";
import Day2 from "./solutions/day02";
import Day3 from "./solutions/day03";
import Day4 from "./solutions/day04";

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
                    question2: 'Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?',
                    input1: result.solution1Input,
                    input2: result.solution2Input,
                    solution1: '<code>' + result.solution1 + '</code>',
                    solution2: '<code>' + result.solution2 + '</code>',
                });
            });
    },
    ];