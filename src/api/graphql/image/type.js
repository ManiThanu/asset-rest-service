import { GraphQLObjectType, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
  }),
});
