const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const BrandModel = require("../models/BrandModel");

router.post("/", async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ msg: "No file uploaded" });
        }

        const { name } = req.body;
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const allowedTypes = [".png", ".jpg", ".jpeg"];

        if (!allowedTypes.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: "Invalid image format" });
        }

        if (fileSize > 5000000) {
            return res.status(422).json({ msg: "Image must be less than 5 MB" });
        }

        const fileName = `brand-${Date.now()}${ext}`;
        const filePath = `./public/images/brand/${fileName}`;
        const fileUrl = `${req.protocol}://${req.get("host")}/images/brand/${fileName}`;

        file.mv(filePath, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: "Error uploading image" });
            }

            const hashedFileName = await bcrypt.hash(fileName, 10);

            const brand = await BrandModel.create({
                name,
                image: hashedFileName,
                url: fileUrl,
            });

            return res.status(201).json({ brand, msg: "Product created successfully" });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;
