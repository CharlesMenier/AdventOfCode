import {errorData, Solution} from "../../common/getInput";
import {getInput} from "../utils";
import {uniq, chunk, intersection} from 'lodash';

interface Rucksack {
    compartment1: string,
    compartment2: string,
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const parseInput = (input: string[]): Rucksack[] => input.map(a => {
    const middle = a.length / 2;
    return {
        compartment1: a.substring(0, middle),
        compartment2: a.substring(middle)
    }
});

const part1 = (input: Rucksack[]): number => {
    return input
        .map(rucksack => ({
            compartment1: uniq(rucksack.compartment1.split('').sort()),
            compartment2: uniq(rucksack.compartment2.split('').sort())
        }))
        .reduce((total, rucksack) => {
            let result = 0;
            rucksack.compartment1.forEach(item => {
                if(rucksack.compartment2.indexOf(item) !== -1) {
                    result = ALPHABET.split('').indexOf(item) + 1;
                }
            })

            return total + result;
        }, 0)
};


const part2 = (input: string[]) => {
    const cleanInput = input
        .map(rucksack => {
            return uniq(rucksack.split('').sort())
        });


    return chunk(cleanInput, 3)
        .map((group: string[]) => {
            const value =  intersection(...group).shift();
            return ALPHABET.split('').indexOf(value) + 1;
        })
        .reduce((total, value) => total + value, 0);
};

export default function(): Promise<Solution> {
    return getInput(3)
        .then(input => {
            const parsedInput = parseInput(input.formatted);
            const solution1 = part1(parsedInput);
            const solution2 = part2(input.formatted);
            return {
                rawInput: input.raw,
                solution1Input: solution1,
                solution2Input: solution2,
                solution1,
                solution2,
            };
        })
        .catch(e => {
            console.warn(e);
            return errorData;
        })
}

