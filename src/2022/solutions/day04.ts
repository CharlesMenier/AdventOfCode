import {errorData, Solution} from "../../common/getInput";
import {getInput} from "../utils";
import {uniq, chunk, intersection} from 'lodash';

interface Assignment {
    first: {start: number, end: number},
    second: {start: number, end: number},
}

const parseInput = (input: string[]): Assignment[] => input.map(pair => {
    const [first, second] = pair.split(',');

    const [start1, end1] = first.split('-').map(a => parseInt(a));
    const [start2, end2] = second.split('-').map(a => parseInt(a));

    return {
        first: {start: start1, end: end1},
        second: {start: start2, end: end2},
    };
});

const part1 = (input: Assignment[]): number => {
    return input
        .reduce((total, {first, second}) => {
            if((first.start <= second.start && first.end >= second.end) ||
                (second.start <= first.start && second.end >= first.end)) {
                return total + 1;
            }
            return total;
        }, 0)
};


const part2 = (input: Assignment[]): number => {
    return input
        .reduce((total, {first, second}) => {
            if((first.end < second.start) || (second.end < first.start)) {
                return total;
            }
            return total + 1;
        }, 0)
};

export default function(): Promise<Solution> {
    return getInput(4)
        .then(input => {
            const parsedInput = parseInput(input.formatted);
            const solution1 = part1(parsedInput);
            const solution2 = part2(parsedInput);
            return {
                rawInput: input.raw,
                solution1Input: solution1,
                solution2Input: solution2,
                solution1,
                solution2,
            };
        })
        .catch(e => {
            console.warn(e);
            return errorData;
        })
}

