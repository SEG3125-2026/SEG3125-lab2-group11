// Tabs (works with onclick="openInfo(this, 'TabName')")
function openInfo(btn, tabName) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) tabcontent[i].style.display = "none";

  const tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  btn.className += " active";
}

// --- Preferences (Client tab) ---
function getUserPreferences() {
  const vegetarian = document.getElementById("prefVegetarian")?.checked || false;
  const glutenFree = document.getElementById("prefGlutenFree")?.checked || false;

  const organicChoice =
    document.querySelector('input[name="prefOrganic"]:checked')?.value || "Any";

  return { vegetarian, glutenFree, organicChoice };
}

function showPrefsSummary(prefs) {
  const summary = document.getElementById("prefsSummary");
  if (!summary) return;

  const parts = [];
  if (prefs.vegetarian) parts.push("Vegetarian");
  if (prefs.glutenFree) parts.push("Gluten-free");
  if (prefs.organicChoice !== "Any") parts.push(`Preference: ${prefs.organicChoice}`);

  summary.textContent =
    parts.length > 0 ? `Saved: ${parts.join(" • ")}` : "Saved: No restrictions / no preference";
}

// --- Products (filtered list) ---
function populateProductsFromPrefs(prefs, divId) {
  const s2 = document.getElementById(divId);
  if (!s2) return;

  s2.innerHTML = "";

  // groceries.js supports prefs object
  const optionArray = restrictListProducts(products, prefs);

  if (!optionArray || optionArray.length === 0) {
    s2.textContent = "No products match your preferences.";
    return;
  }

  for (let i = 0; i < optionArray.length; i++) {
    const productName = optionArray[i];

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "product";
    checkbox.value = productName;

    const label = document.createElement("label");
    const prodObj = products.find(p => p.name === productName);
    const priceText = prodObj ? ` — $${prodObj.price.toFixed(2)}` : "";
    label.appendChild(document.createTextNode(" " + productName + priceText));

    s2.appendChild(checkbox);
    s2.appendChild(label);
    s2.appendChild(document.createElement("br"));
  }
}

// --- Cart (your existing logic, unchanged) ---
function selectedItems() {
  const ele = document.getElementsByName("product");
  const chosenProducts = [];

  const c = document.getElementById("displayCart");
  c.innerHTML = "";

  const para = document.createElement("P");
  para.innerHTML = "You selected : ";
  para.appendChild(document.createElement("br"));

  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      para.appendChild(document.createTextNode(ele[i].value));
      para.appendChild(document.createElement("br"));
      chosenProducts.push(ele[i].value);
    }
  }

  c.appendChild(para);
  c.appendChild(document.createTextNode("Total Price is " + getTotalPrice(chosenProducts)));
}

// --- Wire up button + default tab ---
document.addEventListener("DOMContentLoaded", () => {
  // Default open Client tab
  const firstTab = document.querySelector(".tablinks");
  if (firstTab) firstTab.click();

  // Apply preferences button
  const btn = document.getElementById("applyPrefsBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const prefs = getUserPreferences();
    showPrefsSummary(prefs);
    populateProductsFromPrefs(prefs, "displayProduct");

    // Switch to Products tab
    const productsBtn = document.querySelectorAll(".tablinks")[1];
    if (productsBtn) openInfo(productsBtn, "Products");
  });
});
