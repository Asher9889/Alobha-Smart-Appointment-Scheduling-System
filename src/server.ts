import express from "express";
import { connectMongoDB } from "./db";
import apiRoutes from "./routes";
import { envConfig } from "./config";
import { globalErrorHandler, routeNotExistsHandler } from "./utils";
import cors from "cors";

const app = express();
app.use(cors());
connectMongoDB();


app.use(express.json({limit: "4mb"}));
app.use(express.urlencoded({extended: true}));

app.use("/api", apiRoutes);

// app.use("/", (req, res) => {
//     res.send("OK");
// })


app.use(routeNotExistsHandler);
app.use(globalErrorHandler);

app.listen(envConfig.port, ()=> {
    console.log(`Server is running on port ${envConfig.port} ...`);
})