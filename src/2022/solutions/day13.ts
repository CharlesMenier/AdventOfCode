import Day from "../../common/day";

const test = '[1,1,3,1,1]\n' +
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

Array.prototype.toString = function() {
    return `[${this.join(',')}]`;
}

class Packet {
    value: Array<number|number[]>;

    constructor(input: string) {
        this.value = JSON.parse(input);
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

    compareTo(packet: Packet): number {
        const result = this.compare(this.value, packet.value);

        return result === undefined ? 0 : result ? -1 : 1;
    }

    isDecoderKey(): boolean {
        return false;
    }
}

class DividerPacket extends Packet {
    isDecoderKey(): boolean {
        return true;
    }
}

class Pair {
    left: Packet;
    right: Packet;

    constructor(input: string) {
        const [left, right] = input.split('\n');
        this.left = new Packet(left);
        this.right = new Packet(right);
    }

    isOrdered() {
        return this.left.compareTo(this.right);
    }
}

export default class Day13 extends Day {

    constructor() {
        super(2022, 13, 'Distress Signal');
        this.setQuestion1('What is the sum of the indices of those pairs?')
        this.setQuestion2('What is the decoder key for the distress signal?')
    }

    solve(input: string[]): any {
        const packets = input.map(p => new Pair(p));

        const ordered = packets.map((p, i) => {
            console.log(`\n== Pair ${i + 1} ==`);
            console.log(`- Compare ${p.left} vs ${p.right}`);
            return p.isOrdered();
        });

        return ordered.reduce((total, isOrdered, i) => isOrdered ? total + (i+1) : total, 0);
    }

    async part1(): Promise<number> {
        const {formatted} = await this.getInput('\n\n');
        return this.solve(formatted);
    }

    async part2(): Promise<number> {
        const {formatted} = await this.getInput();

        const divider = [new DividerPacket('[[2]]'), new DividerPacket('[[6]]')];
        let decoderKey = 1;

        const packets = formatted
            .filter(a => a)
            .map(p => new Packet(p));

        packets.push(...divider);

        packets
            .sort((a, b) => a.compareTo(b))
            .forEach((p, i) => {
                console.log(p.value);

                if(p.isDecoderKey()) {
                    decoderKey = decoderKey * (i + 1);
                }
            });

        return decoderKey;
    }

    test() {
        return this.solve(test.split('\n\n'));
    }
}