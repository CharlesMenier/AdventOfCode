import {errorData, Solution} from "../../common/getInput";
import {getInput} from "../utils";

const parseInput = (input: string[]): number[] => input
   .map(a => parseInt(a))
   .sort((a, b) => a - b);

const part1 = (input: number[]): number => {
   const diff = [0, ...input]
      .map((x, i, a) => {
         if(i < a.length - 1) {
            return a[i+1] - x;
         }
         return 3;
      });

   /*return [
      diff.filter(a => a === 1).length,
      diff.filter(a => a === 3).length,
   ]*/

   return diff.filter(a => a === 1).length * diff.filter(a => a === 3).length;
}

let sub = {};

const choices = (input, value, path) => {

   const alt = input.filter(a => (a > value) && (a - value) <= 3);

   if(!alt.length) {
      return 1;
   }

   return alt.reduce((p, c) => {
      if(sub[c]) {
         return p + sub[c];
      } else {
         const res = choices(input.slice(input), c, [...path, c]);
         sub[c] = res;
         return res;
      }
   }, 0);
}

const part2 = input => choices([...input, Math.max(...input) + 3],0, [0]);

export default function(): Promise<Solution> {
   return getInput(10)
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