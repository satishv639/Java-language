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
                <div class="product-brand">${product.brand}</div>
                <h4 class="product-title">${product.title}</h4>
                <div class="product-price">${product.price}</div>
                
                <div class="card-actions" style="margin-top: 10px;">
                    <button class="btn-edit" onclick="openEditModal(${product.id})">Edit</button>
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
        productCountText.innerText = `Found ${data.products.length} Products`

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

// productForm.addEventListener("submit", async function(e){
//     e.preventDefault();

//     // Collecting data from form fields
//     const productDataField = {
//         title : titleInput.value,
//         price : parseFloat(priceInput.value),
//         category : categoryInput.value,
//         thumbnail : imageInput.value
//     };

//     try {
//         // DummyJSON add product endpoint: /products/add
//         const response = await fetch('https://dummyjson.com/products/add', {
//             method : 'POST',
//             headers : {'Content-Type' : 'application/json'},
//             body : JSON.stringify(productDataField)       
//         });
//         if (!response.ok) {
//             throw new Error("Failed to add product.");
//         }
//         const addedProduct = await response.json();
//         alert('Product added successfully! (DummyAPI simulated)');

//         // Close the modal
//         productModal.style.display = "none";

//         // Since the dummy JSON isn't saved permanently, add the new product to the top of the local array and update the screen.
//         allProducts.unshift(addedProduct);
        
//         // ⚠️ This line needs to be added so that old cards are removed and new cards can be rendered afresh:
//         productsGrid.innerHTML = "";
//         displayProducts(allProducts);

//     } catch (error) {
//         alert(error.message);
//     }
// });

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
            throw new Error("Failed to delete product.");
            //console.warn("Server par product nahi mila, lekin local array se delete kar rahe hain.");
        }
        const data = await response.json();
        alert(`Product deleted successfully! (Simulated ID: ${data.id})`);

        // Filter out products from the local array whose IDs do not match
        allProducts = allProducts.filter(function(productItem){
            return productItem.id !== id;
        })
        // Updating the screen again
        productsGrid.innerHTML = "";
        displayProducts(allProducts);

        productCountText.innerText = `Showing 1-${allProducts.length} products`;
        updateCategoryCounts(allProducts);
        // alert("Product deleted successfully!");

    } catch (error) {
        alert(error.message);
    }
}

// 6A. Open Edit Modal with existing product data
window.openEditModal = function(id){
    // Finding a matching product from the products array
    const productSelect = allProducts.find(function(item){
        return item.id === id;
    })
    if (productSelect === undefined) {
        return;
    }
    modalTitle.innerText = "Edit Product";
    productModal.style.display = "flex";
    productIdField.value = productSelect.id;
    titleInput.value = productSelect.title;
    priceInput.value = productSelect.price;
    categoryInput.value = productSelect.category;
    imageInput.value = productSelect.thumbnail;

}
// 2 & 6B. POST (Add) / PUT (Update) on Form Submission
productForm.addEventListener("submit", async function(e){
    e.preventDefault();
    const id = productIdField.value;

    // Collecting data from form fields
    const productDataField = {
        title : titleInput.value,
        price : parseFloat(priceInput.value),
        category : categoryInput.value,
        thumbnail : imageInput.value
    };

    try {
        if(id){
            // --- PUT: Update existing product ---
            const response = await fetch(`https://dummyjson.com/products/${id}`, {
                method : 'PUT',
                headers : {'Content-Type':'application/json'},
                body : JSON.stringify(productDataField)
            });
            if(!response.ok){
                throw new Error("Server par product nahi mila, lekin local array mein update kar rahe hain.");
            }
            const updateData = await response.json();
        
            // Updating the product in the local array
            allProducts = allProducts.map(function(item){
                if (item.id === Number(id)) {
                    return {
                        ...item,
                        title : productDataField.title,
                        price : productDataField.price,
                        category : productDataField.category,
                        thumbnail : productDataField.thumbnail,
                        ...updateData
                    }
                }
                return item
            });
            alert('Product updated successfully!');

        } else {
            // --- POST: Add new product ---
            const response = await fetch(`https://dummyjson.com/products/add`, {
                method : 'POST',
                headers : {'Content-Type':'application/json'},
                body : JSON.stringify(productDataField)
            })
            if(!response.ok){
                throw new Error("Failed to add product.");
            }
            const addedProduct = await response.json();
            allProducts.unshift(addedProduct);
            alert('Product added successfully! (DummyAPI simulated)');
        }
        // Close the modal and update the screen + category counts
        productModal.style.display = "none";
        productsGrid.innerHTML = "";

         // This line needs to be added so that old cards are removed and new cards can be rendered afresh:
        displayProducts(allProducts);
        updateCategoryCounts(allProducts);


    } catch (error) {
        alert(error.message);
    }
    
})

// --- 7. Price Filter: Filtering products using a price range slider ---

const priceRange = document.getElementById("priceRange");
const maxPriceInput = document.getElementById("maxPriceInput");

// Updating the max price input and filtering products when the slider is moved

priceRange.addEventListener("input", function(){
    const maxPrice = Number(priceRange.value);
   
    // Display the current maximum price in the input box on the right side
    maxPriceInput.value = `${maxPrice}`

    // Filtering products from the products array that have a price equal to or less than a specified value
    const filteredByPrice = allProducts.filter(function(item){
        const productPrice = Number(item.price);
        if (productPrice <= maxPrice) {
            return true;
        } else {
            return false;
        }
    })
    productsGrid.innerHTML = "";
    displayProducts(filteredByPrice);
    productCountText.innerText = `Showing ${filteredByPrice.length} products up to $${maxPrice}`;
})

// --- 8. SORT BY: Products ko sort karna ---
const sortSelect = document.getElementById("sortSelect");

sortSelect.addEventListener("change", function(){
    const sortValue = sortSelect.value;

    // Create a copy [...allProducts] to avoid mutating the original allProducts array
    let sortedProducts = [...allProducts];
    if (sortValue === "price-asc") {
        // From lower price to higher price
        sortedProducts.sort(function(a, b){
            const sortResultLower = Number(a.price) - Number(b.price);
            return sortResultLower
        });
    } else if(sortValue === "price-desc"){
        // From higher price to lower price
        sortedProducts.sort(function(a, b){
            const sortResultHigher = Number(b.price) - Number(a.price)
            return sortResultHigher
        })
    }
    productsGrid.innerHTML = "";
    displayProducts(sortedProducts);
    productCountText.innerText = `Showing ${sortedProducts.length} products (${sortSelect.options[sortSelect.selectedIndex].text})`
})
