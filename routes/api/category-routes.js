const router = require("express").Router();
const { Category, Product, ProductTag } = require("../../models");

// The `/api/categories` endpoint
// router.use("/api", Category, Product);

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  //-- try to retrieve categories, Products and ids--//
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    //-- response a successful--//
    res.status(200).json(categoryData);
  } catch (err) {
      //-- catches and returns error--//
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
   //-- requesting one category by id--//
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    //-- returns a message if id not found--//
    if (!categoryData) {
      res.status(404).json({ message: "No data found with this id" });
      return;
    }
    //--returns successful--//
    res.status(200).json(categoryData);
  } catch (err) {
    //-- returns a error --//
    res.status(500).json(err);
  }
});
// create a new category
router.post("/", async (req, res) => {
  //-- creates a new category --//
  try {
    const createCategory = await Category.create(req.body) 
    //--returns successful--//
    res.status(200).json(createCategory)
  } catch (err) {
    //-- returns a error --//
    res.status(500).json(err);
  }
});
// update a category by its `id` value
router.put("/:id", async (req, res) => {
   //-- update category data  and request data --//
 try {
  const updateCategory = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }); 
    //-- returns a message if not found--//
  if (!updateCategory[0]){
    res.status(404).json({ message: "No category found with this id" });
    return;
  }
  //--returns successful--//
  res.status(200).json(updateCategory);
} catch (err) {
   //-- returns a error --//
  res.status(500).json(err);
}
});
// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
//-- delete category by id --//
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    //-- returns a message if not found--//
    if (!deleteCategory) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    //--returns successful--//
    res.status(200).json(deleteCategory);
  } catch (err) {
     //-- returns a error --//
    res.status(500).json(err);
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
