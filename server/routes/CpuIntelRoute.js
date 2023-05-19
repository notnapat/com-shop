const express = require("express");
const router = express.Router();
const fs = require("fs");
const md5 = require("md5");
const path = require("path");

const CpuIntelModel = require("../models/CpuIntelModel");

router.post("/intel", async (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No File Uploaded" });
    }

    const name = req.body.name;
    const content = req.body.content;
    const price = req.body.price;
    const file = req.files.file;

    const fileSize = file.data.length;
    const ext = path.extname(file.name);

    const fileName = md5(file + Date.now()) + ext;

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`; // เซฟโชว์ ใน db แค่นี้ไม่ต้องเหมือน พาท server
    const allowedType = [".png", ".jpg", "jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
        return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/cpu/cpu_intel/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await CpuIntelModel.create({  name: name, content: content, price: price, image: fileName, url: url });
            res.status(201).json({ msg: "Product Created Successfuly" });
        } catch (error) {
            console.log(error.message);
        }
    });
});

router.patch("/intel/:id", async (req, res) => {

    const cpuIntel = await CpuIntelModel.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!cpuIntel) return res.status(404).json({ msg: "No Data Found" });
    let fileName = "";
    let name = "";
    let content = "";
    let price = "";
    let url = "";
    if (req.files === null) {
        fileName = cpuIntel.image;
        name = cpuIntel.name;
        content = cpuIntel.content;
        price = cpuIntel.price;
        url = cpuIntel.url;
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

        const filepath = `./public/images/cpu/cpu_intel/${cpuIntel.image}`;
        fs.unlinkSync(filepath); 

        file.mv(`./public/images/cpu/cpu_intel/${fileName}`, (err) => {   
            if (err) return res.status(500).json({ msg: err.message });
        });
        url = `${req.protocol}://${req.get("host")}/images/cpu/cpu_intel/${fileName}`;
    }
     name = req.body.name;
     content = req.body.content;
     price = req.body.price;

    try {
        await cpuIntel.update(
            { name: name, content: content, price: price, image: fileName, url: url },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json({ msg: "cpuIntel Upddated Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
});

router.delete("/intel/:id", async (req, res) => {
    const cpuIntel = await CpuIntelModel.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!cpuIntel) return res.status(404).json({ msg: "No Data Found" });

    try {
        const filepath = `./public/images/cpu/cpu_intel/${cpuIntel.image}`;
        fs.unlinkSync(filepath);
        await cpuIntel.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "cpuIntel Deleted Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;