/* groceries.js
   Product data + filtering/sorting helpers
*/

// Product list (10 items)
var products = [
  { name: "brocoli",              vegetarian: true,  glutenFree: true,  organic: true,  vegan: true,   lactoseFree: true,  price: 1.99 },
  { name: "bread",                vegetarian: true,  glutenFree: false, organic: false, vegan: false,  lactoseFree: true,  price: 2.35 },
  { name: "salmon",               vegetarian: false, glutenFree: true,  organic: false, vegan: false,  lactoseFree: true,  price: 10.00 },
  { name: "tofu",                 vegetarian: true,  glutenFree: true,  organic: true,  vegan: true,   lactoseFree: true,  price: 3.49 },
  { name: "chicken breast",       vegetarian: false, glutenFree: true,  organic: true,  vegan: false,  lactoseFree: true,  price: 7.99 },
  { name: "pasta",                vegetarian: true,  glutenFree: false, organic: false, vegan: false,  lactoseFree: true,  price: 2.89 },
  { name: "eggs",                 vegetarian: true,  glutenFree: true,  organic: true,  vegan: false,  lactoseFree: true,  price: 4.29 },
  { name: "milk",                 vegetarian: true,  glutenFree: true,  organic: false, vegan: false,  lactoseFree: false, price: 2.79 },
  { name: "apples",               vegetarian: true,  glutenFree: true,  organic: true,  vegan: true,   lactoseFree: true,  price: 3.99 },
  { name: "ground beef",          vegetarian: false, glutenFree: true,  organic: false, vegan: false,  lactoseFree: true,  price: 8.49 },
  { name: "lactose-free milk",    vegetarian: true,  glutenFree: true,  organic: false, vegan: false,  lactoseFree: true,  price: 6.79 },
  { name: "green peas",           vegetarian: true,  glutenFree: true,  organic: true,  vegan: true,   lactoseFree: true,  price: 3.99 },
  { name: "almond milk",          vegetarian: true,  glutenFree: true,  organic: true,  vegan: true,   lactoseFree: true,  price: 3.49 },
];


function restrictListProducts(prods, restrictionOrPrefs, sortOrder = "asc") {
  // Old behavior: string restriction
  if (typeof restrictionOrPrefs === "string") {
    let product_names = [];
    for (let i = 0; i < prods.length; i += 1) {
      if (restrictionOrPrefs === "Vegetarian" && prods[i].vegetarian === true) {
        product_names.push(prods[i].name);
      } else if (restrictionOrPrefs === "GlutenFree" && prods[i].glutenFree === true) {
        product_names.push(prods[i].name);
      } else if (restrictionOrPrefs === "LactoseFree" && prods[i].lactoseFree === true) {
        product_names.push(prods[i].name);
      } else if (restrictionOrPrefs === "Vegan" && prods[i].vegan === true) {
        product_names.push(prods[i].name);
      } else if (restrictionOrPrefs === "None") {
        product_names.push(prods[i].name);
      }
    }
    return product_names;
  }

  // New behavior: preference object
  const prefs = restrictionOrPrefs;

  let filtered = prods.filter(p => {
    if (prefs.vegetarian && !p.vegetarian) return false;
    if (prefs.glutenFree && !p.glutenFree) return false;
    if (prefs.lactoseFree && !p.lactoseFree) return false;
    if (prefs.vegan && !p.vegan) return false;

    if (prefs.organicChoice === "Organic" && !p.organic) return false;
    if (prefs.organicChoice === "NonOrganic" && p.organic) return false;

    return true;
  });

  // Sort by price
  filtered.sort((a, b) => (sortOrder === "desc" ? b.price - a.price : a.price - b.price));

  // Return only product names (so existing cart logic still works)
  return filtered.map(p => p.name);
}

/*
  getTotalPrice:
  - takes an array of product names (strings)
  - returns total numeric price
*/
function getTotalPrice(chosenProducts) {
  let totalPrice = 0;

  for (let i = 0; i < chosenProducts.length; i++) {
    const name = chosenProducts[i];
    const prodObj = products.find(p => p.name === name);
    if (prodObj) totalPrice += prodObj.price;
  }

  return totalPrice;
}
