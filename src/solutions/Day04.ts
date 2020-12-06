import {errorData, getInput, Solution} from "../common/getInput";

const isBetween = (value: number, min: number, max: number): boolean => value >= min && value <= max;

const isValidHeight = (height: string|void): boolean => {
    const infos = /([0-9]+)(cm|in)/.exec(height || '');

   if(infos?.length > 1) {
      if (infos[2] === 'cm') {
         return isBetween(parseInt(infos[1]), 150, 193);
      } else if (infos[2] === 'in') {
         return isBetween(parseInt(infos[1]), 59, 76);
      } else {
         return false;
      }
   } else {
      return false;
   }
}

const isValidHairColor = (color: string): boolean => /#[a-f0-9]{6}/.test(color);

const isValidEyeColor = (color: string): boolean => /amb|blu|brn|gry|grn|hzl|oth/.test(color);

const isValidPassportId = (id: string) => /[0-9]{9}/.test(id);

const parseInput = (input: string[]): any[] => {
    return input
       .map((line) => {
           return line
              .split(/[\n| ]/)
              .reduce((passport, data) => {
                  const [key, value] = data.split(':');
                  return {
                      ...passport,
                      [key]: value,
                  }
              }, {});
       });
};

const part1 = (passports: any[]): any => {
    return passports.filter(p => p.byr && p.iyr && p.eyr && p.hgt && p.hcl && p.ecl && p.pid);
};

const part2 = (passports: any[]): any => {
    return passports.filter(p => {

        return isBetween(parseInt(p.byr), 1920, 2002) &&
           isBetween(parseInt(p.iyr), 2010, 2020) &&
           isBetween(parseInt(p.eyr), 2020, 2030) &&
           isValidHeight(p.hgt) &&
           isValidHairColor(p.hcl) &&
           isValidEyeColor(p.ecl) &&
           isValidPassportId(p.pid);
    });
};

export default function(): Promise<Solution> {
    return getInput(4, '\n\n')
        .then(input => {
            const parsedInput = parseInput(input.formatted);
            const solution1 = part1(parsedInput);
            return {
                rawInput: input.raw,
                solution1: solution1.length,
                solution2: part2(solution1).length
            }
        })
        .catch(e => {
            console.warn(e);
            return errorData;
        })
}

