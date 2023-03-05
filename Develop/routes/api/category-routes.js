const router = require('express').Router();
const { Category, Product } = require('../../models');
const sequelize = require('../../config/connection');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories  
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    });
    return res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(404).json(err)
  }

});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    });

    if (!categoryId) {
      return res.status(404).json({ message: 'No category found' });
    }
    return res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  };
});


router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    return res.status(200).json(categoryData);
  } catch (err) {
    // if no category products
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.upddate(req.body, {
      where: {
        id: req.params.id,
      },
      individualhooks: true,
    });
    req.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// update a category by its `id` value



router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    req.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
