import Joi from 'joi';
import Bookshelf, { Model } from './bookshelf';

// Associated Models
import './story';
import './image';

class AssetFormat extends Model {
  get tableName() {
    return 'asset_formats';
  }

  get validate() {
    return {
      name: Joi.string().required(),
    };
  }

  stories() {
    return this.hasMany('Story');
  }

  images() {
    return this.hasMany('Image');
  }
}

export default Bookshelf.model('AssetFormat', AssetFormat);
