import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
    const [cars, setCars] = useState([]);
    const [bookings, setBookings] = useState([]);

    const load = async () => {
        setCars((await api.get("/cars")).data);
        setBookings((await api.get("/admin/bookings")).data);
    };

    useEffect(() => { load(); }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>

            <h3>Cars</h3>
            {cars.map(c => (
                <div key={c._id}>
                    {c.name}
                    <button onClick={() => api.delete("/admin/cars/" + c._id).then(load)}>
                        Delete
                    </button>
                </div>
            ))}

            <h3>Bookings</h3>
            {bookings.map(b => (
                <div key={b._id}>
                    {b.carName} - ₹{b.totalPrice}
                </div>
            ))}

        </div>
    );
}