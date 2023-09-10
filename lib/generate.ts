const RANDOM_BATCH_SIZE = 256;

let randomIndex: number | undefined;
let randomBytes = new Uint8Array(RANDOM_BATCH_SIZE);

function getRandomBytes(size: number): Uint8Array {
  const array = new Uint8Array(size);
  window.crypto.getRandomValues(array);
  return array;
}

const getNextRandomValue = (): number => {
  if (randomIndex === undefined || randomIndex >= randomBytes.length) {
    randomIndex = 0;
    randomBytes = getRandomBytes(RANDOM_BATCH_SIZE);
  }

  const result = randomBytes[randomIndex];
  randomIndex += 1;

  return result;
};

const randomNumber = (max: number): number => {
  let rand = getNextRandomValue();
  while (rand >= 256 - (256 % max)) {
    rand = getNextRandomValue();
  }
  return rand % max;
};

const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~';
const similarCharacters = /[ilLI|`oO0]/g;
const strictRules = [
  { name: 'lowercase', rule: /[a-z]/ },
  { name: 'uppercase', rule: /[A-Z]/ },
  { name: 'numbers', rule: /[0-9]/ },
  { name: 'symbols', rule: /[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]/ }
];

interface Options {
  length?: number;
  numbers?: boolean;
  symbols?: boolean | string;
  exclude?: string;
  uppercase?: boolean;
  lowercase?: boolean;
  excludeSimilarCharacters?: boolean;
  strict?: boolean;
  [index: string]: any;
}

const generate = (options: Options, pool: string): string => {
  let password = '';
  const optionsLength = options.length || 0;
  const poolLength = pool.length;

  for (let i = 0; i < optionsLength; i++) {
    password += pool[randomNumber(poolLength)];
  }

  if (options.strict) {
    const fitsRules = strictRules.every((rule) => {
      if (!options[rule.name]) return true;

      if (rule.name === 'symbols' && typeof options[rule.name] === 'string') {
        const re = new RegExp('[' + options[rule.name] + ']');
        return re.test(password);
      }

      return rule.rule.test(password);
    });

    if (!fitsRules) return generate(options, pool);
  }

  return password;
};

export const generatePassword = (options?: Options): string => {
  options = options || {};
  if (!Object.prototype.hasOwnProperty.call(options, 'length')) options.length = 10;
  if (!Object.prototype.hasOwnProperty.call(options, 'numbers')) options.numbers = false;
  if (!Object.prototype.hasOwnProperty.call(options, 'symbols')) options.symbols = false;
  if (!Object.prototype.hasOwnProperty.call(options, 'exclude')) options.exclude = '';
  if (!Object.prototype.hasOwnProperty.call(options, 'uppercase')) options.uppercase = true;
  if (!Object.prototype.hasOwnProperty.call(options, 'lowercase')) options.lowercase = true;
  if (!Object.prototype.hasOwnProperty.call(options, 'excludeSimilarCharacters')) options.excludeSimilarCharacters = false;
  if (!Object.prototype.hasOwnProperty.call(options, 'strict')) options.strict = false;

  if (options.strict) {
    const minStrictLength = 1 + (options.numbers ? 1 : 0) + (options.symbols ? 1 : 0) + (options.uppercase ? 1 : 0);
    if (minStrictLength > options.length!) {
      throw new TypeError('Length must correlate with strict guidelines');
    }
  }

  let pool = '';

  if (options.lowercase) {
    pool += lowercase;
  }

  if (options.uppercase) {
    pool += uppercase;
  }

  if (options.numbers) {
    pool += numbers;
  }

  if (options.symbols) {
    if (typeof options.symbols === 'string') {
      pool += options.symbols;
    } else {
      pool += symbols;
    }
  }

  if (!pool) {
    throw new TypeError('At least one rule for pools must be true');
  }

  if (options.excludeSimilarCharacters) {
    pool = pool.replace(similarCharacters, '');
  }

  let i = options.exclude?.length || 0;
  while (i--) {
    pool = pool.replace(options.exclude![i], '');
  }

  return generate(options, pool);
};

export const generateMultiple = (amount: number, options?: Options): string[] => {
  const passwords: string[] = [];

  for (let i = 0; i < amount; i++) {
    passwords[i] = generatePassword(options);
  }

  return passwords;
};
