import {errorData, Solution} from "../../common/getInput";
import {getInput} from "../utils";

const parseBagRule = rule => {
   const [container, containing] = rule.split('contain');

   const [, bagColor] = /([a-z ]+) bags/gi.exec(container);
   const bags = containing.split(/[,.]/)
      .map(bag => {
         if(/(\d+) ([a-z ]+) bag/gi.test(bag)) {
            const [, number, color] = /(\d+) ([a-z ]+) bag/gi.exec(bag);
            return {color, number: parseInt(number)};
         }
      })
      .filter(a => a);

   return [bagColor, bags];
}

const parseInput = (input) => {
   return input
      .reduce((prev, curr) => {
         const [color, contains] = parseBagRule(curr);
         return {
            ...prev,
            [color]: contains
         }
      }, {});
}

const checkBags = (rules, color, contains) => {
   if(color === 'shiny gold') {
      return true;
   } else {
      return contains.reduce((prev, curr) => prev || checkBags(rules, curr.color, rules[curr.color]), false);
   }
}

const countBags = (rules, bag, contains) => {
   if(!contains.length) {
      return 1;
   } else {
      return contains.reduce((prev, curr) => {
         const inside = countBags(rules, curr, rules[curr.color]);
         return prev + curr.number * inside;
      }, 1);
   }
}

const part1 = (rules) => {
   return Object.entries(rules)
      .filter(([color]) => color !== 'shiny gold')
      .map(([color, contains]) => checkBags(rules, color, contains))
      .filter(a => a)
      .length
};

const part2 = (rules) => {
   return countBags(rules, {color: 'shiny gold', number: 1}, rules['shiny gold']) - 1;
};

export default function(): Promise<Solution> {
   return getInput(7)
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