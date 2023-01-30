const productModel = require('../models/Product')
class ProductController {
    static addProductDoc = async (req, res) => {
        try {
            const doc = new productModel(req.body);
            console.log(doc)
            await doc.save();
            res.redirect('/product/add')
        } catch (error) {
            console.log(error)
            res.send('Error at addProductDoc')
        }
    }

    static showProduct = async (req, res) => {
        try {
            const findUser = await productModel.find();
            console.log(findUser)
            res.render('product/showProduct', { title: "Show Product", data: findUser })
        } catch (error) {
            console.log(error)
        }
    }

    static showById = async (req, res) => {
        try {
            const productById = await productModel.findOne({ _id: `${req.params.id}` })
            console.log(productById)
            res.render('product/showById', { title: "Show Your Product", data: productById })

        } catch (error) {
            console.log(error)
        }
    }
    static editProduct = async (req, res) => {
        try {
            const productById = await productModel.findOne({ _id: `${req.params.id}` })
            res.render('product/editProduct', { title: "Edit Product", data: productById })

        } catch (error) {
            console.log(error)
        }
    }
    static updateProduct = async (req, res) => {
        try {
            const productById = await productModel.findByIdAndUpdate({ _id: `${req.params.id}` }, req.body)
            await productById.save();
            res.redirect(`/product/show`)
        } catch (error) {
            console.log(error)
        }
    }
    static deleteProduct = async (req, res) => {
        console.log('deleteProduct triggeredd')
        try {
            const productById = await productModel.findByIdAndDelete({ _id: `${req.params.id}` })
            res.redirect(`/product/show`)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductController