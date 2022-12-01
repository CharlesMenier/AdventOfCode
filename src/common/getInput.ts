import axios, {AxiosResponse} from 'axios';
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
    time1?: any,
    time2?: any,
}

export const errorData = {
    rawInput: '',
    solution1: null,
    solution2: null
};

export function getQuestion(year: number, day: number): Promise<AxiosResponse<string>> {
    return axios.get(
        `https://adventofcode.com/${year}/day/${day}`,
        {
            headers: {
                Cookie: `session=${config.cookie}`
            }
        });
}

export function getInput(year: number, day: number, split: string|RegExp = '\n'): Promise<Input> {
    return axios.get(
        `https://adventofcode.com/${year}/day/${day}/input`,
        {
            headers: {
                Cookie: `session=${config.cookie}`
            }
        })
        .then(r => ({
            raw: r.data.trim(),
            formatted: r.data.trim().split(split).filter(a => a),
        }));
}
