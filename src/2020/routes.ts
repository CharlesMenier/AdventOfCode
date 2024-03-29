import Day1 from "./solutions/Day01";
import Day2 from "./solutions/Day02";
import Day3 from "./solutions/Day03";
import Day4 from "./solutions/Day04";
import Day5 from "./solutions/Day05";
import Day6 from "./solutions/Day06";
import Day7 from "./solutions/Day07";
import Day8 from "./solutions/Day08";
import Day9 from "./solutions/Day09";
import Day10 from "./solutions/Day10";
import Day11 from "./solutions/Day11";

export default [
    (req, res) => {
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
    },
    (req, res) => {
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
    },
    (req, res) => {
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
    },
    (req, res) => {
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
    }, (req, res) => {
        Day5()
            .then(result => {
                res.render('day', {
                    title: 'Day 5: Binary Boarding',
                    input1: result.rawInput,
                    input2: result.rawInput,
                    solution1: result.solution1,
                    solution2: result.solution2,
                });
            })
            .catch(e => console.warn(e));
    },
    (req, res) => {
        Day6()
            .then(result => {
                res.render('day', {
                    title: 'Day 6: Custom Customs',
                    input1: result.rawInput,
                    input2: result.rawInput,
                    solution1: result.solution1,
                    solution2: result.solution2,
                });
            })
            .catch(e => console.warn(e));
    },
    (req, res) => {
        Day7()
            .then(result => {
                res.render('day', {
                    title: 'Day 7: Handy Haversacks',
                    input1: result.rawInput,
                    input2: result.rawInput,
                    solution1: result.solution1,
                    solution2: result.solution2,
                });
            })
            .catch(e => console.warn(e));
    },
    (req, res) => {
        Day8()
            .then(result => {
                res.render('day', {
                    title: 'Day 8: Handheld Halting',
                    input1: result.rawInput,
                    input2: result.rawInput,
                    solution1: result.solution1,
                    solution2: result.solution2,
                });
            })
            .catch(e => console.warn(e));
    },
    (req, res) => {
        Day9()
            .then(result => {
                res.render('day', {
                    title: 'Day 9: Encoding Error',
                    input1: result.rawInput,
                    input2: result.rawInput,
                    solution1: result.solution1,
                    solution2: result.solution2,
                });
            })
            .catch(e => console.warn(e));
    }, (req, res) => {
        Day10()
            .then(result => {
                res.render('day', {
                    title: 'Day 10: Adapter Array',
                    input1: result.rawInput,
                    input2: result.rawInput,
                    solution1: result.solution1,
                    solution2: result.solution2,
                });
            })
            .catch(e => console.warn(e));
    }, (req, res) => {
        Day11()
            .then(result => {
                res.render('day', {
                    title: 'Day 11: Seating System',
                    input1: result.rawInput,
                    input2: result.rawInput,
                    solution1: result.solution1,
                    solution2: result.solution2,
                });
            })
            .catch(e => console.warn(e));
    }];