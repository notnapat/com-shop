const express = require("express");
const router = express.Router();
const fs = require("fs");
const md5 = require("md5");
const path = require("path");

const MainBoardModel = require("../models/MainBoardModel");

router.post("/", async (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No File Uploaded" });
    }

    const name = req.body.name;
    const content = req.body.content
    const price = req.body.price
    const file = req.files.file;

    const fileSize = file.data.length;
    const ext = path.extname(file.name);

    const fileName = md5(file + Date.now()) + ext;

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", "jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
        return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/mainboard/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await MainBoardModel.create({ name: name, content: content, price: price, image: fileName, url: url });
            res.status(201).json({ msg: "Product Created Successfuly" });
        } catch (error) {
            console.log(error.message);
        }
    });
});

router.patch("/:id", async (req, res) => {

    const mainBoard = await MainBoardModel.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!mainBoard) return res.status(404).json({ msg: "No Data Found" });
    let fileName = "";
    let name = "";
    let content = "";
    let price = "";
    let url = "";
    if (req.files === null) {
        fileName = mainBoard.image;
        name = mainBoard.name;
        content = mainBoard.content;
        price = mainBoard.price;
        url = mainBoard.url;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = md5(file + Date.now()) + ext;
        const allowedType = [".png", "jpg", "jpeg"];

        if (!allowedType.includes(ext.toLowerCase()))
            return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000)
            return res
                .status(422)
                .json({ msg: "Image must be less than 5 MB" });

        const filepath = `./public/images/mainboard/${mainBoard.image}`;
        fs.unlinkSync(filepath); 

        file.mv(`./public/images/mainboard/${fileName}`, (err) => {   
            if (err) return res.status(500).json({ msg: err.message });
        });
        url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    }
     name = req.body.name;
     content = req.body.content;
     price = req.body.price;

    try {
        await mainBoard.update(
            { name: name, content: content, price: price, image: fileName, url: url },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json({ msg: "mainBoard Upddated Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    const mainBoard = await MainBoardModel.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!mainBoard) return res.status(404).json({ msg: "No Data Found" });

    try {
        const filepath = `./public/images/mainboard/${mainBoard.image}`;
        fs.unlinkSync(filepath);
        await mainBoard.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "mainBoard Deleted Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
})


module.exports = router;