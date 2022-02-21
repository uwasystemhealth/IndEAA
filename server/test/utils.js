const userGenerator = (properties) => ({
    googleId: '1234',
    email: 'test@example.com',
    ...properties,
});

const dropDatabase = (app) => {
    const mongooseClient = app.get('mongooseClient');
    return mongooseClient.connection.dropDatabase();
};

module.exports = {
    userGenerator,
    dropDatabase,
};
