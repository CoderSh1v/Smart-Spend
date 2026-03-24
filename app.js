import express from "express"
import { auth } from "./routes/authRouter.js";
import { errorhandler } from "./middleware/errorhandler.js";
import { expense } from "./routes/expenseRouter.js";
import cors from "cors"

const app = express();


app.use(cors());
app.use(express.json());       // for JSON requests
app.use(express.urlencoded({ extended: true })); // for form data



app.use("/auth",auth)
app.use("/expense",expense)

app.use(errorhandler)
export {app}