import {errorData, getInput, Solution} from "../common/getInput";

type PasswordPolicy = {
    min: number,
    max: number,
    char: string,
    password: string[]
}

const regexp = /([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/;

const parseInput = (input: string): PasswordPolicy => {
    const result = regexp.exec(input);

    return {
        min: parseInt(result[1]),
        max: parseInt(result[2]),
        char: result[3],
        password: result[4].split('')
    }
};

const part1 = (passwords: PasswordPolicy[]): any => {
    return passwords.filter(pp => {
        const occurrences = pp.password
            .filter(c => c === pp.char)
            .length;

        return occurrences >= pp.min && occurrences <= pp.max;
    }).length;
};

const part2 = (passwords: PasswordPolicy[]): any => {
    return passwords.filter(pp => {
        return pp.password[pp.min] === pp.char || pp.password[pp.max] === pp.char;
    }).length;
};

export default function(): Promise<Solution> {
    return getInput(2)
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

