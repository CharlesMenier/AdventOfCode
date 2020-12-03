import axios from 'axios';
import config from './config';


export type Input = {
    raw: string,
    formatted: string[],
}

export type Solution = {
    rawInput: string,
    solution1Input?: any,
    solution2Input?: any,
    solution1: any,
    solution2: any,
}

export const errorData = {
    rawInput: '',
    solution1: null,
    solution2: null
};

export function getInput(day: number): Promise<Input> {
    return axios.get(
        `https://adventofcode.com/2020/day/${day}/input`,
        {
            headers: {
                Cookie: `session=${config.cookie}`
            }
        })
        .then(r => ({
            raw: r.data,
            formatted: r.data.split('\n').filter(a => a),
        }));
}
