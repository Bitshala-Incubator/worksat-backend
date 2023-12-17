import { ApiConfig } from '@app/configuration.model';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const getConfigFilePath = () => {
    switch (process.env.NODE_ENV) {
        case 'dev':
            return join(__dirname, '..', 'config', 'dev.config.yaml');
        default:
            return join(__dirname, '..', 'config', 'config.yaml');
    }
};

const camelToSnakeCase = (inputString) => {
    return inputString
        .split('.')
        .map((string) => {
            return string.replace(/[A-Z]/g, (letter) => `_${letter}`);
        })
        .join('_')
        .toUpperCase();
};

const mergeEnvVariablesRecursive = (
    config: Record<string, any>,
    envVarName = '',
) => {
    for (const key of Object.keys(config)) {
        const currentEnvVarName = envVarName
            ? `${envVarName}_${camelToSnakeCase(key)}`
            : key.toUpperCase();
        const currentEnvVarValue = process.env[currentEnvVarName];
        if (config[key] && typeof config[key] === 'object') {
            mergeEnvVariablesRecursive(config[key], currentEnvVarName);
        } else if (typeof currentEnvVarValue !== 'undefined') {
            try {
                config[key] = JSON.parse(currentEnvVarValue);
            } catch (error) {
                config[key] = currentEnvVarValue;
            }
        }
    }
};

function validate<T>(
    config: Record<string, unknown>,
    schema: ClassConstructor<T>,
) {
    const validatedConfig = plainToInstance(schema, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig as object, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return validatedConfig;
}

export default () => {
    const config = yaml.load(
        readFileSync(getConfigFilePath(), 'utf8'),
    ) as Record<string, any>;
    mergeEnvVariablesRecursive(config, 'WORKSAT');
    validate<ApiConfig>(config, ApiConfig);
    return config;
};
