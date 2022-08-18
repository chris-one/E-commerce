const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  //-- try to retrieve tags, Products data --//
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    //-- response a successful--//
    res.status(200).json(tagData);
  } catch (err) {
    //-- catches and returns error--//
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  //-- requesting one tag by id--//
  try {
    const idData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    //-- returns a message if id not found--//
    if (!idData) {
      res.status(404).json({ message: "No data found with this id" });
      return;
    }
    //--returns successful--//
    res.status(200).json(idData);
  } catch (err) {
    //-- returns a error --//
    res.status(500).json(err);
  }
});
// create a new tag
router.post('/', async (req, res) => {
   //-- creates a new tag --//
  try {
    const createTag = await Tag.create(req.body) 
    //--returns successful--//
    res.status(200).json(createTag)
  } catch (err) {
    //-- returns a error --//
    res.status(500).json(err);
  }
});
// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  //-- update tag data and request info --//
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    }); 
    //-- returns a message if not found--//
    if (!updateTag[0]){
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    //--returns successful--//
    res.status(200).json(updateTag);
  } catch (err) {
    //-- returns a error --//
    res.status(500).json(err);
  }
});
// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
//-- delete tag by id --//
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    //-- returns a message if not found--//
    if (!deleteTag) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    //--returns successful--//
    res.status(200).json(deleteTag);
  } catch (err) {
    //-- returns a error --//
    res.status(500).json(err);
  }
});

module.exports = router;
