import Day from "../../common/day";

class Day01 extends Day {
    constructor() {
        super(2023, 1, 'Trebuchet?!');
        this.setQuestion1('What is the sum of all of the calibration values?')
        this.setQuestion2('')
    }

    findNumber(input: string): number {

        const numbers = input.replace(/^\D+/g, '');

        if(numbers.length > 1) {
            return parseInt(numbers[0] + numbers[numbers.length -1]);
        }

        return parseInt(numbers[0] + numbers[0]);
    }

    async solve(): Promise<number[]> {
        const input = await this.getInput('\n');

        return input.formatted.map(this.findNumber);
    }

    public async part1(): Promise<number> {
        const result = await this.solve();
        return result.reduce((a, b) => a + b, 0);
    }

    async part2(): Promise<number> {
        // const [first, second, third] = await this.solve();
        // return first + second + third
        return 0;
    }
}

export default Day01;