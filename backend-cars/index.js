import mongoose from "mongoose";
import express, { urlencoded } from "express";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());
app.use(cors());
app.use(urlencoded());

mongoose
    .connect("mongodb://localhost:27017/carrental")
    .then((ack) => {
        if (ack) {
            console.log("connected");
        }
    })
    .catch((err) => {
        console.log("error", err);
    });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    role: { type: String, default: "user" }
});

const userCollection = new mongoose.model("users", userSchema);

const carSchema = new mongoose.Schema({
    name: String,
    image: String,
    pricePerDay: Number,
    description: String,
    specs: {
        speed: String,
        engine: String,
        seats: Number,
        fuel: String,
    },
    available: { type: Boolean, default: true }
});

const carCollection = new mongoose.model("cars", carSchema);

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "cars" },
    carName: String,
    carImage: String,
    userName: String,
    userEmail: String,
    phone: String,
    pickupDate: String,
    returnDate: String,
    totalDays: Number,
    totalAmount: Number,
    status: { type: String, default: "pending" },
    paymentStatus: { type: String, default: "pending" },
    paymentMethod: String,
    createdAt: { type: Date, default: Date.now }
});

const bookingCollection = new mongoose.model("bookings", bookingSchema);

const paymentSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "bookings" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    amount: Number,
    paymentMethod: String,
    cardNumber: String,
    cardHolder: String,
    status: { type: String, default: "completed" },
    createdAt: { type: Date, default: Date.now }
});

const paymentCollection = new mongoose.model("payments", paymentSchema);

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const contactCollection = new mongoose.model("contacts", contactSchema);


app.post("/signup", (req, res) => {
    console.log(req.body);
    userCollection
        .findOne({ email: req.body.email })
        .then((isPresent) => {
            if (isPresent) {
                res.send("Email Address Already in use! please try different one.");
            } else {
                const hashedPassword = bcrypt.hashSync(req.body.password, 10);
                const newAccount = new userCollection({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    phone: req.body.phone || ""
                });
                newAccount.save().then((isSaved) => {
                    if (isSaved) {
                        res.send("Account created successfully");
                    } else {
                        res.send("error in creating an account");
                    }
                });
            }
        })
        .catch();
});

app.post("/login", (req, res) => {
    console.log("req", req.body);
    userCollection
        .findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                const isMatch = bcrypt.compareSync(req.body.password, user.password);
                if (isMatch) {
                    res.send({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        role: user.role
                    });
                } else {
                    res.send("Invalid Password");
                }
            } else {
                res.send("unAuthorized");
            }
        })
        .catch((exe) => {
            res.send("Something went wrong!.please try again");
        });
});

app.get("/user/:id", async (req, res) => {
    const user = await userCollection.findById(req.params.id).select("-password");
    if (user) {
        res.send(user);
    } else {
        res.send("User not found");
    }
});


app.post("/cars", (req, res) => {
    console.log(req.body);
    const newCar = new carCollection(req.body);
    newCar
        .save()
        .then((isSaved) => {
            if (isSaved) {
                res.send("Car created Successfully!");
            } else {
                res.send("Error in Creating Car");
            }
        })
        .catch((err) => {
            console.log(err);
            res.send("Error");
        });
});

app.get("/cars", async (req, res) => {
    const allCars = await carCollection.find();
    console.log("all cars", allCars);
    res.send(allCars);
});

app.get("/cars/:id", async (req, res) => {
    const car = await carCollection.findById(req.params.id);
    if (car) {
        res.send(car);
    } else {
        res.send("Car not found");
    }
});

app.put("/cars/:id", async (req, res) => {
    const updatedCar = await carCollection.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (updatedCar) {
        res.send("Car updated Successfully!");
    } else {
        res.send("Car not found");
    }
});

app.delete("/cars/:id", async (req, res) => {
    const deletedCar = await carCollection.findByIdAndDelete(req.params.id);
    if (deletedCar) {
        res.send("Car deleted Successfully!");
    } else {
        res.send("Car not found");
    }
});


app.post("/bookings", async (req, res) => {
    try {
        const newBooking = new bookingCollection(req.body);
        const saved = await newBooking.save();
        if (saved) {
            res.send({ message: "Booking created successfully", booking: saved });
        } else {
            res.send("Error in creating booking");
        }
    } catch (err) {
        console.log(err);
        res.send("Error");
    }
});

app.get("/bookings", async (req, res) => {
    const bookings = await bookingCollection.find().sort({ createdAt: -1 });
    res.send(bookings);
});

app.get("/bookings/user/:userId", async (req, res) => {
    const bookings = await bookingCollection.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.send(bookings);
});

app.get("/bookings/:id", async (req, res) => {
    const booking = await bookingCollection.findById(req.params.id);
    if (booking) {
        res.send(booking);
    } else {
        res.send("Booking not found");
    }
});

app.put("/bookings/:id", async (req, res) => {
    const updated = await bookingCollection.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (updated) {
        res.send({ message: "Booking updated", booking: updated });
    } else {
        res.send("Booking not found");
    }
});

app.delete("/bookings/:id", async (req, res) => {
    const deleted = await bookingCollection.findByIdAndDelete(req.params.id);
    if (deleted) {
        res.send("Booking cancelled successfully");
    } else {
        res.send("Booking not found");
    }
});


app.post("/payments", async (req, res) => {
    try {
        const newPayment = new paymentCollection(req.body);
        const saved = await newPayment.save();
        
        if (req.body.bookingId) {
            await bookingCollection.findByIdAndUpdate(
                req.body.bookingId,
                { paymentStatus: "paid", status: "confirmed" }
            );
        }
        
        res.send({ message: "Payment successful", payment: saved });
    } catch (err) {
        console.log(err);
        res.send("Payment failed");
    }
});

app.get("/payments/booking/:bookingId", async (req, res) => {
    const payment = await paymentCollection.findOne({ bookingId: req.params.bookingId });
    res.send(payment);
});


app.post("/contact", async (req, res) => {
    try {
        const newContact = new contactCollection(req.body);
        const saved = await newContact.save();
        if (saved) {
            res.send("Message sent successfully");
        } else {
            res.send("Error sending message");
        }
    } catch (err) {
        res.send("Error");
    }
});

app.get("/contacts", async (req, res) => {
    const contacts = await contactCollection.find().sort({ createdAt: -1 });
    res.send(contacts);
});

app.listen(7000, () => {
    console.log("server started at port 7000");
});