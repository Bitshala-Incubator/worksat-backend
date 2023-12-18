export const BigIntTransformer = {
    to: (entityValue: number) => entityValue,
    from: (databaseValue: string | null): number | null =>
        databaseValue === null ? null : Number.parseInt(databaseValue),
};
