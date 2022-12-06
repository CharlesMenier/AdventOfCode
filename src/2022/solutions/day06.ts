import Day from "../../common/day";
import {uniq} from 'lodash';

class Day06 extends Day {

    constructor() {
        super(2022, 6, 'Tuning Trouble');
        this.setQuestion1('How many characters need to be processed before the first start-of-packet marker is detected?')
        this.setQuestion2('How many characters need to be processed before the first start-of-message marker is detected?')
    }

    async solve(): Promise<number> {
        const {formatted} = await this.getInput('');

        let index = 3;

        for(index; index < formatted.length - 4; index++) {
            const first = formatted[index - 3]
            const second = formatted[index - 2]
            const third = formatted[index - 1]
            const fourth = formatted[index]

            if (uniq([first, second, third, fourth]).length === 4) {
                return index + 1;
            }
        }

    }

    public async part1(): Promise<number> {
         return await this.solve();
    }

    async part2(): Promise<number> {
        const stacks = await this.solve();

        return 0;
    }

    print(result: string[]): string {

        return '';
    }
}

export default Day06;