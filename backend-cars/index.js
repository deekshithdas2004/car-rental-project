import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

const JWT_SECRET = "secret123";

mongoose.connect("mongodb://localhost:27017/carrental")
.then(()=>console.log("DB connected"))
.catch(err=>console.log(err));


const User = mongoose.model("users", {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" }
});

const Car = mongoose.model("cars", {
    name: String,
    image: String,
    pricePerDay: Number,
    description: String
});

const cartSchema = new mongoose.Schema({
    userId: String,
    carId: String,
    carName: String,
    price: Number,
    image: String
});
const Cart = mongoose.model("cart", cartSchema);

const bookingSchema = new mongoose.Schema({
    userId: String,
    carName: String,
    totalPrice: Number,
    image: String,
    status: { type: String, default: "Active" }
});
const Booking = mongoose.model("bookings", bookingSchema);


const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Login required");

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.status(401).send("Invalid token");
    }
};

const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).send("Admin only");
    }
    next();
};


app.post("/signup", async (req, res) => {
    try {
        const hashed = bcrypt.hashSync(req.body.password, 10);
        await new User({ ...req.body, password: hashed }).save();
        res.send("Signup done");
    } catch {
        res.status(500).send("Signup error");
    }
});

app.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send("User not found");

    const match = bcrypt.compareSync(req.body.password, user.password);
    if (!match) return res.send("Wrong password");

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET
    );

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax"
    });

    res.send("Login success");
});

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.send("Logged out");
});

app.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user.userId).select("-password");
    res.send(user);
});


app.post("/admin/cars", auth, adminOnly, async (req, res) => {
    await new Car(req.body).save();
    res.send("Car added");
});

app.get("/cars", auth, async (req, res) => {
    res.send(await Car.find());
});

app.get("/cars/:id", auth, async (req, res) => {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).send("Car not found");
    res.send(car);
});

app.delete("/admin/cars/:id", auth, adminOnly, async (req, res) => {
    await Car.findByIdAndDelete(req.params.id);
    res.send("Car deleted");
});


app.post("/cart", auth, async (req, res) => {
    try {
        const { carId, carName, price, image } = req.body;

        await new Cart({
            userId: req.user.userId,
            carId,
            carName,
            price,
            image: image || ""
        }).save();

        res.send("Added to cart");
    } catch (err) {
        console.log(err);
        res.status(500).send("Cart error");
    }
});

app.get("/cart", auth, async (req, res) => {
    const data = await Cart.find({ userId: req.user.userId });
    res.send(data);
});

app.delete("/cart/:id", auth, async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});


app.post("/book", auth, async (req, res) => {
    try {
        const { carName, totalPrice, image } = req.body;

        await new Booking({
            userId: req.user.userId,
            carName,
            totalPrice,
            image: image || ""
        }).save();

        res.send("Booked");
    } catch {
        res.status(500).send("Booking error");
    }
});

app.get("/bookings", auth, async (req, res) => {
    res.send(await Booking.find({ userId: req.user.userId }));
});

app.put("/bookings/:id", auth, async (req, res) => {
    await Booking.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    });
    res.send("Updated");
});

app.get("/admin/bookings", auth, adminOnly, async (req, res) => {
    res.send(await Booking.find());
});


app.listen(7000, () => console.log("Server running"));