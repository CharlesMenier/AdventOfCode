import Day from "../../common/day";
import {uniqBy} from 'lodash';

class CPU {
    value: number;
    cycle: number;

    pendingInstructions: Instruction[];
    pendingInstruction: Instruction;
    cycleValues: number[];

    crt: string[];

    constructor() {
        this.value = 1;
        this.cycle = 0;
        this.pendingInstructions = [];
        this.cycleValues = [];
        this.crt = [];
    }

    execute(program: string[]) {
        const instructions = program.map(line => {
            const [instruction, strValue] = line.split(' ')
            const value = parseInt(strValue);

            if(instruction === 'noop') {
                return new Noop();
            }

            if(instruction === 'addx') {
                return new AddX(value);
            }

            return null;
        });

        while(instructions.length || this.pendingInstruction) {

            const position = this.cycle % 40;

            if(this.value - 1 <= position && position <= this.value + 1) {
                this.crt.push('#')
            } else {
                this.crt.push('.');
            }

            this.cycle++;
            this.cycleValues.push(this.value);

            if(instructions.length && !this.pendingInstruction) {
                this.pendingInstruction = instructions.shift();
            }

            const instructionValue = this.pendingInstruction.process();
            this.value = this.value + instructionValue;


            if(this.pendingInstruction.durationLeft === 0) {
                this.pendingInstruction = null;
            }
        }
    }
}

abstract class Instruction {
    duration: number
    durationLeft: number;

    constructor(duration: number) {
        this.duration = duration;
        this.durationLeft = duration;
    }

    abstract execute();

    process(): number {
        this.durationLeft--;

        if(this.durationLeft === 0) {
            return this.execute();
        }

        return 0;
    }
}

class Noop extends Instruction {
    constructor() {
        super(1);
    }

    execute(): number {
        return 0;
    }
}

class AddX extends Instruction {

    value: number;

    constructor(value: number) {
        super(2);
        this.value = value;
    }

    execute(): number {
        return this.value;
    }
}

export default class Day10 extends Day {

    constructor() {
        super(2022, 10, 'Cathode-Ray Tube');
        this.setQuestion1('What is the sum of these six signal strengths?')
        this.setQuestion2('What eight capital letters appear on your CRT?')
    }

    async solve(): Promise<any> {
        const {formatted} = await this.getInput();

        const cpu = new CPU();

        cpu.execute(formatted);

        return cpu;

    }

    async part1(): Promise<number> {
         const cpu = await this.solve();

         return [20, 60, 100, 140, 180, 220]
             .reduce((signal, cycleValue) => signal + cycleValue * cpu.cycleValues[cycleValue - 1], 0);
    }

    async part2(): Promise<string> {
        const cpu = await this.solve();

        return cpu.crt.join('').match(/.{1,40}/g).join('\n');
    }
}