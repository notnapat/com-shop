const express = require("express");
const router = express.Router();
const fs = require("fs");
// const bcrypt = require("bcrypt");
const md5 = require("md5")
const path = require("path")

const BrandModel = require("../models/BrandModel");

router.post("/", async (req, res) => {
    if (req.files === null){
        return res.status(400).json({ msg: "No File Uploaded" })}
        
    
    const name = req.body.name;
    const file = req.files.file;
    // const file = req.body.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    // const now = new Date();
    // const fileName = file.md5 + "-" + now.getTime() + ext;
    const fileName = md5(file + Date.now()) + ext;
    // const fileName = file + Date.now() + ext;

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", "jpeg"]

    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
        return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/brand/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            // bcrypt.hash(fileName, 10);
            await BrandModel.create({ name: name, image: fileName, url: url });
            res.status(201).json({ msg: "Product Created Successfuly" });
        } catch (error) {
            console.log(error.message);
        }
    });
});


router.patch("/:id", async (req, res) => {
    // const brand = req.params.id;
    // await BrandModel.findOne({
    //     // where: {
    //     //     id: req.params.id,
    //     // },
    //     where: {
    //         id: brand,
    //     },
    // });

    const brand = await BrandModel.findOne({
        where: {
            id: req.params.id,
        },
        // where: {
        //     id: brand,
        // },
    });
    if (!brand) return res.status(404).json({ msg: "No Data Found" });
    let fileName = "";
    let url = "";
    if (req.files === null) {
        fileName = brand.image;
        url = brand.url;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        // const now = new Date();
        // fileName = file.md5 + "-" + now.getTime() + ext;
        // fileName = file.md5 + "-" + Date.now() + ext;
        fileName = md5(file + Date.now()) + ext;

        // const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        const allowedType = [".png", "jpg", "jpeg"];

        if (!allowedType.includes(ext.toLowerCase()))
            return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000)
            return res
                .status(422)
                .json({ msg: "Image must be less than 5 MB" });

        const filepath = `./public/images/brand/${brand.image}`;
        fs.unlinkSync(filepath); // ลบไฟล์รูปใน server ออก

        file.mv(`./public/images/brand/${fileName}`, (err) => {    // สร้างไฟล์รูปใน server
            if (err) return res.status(500).json({ msg: err.message });
        });
        url = `${req.protocol}://${req.get("host")}/images/brand/${fileName}`;
    }
    const name = req.body.name;

    try {
        await brand.update(
            { name: name, image: fileName, url: url },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json({ msg: "Brand Upddated Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    const brand = await BrandModel.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!brand) return res.status(404).json({ msg: "No Data Found" });

    try {
        const filepath = `./public/images/brand/${brand.image}`;
        fs.unlinkSync(filepath);
        await brand.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Brand Deleted Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;



