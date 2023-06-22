const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: String,
  rent: Number
});

const Shop = mongoose.model('Shop', shopSchema);

class Database {
  constructor(uri) {
    this.uri = uri;
  }

  async connect() {
    try {
      await mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to the MongoDB server');
    } catch (err) {
      console.error('Error connecting to the database:', err);
    }
  }

  async storeShops(shops) {
    try {
      // Insert shops
      const insertedShops = await Shop.insertMany(shops);
      console.log(`${insertedShops.length} shops inserted`);

      // Read shops
      const readShops = await Shop.find();
      console.log('Read shops:', readShops);

      // Update a shop
      const shopToUpdate = { name: 'Shop 1' }; // Replace with the actual name of the shop to update
      const updatedShop = { rent: 200 }; // Specify the fields to update
      await Shop.updateOne(shopToUpdate, updatedShop);
      console.log('Shop updated successfully!');

      // Delete a shop
      const shopToDelete = { name: 'Shop 3' }; // Replace with the actual name of the shop to delete
      await Shop.deleteOne(shopToDelete);
      console.log('Shop deleted successfully!');
    } catch (err) {
      console.error('Error:', err);
    }
  }

  async close() {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    } catch (err) {
      console.error('Error closing the database connection:', err);
    }
  }
}

// Usage
const shops = [
  { name: 'Shop 1', rent: 100 },
  { name: 'Shop 2', rent: 200 },
  { name: 'Shop 3', rent: 300 }
];

async function main() {
  const uri = 'mongodb+srv://ajayhbsc22:12345@cluster0.amtge6u.mongodb.net/test?retryWrites=true&w=majority';

  const db = new Database(uri);
  await db.connect();
  await db.storeShops(shops);
  await db.close();
}

main();
