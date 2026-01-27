	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
  {
    name: "brocoli",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    price: 1.99
  },
  {
    name: "bread",
    vegetarian: true,
    glutenFree: false,
    organic: false,
    price: 2.35
  },
  {
    name: "salmon",
    vegetarian: false,
    glutenFree: true,
    organic: false,
    price: 10.00
  },
  {
    name: "tofu",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    price: 3.49
  },
  {
    name: "chicken breast",
    vegetarian: false,
    glutenFree: true,
    organic: true,
    price: 7.99
  },
  {
    name: "pasta",
    vegetarian: true,
    glutenFree: false,
    organic: false,
    price: 2.89
  },
  {
    name: "eggs",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    price: 4.29
  },
  {
    name: "milk",
    vegetarian: true,
    glutenFree: true,
    organic: false,
    price: 2.79
  },
  {
    name: "apples",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    price: 3.99
  },
  {
    name: "ground beef",
    vegetarian: false,
    glutenFree: true,
    organic: false,
    price: 8.49
  }
];



// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restrictionOrPrefs) {
  if (typeof restrictionOrPrefs === "string") {
    let product_names = [];
    for (let i = 0; i < prods.length; i += 1) {
      if (restrictionOrPrefs == "Vegetarian" && prods[i].vegetarian == true) {
        product_names.push(prods[i].name);
      } else if (restrictionOrPrefs == "GlutenFree" && prods[i].glutenFree == true) {
        product_names.push(prods[i].name);
      } else if (restrictionOrPrefs == "None") {
        product_names.push(prods[i].name);
      }
    }
    return product_names;
  }

  // New behavior: preference object
  const prefs = restrictionOrPrefs;

  // Filter products
  let filtered = prods.filter(p => {
    if (prefs.vegetarian && !p.vegetarian) return false;
    if (prefs.glutenFree && !p.glutenFree) return false;

    if (prefs.organicChoice === "Organic" && !p.organic) return false;
    if (prefs.organicChoice === "NonOrganic" && p.organic) return false;

    return true;
  });

  filtered.sort((a, b) => a.price - b.price);

  return filtered.map(p => p.name);
}


// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}
