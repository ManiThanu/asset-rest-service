import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'StoryMapping',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    feed_id: {
      type: GraphQLString,
      description: 'Common-Service Feed UUID',
    },
    story_id: {
      type: GraphQLInt,
    },
  }),
});
