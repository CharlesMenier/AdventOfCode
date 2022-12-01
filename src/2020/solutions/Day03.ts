import {errorData, Solution} from "../../common/getInput";
import {getInput} from "../utils";

const parseInput = (input: string): boolean[] => input.split('').map(c => c === '#');

const solve = (map: boolean[][], xSlope: number, ySlope: number) => {
    const width = map[0].length;
    const height = map.length;

    let trees = 0;
    let i = 0, j = 0;

    do {

        i += xSlope;
        j += ySlope;

        if(j < height) {
            if (map[j][i % width]) {
                trees++;
            }
        }

    } while(j < height);

    return trees;
}

const part1 = (map: boolean[][]): any => solve(map, 3, 1);

const part2 = (map: boolean[][]): any => {
    const res1 = solve(map, 1, 1);
    const res2 = solve(map, 3, 1);
    const res3 = solve(map, 5, 1);
    const res4 = solve(map, 7, 1);
    const res5 = solve(map, 1, 2);

    return res1 * res2 * res3 * res4 * res5;
};

export default function(): Promise<Solution> {
    return getInput(3)
        .then(input => {
            const parsedInput = input.formatted.map(parseInput);
            return {
                rawInput: input.raw,
                solution1: part1(parsedInput),
                solution2: part2(parsedInput)
            }
        })
        .catch(e => {
            console.warn(e);
            return errorData;
        })
}

