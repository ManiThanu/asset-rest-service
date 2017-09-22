import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import assetFormat  from './assetFormat/query';
import assetType    from './assetType/query';
import image        from './image/query';
import imageMapping from './imageMapping/query';
import story        from './story/query';
import storyMapping from './storyMapping/query';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      assetFormat,
      assetType,
      image,
      imageMapping,
      story,
      storyMapping,
    }),
  }),
  // mutation: ...
});
