const Product = require('../models/Product');

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product.author.equals(req.user._id)) {
        req.flash('error', 'You have not permission to do that!!')
        return res.redirect(`/product/show/${id}`)
    }
    next();
}