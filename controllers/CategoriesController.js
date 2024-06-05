import CategoriesModel from '../models/Categories.js'

export const addCategory = async (req, res) => {
  try {
    const doc = new CategoriesModel({
      name: req.body.name,
    })

    const category = await doc.save()

    res.status(200).json(category)
  } catch (e) {
    res.status(500).json({
      message: 'Can\'t add category',
      error: e
    })
  }
}

export const getCategories = async (req, res) => {
  try {
    const categories = await CategoriesModel.find().select('name -_id')

    const categoriesArray = categories.reduce((acc, item) => {
      acc.push(item.name)
      return acc
    }, [])

    res.status(200).json(categoriesArray)
  } catch (e) {
    res.status(500).json({
      message: 'Can\'t get categories'
    })
  }
}