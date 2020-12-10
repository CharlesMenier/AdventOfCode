import {errorData, getInput, Solution} from "../common/getInput";

type Instruction = {
   type: string,
   value: number,
   acc: number,
   index: number,
};

const parseInput = (input: string[]): Instruction[] => {
   return input
      .map(line => {
         const [type, value] = line.split(' ');
         return {
            type,
            value: parseInt(value),
            ...apply(type, parseInt(value))
         };
      });
}

const generateCode = (code: Instruction[]): Instruction[][] => {

   return code.reduce((p, instruction, i) => {

      if(instruction.type !== 'nop' && instruction.type !== 'jmp') {
         return p;
      } else {
         const codeCopy = [...code];
         const newType = instruction.type === 'nop' ? 'jmp' : 'nop';

         codeCopy[i] = {
            ...instruction,
            type: newType,
            ...apply(newType, instruction.value)
         };

         return [...p, codeCopy];

      }

   }, []);

}

const apply = (type: string, value: number): {acc: number, index: number} => {
   switch(type) {
      case 'nop':
         return {acc: 0, index: 1};

      case 'acc':
         return {acc: value, index: 1};

      case 'jmp':
         return {acc: 0, index: value};

      default:
         throw new Error('Unsupported operation: ' + type);
   }
}

const run = (code: Instruction[]): {acc: number, done: boolean} => {

   const visited = [];
   let index = 0, acc = 0;

   while(true) {

      visited.push(index);

      if(new Set(visited).size !== visited.length) {
         return {acc, done: false};
      } else if(index === code.length) {
         return {acc, done: true};
      }

      const instruction = code[index];

      acc += instruction.acc;
      index += instruction.index;

   }

}

const part1 = (input: Instruction[]): number => run(input).acc;

const part2 = (input: Instruction[]) => generateCode(input)
   .map(run)
   .filter(a => a.done)
   .map(a => a.acc)[0];


export default function(): Promise<Solution> {
   return getInput(8)
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