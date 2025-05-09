const express = require('express');
const { addBrand, updateBrand, deleteBrand, getBrand, getBrands } = require('../handlers/brand-handler');
const router = express.Router();

router.post("", async (req, res) => {
    console.log("here");
    let model = req.body;
    let result = await addBrand(model);
    res.send(result); 
});

router.put("/:id", async (req, res) => {
    let model = req.body;
    let id = req.params['id'];
    await updateBrand(id, model);
    res.send({message : "updated"});
});

router.delete("/:id", async (req, res) => {
    let id = req.params['id'];
    await deleteBrand(id);
    res.send({message : "deleted"});
});


router.get("/:id", async (req, res) => {
    try {
        let id = req.params['id'];
        let result = await getBrand(id);
        res.send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.get("", async (req, res) => {
    
    let brand = await getBrands();
    res.send(brand); 
});

module.exports = router;