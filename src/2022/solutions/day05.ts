import Day from "../../common/day";
import {get} from 'lodash';

class Day05 extends Day {

    constructor() {
        super(2022, 5, 'Supply Stacks');
        this.setQuestion1('After the rearrangement procedure completes, what crate ends up on top of each stack?')
        this.setQuestion2('After the rearrangement procedure completes, what crate ends up on top of each stack?')
    }

    getStacks(input: string): string[][] {
        const stacks = input.split('\n');

        // remove stack numbers
        stacks.pop();

        return stacks
            .map(line => line.replace(/    /gi, '[-]').replace(/[ \[\]]/gi, ''))
            .reduce((st, line) => {
                line.split('').forEach((v, i) => {
                    if(v !== '-') {
                        if(!st[i]) {
                            st[i] = [];
                        }
                        st[i].push(v);
                    }
                })

                return st;
            }, []);
    }

    async solve(keepOrder: boolean = false): Promise<string[][]> {
        const input = await this.getInput('\n\n');

        const [stackInput, moves] = input.formatted;
        const stacks = this.getStacks(stackInput);

        moves.split('\n')
            .filter(a => a)
            .forEach(line => {
                const [amount, from, to] = line.match(/\d+/g).map(a => parseInt(a));

                if(keepOrder) {
                    let crates = [];
                    for (let i = 0; i < amount; i++) {
                        crates.push(stacks[from - 1].shift());
                    }
                    stacks[to - 1].unshift(...crates);

                } else {
                    for (let i = 0; i < amount; i++) {
                        const crate = stacks[from - 1].shift();
                        stacks[to - 1].unshift(crate);
                    }
                }
            })

        return stacks;

    }

    public async part1(): Promise<[string, string[][]]> {
         const stacks = await this.solve();

         return [stacks.reduce((crates, stack) => {
             return `${crates}${stack[0]}`;
         }, ''), stacks];

    }

    async part2(): Promise<[string, string[][]]> {
        const stacks = await this.solve(true);

        return [stacks.reduce((crates, stack) => {
            return `${crates}${stack[0]}`;
        }, ''), stacks];
    }

    print(result: string[][]): string {
        const inverted = result.map(a => a.reverse());
        const max = Math.max(...result.map(a => a.length));

        let str = '';

        for(let i = max; i >= 0; i--) {
            for(let j = 0; j < inverted.length ; j++) {
                const crate = get(inverted, `[${j}][${i}]`, undefined);

                if(crate) {
                    str = `${str} [${crate}]`;
                } else {
                    str = `${str}    `;
                }
            }

            str = `${str}\n`;
        }

        return str;
    }
}

export default Day05;