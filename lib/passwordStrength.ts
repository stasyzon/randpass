/**
 * Password strength levels
 */
export enum PasswordStrength {
  VERY_WEAK = 0,
  WEAK = 1,
  FAIR = 2,
  STRONG = 3,
  VERY_STRONG = 4,
}

/**
 * Password strength result
 */
export interface PasswordStrengthResult {
  /** Strength level (0-4) */
  strength: PasswordStrength;
  /** Strength label key for translation */
  label: string;
  /** Percentage score (0-100) */
  score: number;
  /** Color for visual representation */
  color: string;
}

/**
 * Calculate password strength based on various criteria
 * @param password - The password to evaluate
 * @returns Password strength result
 */
export function calculatePasswordStrength(password: string): PasswordStrengthResult {
  if (!password) {
    return {
      strength: PasswordStrength.VERY_WEAK,
      label: 'veryWeak',
      score: 0,
      color: 'bg-red-500',
    };
  }

  let score = 0;
  const length = password.length;

  // Length-based scoring
  if (length >= 8) score += 20;
  if (length >= 12) score += 15;
  if (length >= 16) score += 10;
  if (length >= 20) score += 5;

  // Character variety scoring
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]/.test(password);

  if (hasLowercase) score += 10;
  if (hasUppercase) score += 10;
  if (hasNumbers) score += 10;
  if (hasSymbols) score += 15;

  // Bonus for using multiple character types
  const varietyCount = [hasLowercase, hasUppercase, hasNumbers, hasSymbols].filter(Boolean).length;
  if (varietyCount >= 3) score += 10;
  if (varietyCount === 4) score += 10;

  // Penalize patterns and repetition
  if (/(.)\1{2,}/.test(password)) score -= 10; // Repeated characters
  if (/012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password)) {
    score -= 10; // Sequential patterns
  }

  // Ensure score is within 0-100
  score = Math.max(0, Math.min(100, score));

  // Determine strength level
  let strength: PasswordStrength;
  let label: string;
  let color: string;

  if (score < 20) {
    strength = PasswordStrength.VERY_WEAK;
    label = 'veryWeak';
    color = 'bg-red-500';
  } else if (score < 40) {
    strength = PasswordStrength.WEAK;
    label = 'weak';
    color = 'bg-orange-500';
  } else if (score < 60) {
    strength = PasswordStrength.FAIR;
    label = 'fair';
    color = 'bg-yellow-500';
  } else if (score < 80) {
    strength = PasswordStrength.STRONG;
    label = 'strong';
    color = 'bg-lime-500';
  } else {
    strength = PasswordStrength.VERY_STRONG;
    label = 'veryStrong';
    color = 'bg-green-500';
  }

  return {
    strength,
    label,
    score,
    color,
  };
}
