import {errorData, getInput, Solution} from "../common/getInput";

const parseInput = (input: string): boolean[] => {
   return input
      .split('')
      .map(a => {
         switch(a) {
            case 'L':
            case 'F': return false;
            case 'R':
            case 'B': return true;
         }
      });
};

const solve = (input: boolean[], range: number[]): number => {
   return input.reduce((res, curr) => {
      const diff = res[1] - res[0];
      let bounds;
      if(!curr) {
         bounds = [res[0], Math.floor(res[1] - diff / 2)];
      } else {
         bounds = [Math.ceil(res[0] + diff / 2), res[1]];
      }

      if(bounds[0] === bounds[1]) {
         return bounds[0];
      } else {
         return bounds;
      }
   }, range);
}

const getSeat = input => {
   const data = [...input];
   return [solve(data.splice(0, 7), [0, 127]), solve(data, [0, 7])];
}

const getSeatId = ([row, col]: number[]): number => 8 * row + col;

const part1 = (input: boolean[][]): number => {
   return Math.max(...input
      .map(getSeat)
      .map(getSeatId)
   )
};

const part2 = (input: boolean[][]): number[] => {
   return input
      .map(getSeat)
      .map(getSeatId)
      .sort((a, b) => a - b)
      .filter((v, i, a) => {
         return i !== 0 && v - a[i-1] !== 1;
      })
      .map(a => a - 1)
};

export default function(): Promise<Solution> {
     return getInput(5)
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

