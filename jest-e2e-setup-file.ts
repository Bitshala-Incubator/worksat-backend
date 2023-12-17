jest.mock('fs', () => {
    const originalModule = jest.requireActual('fs');
    return {
        ...originalModule,
        readFileSync: jest.fn((...args) => {
            try {
                return originalModule.readFileSync(...args);
            } catch (e) {
                if (e.message.includes('no such file or directory')) {
                    return '';
                }
                throw e;
            }
        }),
    };
});
