import Day from "../../common/day";

export default class Day07 extends Day {

    memory = 70000000;
    updateSize = 30000000;

    constructor() {
        super(2022, 7, 'No Space Left On Device');
        this.setQuestion1('Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?')
        this.setQuestion2('Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. What is the total size of that directory?')
    }

    async parseInput(): Promise<object> {
        const {formatted} = await this.getInput('$');

        const instructions = formatted.map(command => command.split('\n').filter(a => a).map(a => a.trim()));

        let currentPath = [];
        let structure = {};

        instructions.forEach(([command, ...results]) => {
            if(command === 'ls') {

                let currentDir = structure;
                currentPath.forEach(dir => currentDir = currentDir[dir]);
                results.forEach(result => {
                    const [dirOrSize, name] = result.split(' ');

                    if(dirOrSize === 'dir') {
                        currentDir[name] = {};
                    } else {
                        currentDir[name] = parseInt(dirOrSize);
                    }
                });

            } else {
                const [, dir] = command.split(' ');
                switch(dir) {
                    case '/':
                        currentPath = [];
                        break;
                    case '..':
                        currentPath.pop();
                        break;
                    default:
                        currentPath.push(dir);
                        break;
                }
            }
        });

        return structure;
    }

    async solve(input: object, min: number = 0, max: number = Infinity): Promise<number[]> {

        const [, folders] =  this.findFolders(input, [], min, max)

        return folders;
    }

    getSize(fs: object|number) {
        if(typeof fs === "number") {
            return fs;
        } else {
            return Object.values(fs).reduce((total, folderOrFile) => {
                return total + this.getSize(folderOrFile);
            }, 0);
        }
    }

    findFolders(fs: object|number, folderSizes: number[] = [], min: number = 0, max: number = Infinity): [number, number[]] {

        if (typeof fs === 'number') {
            return [fs, folderSizes];
        } else {
            const size = Object.values(fs).reduce((sum, folderOrFile) => {
                const [folderSize, newTotal] = this.findFolders(folderOrFile, folderSizes, min, max);
                folderSizes = newTotal;
                return sum + folderSize;
            }, 0);

            if(min <= size && size <= max) {
                folderSizes.push(size);
            }

            return [size, folderSizes];
        }
    }

    public async part1(): Promise<[number, object]> {
        const input = await this.parseInput();
        const folderSizes = await this.solve(input, 0, 100000);
        const result = folderSizes.reduce((a, b) => a + b, 0);
        return [result, input];
    }

    async part2(): Promise<[number, object]> {
        const input = await this.parseInput();

        const available = this.memory - this.getSize(input);
        const minimum = this.updateSize - available;

        const folderSizes = await this.solve(input, minimum);

        return [Math.min(...folderSizes), input];
    }

    print(fs: object|number, min: number = 0, max: number = Infinity, name: string = '/', result: string = '', level: number = 0): string {
        if(typeof fs === "number") {
            return `${Array(level).fill('  ').join('')} - ${name} (file, size=${fs})\n`;
        } else {

            const size = this.getSize(fs);

            if(size < 100000) {
                result = `${result}<em>${Array(level).fill('  ').join('')} - ${name} (dir, size=${size})</em>\n`;
            } else {
                result = `${result}${Array(level).fill('  ').join('')} - ${name} (dir, size=${size})\n`;
            }

            const folder = Object.entries(fs).reduce((sub, [name, folderOrFile]) => {
                const subFolder = this.print(folderOrFile, min, max, name, '', level + 1);
                return sub + subFolder;
            }, '');

            return result + folder;

        }
    }

}