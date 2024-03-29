import Day from "../../common/day";
import {uniq} from 'lodash';

class Day06 extends Day {

    constructor() {
        super(2022, 6, 'Tuning Trouble');
        this.setQuestion1('How many characters need to be processed before the first start-of-packet marker is detected?')
        this.setQuestion2('How many characters need to be processed before the first start-of-message marker is detected?')
    }

    async solve(size: number): Promise<number> {
        const {raw} = await this.getInput('');

        let index = size;

        for(let i = 0; index < raw.length; index++, i++) {
            const values = raw.substring(i, index);

            if (uniq(values.split('')).length === size) {
                return index;
            }
        }

    }

    public async part1(): Promise<number> {
         return await this.solve(4);
    }

    async part2(): Promise<number> {
        return await this.solve(14);
    }
}

export default Day06;