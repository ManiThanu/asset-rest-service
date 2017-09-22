import Joi from 'joi';
import Bookshelf, { Model } from './bookshelf';

// Associated Models
import './assetType';
import './assetFormat';
import './imageMapping';

class Image extends Model {
  get tableName() {
    return 'images';
  }

  get validate() {
    return {
      bb_id: Joi.string(),
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

  mappings() {
    return this.hasMany('ImageMapping', 'asset_id');
  }

 /**
  * Field That Determines The Last Update From Bloomberg/Content-Service
  * @todo: Update with the proper field when we have all the data we need
  */
  get bbUpdatedAt() {
    return this.updated_at;
  }
}

export default Bookshelf.model('Image', Image);
