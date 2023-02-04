const productModel = require('../models/Product')
const catchAsync = require('../utils/catchAsync')
class ProductController {
    static addProductDoc = catchAsync(async (req, res) => {
        const doc = new productModel(req.body);
        doc.author = req.user._id;
        console.log(doc)
        await doc.save();
        req.flash('success', 'Product added successfully!')
        res.redirect('/product/add')
    })

    static showProduct = catchAsync(async (req, res) => {
        const findUser = await productModel.find();
        res.render('product/showProduct', { title: "Show Product", data: findUser })
    })

    static showById = catchAsync(async (req, res) => {
        const productById = await productModel.findById(req.params.id).populate('author')
        if (!productById) {
            req.flash('error', 'Cannot find the product')
            return res.redirect('/product/show')
        }
        res.render('product/showById', { title: "Show Your Product", data: productById })

    })
    static editProduct = catchAsync(async (req, res) => {
        const productById = await productModel.findOne({ _id: `${req.params.id}` })
        if (!productById) {
            req.flash('error', 'Cannot find the product')
            return res.redirect('/product/show')
        }
        res.render('product/editProduct', { title: "Edit Product", data: productById })


    })
    static updateProduct = catchAsync(async (req, res) => {
        const productById = await productModel.findByIdAndUpdate({ _id: `${req.params.id}` }, req.body)
        await productById.save();
        req.flash('success', 'Product updated successfully!')
        res.redirect(`/product/show`)
    })

    static deleteProduct = catchAsync(async (req, res) => {
        await productModel.findByIdAndDelete({ _id: `${req.params.id}` })
        req.flash('success', 'Product deleted successfully!')
        res.redirect(`/product/show`)

    })
}

module.exports = ProductController