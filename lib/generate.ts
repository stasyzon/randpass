import {
  RANDOM_BATCH_SIZE,
  LOWERCASE_CHARS,
  UPPERCASE_CHARS,
  NUMBER_CHARS,
  SYMBOL_CHARS,
  SIMILAR_CHARS_PATTERN,
} from './constants';

let randomIndex: number | undefined;
let randomBytes = new Uint8Array(RANDOM_BATCH_SIZE);

function getRandomBytes(size: number) {
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

const strictRules = [
  { name: 'lowercase', rule: /[a-z]/ },
  { name: 'uppercase', rule: /[A-Z]/ },
  { name: 'numbers', rule: /[0-9]/ },
  { name: 'symbols', rule: /[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]/ }
];

/**
 * Password generation configuration options
 */
export interface PasswordOptions {
  /** Length of the password to generate */
  length?: number;
  /** Include numeric characters (0-9) */
  numbers?: boolean;
  /** Include special symbol characters or custom symbols */
  symbols?: boolean | string;
  /** Characters to exclude from generation */
  exclude?: string;
  /** Include uppercase letters (A-Z) */
  uppercase?: boolean;
  /** Include lowercase letters (a-z) */
  lowercase?: boolean;
  /** Exclude visually similar characters (i, l, 1, L, o, 0, O) */
  excludeSimilarCharacters?: boolean;
  /** Enforce strict mode - ensure at least one character from each enabled category */
  strict?: boolean;
}

const generate = (options: PasswordOptions, pool: string): string => {
  let password = '';
  const optionsLength = options.length || 0;
  const poolLength = pool.length;

  for (let i = 0; i < optionsLength; i++) {
    password += pool[randomNumber(poolLength)];
  }

  if (options.strict) {
    const fitsRules = strictRules.every((rule) => {
      const optionValue = options[rule.name as keyof PasswordOptions];
      if (!optionValue) return true;

      if (rule.name === 'symbols' && typeof optionValue === 'string') {
        const re = new RegExp('[' + optionValue + ']');
        return re.test(password);
      }

      return rule.rule.test(password);
    });

    if (!fitsRules) return generate(options, pool);
  }

  return password;
};

/**
 * Generates a cryptographically secure random password
 * @param options - Configuration options for password generation
 * @returns Generated password string
 * @throws {TypeError} If strict mode requirements cannot be met with given length
 * @throws {TypeError} If no character pools are enabled
 */
export const generatePassword = (options?: PasswordOptions): string => {
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
    pool += LOWERCASE_CHARS;
  }

  if (options.uppercase) {
    pool += UPPERCASE_CHARS;
  }

  if (options.numbers) {
    pool += NUMBER_CHARS;
  }

  if (options.symbols) {
    if (typeof options.symbols === 'string') {
      pool += options.symbols;
    } else {
      pool += SYMBOL_CHARS;
    }
  }

  if (!pool) {
    throw new TypeError('At least one rule for pools must be true');
  }

  if (options.excludeSimilarCharacters) {
    pool = pool.replace(SIMILAR_CHARS_PATTERN, '');
  }

  let i = options.exclude?.length || 0;
  while (i--) {
    pool = pool.replace(options.exclude![i], '');
  }

  return generate(options, pool);
};
