import {getInput, Input} from "./getInput";

abstract class Day {

    title: string;
    year: number;
    date: number;
    input: Input;

    question1: string;
    question2: string;

    protected constructor(year: number, date: number, title: string) {
        this.year = year;
        this.date = date;
        this.title = title;
    }

    setQuestion1(title: string) {
        this.question1 = title;
    }

    setQuestion2(title: string) {
        this.question2 = title;
    }

    async getInput(separator?: string|RegExp): Promise<Input> {
        try {
            this.input = await getInput(this.year, this.date, separator);

            return this.input;
        } catch(e) {
            console.warn("Could not load input", e);
        }
    }

    abstract solve(param?: any): Promise<any>;

    abstract part1(): Promise<any>;
    abstract part2(): Promise<any>;

}

export default Day;