import express     from 'express';
import graphqlHTTP from 'express-graphql';
import schema      from './graphql/schema';
import context     from '../models';

const app = express();

function graphqlController(graphiql = false) {
  return graphqlHTTP({
    schema,
    context,
    graphiql,
  });
}

if (JSON.parse(process.env.GRAPHIQL || false)) app.use('/graphiql', graphqlController(true));
app.use(graphqlController());

app.listen(process.env.PORT || 8085);
