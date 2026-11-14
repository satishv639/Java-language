// DOM Elements select
const userForm = document.getElementById("user-form");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userMobile = document.getElementById("user-mobile");
const userDob = document.getElementById("user-date");
const userProfile = document.getElementById("user-profile");
const userList = document.getElementById("user-list");
const userSearch = document.getElementById("user-search");
const userAllDelete = document.getElementById("delete-all-btn");
const paginationNumber = document.querySelector(".pagination-number");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let userSubmit = document.getElementById("submit-btn");
let userUpdate = document.getElementById("update-btn");

let userData = JSON.parse(localStorage.getItem("AlluserData")) || [];
let profileUrl = "";

// Pagination variables
let currentPage = 1;
let rowsPerPage = 3;


// 1. Add Product Function (Form Submit Event)
userForm.addEventListener("submit", function(e){
    e.preventDefault(); // Page reload stop

    let checkEmail = userData.find((data)=> data.email == userEmail.value);
    // console.log(checkEmail);
    if (!checkEmail) {
        userData.push ({
        id: Date.now().toString(), // Unique ID
        name: userName.value,
        email: userEmail.value,
        mobile: userMobile.value,
        date: userDob.value,
        profile: profileUrl == "" ? "profile.jpg" : profileUrl
    })
    saveDataToLocal();
    // Resetting form fields
    userForm.reset();
    userDataDisplay();
    profileUrl = "";
    alert("User registered successfully!");

    }else{
        alert("Email already exist");
    }
    
    
});


// Profile image reading
userProfile.addEventListener("change", function(){
    let fileReader =  new FileReader();

    fileReader.readAsDataURL(userProfile.files[0]);
    fileReader.addEventListener("load", function(e){
        profileUrl = e.target.result;
        // console.log(profileUrl);
    })
})

// 2. Display User Function
function userDataDisplay(displayData = userData ){
    userList.innerHTML = "";

    // --- The slice() method is being applied here ---
    let startIndex = (currentPage - 1) * rowsPerPage;
    let endIndex = startIndex + rowsPerPage;

    // This line will extract data only for the current page

    let paginatedData = displayData.slice(startIndex, endIndex)

    if (displayData.length === 0) {
        userList.innerHTML = `<tr><td colspan="7" style="text-align: center;">No products added yet.</td></tr>`;
        paginationNumber.innerHTML = "";
        prevBtn.disabled = true; // Disable preview if no data is available
        nextBtn.disabled = true;
        return
    }
    paginatedData.forEach((data, index) => {
        // For the correct serial numbers (e.g., if on page 2, then 4, 5, 6 should appear)
        const actualIndex = startIndex + index + 1;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index+1}</td>
            <td><img style="width:30px;" src="${data.profile}"/></td>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.mobile}</td>
            <td>${data.date}</td>
            <td><button class="btn edit-btn" onclick="userEdit('${data.id}')"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button id="${data.id}"  class="btn delete-btn"><i class="fa fa-trash"></i></button></td>
        `;
        userList.appendChild(tr);
    });
    deleteUser()
    setupPaginationButtons(displayData);
}
// delete user function

function deleteUser(){
    const deleteBtns = document.querySelectorAll(".delete-btn");

    deleteBtns.forEach(btn => {
        btn.addEventListener("click", function(){
            let userId = this.id;
            userData = userData.filter(function(data){
                return data.id !== userId
            });
            // LocalStorage update
            saveDataToLocal()
            // UI refresh
            userDataDisplay();
            alert("User deleted successfully!");

        })
    });
}


// 4. Edit User Function
function userEdit(id){
   // 1. Find the user that has a matching ID. 
   const userToEdit = userData.find(function(data){
        return data.id === id;
   });
   if(!userToEdit) return;
   
   // 2. Populate the form inputs with the existing data
   userName.value = userToEdit.name;
   userEmail.value = userToEdit.email;
   userMobile.value = userToEdit.mobile;
   userDob.value = userToEdit.date;
   profileUrl = userToEdit.profile;
   editId = id;
    
   userSubmit.setAttribute("disabled", "true");
   userUpdate.removeAttribute("disabled");
}

// Update Button Event 
userUpdate.addEventListener("click", function(){
    if(editId === null) return;

    let userToEdit = userData.find(function(e){
        return e.id === editId;
    });

    if (!userToEdit) return;
 
// --- New check: Does the new email belong to another user? ---
    let emailOwner = userData.find(function(data) {
        return data.email === userEmail.value && data.id !== editId;
    });

    if (emailOwner) {
        alert("This email is already used by another user!");
        return; // Stop it right here; don't let it update.
    }
    // ----------------------------------------------------------------

    // If the email does not conflict, update the data
    userToEdit.name = userName.value;
    userToEdit.email = userEmail.value;
    userToEdit.mobile = userMobile.value;
    userToEdit.date = userDob.value;
    userToEdit.profile = profileUrl;

    saveDataToLocal();
    
    // Resetting form fields
    userForm.reset();
    userDataDisplay();
    
    // Buttons aur state ko reset karna
    userSubmit.removeAttribute("disabled");
    userUpdate.setAttribute("disabled", "true");
    editId = null;
    profileUrl = "";

    alert("Data updated successfully!");
});


// Search 

function searchResult(){
    const searchTerm = userSearch.value.toLowerCase().trim();
    
    const filtered = userData.filter(item =>{
        const matchName = item.name.toLowerCase().includes(searchTerm);
        const matchEmail = item.email.toLowerCase().includes(searchTerm);
        const matchMobile = item.mobile.toLowerCase().includes(searchTerm);
        return matchName || matchEmail || matchMobile
    })
    console.log(filtered)
    userDataDisplay(filtered);
   
}
userSearch.addEventListener("input", function(){
    searchResult();
})

// Delete all data function
userAllDelete.addEventListener("click", function(){
    userList.innerHTML = "";
    localStorage.removeItem("AlluserData");
    alert("All user data delete succesfully")
})

userDataDisplay();



// Helper function for saving to localStorage
function saveDataToLocal(){
    localStorage.setItem("AlluserData", JSON.stringify(userData));
}

// pagination  
function setupPaginationButtons(data){
    paginationNumber.innerHTML = "";
    let totalPages = Math.ceil(data.length / rowsPerPage);

    if(totalPages <= 1) {
        paginationNumber.innerHTML="";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return // If there is little data, buttons are not needed.
    } 

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.className = (i == currentPage) ? "num-btn active" : "num-btn";
        
        // When the user clicks on any page button
        btn.addEventListener("click", function(){
            currentPage = i;   // The current page will be updated
            userDataDisplay(data);  // The display function will run again with the new page
        })
        paginationNumber.appendChild(btn);
    }

    // 2. Here, the disabled state of the 'Previous' and 'Next' buttons is managed.
    prevBtn.disabled = (currentPage === 1);
    nextBtn.disabled = (currentPage === totalPages);
}
// --- NEXT BUTTON EVENT ---
nextBtn.addEventListener("click", function(){
    let totalPage = Math.ceil(userData.length / rowsPerPage);
    if (currentPage < totalPage) {
        currentPage++;    // The page number will increase by one
        userDataDisplay();  // The data for that page will be displayed
    }
})
// --- PREV BUTTON EVENT ---
prevBtn.addEventListener("click", function(){
     if(currentPage > 1){
        currentPage--;  // The page number will be one less
        userDataDisplay(); // The data for that page will be displayed
     }   
})