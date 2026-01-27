
// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function openInfo(evt, tabName) {

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";

}


	
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct1, slct2) {
    var s1 = document.getElementById(slct1);
    var s2 = document.getElementById(slct2);
	
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
		
	// obtain a reduced list of products based on restrictions
    var optionArray = restrictListProducts(products, s1.value);

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>
		
	for (i = 0; i < optionArray.length; i++) {
			
		var productName = optionArray[i];
		// create the checkbox and add in HTML DOM
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "product";
		checkbox.value = productName;
		s2.appendChild(checkbox);
		
		// create a label for the checkbox, and also add in HTML DOM
		var label = document.createElement('label')
		label.htmlFor = productName;
		label.appendChild(document.createTextNode(productName));
		s2.appendChild(label);
		
		// create a breakline node and add in HTML DOM
		s2.appendChild(document.createElement("br"));    
	}
}
	
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){
	
	var ele = document.getElementsByName("product");
	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// build list of selected item
	var para = document.createElement("P");
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			para.appendChild(document.createTextNode(ele[i].value));
			para.appendChild(document.createElement("br"));
			chosenProducts.push(ele[i].value);
		}
	}
		
	// add paragraph and total price
	c.appendChild(para);
	c.appendChild(document.createTextNode("Total Price is " + getTotalPrice(chosenProducts)));
		
}

function getUserPreferences() {
  const vegetarian = document.getElementById("prefVegetarian")?.checked || false;
  const glutenFree = document.getElementById("prefGlutenFree")?.checked || false;

  const organicChoice =
    document.querySelector('input[name="prefOrganic"]:checked')?.value || "Any";

  return { vegetarian, glutenFree, organicChoice };
}

function populateListProductChoicesFromPrefs(prefs, divId) {
  const s2 = document.getElementById(divId);
  s2.innerHTML = "";

  // This now works because restrictListProducts supports prefs objects
  const optionArray = restrictListProducts(products, prefs);

  for (let i = 0; i < optionArray.length; i++) {
    const productName = optionArray[i];

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "product";
    checkbox.value = productName;
    s2.appendChild(checkbox);

    const label = document.createElement("label");
    label.htmlFor = productName;

    // Show name + price
    const prodObj = products.find(p => p.name === productName);
    const priceText = prodObj ? ` — $${prodObj.price.toFixed(2)}` : "";

    label.appendChild(document.createTextNode(productName + priceText));
    s2.appendChild(label);

    s2.appendChild(document.createElement("br"));
  }
}


function showPrefsSummary(prefs) {
  const summary = document.getElementById("prefsSummary");
  if (!summary) return;

  const parts = [];
  if (prefs.vegetarian) parts.push("Vegetarian");
  if (prefs.glutenFree) parts.push("Gluten-free");
  if (prefs.organicChoice !== "Any") parts.push(`Preference: ${prefs.organicChoice}`);

  summary.textContent =
    parts.length > 0
      ? `Saved: ${parts.join(" • ")}`
      : "Saved: No restrictions / no preference";
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("applyPrefsBtn");
  if (!btn) return;

  btn.addEventListener("click", (event) => {
    const prefs = getUserPreferences();

    populateListProductChoicesFromPrefs(prefs, "displayProduct");

    // optional: switch to Products tab after applying
    openInfo(event, "Products");
  });
});


function filterProducts(products, prefs) {
  return products.filter(product => {
    if (prefs.vegetarian && !product.vegetarian) return false;
    if (prefs.glutenFree && !product.glutenFree) return false;

    if (prefs.organicChoice === "Organic" && !product.organic) return false;
    if (prefs.organicChoice === "NonOrganic" && product.organic) return false;

    return true;
  });
}

function displayProducts(filteredProducts) {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  if (filteredProducts.length === 0) {
    container.textContent = "No products match your preferences.";
    return;
  }

  filteredProducts.forEach(product => {
    const label = document.createElement("label");
    label.style.display = "block";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = product.name;

    label.appendChild(checkbox);
    label.append(
      ` ${product.name} — $${product.price.toFixed(2)}`
    );

    container.appendChild(label);
  });
}
