const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint
router.use('/api', Category, Product);

router.get('/',  async (req, res) => {
  // find all categories
  // be sure to include its associated Products
try {
  const categoryData = await Category.findall({
    include: [{ model: Product }, { model: ProductTag }],
  });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }, { model: ProductTag }],
    });

    if (!categoryData) {
    res.status(404).json({ message: " No data found with this id"});
    return;
  } 

    res.status(200).json(categoryData);
 } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryLocation = await Category.create({
      category_id: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
     res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try { 
    const updateCategory = await Category.update(req.body, {
      where: {
        category_id: req.params.id,
      },
    });
    if (!updateCategory[0]) {
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }
    res.status(200).json(updateCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});









//   Category.update(
//     {
//         category_name: req.body.category_name
//     },
//     { 
//       where: {
//         category_id: req.params.category_id,
//       }
//     }
//   )
// });

module.exports = router;
