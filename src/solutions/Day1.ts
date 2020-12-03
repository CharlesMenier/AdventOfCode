import {errorData, getInput, Solution} from "../common/getInput";

const expected = 2020;

const parseInput = (input: string[]): number[] => input.map(a => parseInt(a));

const resolve = (value: number, input: number[]) => {
    return input[input.indexOf(expected - value)];
};

const part1 = (input: number[]) => {
    return input
        .filter(a => a && a < expected)
        .map((value, i, arr) => resolve(value, arr))
        .filter(a => a);
};

const part2 = (input: number[]): number[] => {
    for(let i = 0; i < input.length; i++) {
        const first = input[i];
        for(let j = 0; j < input.length; j++) {
            if(j !== i) {
                const second = input[j];
                const total = first + second;
                if(total < 2020) {
                    const third = resolve(total, input);
                    if (third) {
                        return [first, second, third];
                    }
                }
            }
        }
    }
};

const solutionInput = (input: number[], solution: number[]): string => {
    return input.map(value => {
        if(solution.indexOf(value) !== -1) {
            return `<em>${value}</em>`;
        } else {
            return value;
        }
    }).join('\n');
}

export default function(): Promise<Solution> {
    return getInput(1)
        .then(input => {
            const parsedInput = parseInput(input.formatted);
            const solution1 = part1(parsedInput);
            const solution2 = part2(parsedInput);
            return {
                rawInput: input.raw,
                solution1Input: solutionInput(parsedInput, solution1),
                solution2Input: solutionInput(parsedInput, solution2),
                solution1,
                solution2
            };
        })
        .catch(e => {
            console.warn(e);
            return errorData;
        })
}

