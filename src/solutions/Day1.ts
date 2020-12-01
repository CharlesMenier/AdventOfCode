import {getInput, Solution} from "../common/getInput";

const expected = 2020;

const resolve = (value: number, input: number[]) => {
    return input[input.indexOf(expected - value)];
};


const part1 = (input: number[]): number => {
    return input
        .filter(a => a && a < expected)
        .map((value, i, arr) => resolve(value, arr))
        .filter(a => a)
        .reduce((prev, curr) => prev * curr, 1);
};

const part2 = (input: number[]): number => {
    for(let i = 0; i < input.length; i++) {
        const first = input[i];
        for(let j = 0; j < input.length; j++) {
            if(j !== i) {
                const second = input[j];
                const total = first + second;
                if(total < 2020) {
                    const third = resolve(total, input);
                    if (third) {
                        return first * second * third;
                    }
                }
            }
        }
    }
};

export default function(): Promise<Solution> {
    return getInput(1)
        .then(input => ({
            1: part1(input),
            2: part2(input)
        }))
        .catch(e => {
            console.warn(e);
            return {
                1: -1,
                2: -1
            };
        })
}

