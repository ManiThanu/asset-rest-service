import Joi from 'joi';
import Bookshelf, { Model } from './bookshelf';

// Associated Models
import './assetType';
import './assetFormat';
import './storyMapping';

class Story extends Model {
  get tableName() {
    return 'stories';
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
    return this.hasMany('StoryMapping', 'asset_id');
  }

 /**
  * Field That Determines The Last Update From Bloomberg/Content-Service
  */
  get bbUpdatedAt() {
    return this.group_updated_at;
  }

  static findByFeedId(feed_id, options = {}) {
    const { StoryMapping } = this._bookshelf._models; // eslint-disable-line
    return this.where('id', 'IN', StoryMapping.query((qb) => {
      return qb.select('asset_id').where({ feed_id });
    }).query()).fetchAll(options);
  }
}

export default Bookshelf.model('Story', Story);
