import Day from "../../common/day";
import {uniq} from 'lodash';

export default class Day08 extends Day {

    constructor() {
        super(2022, 8, 'Treetop Tree House');
        this.setQuestion1('How many trees are visible from outside the grid?')
        this.setQuestion2('How many characters need to be processed before the first start-of-message marker is detected?')
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
        return 0;
    }
}