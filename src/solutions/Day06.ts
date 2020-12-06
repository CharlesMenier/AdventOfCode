import {errorData, getInput, Solution} from "../common/getInput";
import {union, intersection} from 'lodash';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const parseInput = (input: string): string[] => input.split('\n');

const getQuestions = (input: string[][]): string[][] => {
   return input
      .map(group => group.reduce((prev, curr) => union(prev, curr.split('')), []));
}

const part1 = (input: string[][]): number => {
   return getQuestions(input).reduce((total, curr) => total + curr.length, 0);
};

const part2 = (input: string[][]): number => {
   return input.map((group) =>
      group.reduce((prev, curr) => intersection(
            prev,
            curr.split('')
         ),
         alphabet.split('')).length
   ).reduce((total, curr) => total + curr, 0)

}

export default function(): Promise<Solution> {
     return getInput(6, '\n\n')
        .then(input => {
            const parsedInput = input.formatted.map(parseInput);
            return {
                rawInput: '',
                solution1: part1(parsedInput),
                solution2: part2(parsedInput),
            }
        })
        .catch(e => {
            console.warn(e);
            return errorData;
        })
}

