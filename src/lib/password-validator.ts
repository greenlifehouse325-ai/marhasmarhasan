/**
 * Password Validator Library
 * SMK Marhas Admin Dashboard
 * 
 * Utility untuk validasi password
 */

export interface PasswordValidationResult {
    isValid: boolean;
    errors: string[];
    strength: 'weak' | 'fair' | 'good' | 'strong' | 'very_strong';
    score: number;
}

export interface PasswordRules {
    minLength?: number;
    maxLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumber?: boolean;
    requireSymbol?: boolean;
    forbidCommonPasswords?: boolean;
}

const DEFAULT_RULES: PasswordRules = {
    minLength: 10,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSymbol: true,
    forbidCommonPasswords: true,
};

const COMMON_PASSWORDS = [
    'password', '123456', '12345678', 'qwerty', 'abc123',
    'password123', 'admin', 'letmein', 'welcome', 'monkey',
    'dragon', 'master', 'login', 'princess', 'sunshine',
];

export function validatePassword(
    password: string,
    rules: PasswordRules = DEFAULT_RULES
): PasswordValidationResult {
    const errors: string[] = [];
    let score = 0;

    // Merge with default rules
    const appliedRules = { ...DEFAULT_RULES, ...rules };

    // Check minimum length
    if (appliedRules.minLength && password.length < appliedRules.minLength) {
        errors.push(`Password harus minimal ${appliedRules.minLength} karakter`);
    } else {
        score += 20;
    }

    // Check maximum length
    if (appliedRules.maxLength && password.length > appliedRules.maxLength) {
        errors.push(`Password maksimal ${appliedRules.maxLength} karakter`);
    }

    // Check uppercase
    if (appliedRules.requireUppercase && !/[A-Z]/.test(password)) {
        errors.push('Password harus mengandung huruf besar');
    } else if (appliedRules.requireUppercase) {
        score += 20;
    }

    // Check lowercase
    if (appliedRules.requireLowercase && !/[a-z]/.test(password)) {
        errors.push('Password harus mengandung huruf kecil');
    } else if (appliedRules.requireLowercase) {
        score += 20;
    }

    // Check number
    if (appliedRules.requireNumber && !/[0-9]/.test(password)) {
        errors.push('Password harus mengandung angka');
    } else if (appliedRules.requireNumber) {
        score += 20;
    }

    // Check symbol
    if (appliedRules.requireSymbol && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password harus mengandung simbol');
    } else if (appliedRules.requireSymbol) {
        score += 20;
    }

    // Check common passwords
    if (appliedRules.forbidCommonPasswords) {
        const lowerPassword = password.toLowerCase();
        if (COMMON_PASSWORDS.some(common => lowerPassword.includes(common))) {
            errors.push('Password terlalu umum');
            score -= 20;
        }
    }

    // Determine strength
    let strength: PasswordValidationResult['strength'];
    if (score <= 20) strength = 'weak';
    else if (score <= 40) strength = 'fair';
    else if (score <= 60) strength = 'good';
    else if (score <= 80) strength = 'strong';
    else strength = 'very_strong';

    return {
        isValid: errors.length === 0,
        errors,
        strength,
        score: Math.max(0, Math.min(100, score)),
    };
}

export function generateStrongPassword(length: number = 16): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()';
    const all = uppercase + lowercase + numbers + symbols;

    let password = '';

    // Ensure at least one of each
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest
    for (let i = password.length; i < length; i++) {
        password += all[Math.floor(Math.random() * all.length)];
    }

    // Shuffle
    return password.split('').sort(() => Math.random() - 0.5).join('');
}
