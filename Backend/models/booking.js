import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    slots: {
        type: [Number], 
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    ground: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ground' 
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;