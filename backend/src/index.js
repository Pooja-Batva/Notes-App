import 'dotenv/config';
import app from "./app.js";
import connectDB from "./database/index.js";

connectDB()
.then(
    () => {
        app.listen(process.env.PORT || 5000, ()=>{
            console.log(`App is listening at PORT : ${process.env.PORT}`);
        })
    }
)
.catch(
    (err) => {
        console.log("DATABASE Connection FAILED!!", err);
    }
)