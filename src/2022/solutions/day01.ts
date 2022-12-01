import {errorData, Solution} from "../../common/getInput";
import {getInput} from "../utils";

const parseInput = (input: string[]): number[][] => input.map(a => a.split('\n').map(b => parseInt(b)));

const part1 = (input: number[][]) => {
    return input
        .map(a => a.reduce((total, value) => total + value), 0)
        .sort((a, b) => b - a)
        .shift();
};

const part2 = (input: number[][]) => {
    const [first, second, third] = input
        .map(a => a.reduce((total, value) => total + value), 0)
        .sort((a, b) => b - a);

    return first + second + third;
};

export default function(): Promise<Solution> {
    return getInput(1, '\n\n')
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

