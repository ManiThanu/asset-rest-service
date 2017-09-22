import Joi from 'joi';
import Bookshelf, { Model } from './bookshelf';

// Associated Models
import './image';
import './assetType';
import './assetFormat';

class ImageMapping extends Model {
  get tableName() {
    return 'image_mappings';
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

  image() {
    return this.belongsTo('Image', 'asset_id');
  }
}

export default Bookshelf.model('ImageMapping', ImageMapping);
