import mongoose from "mongoose";

//Customer Database Model

const customerSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        busName: String,
        phone: String,
        email: String,
        address: String,
    }
);

export const Customer = mongoose.model('Customer', customerSchema);