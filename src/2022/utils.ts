import {getInput as getBaseInput, Input} from "../common/getInput";

export function getInput(day: number, split: string|RegExp = '\n'): Promise<Input> {
    return getBaseInput(2022, day, split);
}