import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  totalSpend: {
    type: Number,
    default: 0,
  },
  visits: {
    type: Number,
    default: 0,
  },
  lastActiveDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
const CustomerModel = mongoose.model('Customer', customerSchema);
export default CustomerModel