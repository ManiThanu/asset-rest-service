import { GraphQLObjectType, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'ImageMapping',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
  }),
});
