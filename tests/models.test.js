import assert       from 'assert';
import moment       from 'moment';
import AssetType    from '../src/models/assetType';
import AssetFormat  from '../src/models/assetFormat';
import Story        from '../src/models/story';
import Image        from '../src/models/image';
import StoryMapping from '../src/models/storyMapping';
import ImageMapping from '../src/models/imageMapping';

describe('DB Models', () => {
  before(async () => {
    global.storyType   = await AssetType.findOrCreate({ name: 'article' });
    global.imageType   = await AssetType.findOrCreate({ name: 'AAVM' });
    global.storyFormat = await AssetFormat.findOrCreate({ name: 'html' });
    global.imageFormat = await AssetFormat.findOrCreate({ name: 'jpg' });
  });

  describe('AssetTypes', () => {
    it('should find or create AssetType', async () => {
      const storyType2 = await AssetType.findOrCreate({ name: 'article' });
      const imageType2 = await AssetType.findOrCreate({ name: 'AAVM' });

      // Ensure 'Find-or-Create' Works & Doesn't Create Duplicates
      assert.equal(storyType.id, storyType2.id);
      assert.equal(imageType.id, imageType2.id);
    });

    it('should honor unique index on AssetType name', async () => {
      let duplicate;

      // Ensure Create Fails
      try {
        duplicate = await AssetType.create({ name: 'article' });
      } catch (e) {
        assert(e.message.match(/duplicate/i));
      }

      assert(!duplicate);
    });
  });

  describe('AssetFormats', () => {
    it('should find or create AssetFormat', async () => {
      const storyFormat2 = await AssetFormat.findOrCreate({ name: 'html' });
      const imageFormat2 = await AssetFormat.findOrCreate({ name: 'jpg' });

      // Ensure 'Find-or-Create' Works & Doesn't Create Duplicates
      assert.equal(storyFormat.id, storyFormat2.id);
      assert.equal(imageFormat.id, imageFormat2.id);
    });

    it('should honor unique index on AssetFormat name', async () => {
      let duplicate;

      // Ensure Create Fails
      try {
        duplicate = await AssetFormat.create({ name: 'html' });
      } catch (e) {
        assert(e.message.match(/duplicate/i));
      }

      assert(!duplicate);
    });
  });

  describe('Assets', () => {
    it('should update or create Asset', async () => {
      const story = await Story.upsert({
        asset_format_id: storyFormat.id,
        asset_type_id: storyType.id,
        bb_id: '1',
        group_updated_at: new Date(),
        group_published_at: new Date(moment.utc()),
        story_updated_at: moment.utc().toDate(),
        story_published_at: moment.utc().format('YYYY-MM-DD hh:mm:ss'),
        payload: 'test',
      });

      const image = await Image.upsert({
        asset_format_id: imageFormat.id,
        asset_type_id: imageType.id,
        bb_id: '2',
        payload: 'test',
      });

      // Ensure Assets
      assert(story.id);
      assert(image.id);

      // Ensure DateTime Fields Persist
      const updatedStory = (await Story.findById(story.id)).attributes;
      assert(moment.isDate(updatedStory.group_updated_at));
      assert(moment.isDate(updatedStory.group_published_at));
      assert(moment.isDate(updatedStory.story_updated_at));
      assert(moment.isDate(updatedStory.story_published_at));
    });

    it('should load associated AssetType and AssetFormat', async () => {
      const story = await Story.findOne({ bb_id: '1' }, {
        withRelated: ['assetFormat', 'assetType'],
      });
      const image = await Image.findOne({ bb_id: '2' }, {
        withRelated: ['assetFormat', 'assetType'],
      });

      // Ensure Story has AssetType & AssetFormat
      assert(story.relations.assetType.attributes.name);
      assert(story.relations.assetFormat.attributes.name);

      // Ensure Image has AssetType & AssetFormat
      assert(image.relations.assetType.attributes.name);
      assert(image.relations.assetFormat.attributes.name);
    });
  });

  describe('AssetMappings', () => {
    it('should update or create Mapping', async () => {
      const story = await Story.findOne();
      const image = await Image.findOne();
      const storyMapping = await StoryMapping.upsert({
        asset_format_id: storyFormat.id,
        asset_type_id: storyType.id,
        bb_id: '1',
        feed_id: '1',
        asset_id: story.id,
      });
      const imageMapping = await ImageMapping.upsert({
        asset_format_id: imageFormat.id,
        asset_type_id: imageType.id,
        bb_id: '2',
        feed_id: '2',
        asset_id: image.id,
      });

      // Ensure Mappings
      assert(storyMapping.id);
      assert(imageMapping.id);
    });

    it('should load associated Asset + AssetFormat & AssetType', async () => {
      const storyMapping = await StoryMapping.findOne({ id: 1 }, {
        withRelated: ['story', 'assetFormat', 'assetType'],
      });
      const imageMapping = await ImageMapping.findOne({ id: 1 }, {
        withRelated: ['image', 'assetFormat', 'assetType'],
      });

      // Ensure StoryMapping has Asset (Story) + AssetType & AssetFormat
      assert(storyMapping.relations.story.id);
      assert(storyMapping.relations.assetFormat.attributes.name);
      assert(storyMapping.relations.assetType.attributes.name);

      // Ensure ImageMapping has Asset (Image) + AssetType & AssetFormat
      assert(imageMapping.relations.image.id);
      assert(imageMapping.relations.assetFormat.attributes.name);
      assert(imageMapping.relations.assetType.attributes.name);
    });

    it('should be queryable via Asset', async () => {
      const story = await Story.findOne({ id: 1 }, { withRelated: ['mappings'] });
      const image = await Image.findOne({ id: 1 }, { withRelated: ['mappings'] });

      // Ensure Story has Mappings
      assert(story.relations.mappings.models.length >= 1);

      // Ensure Image has Mappings
      assert(image.relations.mappings.models.length >= 1);
    });
  });

  it('todo: remove', async () => {
    const obj = { part: { f1: 'F1', f2: 'F2', f3: 'F3' }, obj2: { a1: 'A1', a2: 'A2' } };
    const { obj2, part: { f1: cp1, f2: cp2, foo = [] } } = obj;

    console.log('f1/f2', cp1, cp2, foo);
    console.log('obj2', obj2);
  });
});
