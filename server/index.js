const express = require("express");
const app = express();
const cors = require("cors");
const FileUpload = require("express-fileupload")
// const db = require("./config")

app.use(express.json());
app.use(cors());
app.use(FileUpload())

const barndRouter = require("./routes/BrandRoute");
app.use("/product/brand", barndRouter);

// CPU
const cpuAmdRouter = require("./routes/CpuAmdRoute");
const cpuIntelRouter = require("./routes/CpuIntelRoute");
app.use("/product/cpu",cpuAmdRouter, cpuIntelRouter);

// GPU
const gpuNvidiaRouter = require("./routes/GpuNvidiaRoute")
const gpuAmdRouter = require("./routes/GpuAmdRoute")
const gpuIntelRouter = require("./routes/GpuIntelRoute")
app.use("/product/gpu", gpuNvidiaRouter, gpuAmdRouter, gpuIntelRouter);

// MainBoard
const mainBoardRouter = require("./routes/MainBoardRoute")
app.use("/product/mainboard", mainBoardRouter)

// Ram
const ramRouter = require("./routes/RamRoute")
app.use("/product/ram", ramRouter)

// Ssd
const ssdRouter = require("./routes/SsdRoute")
app.use("/product/ssd", ssdRouter)

// Psu
const psuRouter = require("./routes/PsuRoute")
app.use("/product/psu", psuRouter)

// Case
const caseRouter = require("./routes/CaseRoute")
app.use("/product/case", caseRouter)

// Monitor
const monitorRouter = require("./routes/MonitorRoute")
app.use("/product/monitor", monitorRouter)





app.listen(3010, () => {
    console.log("server running on port 3010");
});
