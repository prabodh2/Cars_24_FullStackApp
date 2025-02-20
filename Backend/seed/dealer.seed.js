const mongoose = require('mongoose');
const { DealerModel } = require('../model/dealer.model');
const bcrypt = require('bcrypt');
require('dotenv').config();

const sampleDealer = {
  name: "Premium Auto Sales",
  email: "sales@premiumauto.com",
  password: bcrypt.hashSync("dealer123", 10),
  location: "Mumbai",
  phone: "+91-9876543210"
};

async function seedDealer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    // Clear existing dealers
    await DealerModel.deleteMany({});
    console.log('Cleared existing dealers');

    // Add sample dealer
    const dealer = await DealerModel.create(sampleDealer);
    console.log('Added sample dealer with ID:', dealer._id);

    console.log('Seeding completed successfully');
    return dealer._id;
  } catch (error) {
    console.error('Error seeding dealer:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
seedDealer();
