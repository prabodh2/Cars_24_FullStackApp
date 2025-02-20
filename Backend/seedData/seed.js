require('dotenv').config();
const mongoose = require('mongoose');
const { InventoryModel } = require('../model/inventory.model');
const { OEM_SpecsModel } = require('../model/oem_specs.model');
const cars = require('./cars');

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        // Clear existing data
        await InventoryModel.deleteMany({});
        await OEM_SpecsModel.deleteMany({});
        console.log('Cleared existing data');

        // First create OEM specs
        for (const car of cars) {
            const oemSpec = new OEM_SpecsModel({
                model_name: car.oemSpecs.model,
                year: car.oemSpecs.year.toString(),
                new_model_price: car.oemSpecs.listPrice,
                colors: car.oemSpecs.colors.join(','),
                mileage: car.oemSpecs.mileage,
                power: car.oemSpecs.power.toString(),
                maxspeed: car.oemSpecs.maxSpeed
            });

            const savedOemSpec = await oemSpec.save();
            
            // Create inventory with reference to OEM spec
            const inventory = new InventoryModel({
                title: car.title,
                image: car.image,
                description: car.description,
                price: car.price,
                kmOnOdometer: car.kmOnOdometer,
                majorScratches: car.majorScratches,
                originalPaint: car.originalPaint,
                accidentsReported: car.accidentsReported,
                previousBuyers: car.previousBuyers,
                registrationPlace: car.registrationPlace,
                oemSpecs: savedOemSpec._id
            });

            await inventory.save();
        }

        console.log('Seed data inserted successfully');

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
