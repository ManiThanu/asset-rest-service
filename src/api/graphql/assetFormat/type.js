import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'AssetFormat',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
  }),
});
