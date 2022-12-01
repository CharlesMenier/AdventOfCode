import {errorData, Solution} from "../../common/getInput";
import {getInput} from "../utils";

const parseInput = (input: string[]): number[] => input.map(a => parseInt(a));

const combinations = (array: number[]): number[] => {
   return array.map((n, i, a) => {
      return [...a.slice(0, i), ...a.slice(i, array.length)]
         .map(x => n + x);
   }).flat();
}

const findInvalid = (input: number[], preambuleSize: number): number => {

   for(let i = preambuleSize; i < input.length; i++) {
      const current = input[i];
      const array = input.slice(i - preambuleSize, i);

      if(combinations(array).indexOf(current) === -1) {
         return current;
      }
   }
}

const part1 = (input: number[]): number => findInvalid(input, 25);

const findSuite = (input: number[], value: number): number => {
   for(let i = 0; i < input.length; i++) {
      let sum = 0;
      let min = Infinity;
      let max = 0;

      for(let j = i; j < input.length; j++) {
         const current = input[j];

         if(sum === value) {
            return min + max;
         }

         if(current > max) {
            max = current
         }

         if(current < min) {
            min = current;
         }

         sum += input[j];
      }
   }
}

const part2 = (input: number[]) => {
   const invalid = part1(input);
   return findSuite(input, invalid);
};

export default function(): Promise<Solution> {
   return getInput(9)
      .then(input => {
         return {
            rawInput: input.raw,
            solution1: part1(parseInput(input.formatted)),
            solution2: part2(parseInput(input.formatted)),
         }
      })
      .catch(e => {
         console.warn(e);
         return errorData;
      })
}