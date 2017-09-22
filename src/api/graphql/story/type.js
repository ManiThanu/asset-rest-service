import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

// TODO: Abstract out/package custom scalars from common-service (e.g. DateTime)
//       once we finalize architecture/data-model

export default new GraphQLObjectType({
  name: 'Story',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    group_id: {
      type: GraphQLString,
      resolve: story => story.bb_id,
    },
    payload: {
      type: GraphQLString,
    },
    revision_id: {
      type: GraphQLString,
    },
    story_published_at: {
      type: GraphQLString,
    },
    story_updated_at: {
      type: GraphQLString,
    },
    group_published_at: {
      type: GraphQLString,
    },
    group_updated_at: {
      type: GraphQLString,
    },
  }),
});
