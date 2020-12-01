import axios from 'axios';
import config from './config';

export type Solution = {
    1: any,
    2: any,
}

export function getInput(day: number): Promise<number[]> {
    return axios.get(
        `https://adventofcode.com/2020/day/${day}/input`,
        {
            headers: {
                Cookie: `session=${config.cookie}`
            }
        })
        .then(r => {
            return r.data.split('\n').map(a => parseInt(a));
        })
        .catch((e => console.warn(e)));
}
