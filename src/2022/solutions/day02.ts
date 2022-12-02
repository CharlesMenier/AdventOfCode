import {errorData, Solution} from "../../common/getInput";
import {getInput} from "../utils";

interface Strategy {
    opponent: number,
    me: number,
    expected: number
}

const ROCK = 1;
const PAPER = 2;
const SCISSOR = 3;

const WIN = 6;
const LOSS = 0;
const DRAW = 3;

const SYMBOL_VALUE = {
    'X': ROCK, // rock         0 / -1 L / -2 W
    'Y': PAPER, // paper        1 W / 0 / 1 L
    'Z': SCISSOR, // scissor      2 L / 1 W / 0
    'A': ROCK, // rock
    'B': PAPER, // paper
    'C': SCISSOR, // scissors
}

const EXPECTED_RESULT = {
    'X': LOSS,
    'Y': DRAW,
    'Z': WIN,
}

const parseInput = (input: string[]): Strategy[] => input.map(a => {
    const [opponent, me] = a.split(' ');
    return {
        opponent: SYMBOL_VALUE[opponent],
        me: SYMBOL_VALUE[me],
        expected: EXPECTED_RESULT[me],
    }
});

const getStrategyResult = (strategy: Strategy) => {
    if(strategy.me === strategy.opponent) {
        return DRAW;
    } else if(strategy.opponent === ROCK) {
        return strategy.me === PAPER ? WIN : LOSS;
    } else if(strategy.opponent === PAPER) {
        return strategy.me === SCISSOR ? WIN : LOSS;
    } else if(strategy.opponent === SCISSOR) {
        return strategy.me === ROCK ? WIN : LOSS;
    }
}

const part1 = (input: Strategy[]) => {
    return input
        .reduce((score: number, strategy) => {
            return score + strategy.me + getStrategyResult(strategy);
        }, 0);
};

const getWinningSymbol = (symbol: number): number => {
    switch(symbol) {
        case ROCK: return PAPER;
        case PAPER: return SCISSOR;
        case SCISSOR: return ROCK;
    }
}

const getLosingSymbol = (symbol: number): number => {
    switch(symbol) {
        case ROCK: return SCISSOR;
        case PAPER: return ROCK;
        case SCISSOR: return PAPER;
    }
}

const getSecondStrategyResult = (strategy: Strategy) => {
    switch(strategy.expected) {
        case DRAW:
            return DRAW + strategy.opponent;
        case WIN:
            return WIN + getWinningSymbol(strategy.opponent);
        case LOSS:
            return LOSS + getLosingSymbol(strategy.opponent);
    }
}

const part2 = (input: Strategy[]) => {
    return input
        .reduce((score: number, strategy) => {
            return score + getSecondStrategyResult(strategy);
        }, 0);
};

export default function(): Promise<Solution> {
    return getInput(2)
        .then(input => {
            const parsedInput = parseInput(input.formatted);
            const solution1 = part1(parsedInput);
            const solution2 = part2(parsedInput);
            return {
                rawInput: input.raw,
                solution1Input: solution1,
                solution2Input: solution2,
                solution1,
                solution2,
            };
        })
        .catch(e => {
            console.warn(e);
            return errorData;
        })
}

