import { GraphQLList, GraphQLInt } from 'graphql';
import camelCase                   from 'lodash.camelcase';

export default function defaultQuery(type) {
  return {
    type: new GraphQLList(type),
    args: {
      id: { type: GraphQLInt },
    },
    async resolve(_, args, models, /* info */) {
      const { id, withRelated = [] } = args;
      const model = models[camelCase(type.name)];

      try {
        // Find By Id
        if (id) return [(await model.findById(id, { withRelated })).toJSON()];

        // Find All
        return (await model.findAll({}, { withRelated })).toJSON();
      } catch (error) {
        return [];
      }
    },
  };
}
