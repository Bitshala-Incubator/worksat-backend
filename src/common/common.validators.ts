import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationOptions, registerDecorator } from 'class-validator';

const SPECIAL_CHARACTERS = [
    '^',
    '$',
    '*',
    '.',
    '[',
    ']',
    '{',
    '}',
    '(',
    ')',
    '?',
    '-',
    '"',
    '!',
    '@',
    '#',
    '%',
    '&',
    '/',
    '\\',
    ',',
    '>',
    '<',
    "'",
    ':',
    ';',
    '|',
    '_',
    '~',
    '`',
    '+',
    '=',
];

export function IsValidPassword(validationOptions?: ValidationOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidPassword',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: {
                ...validationOptions,
                message:
                    validationOptions?.message ??
                    'Password should be at least 10 characters long and contain a number, a lowercase letter, an uppercase letter and a special character.',
            },
            validator: {
                validate(value: any) {
                    if (typeof value !== 'string') {
                        return false;
                    }

                    const password = value;

                    const passwordRequirements: Record<string, boolean> = {
                        containsNumber: false,
                        containsLowercaseLetter: false,
                        containsUppercaseLetter: false,
                        containsSpecialChar: false,
                    };

                    for (const character of password) {
                        if (
                            !passwordRequirements.containsUppercaseLetter &&
                            /[A-Z]/.test(character)
                        ) {
                            passwordRequirements.containsUppercaseLetter = true;
                        }

                        if (
                            !passwordRequirements.containsLowercaseLetter &&
                            /[a-z]/.test(character)
                        ) {
                            passwordRequirements.containsLowercaseLetter = true;
                        }

                        if (
                            !passwordRequirements.containsNumber &&
                            /[0-9]/.test(character)
                        ) {
                            passwordRequirements.containsNumber = true;
                        }

                        if (
                            !passwordRequirements.containsSpecialChar &&
                            SPECIAL_CHARACTERS.includes(character)
                        ) {
                            passwordRequirements.containsSpecialChar = true;
                        }
                    }

                    return (
                        password.length >= 10 &&
                        Object.values(passwordRequirements).every((r) => r)
                    );
                },
            },
        });
    };
}

export function IsTimestamp(validationOptions?: ValidationOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isTimestamp',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: {
                ...validationOptions,
                message:
                    validationOptions?.message ??
                    `'${propertyName}' should be a valid timestamp.`,
            },
            validator: {
                validate(value: any) {
                    if (typeof value !== 'string') {
                        return false;
                    }

                    const milliseconds = parseInt(value, 10);

                    if (
                        Number.isNaN(milliseconds) ||
                        milliseconds < 0 ||
                        milliseconds > Date.now()
                    ) {
                        return false;
                    }

                    return true;
                },
            },
        });
    };
}

export const fileFilter = (
    req: Express.Request,
    file,
    callback: (error: Error | null, acceptFile: boolean) => void,
    allowedType: RegExp,
) => {
    if (!allowedType.test(file.mimetype))
        return callback(
            new HttpException(
                `${file.fieldname} is not a valid document type.`,
                HttpStatus.UNPROCESSABLE_ENTITY,
            ),
            false,
        );

    return callback(null, true);
};
