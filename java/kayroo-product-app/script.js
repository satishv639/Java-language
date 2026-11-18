const API_URL = "https://dummyjson.com/products?limit=0";

const productsGrid = document.getElementById("productsGrid");
const loadingIndicator = document.getElementById("loadingIndicator");
const errorBox = document.getElementById("errorBox");
const productCountText = document.getElementById("productCountText");
const searchInput = document.getElementById("searchInput");
const categoryList = document.getElementById("categoryList");


let allProducts = [];

// 1. GET: Fetch Products from API using Async/Await
async function fetchProducts() {

    try {
        // Step 1: Show a loading indicator and hide any errors before the data arrives
        loadingIndicator.style.display = "block";
        errorBox.style.display = "none";
        productsGrid.innerHTML = "";

        const response = await fetch(API_URL);
        // Throw an error if the response is not as expected
        // let error = true ;
        // if(!error){
        //     throw new Error("Failed to fetch products from server.");
        // }
        if(!response.ok){
            throw new Error("Failed to fetch products from server.");
        }
        const data = await response.json();
        allProducts = data.products;   // Saved the products array
        displayProducts(allProducts); 

        productCountText.innerText = `Showing ${data.products.length} products in All`;
        // Call counts function here!
        updateCategoryCounts(data.products);
        
    } catch (error) {
        // If the internet is down or some other error occurs, it will end up here.
        errorBox.style.display = "block";
        errorBox.innerText = error.message;
    } finally {
        // Hide the loading indicator, whether data is received or an error occurs
        loadingIndicator.style.display = "none";
    }
    

}
// 2. Function: Convert products into HTML cards and display them on the screen
function displayProducts(products){
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        // Creating an HTML structure for each product
        card.innerHTML = `
            <div class="product-img-box">
                <img src="${product.thumbnail}"/>
            </div>
            <div class="product-info">
                <h4 class="product-title">${product.title}</h4>
                <div class="product-price">${product.price}</div>
                <div class="card-actions" style="margin-top: 10px;">
                    <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });

}
fetchProducts();
// 3. SEARCH: Real-time search functionality
searchInput.addEventListener("input", async function(e){
    const query = e.target.value.trim();
    // console.log(query);
    // If the search box is empty, reload all products
    if (query === "") {
        fetchProducts();
        return;
    }
    try {
        errorBox.style.display = "none";
        loadingIndicator.style.display = "block";
        productsGrid.innerHTML = "";

        // DummyJSON search endpoint: /products/search?q=keyword
        const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        if(!response.ok){
            throw new Error("Failed to search products.");
        }
        const data = await response.json();
        console.log(data);
        // display search results
        displayProducts(data.products);
        
        // Update the count
        productCountText.innerHTML = `Found ${data.products.length} Products`

    } catch (error) {
        errorBox.style.display = "block";
        errorBox.innerText = error.message;
    } finally {
        loadingIndicator.style.display = "none"
    }
})

// Dynmic show product category count function
function updateCategoryCounts(allProductsCategory){
    const countCategory = document.querySelectorAll("#categoryList li");
    countCategory.forEach(function(li) {
        const categoryName = li.getAttribute("data-category");
        const countSpan = li.querySelector(".count");

        if (categoryName === "all") {
            countSpan.innerText = `${allProductsCategory.length}`;
        } else {
            const filteredCategory = allProductsCategory.filter(function(item){
                return item.category === categoryName;
            })
            // console.log(filteredCategory);
            countSpan.innerText = filteredCategory.length;
        }
    });
}

// 4. CATEGORY FILTER: To handle sidebar categories by clicking on them
categoryList.addEventListener("click",async function(e){
    // Check whether the user has clicked on an <li> element
    const li = e.target.closest("li");
    if(!li) return;

    // Remove the 'active' class from all <li> elements and add it to the clicked one
    document.querySelectorAll(".filter-list li").forEach(el => {
        el.classList.remove("active");   
    });
    li.classList.add("active");
    const category = li.getAttribute("data-category");

    // If 'all' is selected, fetch all products, else just those from the specific category
    if (category === "all") {
        fetchProducts();
        
    }else {
        try {
            loadingIndicator.style.display = "block";
            errorBox.style.display = "none";
            productsGrid.innerHTML = "";

            // DummyJSON category endpoint: /products/category/smartphone
           const response = await fetch(`https://dummyjson.com/products/category/${category}`);
            
            if (!response.ok) {
                throw new Error("Failed to fetch products for this category.");
            }

            const data = await response.json();
            displayProducts(data.products);
            productCountText.innerText = `Showing ${data.products.length} products in ${category}`;
            
        } catch (error) {
            errorBox.style.display = "block";
            errorBox.innerText = error.message;
        } finally {
            loadingIndicator.style.display = "none";
        }
    }
})

// --- Modal Elements (Add Product) ---
const productModal = document.getElementById("productModal");
const openAddModalBtn = document.getElementById("openAddModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const productForm = document.getElementById("productForm");
const modalTitle = document.getElementById("modalTitle");
const productIdField = document.getElementById("productId");
const titleInput = document.getElementById("titleInput");
const priceInput = document.getElementById("priceInput");
const categoryInput = document.getElementById("categoryInput");
const imageInput = document.getElementById("imageInput");

// 1. Open the Modal ("Add product" button is clicked)
openAddModalBtn.addEventListener("click", function(){
    productModal.style.display = "flex";
    modalTitle.innerText = "Add New Product";
    productForm.reset();  // Clear old data
    productIdField.value = "";

});

// Close Modal (Cross 'X' button is clicked)
closeModalBtn.addEventListener("click", function(){
    productModal.style.display = "none";
});

// 2. POST: Adding a new product (upon form submission)

productForm.addEventListener("submit", async function(e){
    e.preventDefault();

    // Collecting data from form fields
    const productDataField = {
        title : titleInput.value,
        price : parseFloat(priceInput.value),
        category : categoryInput.value,
        thumbnail : imageInput.value
    };

    try {
        // DummyJSON add product endpoint: /products/add
        const response = await fetch('https://dummyjson.com/products/add', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(productDataField)       
        });
        if (!response.ok) {
            throw new Error("Failed to add product.");
        }
        const addedProduct = await response.json();
        alert('Product added successfully! (DummyAPI simulated)');

        // Close the modal
        productModal.style.display = "none";

        // Since the dummy JSON isn't saved permanently, add the new product to the top of the local array and update the screen.
        allProducts.unshift(addedProduct);
        
        // ⚠️ This line needs to be added so that old cards are removed and new cards can be rendered afresh:
        productsGrid.innerHTML = "";
        displayProducts(allProducts);
        console.log(allProducts);

    } catch (error) {
        alert(error.message);
    }
});

// 5. Delete: Deleting a product
window.deleteProduct = async function(id){
    // Get confirmation from the user
    const isConfirmed = confirm("Are you sure you want to delete this product?");
    if (!isConfirmed) {
        return
    }
    
    try {
        
        // DummyJSON delete endpoint: /products/{id}
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            //throw new Error("Failed to delete product.");
            console.warn("Server par product nahi mila, lekin local array se delete kar rahe hain.");
        }
        const data = await response.json();
        alert(`Product deleted successfully! (Simulated ID: ${data.id})`);

        // Filter out products from the local array whose IDs do not match
        allProducts = allProducts.filter(function(productItem){
            return productItem.id !== id ;
        })
        // Updating the screen again
        productsGrid.innerHTML = "";
        displayProducts(allProducts);

        productCountText.innerText = `Showing 1-${allProducts.length} products`;
        updateCategoryCounts(allProducts);
        alert("Product deleted successfully!");

    } catch (error) {
        alert(error.message);
    }
}
