import Day from "../../common/day";
import {uniqBy} from 'lodash';

class Point {
    x: number;
    y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y,
        }
    }

    distanceFrom(point: Point) {
        return Math.max(Math.abs(this.x - point.x), Math.abs(this.y - point.y))
    }

    follow(point: Point) {
        if (this.distanceFrom(point) > 1) {
            if (this.x - point.x < 0) {
                this.move('R');
            }
            if (this.x - point.x > 0) {
                this.move('L');
            }
            if (this.y - point.y < 0) {
                this.move('U');
            }
            if (this.y - point.y > 0) {
                this.move('D');
            }
        }
    }

    move(direction: string) {
        switch(direction) {
            case 'U': this.y++; break;
            case 'D': this.y--; break;
            case 'R': this.x++; break;
            case 'L': this.x--; break;
        }
    }
}

export default class Day09 extends Day {

    constructor() {
        super(2022, 9, 'Rope Bridge');
        this.setQuestion1('How many positions does the tail of the rope visit at least once?')
        this.setQuestion2('What is the highest scenic score possible for any tree?')
    }

    async solve(n: number): Promise<any> {
        const {formatted} = await this.getInput();

        const movements = formatted
            .map(a => {
                const [dir, amount] = a.split(' ')
                return [dir, parseInt(amount)];
            });

        const points = [];
        const history = [];

        for(let k = 0; k < n; k++) points.push(new Point(0, 0));

        movements.forEach(([direction, amount]: [string, number]) => {
            for(let i = 0; i < amount; i++) {

                points[0].move(direction);

                for(let j = 1; j <= n - 1; j++) {
                    const prev = points[j - 1];
                    const point = points[j];
                    point.follow(prev);
                    if(j === n - 1) {
                        history.push(point.getPosition());
                    }
                }
            }
        })

        return history;

    }

    async part1(): Promise<any> {
         const history = await this.solve(2);
         return uniqBy(history, a => `${a.x}${a.y}`).length;
    }

    async part2(): Promise<number> {
        const history = await this.solve(10);
        return uniqBy(history, a => `${a.x}${a.y}`).length;
    }
}

const solver = new Day09();
solver.part1();