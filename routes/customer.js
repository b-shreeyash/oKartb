const express = require('express');
const { getNewProducts, getFeaturedProducts, getProductForListing, getProduct } = require('../handlers/product-handler');
const { getCategories } = require('../handlers/category-handler');
const { getBrands } = require('../handlers/brand-handler');
const { get } = require('mongoose');
const router = express.Router();

router.get("/new-products", async (req, res) => {
    const products = await getNewProducts();
    res.send(products);
});
router.get("/featured-products", async (req, res) => {
    const products = await getFeaturedProducts();
    res.send(products);
});

router.get("/categories", async (req, res) => {
    const categories = await getCategories();
    res.send(categories);
});

router.get("/brands", async (req, res) => {
    const brands = await getBrands();
    res.send(brands);
});

router.get("/products", async (req, res) => {
    const { searchTerm, categoryId, sortBy, sortOrder, brandId,pageSize,page } = req.query;
    const products = await getProductForListing(searchTerm, categoryId,page,pageSize, sortBy, sortOrder, brandId);
    res.send(products);
});

router.get("/product/:id",async(req,res)=>{
    const id = req.params["id"];
    const product = await getProduct(id);
    res.send(product);
})


module.exports = router;