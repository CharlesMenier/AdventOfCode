import Day from "../../common/day";

export default class Day07 extends Day {

    constructor() {
        super(2022, 7, 'No Space Left On Device');
        this.setQuestion1('Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?')
        this.setQuestion2('How many characters need to be processed before the first start-of-message marker is detected?')
    }

    async solve(): Promise<object> {
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

    getSize(fs: object|number) {
        if(typeof fs === "number") {
            return fs;
        } else {
            return Object.values(fs).reduce((total, folderOrFile) => {
                return total + this.getSize(folderOrFile);
            }, 0);
        }
    }

    findFolders(fs: object|number, total: number = 0): [number, number] {

        if (typeof fs === 'number') {
            return [fs, total];
        } else {
            const size = Object.values(fs).reduce((sum, folderOrFile) => {
                const [folderSize, newTotal] =  this.findFolders(folderOrFile, total);
                total = newTotal;
                return sum + folderSize;
            }, 0);

            if(size <= 100000) {
                total = total + size;
            }

            return [size, total];
        }
    }



    print(fs: object|number, name: string = '/', result: string = '', level: number = 0): string {
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
                const subFolder = this.print(folderOrFile, name, '', level + 1);
                return sub + subFolder;
            }, '');

            return result + folder;

        }
    }

    public async part1(): Promise<[number, object]> {
         const structure = await this.solve();
         const [, result] = this.findFolders(structure);

         return [result, structure];
    }

    async part2(): Promise<number> {
        return 0;
    }
}