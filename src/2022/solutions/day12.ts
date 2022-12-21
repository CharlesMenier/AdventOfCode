import Day from "../../common/day";

interface Node {
    x: number,
    y: number,
    height: number,
    cost: number,
    f: number, // score of g + h
    h: number, // distance from end
    g: number, // distance from start
    parent?: Node,
    closed: boolean,
    visited: boolean,
}

class AStar {

    map: Node[][];
    start: Node;
    end: Node;

    constructor(input: string) {
        this.start = {x: 0, y: 0, cost: 0, h: 0, height: 0, closed: false, g: 0, visited: false, f: 0};
        this.end = {x: 0, y: 0, cost: 0, h: 0, height: 25, closed: false, g: 0, visited: false, f: 0};

        this.map = input.split('\n')
            .map((line, j) => {
                return line.split('')
                    .map((height, i) => {
                        switch(height) {
                            case 'S':
                                this.start.x = i;
                                this.start.y = j;
                                return this.start;
                            case 'E':
                                this.end.x = i;
                                this.end.y = j;
                                return this.end;

                            default:
                                return {
                                    x: i,
                                    y: j,
                                    cost: 0,
                                    height: height.charCodeAt(0) - 96,
                                    h: 0,
                                    g: 0,
                                    f: 0,
                                    closed: false,
                                    visited: false,
                                };
                        }
                    })
            })
    }

    distance(a: Node, b: Node) {
        const d1 = Math.abs(b.x - a.x);
        const d2 = Math.abs(b.y - a.y);
        return d1 + d2;
    }

    neighbors(node: Node) {
        let result = [];
        const x = node.x;
        const y = node.y;

        if(this.map[x-1] && this.map[x-1][y]) {
            result.push(this.map[x-1][y]);
        }
        if(this.map[x+1] && this.map[x+1][y]) {
            result.push(this.map[x+1][y]);
        }
        if(this.map[x][y-1] && this.map[x][y-1]) {
            result.push(this.map[x][y-1]);
        }
        if(this.map[x][y+1] && this.map[x][y+1]) {
            result.push(this.map[x][y+1]);
        }
        return result;
    }

    solve() {

        this.start.h = this.distance(this.start, this.end);

        const openList = [];
        openList.push(this.start);

        while(openList.length) {

            let lowInd = 0;
            for(let i = 0; i < openList.length; i++) {
                if(openList[i].cost < openList[lowInd].cost) { lowInd = i; }
            }

            const currentNode = openList[lowInd];

            if(currentNode == this.end) {
                let curr = currentNode;
                const result = [];
                while(curr.parent) {
                    result.push(curr);
                    curr = curr.parent;
                }
                return result.reverse();
            }

            // Normal case -- move currentNode from open to closed, process each of its neighbors
            openList.splice(openList.indexOf(lowInd), 1);
            currentNode.closed = true;

            const neighbors = this.neighbors(currentNode);

            for(let i = 0; i < neighbors.length; i++) {
                const neighbor = neighbors[i];

                if(neighbor.closed || neighbor.height - currentNode.height > 1) {
                    // not a valid node to process, skip to next neighbor
                    continue;
                }

                // g score is the shortest distance from start to current node, we need to check if
                //   the path we have arrived at this neighbor is the shortest one we have seen yet
                const gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
                let gScoreIsBest = false;

                if(!neighbor.visited) {
                    // This the the first time we have arrived at this node, it must be the best
                    // Also, we need to take the h (heuristic) score since we haven't done so yet

                    gScoreIsBest = true;
                    neighbor.h = this.distance(neighbor, this.end);
                    neighbor.visited = true;
                    openList.push(neighbor);
                }
                else if(gScore < neighbor.g) {
                    // We have already seen the node, but last time it had a worse g (distance from start)
                    gScoreIsBest = true;
                }

                if(gScoreIsBest) {
                    // Found an optimal (so far) path to this node.  Store info on how we got here and
                    //  just how good it really is...
                    neighbor.parent = currentNode;
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;
                }
            }
        }

        // error
        return [];

    }
}

interface DNode {
    x: number,
    y: number,
    height: number,
    parent?: Node,
    visited: boolean,
    dist: number,
}


class Djikstra {

    map: DNode[][];
    start: DNode;
    end: DNode;
    nodes: DNode[];

    constructor(input: string) {
        this.start = {x: 0, y: 0, height: 0, visited: false, dist: 0};
        this.end = {x: 0, y: 0, height: 25, visited: false, dist: 0};

        this.map = input.split('\n')
            .map((line, j) => {
                return line.split('')
                    .map((height, i) => {
                        switch(height) {
                            case 'S':
                                this.start.x = i;
                                this.start.y = j;
                                this.nodes.push(this.start);
                                return this.start;
                            case 'E':
                                this.end.x = i;
                                this.end.y = j;
                                this.nodes.push(this.end);
                                return this.end;

                            default:
                                const node = {
                                    x: i,
                                    y: j,
                                    height: height.charCodeAt(0) - 96,
                                    visited: false,
                                    dist: Infinity,
                                };
                                this.nodes.push(node);
                                return node;
                        }
                    })
            })
    }

    distance(a: DNode, b: DNode) {
        const d1 = Math.abs(b.x - a.x);
        const d2 = Math.abs(b.y - a.y);
        return d1 + d2;
    }

    neighbors(node: DNode) {
        let result = [];
        const x = node.x;
        const y = node.y;

        if(this.map[x-1] && this.map[x-1][y] && !this.map[x-1][y].visited) {
            result.push(this.map[x-1][y]);
        }
        if(this.map[x+1] && this.map[x+1][y] && !this.map[x+1][y].visited) {
            result.push(this.map[x+1][y]);
        }
        if(this.map[x][y-1] && this.map[x][y-1] && !this.map[x][y-1].visited) {
            result.push(this.map[x][y-1]);
        }
        if(this.map[x][y+1] && this.map[x][y+1] && !this.map[x][y+1].visited) {
            result.push(this.map[x][y+1]);
        }
        return result;
    }

    solve() {

        const toVisit = [this.start];

        const bestPath = [];

        while(toVisit.length) {
            const current = toVisit.shift();
            current.visited = true;

            if(current == this.end) {

                while(current.parent)

                break;
            }

            const neighbors = this.neighbors(current);

            for(let i = 0; i < neighbors.length; i++) {
                neighbors[i].parent = current;
            }

            toVisit.push(...neighbors);
        }

    }
}

export default class Day12 extends Day {

    constructor() {
        super(2022, 12, 'Monkey in the Middle');
        this.setQuestion1('What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?')
        this.setQuestion2('What is the level of monkey business after 10000 rounds?')
    }

    async solve(): Promise<any> {
        const {formatted} = await this.getInput();

        return 0;
    }

    async test() {
        const input = 'Sabqponm\n' +
            'abcryxxl\n' +
            'accszExk\n' +
            'acctuvwj\n' +
            'abdefghi';

        const aStar = new AStar(input);

        const result = aStar.solve()

        return result;

    }

    async part1(): Promise<number> {
         return this.solve();
    }

    async part2(): Promise<number> {
        return this.solve();
    }
}

const s = new Day12();
s.test();