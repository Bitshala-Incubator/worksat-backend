import 'reflect-metadata';

jest.mock('fs', () => {
    const originalModule = jest.requireActual('fs');
    return {
        ...originalModule,
        readFileSync: jest.fn(() => ''),
    };
});
