import Day from "../../common/day";
import {uniq} from 'lodash';

export default class Day08 extends Day {

    constructor() {
        super(2022, 8, 'Treetop Tree House');
        this.setQuestion1('How many trees are visible from outside the grid?')
        this.setQuestion2('What is the highest scenic score possible for any tree?')
    }

    async solve(): Promise<any> {
        const {formatted} = await this.getInput();

        return formatted.map(line => line.split('').map(a => parseInt(a)));
    }

    isVisible(grid: number[][], x: number, y: number): boolean {
        const height = grid[y][x];

        let treeHeights = [];

        for(let i = 0; i < x; i++) {
            treeHeights.push(grid[y][i]);
        }
        if(Math.max(...treeHeights) < height) {
            return true;
        }
        treeHeights = [];

        for(let i = grid[0].length - 1; i > x; i--) {
            treeHeights.push(grid[y][i]);
        }
        if(Math.max(...treeHeights) < height) {
            return true;
        }
        treeHeights = [];

        for(let i = 0; i < y; i++) {
            treeHeights.push(grid[i][x]);
        }
        if(Math.max(...treeHeights) < height) {
            return true;
        }
        treeHeights = [];

        for(let i = grid.length -1; i > y; i--) {
            treeHeights.push(grid[i][x]);
        }

        return Math.max(...treeHeights) < height;
    }

    getScenicScore(grid: number[][], x: number, y: number): number {
        const height = grid[y][x];

        const maxX = grid[0].length - 1;
        const maxY = grid.length - 1;

        let directionScore = {
            l: 1,
            r: 1,
            u: 1,
            d: 1
        };

        console.log(x, y);

        let i = x + 1;
        while(grid[y][i] < height && i < maxX) {
            directionScore.r++;
            i++;
        }

        i = x - 1;
        while(grid[y][i] < height && i > 0) {
            directionScore.l++;
            i--;
        }

        i = y + 1;
        while(grid[i][x] < height && i < maxY) {
            directionScore.d++;
            i++;
        }

        i = y - 1;
        while(grid[i][x] < height && i > 0) {
            directionScore.u++;
            i--;
        }

        return directionScore.d * directionScore.l * directionScore.r * directionScore.u;
    }

    public async part1(): Promise<any> {
         const grid = await this.solve();

         const maxX = grid[0].length;
         const maxY = grid.length;
         let visibleTrees = maxX * 2 + maxY * 2 - 4;

         for(let i = 1; i < maxY - 1; i++) {
             for(let j = 1; j < maxX - 1; j++) {
                 if(this.isVisible(grid, j, i)) {
                     visibleTrees++;
                 }
             }
         }

         return visibleTrees;
    }

    async part2(): Promise<number> {
        const grid = await this.solve();

        const maxX = grid[0].length;
        const maxY = grid.length;

        let max = 0;

        for(let i = 1; i < maxY - 1; i++) {
            for(let j = 1; j < maxX - 1; j++) {
                if(this.isVisible(grid, j, i)) {
                    const score = this.getScenicScore(grid, j, i);
                    if(score > max) {
                        max  = score
                    }
                }
            }
        }

        return max;
    }
}