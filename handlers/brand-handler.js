const Brand = require('../db/brand');
const mongoose = require('mongoose');

async function getBrands(){
    let brands = await Brand.find();
    return brands.map(x => x.toObject());
}
async function getBrand(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID format");
    }

    let brand = await Brand.findById(id);
    if (!brand) {
        throw new Error("Brand not found");
    }

    return brand.toObject();
}

async function addBrand(model){
    let brand = new Brand({
        name: model.name,
    });
    await brand.save();
    return brand.toObject();
}

async function updateBrand(id, model){
    await Brand.findByIdAndUpdate(id, model);
    
}

async function deleteBrand(id){
    await Brand.findByIdAndDelete(id);
}
module.exports = { getBrands, getBrand, addBrand, updateBrand, deleteBrand };