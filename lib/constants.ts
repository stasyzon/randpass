/**
 * Application-wide constants
 */

// UI Feedback Durations (in milliseconds)
export const COPY_FEEDBACK_DURATION = 2000;
export const SPIN_ANIMATION_DURATION = 1000;

// Password Generation Defaults
export const DEFAULT_PASSWORD_LENGTH = 8;
export const MIN_PASSWORD_LENGTH = 4;
export const MAX_PASSWORD_LENGTH = 24;

// Character Sets
export const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
export const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const NUMBER_CHARS = '0123456789';
export const SYMBOL_CHARS = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~';
export const SIMILAR_CHARS_PATTERN = /[ilLI|`oO0]/g;

// Cryptographic
export const RANDOM_BATCH_SIZE = 256;

// Locales
export const SUPPORTED_LOCALES = ['en', 'uk', 'es'] as const;
export const DEFAULT_LOCALE = 'en';
