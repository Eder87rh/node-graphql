const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { authenticate } = require('./authentication');
const schema = require('./schema');

// 1
const connectMongo = require('./mongo-connector');

// 2
const start = async () => {
    // 3
    const mongo = await connectMongo();
    var app = express();

    const buildOptions = async (req, res) => {
        const user = await authenticate(req, mongo.Users);
        return {
            context: { mongo, user }, // This context object is passed to all resolvers.
            schema,
        };
    };
    app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));
    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
        passHeader: `'Authorization': 'bearer token-eder@e.com'`,
    }));

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Hackernews GraphQL server running on port ${PORT}.`)
    });
};

// 5
start();