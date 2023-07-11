//get elements
let products, productName, productPrice, productCategory, productDes, add, update, index, search;
products = [];
productName = document.getElementById("productName");
productPrice = document.getElementById("productPrice");
productCategory = document.getElementById("productCategory");
productDes = document.getElementById("productDes");
add = document.getElementById("add");
update = document.getElementById("update");
search = document.getElementById("search");

// caling check method
checkLocalStorage();

// add products to the table
add.addEventListener("click", () => {
    if (productName.value && productPrice.value && productCategory.value && productDes.value) {
        const product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            des: productDes.value,
        }
        clearDate();
        products.push(product);
        updateData();
    } else {
        document.getElementById("exampleModal").style.display = "block";
    }

})

// update products to the table
update.addEventListener("click", () => {
    if (productName.value && productPrice.value && productCategory.value && productDes.value) {
        products[index].name = productName.value;
        products[index].price = productPrice.value;
        products[index].category = productCategory.value;
        products[index].des = productDes.value;
        clearDate();
        updateData();
        display("block", "none");
    } else {
        document.getElementById("exampleModal").style.display = "block";
    }

})


// search products
search.addEventListener("input", (e) => {
    displyProducts(products, "search", e.target.value);
})


// clear inputs
function clearDate() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDes.value = "";
}

// fill inputs
function fillDate(i) {
    productName.value = products[i].name;
    productPrice.value = products[i].price;
    productCategory.value = products[i].category;
    productDes.value = products[i].des;
}

// display products
function displyProducts(products, type, value) {
    let pr = "";
    if (type) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.includes(value)) {
                pr += rowTable(i);
            }
        }
    } else {
        for (let i = 0; i < products.length; i++) {
            pr += rowTable(i);
        }
    }
    document.querySelector("tbody").innerHTML = pr;
}

// check local storage
function checkLocalStorage() {
    if (localStorage.getItem("products")) {
        products = JSON.parse(localStorage.getItem("products"));
        displyProducts(products);
    }
}

// delete product function
function deleteProduct(i) {
    if (update.style.display == "block" && i === index) {
        clearDate();
        display("block", "none");
    }
    products.splice(i, 1);
    updateData();
}

// update product function
function updateProduct(i) {
    fillDate(i);
    index = i;
    display("none", "block");
}

// update table and local storage data
function updateData() {
    displyProducts(products);
    localStorage.setItem("products", JSON.stringify(products));
}

// close function for warning empty fields
function closeButton() {
    document.getElementById("exampleModal").style.display = "none";
}

// display block-none
function display(btnAdd, btnUpdate) {
    add.style.display = btnAdd;
    update.style.display = btnUpdate;
}

// creating row table
function rowTable(i) {
    return `<tr>
<th scope="row">${i}</th>
<td>${products[i].name}</td>
<td>${products[i].price}</td>
<td>${products[i].category}</td>
<td>${products[i].des}</td>
<td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
<td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
</tr>`;
}