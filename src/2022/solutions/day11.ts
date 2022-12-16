import Day from "../../common/day";

class Monkey {
    id: number;
    items: number[];
    divideBy: number;
    operation: (item: number) => number;
    throwTo: (item: number) => number;

    totalInspect: number;

    constructor(
        id: number,
        startingItems: number[],
        divideBy: number,
        operation: (item: number) => number,
        throwTo: (item: number) => number,
    ) {
        this.id = id;
        this.items = startingItems;
        this.divideBy = divideBy;
        this.operation = operation;
        this.throwTo = throwTo;
        this.totalInspect = 0;
    }

    inspect() {
        this.totalInspect++;
        const item = this.items.shift();
        return this.operation(item);
    }
}

// great-common divisor of 2 numbers
const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);

// least-common multiple of 2 numbers
export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

export default class Day11 extends Day {

    constructor() {
        super(2022, 11, 'Monkey in the Middle');
        this.setQuestion1('What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?')
        this.setQuestion2('What is the level of monkey business after 10000 rounds?')
    }

    async solve(rounds: number, manageableLevel: boolean = false): Promise<any> {
        const {formatted} = await this.getInput('\n\n');

        const monkeys = formatted.map(monk => this.parseMonkey(monk));

        const manageable = monkeys
            .map((m) => m.divideBy)
            .reduce(lcm);

        let round = 1;

        for(round; round <= rounds; round++) {

            for(let i = 0; i < monkeys.length; i++) {

                const monkey = monkeys[i];

                while(monkey.items.length) {
                    let item = monkey.inspect();

                    if(manageableLevel) {
                        item %= manageable;
                    } else {
                        item = Math.floor(item / 3);
                    }

                    const monkeyId = monkey.throwTo(item);
                    const toMonkey = monkeys[monkeyId];
                    toMonkey.items.push(item);
                }

            }

        }

        const [top, second] = monkeys.sort((a, b) => b.totalInspect - a.totalInspect);
        return top.totalInspect * second.totalInspect;

    }

    parseMonkey(monkeyStr: string): Monkey {
        const [idLine, itemsLine, operationLine, testLine1, testLine2, testLine3] = monkeyStr.split('\n');

        const id = parseInt(idLine.replace(/[^\d]/g, ''));
        const items = itemsLine.replace(/[^\d,]/g, '')
            .split(',')
            .map(a => parseInt(a));

        const [, operand, amount] = operationLine.match(/([+\-*]) (\d+|old)/);

        const operation = (item: number) => {
            switch(operand) {
                case '+': return amount === 'old' ? item + item : item + parseInt(amount);
                case '-': return amount === 'old' ? item - item : item - parseInt(amount);
                case '*': return amount === 'old' ? item * item : item * parseInt(amount);
            }
        };

        const divideBy = parseInt(testLine1.replace(/[^\d]/g, ''));
        const successTo = parseInt(testLine2.replace(/[^\d]/g, ''));
        const failTo = parseInt(testLine3.replace(/[^\d]/g, ''));

        const throwTo = (item: number) => item % divideBy === 0 ? successTo : failTo;

        return new Monkey(id, items, divideBy, operation, throwTo);
    }

    async part1(): Promise<number> {
         return this.solve(20);
    }

    async part2(): Promise<number> {
        return this.solve(10000, true);
    }
}