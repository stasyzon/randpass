/**
 * Password generation configuration options
 */
export interface PasswordOptions {
  /** Length of the password to generate */
  length?: number;
  /** Include numeric characters (0-9) */
  numbers?: boolean;
  /** Include special symbol characters */
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

/**
 * Password history entry
 */
export interface PasswordEntry {
  /** Timestamp when the password was generated */
  generateDate: Date;
  /** The generated password string */
  password: string;
}

/**
 * Password form schema values
 */
export interface PasswordFormValues {
  /** The currently generated password */
  generatedPassword?: string;
  /** Desired length of the password */
  passwordLength: number;
  /** Whether to include symbols in the password */
  isIncludeSymbols: boolean;
  /** Whether to include numbers in the password */
  isIncludeNumbers: boolean;
  /** Whether to include lowercase letters */
  isIncludeLowercase: boolean;
  /** Whether to include uppercase letters */
  isIncludeUppercase: boolean;
  /** Whether to exclude visually similar characters */
  excludeSimilar: boolean;
}

/**
 * Props for the CardWithSwitcher component
 */
export interface CardWithSwitcherProps {
  /** Label text to display */
  label: string;
  /** Whether the switch is checked */
  checked: boolean;
  /** Description text to display */
  description: string;
  /** Callback when the switch state changes */
  onCheckedChange: (checked: boolean) => void;
}

/**
 * Props for the PasswordInput component
 */
export interface PasswordInputProps {
  /** The password value to display */
  value?: string;
  /** Optional form instance for integration */
  form?: any; // Keep this as any for react-hook-form compatibility
  /** Optional submit handler */
  submit?: any; // Keep this as any for react-hook-form compatibility
}

/**
 * Props for the PasswordHistory component
 */
export interface PasswordHistoryProps {
  /** Array of password entries to display */
  data: PasswordEntry[];
}

/**
 * Props for the PasswordButton component (internal)
 */
export interface PasswordButtonProps {
  /** The password entry data */
  passwordData: PasswordEntry;
}
