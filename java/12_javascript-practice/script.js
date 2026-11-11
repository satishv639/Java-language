// DOM Elements select
const productForm = document.getElementById("product-form");
const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const productCategoryInput = document.getElementById('product-category');
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");

// Loading the products array from local storage (if it already exists)
let products = JSON.parse(localStorage.getItem("products")) || [];

// edit product varible
let isEditMode = false;
let editProductId = null;

// console.log(products);
// Display products as soon as the app loads
displayProducts();

// 1. Add Product Function (Form Submit Event)
productForm.addEventListener("submit", function(e){
    e.preventDefault(); // Page reload stop

    // Input values get
    const name = productNameInput.value.trim();
    const price = productPriceInput.value.trim();
    const category = productCategoryInput.value.trim();

    if (name === "" || price === "" || category ==="") {
        alert('Please fill in all fields!');
        return
    }

    if (isEditMode) {
        // --- If editing is in progress ---
        products = products.map(product =>{
            if (product.id === editProductId) {
                return {
                    id: product.id, 
                    name: name, 
                    price:Number(price), 
                    category: category
                };
            }
            return product;
        })

        // Reset the edit mode
        isEditMode = false;
        editProductId = null;
        document.getElementById("submit-btn").textContent="Submit";
        document.getElementById("submit-btn").style.backgroundColor = "#3498db";
    } else{
        // --- If a new product is being added ---
        // New Product Object create
        const newProduct = {
            id: Date.now().toString(), // Unique ID
            name: name,
            price: Number(price),
            category: category
        }
        // console.log(newProduct)

        // Pushing into an array
        products.push(newProduct);
    }


    // Saving to LocalStorage
    saveToLocalStorage();

    updateCategoryDropdown();
    // update ui (display)
    displayProducts();

    // Resetting form fields
    productForm.reset();
})

// 2. Display Products Function
function displayProducts(productsToDisplay = products){
    // Clear the table first to avoid duplicate entries.
    productList.innerHTML = "";

    if (productsToDisplay.length === 0) {
        productList.innerHTML = `<tr><td colspan="4" style="text-align: center;">No products added yet.</td></tr>`;
        return
    }
    // console.log(productsToDisplay)
    // Rendering elements to the DOM by iterating over an array
    productsToDisplay.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>
                <button class="edit-btn" onclick="editProduct('${product.id}')">Edit</button>
                <button class="delete-btn" onclick="deleteProduct('${product.id}')">Delete</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

// 3. Delete Product Function
function deleteProduct(id){
    products = products.filter(products => products.id !== id);

    // Updating LocalStorage
    saveToLocalStorage();

    // re-render the UI
    updateCategoryDropdown();
    displayProducts();
}

// 4. Edit Product Function
function editProduct(id){
    // 1. Find the product that has a matching ID.
    const productToEdit = products.find(product => product.id === id );

    // console.log(productToEdit);
    if(!productToEdit) return;

    // 2. Populate the form inputs with the existing data
    productNameInput.value = productToEdit.name;
    productPriceInput.value = productToEdit.price;
    productCategoryInput.value = productToEdit.category;

    // 3. Turn on edit mode
    isEditMode = true;
    editProductId = id;

    // 4. Change the submit button text to "Update Product"
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.textContent = "Update Product";
    submitBtn.style.backgroundColor = "#f39c12";

}

// // 5. Search Product Feature
// searchInput.addEventListener("input", function(){
//     const searchTerm = searchInput.value.toLowerCase().trim();
//     // console.log(searchTerm);

//     // Extracting matching products using the filter method
//     const filteredProducts = products.filter(product =>{
//         return product.name.toLowerCase().includes(searchTerm);
//     })
//     // console.log(filteredProducts);

//     // Display only the filtered products
//     displayProducts(filteredProducts);
// })

// Combined Filter & Search Functionality

function filterProducts(){
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    // console.log(selectedCategory);

    const filtered = products.filter(product =>{
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        return matchesSearch && matchesCategory
    })
    displayProducts(filtered);
}
// Search Input Event
searchInput.addEventListener("input", function(){
    filterProducts();
})
// Category Filter Change Event
categoryFilter.addEventListener("change", function() {
    filterProducts();
});

function updateCategoryDropdown(){
    // Extracting unique categories using array methods and Set
    const categories = ['All', ...new Set(products.map(p =>{
        return p.category    
    }))]

    categoryFilter.innerHTML = '';
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}
updateCategoryDropdown();

// Helper function for saving to localStorage
function saveToLocalStorage(){
    localStorage.setItem("products", JSON.stringify(products));
}
