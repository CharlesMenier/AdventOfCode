import Day from "../../common/day";

class Day01 extends Day {
    constructor() {
        super(2022, 1, 'Calorie Counting');
        this.setQuestion1('Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?')
        this.setQuestion2('Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?')
    }

    group(input: string[]): number[] {
        return input.map(a => a
            .split('\n')
            .map(b => parseInt(b))
            .reduce((t, c) => t + c, 0)
        );
    }

    async solve(): Promise<number[]> {
        const input = await this.getInput('\n\n');

        return this.group(input.formatted)
            .sort((a, b) => b - a)
    }

    public async part1(): Promise<number> {
        const result = await this.solve();
        return result.shift();
    }

    async part2(): Promise<number> {
        const [first, second, third] = await this.solve();
        return first + second + third
    }
}


const part1 = (input: number[][]) => {
    return input
        .map(a => a.reduce((total, value) => total + value), 0)
        .sort((a, b) => b - a)
        .shift();
};

export default Day01;