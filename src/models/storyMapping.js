import Joi from 'joi';
import Bookshelf, { Model } from './bookshelf';

// Associated Models
import './story';
import './assetType';
import './assetFormat';

class StoryMapping extends Model {
  get tableName() {
    return 'story_mappings';
  }

  get validate() {
    return {
      asset_id: Joi.number().integer().required(),
      feed_id: Joi.string().required(),
      asset_type_id: Joi.number().integer().required(),
      asset_format_id: Joi.number().integer().required(),
    };
  }

  assetType() {
    return this.belongsTo('AssetType');
  }

  assetFormat() {
    return this.belongsTo('AssetFormat');
  }

  story() {
    return this.belongsTo('Story', 'asset_id');
  }
}

export default Bookshelf.model('StoryMapping', StoryMapping);
