import Day from "../../common/day";

Array.prototype.toString = function() {
    return `[${this.join(',')}]`;
}

class Packet {
    left: Array<number|number[]>;
    right: Array<number|number[]>;

    constructor(input: string) {
        const [left, right] = input.split('\n');
        this.left = JSON.parse(left);
        this.right = JSON.parse(right);
    }

    isOrdered() {
        return this.compare(this.left, this.right);
    }

    compare(left: Array<number|number[]>, right: Array<number|number[]>): boolean {

        let result;

        for(let i = 0; i < Math.max(left.length, right.length); i++) {
            const leftItem = left[i];
            const rightItem = right[i];


            console.log(`- Compare ${leftItem} vs ${rightItem}`);

            if(typeof leftItem === 'number' && typeof rightItem === 'number') {
                if(leftItem < rightItem) {
                    console.log(`- Left side is smaller, so inputs are in the right order`)
                    return true;
                }

                if(leftItem > rightItem) {
                    console.log(`- Right side is smaller, so inputs are not in the right order`)
                    return false;
                }
            } else {

                if(leftItem === undefined) {
                    console.log(`- Left side ran out of items, so inputs are in the right order`);
                    return true;
                }

                if(rightItem === undefined) {
                    console.log(`- Right side ran out of items, so inputs are not in the right order`);
                    return false;
                }

                let l, r;

                if(!Array.isArray(leftItem)) {
                    console.log(`- Mixed types; convert left to [${leftItem}] and retry comparison`)
                    l = [leftItem];
                } else {
                    l = leftItem;
                }

                if(!Array.isArray(rightItem)) {
                    console.log(`- Mixed types; convert right to [${rightItem}] and retry comparison`)
                    r = [rightItem];
                } else {
                    r = rightItem;
                }

                result = this.compare(l, r);
            }

            if(result !== undefined) {
                return result;
            }
        }
    }

}

export default class Day13 extends Day {

    constructor() {
        super(2022, 13, 'Distress Signal');
        this.setQuestion1('What is the sum of the indices of those pairs?')
        this.setQuestion2('What is the level of monkey business after 10000 rounds?')
    }

    solve(input: string[]): any {
        const packets = input.map(p => new Packet(p));

        const ordered = packets.map((p, i) => {
            console.log(`\n== Pair ${i + 1} ==`);
            console.log(`- Compare ${p.left} vs ${p.right}`);
            return p.isOrdered();
        });

        const total = ordered.reduce((total, isOrdered, i) => isOrdered ? total + (i+1) : total, 0);

        console.log(total);

        return total;
    }

    async part1(): Promise<number> {
        const {formatted} = await this.getInput('\n\n');

         return this.solve(formatted);
    }

    async part2(): Promise<number> {
        return this.solve([]);
    }

    test() {
        const input = '[1,1,3,1,1]\n' +
            '[1,1,5,1,1]\n' +
            '\n' +
            '[[1],[2,3,4]]\n' +
            '[[1],4]\n' +
            '\n' +
            '[9]\n' +
            '[[8,7,6]]\n' +
            '\n' +
            '[[4,4],4,4]\n' +
            '[[4,4],4,4,4]\n' +
            '\n' +
            '[7,7,7,7]\n' +
            '[7,7,7]\n' +
            '\n' +
            '[]\n' +
            '[3]\n' +
            '\n' +
            '[[[]]]\n' +
            '[[]]\n' +
            '\n' +
            '[1,[2,[3,[4,[5,6,7]]]],8,9]\n' +
            '[1,[2,[3,[4,[5,6,0]]]],8,9]';

        return this.solve(input.split('\n\n'));
    }
}