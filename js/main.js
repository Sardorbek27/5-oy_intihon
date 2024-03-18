

let addBtn = document.querySelector(".add-btn");
let tBody = document.querySelector(".tbody");
let tHead = document.querySelector(".thead")

let elModalWrapper = document.querySelector(".modal-wrapper");
let elModal = document.querySelector(".modal");

let elNavList = document.querySelector(".type-list");
let elItem1 = document.querySelector(".type-item:nth-child(1)");
let elItem2 = document.querySelector(".type-item:nth-child(2)");
let elItem3 = document.querySelector(".type-item:nth-child(3)");

let searchInput = document.querySelector(".search-input");
let searchList = document.querySelector(".search-list");

let orderProduct = JSON.parse(window.localStorage.getItem("orderProductList")) || []
let getdate = new Date()
let date = getdate.getHours() + ':' + getdate.getMinutes() + ':' + getdate.getSeconds()

elNavList.addEventListener("click", function(evt){
    if(evt.target.id){
        if(evt.target.id == 0){
            elItem1.style.color = "rgb(0, 147, 152)";
            elItem2.style.color = "rgb(166, 166, 166)";
            elItem3.style.color = "rgb(166, 166, 166)";
            renderProducts(products, tBody, evt.target.id);
        }
        else if(evt.target.id == 1){
            elItem2.style.color = "rgb(0, 147, 152)";
            elItem1.style.color = "rgb(166, 166, 166)";
            elItem3.style.color = "rgb(166, 166, 166)";
            renderProducts(products, tBody, evt.target.id);
        }
        else{
            elItem2.style.color = "rgb(166, 166, 166)";
            elItem1.style.color = "rgb(166, 166, 166)";
            elItem3.style.color = "rgb(0, 147, 152)";
            renderProducts(orderProduct, tBody, evt.target.id);
        }
        }
    }
);


let products = JSON.parse(window.localStorage.getItem('product')) || [];

addBtn.addEventListener('click', function(){
    elModalWrapper.classList.add("open-modal");
    elModal.innerHTML = `
        <form class="add-form">
            <label>
                <div class="form-img__wrapper">
                    <span>Upload image: ➡</span> 
                    <img class="form-img render-img" src="./images/choose.png" />
                </div>
                <input class="visually-hidden get-img" required type="file"/>
            </label>
            <div class="category-wrap">
                <div class="category-left">
                    <label class="category-title">
                        <span>Name:</span>
                        <input class="category-input" required type="text" placeholder="Name"/>
                        <i class="fa-solid fa-check category-icon"></i>
                    </label>
                    <label class="category-title">
                        <span>Email:</span>
                        <input class="category-input" required type="email" placeholder="Email"/>
                        <i class="fa-solid fa-envelope category-icon"></i>
                    </label>
                    </div>
                <div class="category-right">
                    <label class="category-title">
                        <span>Phone:</span>
                        <input class="category-input" required type="number" placeholder="Phone number"/>
                        <i class="fa-solid fa-phone category-icon"></i>
                    </label>

                <label class="category-title">
                <span>Enroll number:</span>
                <input class="category-input" type="text" placeholder="Enroll number"/>
                <i class="fa-solid fa-id-badge category-icon"></i>
            </label>
            <label class="category-title select_option">
                <span>Choose type:</span>
                <select class="category-input">
                </select>
                <i class="fa-regular fa-file category-icon"></i>
            </label>
            <label class="category-title select_option">
                <span>Status:</span>
                <select class="category-input category-icon">
                </select>
            </label>
                </div>
            </div>
            <button class="add-form__btn">Comfirm</button>
        </form>
    `;

    let elForm = document.querySelector(".add-form");
    let elInputChange = document.querySelector(".get-img")
    let elRenderImg = document.querySelector(".render-img")

    elInputChange.addEventListener("change", function(evt){        
        elRenderImg.src = URL.createObjectURL(evt.target.files[0]);
        
    });

    elForm.addEventListener("submit", function(evt){
        evt.preventDefault();
        let data = {
            id: products.length ? products[products.length - 1].id + 1: 1,
            img: URL.createObjectURL(evt.target[0].files[0]), //img
            name: evt.target[1].value, //name
            oldPrice: evt.target[2].value, //email
            newPrice: evt.target[3].value, //telefon
            quantity: evt.target[4].value, // 'en'
            type: evt.target[5].value, 
            status: evt.target[6].value 
        };
        products.push(data);
        renderProducts(products, tBody, evt.target[5].value);
        elModalWrapper.classList.remove("open-modal");
        window.localStorage.setItem('product', JSON.stringify(products));
        
    });
});
console.log(products);
elModalWrapper.addEventListener("click", function(evt){
    if(evt.target.id == "modal-wrapper"){
        elModalWrapper.classList.remove("open-modal");
    }
});

function renderProducts(arr, list, id){
    list.innerHTML = "";
    arr.filter(item => {
        if(item.type == id){
            let elTr = document.createElement('tr');

            elTr.innerHTML = `
                <td class="table-items border-l">
                    <img class="table-img" src="${item.img}" alt = "render img"/>
                    <span class='table_name'>${item.name}</span>
                </td>
                <td class="table-items">
                    <span>${item.oldPrice}</span>
                </td>
                <td class="table-items">
                    <span>${item.newPrice}</span>
                </td>
                <td class="table-items">${item.quantity}</td>
                <td class="table-items">${date}</td>
                <td class="table-items border-r">
                    <div class="btn-flex">
                        <button onclick="updateProduct(${item.id})" class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                        <button onclick="deleteProduct(${item.id})" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            `;
            list.appendChild(elTr);
        }
    });
}
renderProducts(products, tBody, 0);






// update start
function updateProduct(id){
    let data = products.find(item => item.id == id);

    elModalWrapper.classList.add("open-modal");
    elModal.innerHTML = `
        <form class="update-form">
            <label>
                <div class="form-img__wrapper">
                    <span>Upload image: ➡</span> 
                    <img class="form-img update-render-img" src=${data.img} />

                </div>
                <input class="visually-hidden update-get-img" type="file"/>
            </label>
            <div class="category-wrap">
                <div class="category-left">
                    <label class="category-title">
                        <span>Name:</span>
                        <input value=${data.name} class="category-input" type="text" placeholder="Name"/>
                        <i class="fa-solid fa-check category-icon"></i>
                    </label>
                    <label class="category-title">
                        <span>Email:</span>
                        <input value=${data.oldPrice} class="category-input" required type="email" placeholder="Email"/>
                        <i class="fa-solid fa-phone category-icon"></i>
                    </label>
                    </div>

                <div class="category-right">
                    <label class="category-title">
                        <span>Phone:</span>
                        <input value=${data.newPrice} class="category-input" type="text" placeholder="Phone number"/>
                        <i class="fa-solid fa-envelope category-icon"></i>
                    </label>
                <label class="category-title">
                <span>Enroll number:</span>
                <input value=${data.quantity} class="category-input" type="text" placeholder="Enroll number"/>
                <i class="fa-solid fa-phone category-icon"></i>
            </label>
            <label class="category-title select_option">
                <span>Choose type:</span>
                <select class="category-input update-type-select">
                </select>
                <img class="category-icon" src="./images/category.svg" width="20" height="20"/>
            </label>
            <label class="category-title select_option">
                <span>Status:</span>
                <select class="category-input update-status-select">
                </select>
                <img class="category-icon" src="./images/status.svg" width="20" height="20"/>
            </label>
                </div>
            </div>
            <button class="add-form__btn">Save changes</button>
        </form>
    `;
    let elUpdateForm = document.querySelector(".update-form");
    let elTypeSelect = document.querySelector(".update-type-select");
    let elStatusSelect = document.querySelector(".update-status-select");
    let elUpdateImgInput = document.querySelector(".update-get-img");
    let elUpdateImg = document.querySelector(".update-render-img");

    elTypeSelect.value = data.type;
    elStatusSelect.value = data.status;

    elUpdateImgInput.addEventListener("change", function(evt){        
        elUpdateImg.src = URL.createObjectURL(evt.target.files[0]);
        
    });

    elUpdateForm.addEventListener("submit", function(evt){
        evt.preventDefault();
        data.img = elUpdateImg.src
        data.name = evt.target[1].value
        data.oldPrice = evt.target[2].value
        data.newPrice = evt.target[3].value
        data.quantity = evt.target[4].value
        data.type = evt.target[5].value
        data.status = evt.target[6].value

        renderProducts(products, tBody, evt.target[5].value);
        elModalWrapper.classList.remove("open-modal");
        window.localStorage.setItem('product', JSON.stringify(products));
            if(evt.target[5].value == 0){
                elItem1.style.color = "rgb(0, 147, 152)";
                elItem2.style.color = "rgb(166, 166, 166)";
            }
            else{
                elItem2.style.color = "rgb(0, 147, 152)";
                elItem1.style.color = "rgb(166, 166, 166)";
            }
    })
}
// update end

// delete start

function deleteProduct(id){
    const findObj = products.find(item => item.id == id)
    let data = products.findIndex(item => item.id == id);
    products.splice(data, 1);
    renderProducts(products, tBody, findObj.type)
    window.localStorage.setItem('product', JSON.stringify(products));
}

// delete end

// search start
searchInput.addEventListener("blur", function(evt){
    setTimeout(function() {
        searchList.classList.remove("open-list");
    }, 200);
});


searchInput.addEventListener("keyup", function(evt) {
    let data = products.filter(item => item.name.toLowerCase().includes(evt.target.value.toLowerCase()));
  
    searchList.innerHTML = "";
    data.map(item => {
      let listItem = document.createElement("li");
      listItem.dataset.id = item.id;
      listItem.className = "search-item";
      listItem.textContent = `${item.name} - ${item.newPrice}`;
      searchList.appendChild(listItem);
  
      listItem.addEventListener("click", function(evt) {
        let clickedId = evt.target.dataset.id;
        let dataClick = products.find(item => item.id == clickedId);
        searchInput.value = `${dataClick.name} - ${dataClick.newPrice}`;
  
        let searchFilter = products.filter(item => item.id == clickedId);
        renderProducts(searchFilter, tBody, dataClick.type);
        window.localStorage.setItem('product', JSON.stringify(products));
  
        if (dataClick.type == 0) {
          elItem1.style.color = "rgb(0, 147, 152)";
          elItem2.style.color = "rgb(166, 166, 166)";
        } else {
          elItem2.style.color = "rgb(0, 147, 152)";
          elItem1.style.color = "rgb(166, 166, 166)";
        }
      });
    });
  
    if (evt.target.value) {
      searchList.classList.add("open-list");
    } else {
      searchList.classList.remove("open-list");
  
      elItem1.style.color = "rgb(0, 147, 152)";
      elItem2.style.color = "rgb(166, 166, 166)";
  
      renderProducts(products, tBody, 0);
    }
  })

// search end





//  LOGIN Submit 




function auth() {
    var loginEmail=document.getElementById('loginEmail').value;
    var passwordCode=document.getElementById('passwordCode').value;

    if(loginEmail==='sardorbek@gmail.com' && passwordCode===27082004){
            window.location.assign('main.html');
            return alert("Login Succesufully");
        
    }
    else{
        alert("Wrong Email or Password !");
        return false;
    }
}



// let linkToMain = document.querySelector("main.html")

// linkToMain.addEventListener
// loginForm.addEventListener("submit",(evt)=>{
//     evt.preventDefault()

//     const Email = loginForm.loginEmail.value
//     const Code = loginForm.passwordCode.value

//     const authenticated = authentication(loginEmail, passwordCode)
    
//     // if (authenticated) {
//     //     alert("Login Succesufully")
//     // }
//     // else{
//     //     alert("Wrong Email of Password")
//     // }
// })

// function authentication(Email, Code) {
//     if (Email === "sardorbek@gmail.com" && Code === "oxshadi") {
//         loginForm.src.classList.add('action="main.html"')
//         return true;
//     }
//     else{
//         return false;
//     }
// }















// LOGOUT start

function logout() {
    localStorage.removeItem('loggedIn');

    window.location.assign('index.html');
}
//LOGOUT end



//  Avatar Image Change start



imageAvatar.addEventListener("change", function(evt){
    user_img.src = URL.createObjectURL(evt.target.files[0])
    window.localStorage.setItem(user_img)
})




// function changeImage() {
//     var img = document.getElementById('imageAvatar')
//     img.src = URL.createObjectURL(evt.target[0].files[0])
// }

//  Avatar Image Change end




// Define a function to render sorted products
function renderSortedProducts(arr, list, id, sortBy) {
    // Sort the array based on the specified property
    arr.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
    });

    // Render the sorted products
    renderProducts(arr, list, id);
}

// Example: Sorting by product name
// Assume you have a button with id "sortByNameBtn" for sorting by name
let sortByNameBtn = document.getElementById("user_img");
sortByNameBtn.addEventListener("click", function() {
    // Assuming you want to sort products currently displayed in the table body
    renderSortedProducts(products, tBody, 0, "name");
});
