const express = require('express');
const prompt = require('prompt-sync')();

class Shop {
  constructor(name, rent) {
    this.name = name;
    this.rent = rent;
  }
}

class ShoppingComplex {
  constructor() {
    this.shops = [];
  }

  takeShopInput(shopData) {
    for (let i = 0; i < shopData.length; i++) {
      const shopName = shopData[i].name;
      const shopRent = parseFloat(shopData[i].rent);

      const shop = new Shop(shopName, shopRent);
      this.shops.push(shop);
    }
  }

  calculateTotalRent() {
    let totalRent = 0;
    for (let i = 0; i < this.shops.length; i++) {
      totalRent += this.shops[i].rent;
    }
    return totalRent;
  }
}

const app = express();
app.use(express.json());

app.post('/calculate-total-rent', (req, res) => {
  const complex = new ShoppingComplex();
  complex.takeShopInput(req.body.shops);

  const totalRent = complex.calculateTotalRent();
  res.json({ totalRent });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
