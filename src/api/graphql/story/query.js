import { GraphQLString } from 'graphql';
import storyQuery        from '../query';
import type              from './type';

const defaultQuery = storyQuery(type);

export default {
  ...defaultQuery,

  args: {
    ...defaultQuery.args,
    feedId: {
      type: GraphQLString, // common-service uuid
    },
  },

  // Override Default Query
  async resolve(_, args, models, info) {
    const { feedId } = args;

    // Find Stories By Feed (core query of the service)
    if (feedId) {
      return (await models.story.findByFeedId(feedId)).toJSON();
    }

    return defaultQuery.resolve(_, args, models, info);
  },
};
