import {errorData, Solution} from "../../common/getInput";
import {getInput} from "../utils";

const parseInput = input => input.map((row) => row.split(''));

const getNeighbours = (map, x, y) => {
   const neighbours = [];
   for(let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
         if(
            i >= 0 && j >= 0 &&
            i < map.length && j < map[0].length &&
            (i !== x || j !== y)
         ) {
            neighbours.push(map[i][j]);
         }
      }
   }
   return neighbours;
}

const getVisibleNeighbours = (map, x, y) => {
   const neighbours = [];

   const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
   ];

   dirs.forEach(([deltaX, deltaY]) => {
      let i = x + deltaX, j = y + deltaY;
      let found = false;
      while(map[i] && map[i][j] && !found) {

         const seat = map[i][j];

         if(seat === '#' || seat === 'L') {
            neighbours.push(map[i][j]);
            found = true;
         }

         i += deltaX;
         j += deltaY;
      }
   });

   return neighbours;
}

const empty = (neighbours) => neighbours.filter(a => a === '#').length === 0;

const occupied = (neighbours, max) => neighbours.filter(a => a === '#').length >= max;

const toString = map => map.map(row => row.join('')).join('\n');

const solve = (input, predicate, maxSeat) => {

   let curr, next = [...input];

   do {
      curr = [...next];

      next = curr.map((row, i) => {
         return row.map((seat, j) => {
            const neighbours = predicate(curr, i, j);

            if (seat === 'L' && empty(neighbours)) {
               return '#';
            }

            if (seat === '#' && occupied(neighbours, maxSeat)) {
               return 'L';
            }

            return seat;
         });
      })

   } while(toString(curr) !== toString(next));

   return toString(curr).split('').filter(a => a === '#').length;
}

const part1 = input => solve(input, getNeighbours, 4);

const part2 = input => solve(input, getVisibleNeighbours, 5);

export default function(): Promise<Solution> {
   return getInput(11)
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