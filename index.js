import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"
import bookingRouter from "./routes/booking.route.js"

let port = 8000  // 👈 Changed to 8000

let app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/listing", listingRouter)
app.use("/api/booking", bookingRouter)

// 👇 Add Home Route
app.get("/", (req, res) => {
    res.send(`
        <h1>Welcome to My API 🚀</h1>
        <p>Click below to explore:</p>
        <ul>
            <li><a href="http://localhost:8000/api/auth">Auth Routes</a></li>
            <li><a href="http://localhost:8000/api/user">User Routes</a></li>
            <li><a href="http://localhost:8000/api/listing">Listing Routes</a></li>
            <li><a href="http://localhost:8000/api/booking">Booking Routes</a></li>
        </ul>
    `)
})

app.listen(port, () => {
    connectDb(); // Connect to DB when server starts
    console.log(`✅ Server started on http://localhost:${port}`);
})
