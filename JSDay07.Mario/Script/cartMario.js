/**
 * JavaScript Shopping Cart
 */

/*Wrap it up all loops into a function called documentReady().*/

function documentReady() {
    /*1. select all buttons  with a loop, which add elements to cart (by click),
    add event (function add Item) */
    let insertBtns = document.getElementsByClassName('product-button');
    for (let i = 0; i < insertBtns.length; i++) {
        let insertBtn = insertBtns[i];
        insertBtn.addEventListener("click", addItem);
    }
    /*5. select all Plus-buttons  with a loop, which change qtt (by click),
    add event (function plusQtt) */
    let plusBtns = document.getElementsByClassName('plus');
    for (let i = 0; i < plusBtns.length; i++) {
        let plusBtn = plusBtns[i];
        plusBtn.addEventListener("click", plusQtt);
    }
    /*7. select all Minus-buttons  with a loop, which change qtt (by click),
    add event (function minusQtt) */
    let minusBtns = document.getElementsByClassName('minus');
    for (let i = 0; i < minusBtns.length; i++) {
        let minusBtn = minusBtns[i];
        minusBtn.addEventListener("click", minusQtt);
    }
     /*10. select all delete-buttons  with a loop, which delete item (by click),
    add event (function delItem) */
    let delItemBtns = document.getElementsByClassName('del');
    for (let i = 0; i < delItemBtns.length; i++) {
        let delBtn = delItemBtns[i];
        delBtn.addEventListener("click", delItem);
    }

    let btnPurchase = document.getElementById("btn-purchase");
    btnPurchase.addEventListener("click", purchase);
}
documentReady();

/* 2. create function to add items to the cart*/
function addItem(e) {
    let item = e.target.parentElement.parentElement;/*target element
    but we only need following items, so we get the info we need from the text 
    included in element, create variables for the 3 infos, which will create parameters
    for the rowCreate function*/
    let title = item.querySelector('.product-title').innerText;
    let price = item.querySelector('.product-price').innerText.replace("€", "");
    let picSrc = item.querySelector('.product-image').src;
    // console.log(title, price, picSrc);
    rowCreate(title, price, picSrc);
    updateTotalPrice();// also update total when adding item 

}
/* 3. func to create item in the cart*/
function rowCreate(title, price, picSrc) {
    /*in which html-elementwe put cart entry:*/
    let cartItems = document.getElementById('cart-items'); 
    /*in which child el. we put Item name: */
    let cartItemsNames = cartItems.getElementsByClassName('cart-item-title');
     /*in which child el. we put Item name: */
    let cartItemQtt = cartItems.getElementsByClassName('cart-quantity');
    /*to prevent double entries, instead icrease qtt by 1*/
    /*get all cardItemsNames (in cart-element) with loop and compare
    with title in button*/
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("This item already exists in your cart");
            let qtt = Number(cartItemQtt[i].innerHTML);
            cartItemQtt[i].innerHTML = qtt + 1;
            console.log(qtt);
            updateTotalPrice();
            return;//it will stop our script

        }

    }
    let item = `
    <div class="cart-row row d-flex ">
        <div class="cart-item col-6 my-3 ">
            <img class="cart-item-image" src="${picSrc}" width="100" height="100">
            <span class="cart-item-title h5 ">${title}</span>
        </div>
        
        <span class="cart-price col-3 h4 my-3">€ ${price}</span>
       
        <div class="cart-qtty-action col-3 d-flex">            
            <i class="minus fa fa-minus-circle my-auto" ></i>            
            <div class="cart-quantity p-4 h4">1</div>            
            <i class="plus fa fa-plus-circle my-auto"></i>         
            <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
        </div>
    </div>`;
    let cart = document.getElementById('cart-items');
    //insert item in cart-items element:
    cart.innerHTML += item;
    //insert function to
    documentReady();
}


/* 4. create func to update total price after adding items. */
function updateTotalPrice() {
    let cart = document.getElementById("cart-items");
    let cartRows = cart.getElementsByClassName("cart-row");/*find el. to target for loop*/
    let totalPrice = 0; // it will be calculated from zero each time it is updated
    /* looping through each item and multiplying quantities from each item for its prices and adding them all together*/
    let totalQtt = 0;// added for Quantity total
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];//variable to store value from element
        /*get value from text in element cart-price*/
        let price = parseFloat(cartRow.getElementsByClassName("cart-price")[0].innerText.replace("€", ""));//we need the first one
        let qtt = Number(cartRow.getElementsByClassName("cart-quantity")[0].innerText);
        console.log(price, qtt);
        totalQtt += qtt;
        totalPrice += (price * qtt);//add total to zero
        console.log(totalPrice);
    }
    totalPrice = totalPrice.toFixed(2);//toFixed() will help rounding the number to 2 decimals
    //add Result of totalPrice to total-el-price
    let totalElementPrice = document.getElementById("total").querySelector('#price');
    // console.log(total);
    totalElementPrice.innerHTML = "€" + totalPrice;
    //add Result of totalQtt to total-el-qtt
    let totalElementQtt = document.getElementById("total").querySelector('#qtt');
    totalElementQtt.innerHTML = totalQtt;

    let discount = 0.9;// 10% discount
    let totalWithDisc = (totalPrice * discount).toFixed(2);//total price - discount
    let discAmount = (totalPrice - totalWithDisc).toFixed(2);//amount reduced from total 
    let elementDisc = document.getElementById("total").querySelector('#discount')
    if (totalPrice >= 50){
        
        totalElementPrice.innerHTML = "€" + totalWithDisc;
        elementDisc.innerHTML = "€" + discAmount;

    }
}






// 6. increase qtt of item with + Button
function plusQtt(e) {
    let itemPlus = e.target.parentElement;
    //Element to target
    //change value in element to float
    let qtt = Number(itemPlus.querySelector('.cart-quantity').innerHTML);
    //insert number of quantity and insert it in el.
    itemPlus.querySelector('.cart-quantity').innerHTML = qtt + 1;
    console.log(qtt);
    updateTotalPrice();
}


// 8. decrease qtt of item with - Button
function minusQtt(e) {
    let itemMinus = e.target.parentElement.parentElement;
    //Element to target
    //change value in element to float
    let qtt = Number(itemMinus.querySelector('.cart-quantity').innerHTML);
    /*it throws a message to the console if you try to decrease when it is already 1 unit.*/
    if (qtt == 1) {
        console.log("There shouldn't be 0 products in the cart");
        // delItem(e);
    //otherwise number of Quantity will be decreased    
    } else {
        itemMinus.querySelector('.cart-quantity').innerHTML = qtt - 1;
        console.log(qtt);
        updateTotalPrice();
    }
}
// 11. Func to delete
function delItem(e) {
    let delBtnAction = e.target.parentElement.parentElement.remove();
    //Element to target
    updateTotalPrice();
}

function purchase() {
    alert("Thank you for buying with us.");
    let cartItems = document.getElementById('cart-items');
    console.log(cartItems);
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    // cartItems.innerHTML = "";
    updateTotalPrice();
}
