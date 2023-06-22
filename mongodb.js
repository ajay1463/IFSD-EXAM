const { MongoClient, ObjectId } = require('mongodb');

class Shop {
  constructor(name, rent) {
    this.name = name;
    this.rent = rent;
  }
}

class Database {
  constructor(uri) {
    this.uri = uri;
    this.client = new MongoClient(this.uri);
  }

  async connect() {
    await this.client.connect();
    console.log('Connected to the MongoDB server');
  }

  async storeShops(shops) {
    try {
      const database = this.client.db('shop');
      const collection = database.collection('shop');

      // Insert each shop document into the collection
      await collection.insertMany(shops);
      console.log('Shops stored successfully');

      // Read shops
      const readShops = await collection.find().toArray();
      console.log('Read shops:', readShops);

      // Update a shop
      const shopToUpdate = { name: 'Shop 1' }; // Replace with the actual name of the shop to update
      const updatedShop = { $set: { rent: 200 } }; // Specify the fields to update
      await collection.updateOne(shopToUpdate, updatedShop);
      console.log('Shop updated successfully!');
      
      // Delete a shop
      const shopToDelete = { name: 'Shop 3' }; // Replace with the actual name of the shop to delete
      await collection.deleteOne(shopToDelete);
      console.log('Shop deleted successfully!');
    } catch (err) {
      console.error('Error:', err);
    }
  }

  async close() {
    await this.client.close();
    console.log('MongoDB connection closed');
  }
}

// Usage
const shops = [
  new Shop('Shop 1', 100),
  new Shop('Shop 2', 200),
  new Shop('Shop 3', 300)
];

async function main() {
  const uri = 'mongodb+srv://ajayhbsc22:12345@cluster0.amtge6u.mongodb.net/?retryWrites=true&w=majority';

  const db = new Database(uri);
  await db.connect();
  await db.storeShops(shops);
  await db.close();
}

main();
