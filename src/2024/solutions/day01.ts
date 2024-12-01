import Day from "../../common/day";

class Day01 extends Day {
    constructor() {
        super(2024, 1, 'Historian Hysteria');
        this.setQuestion1('What is the total distance between your lists?')
        this.setQuestion2('What is their similarity score?')
    }

    findOccurrences(array: number[], value: number, startFrom = 0) {
            let indexes = [], i;
            for(i = startFrom; i < array.length; i++) {
                const current = array[i];
                if(current > value) {
                    return {occurrences: indexes.length, index: i};
                }

                if (array[i] === value) {
                    indexes.push(i);
                }
            }
            return {occurrences: indexes.length, index: i};
    }

    async test() {
        const sample = '3   4\n' +
            '4   3\n' +
            '2   5\n' +
            '1   3\n' +
            '3   9\n' +
            '3   3';

        const result1 = await this.solve(sample);
        const result2 = await this.solve2(sample);

        console.log('Result 1:', result1);
        console.log('Result 2:', result2);

    }

    parseInput(input: string): number[][] {
        return input.replace(/  +/g, '\n')
            .split('\n')
            .reduce((res, num, index) => {
                if (index % 2 === 0) {
                    res[0].push(num);
                } else {
                    res[1].push(num);
                }

                return res;
            }, [[], []])
            .map(a => a.filter(a => a).map(a => parseInt(a)).sort());
    }

    async solve2(input: string) {
        const [left, right] = this.parseInput(input);

        let lastIndex = 0;

        const score = left.reduce((similarity, leftValue) => {
            const result = this.findOccurrences(right, leftValue);
            console.log('Found', result.occurrences, 'for', leftValue);

            lastIndex = result.index;
            return similarity + leftValue * result.occurrences;
        }, 0);

        console.log(score);

        return score;
    }

    async solve(input: string): Promise<number> {
        const [left, right] = this.parseInput(input);

        return left.reduce((res, _, index) =>  res + Math.abs(left[index] - right[index]), 0);

    }

    public async part1(): Promise<number> {
        const input = await this.getInput('\n');


        const result = await this.solve(input.raw);
        console.log(result);

        return result;
    }

    async part2(): Promise<number> {
        const input = await this.getInput('\n');


        const result = await this.solve2(input.raw);
        console.log(result);

        return result;
    }
}

export default Day01;