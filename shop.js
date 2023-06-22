const prompt = require('prompt-sync')();//prompt is used to take user input
class Shop {
  constructor(name, rent) {
    this.name = name;
    this.rent = rent;
  }
}

class ShoppingComplex {
  constructor() {
    this.shops = [];//creates an array
  }

  takeShopInput() {
    const input = prompt("Enter the number of shops:");

    for (let i = 1; i <= input; i++) {
      const shopName = prompt("Enter the name of shop " + i + ":");
      const shopRent = parseFloat(prompt("Enter the rent of shop " + i + ":"));

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

function main() {
  const complex = new ShoppingComplex();
  complex.takeShopInput();

  const totalRent = complex.calculateTotalRent();
  console.log("Total rent of all shops: $" + totalRent);
}

main();
