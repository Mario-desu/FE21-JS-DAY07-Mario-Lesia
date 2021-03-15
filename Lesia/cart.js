/*   
let node = document.getElementById("container");
node.addEventListener("click", function (e) {
    //console.log(e.target.nodeName);
});
*/

function documentReady() {
    let insertBtns = document.getElementsByClassName('product-button');
    for (let i = 0; i < insertBtns.length; i++) {
        let insertBtn = insertBtns[i];
        insertBtn.addEventListener("click", addItem);
    }

    let plusBtns = document.getElementsByClassName('plus');
    for (let i = 0; i < plusBtns.length; i++) {
        let plusBtn = plusBtns[i];
        plusBtn.addEventListener("click", plusQtt);
    }

    let minusBtns = document.getElementsByClassName('minus');
    for (let i = 0; i < minusBtns.length; i++) {
        let minusBtn = minusBtns[i];
        minusBtn.addEventListener("click", minusQtt);
    }
    let delItemBtns = document.getElementsByClassName('del');
    for (let i = 0; i < delItemBtns.length; i++) {
        let delBtn = delItemBtns[i];
        delBtn.addEventListener("click", delItem);
    }

    let btnPurchase = document.getElementById("btn-purchase");
    btnPurchase.addEventListener("click", purchase);
}
documentReady();


function addItem(e) {
    let item = e.target.parentElement.parentElement;
    let title = item.querySelector('.product-title').innerText;
    let price = item.querySelector('.product-price').innerText.replace("€", "");
    let picSrc = item.querySelector('.product-image').src;
    // console.log(title, price, picSrc);
    rowCreate(title, price, picSrc);
    updateTotal();

}

function rowCreate(title, price, picSrc) {
    let cartItems = document.getElementById('cart-items');
    let cartItemsNames = cartItems.getElementsByClassName('cart-item-title');
    let cartItemQtt = cartItems.getElementsByClassName('cart-quantity');
    let availability = Math.floor((Math.random() * 5) + 1);
    let actualAvailability = cartItems.querySelector('.cart-availability');
    
    for (let i = 0; i < cartItemsNames.length; i++) {
        let qtt = Number(cartItemQtt[i].innerHTML);
        actualAvailability = Number(actualAvailability.innerHTML);
        console.log(qtt);
        console.log(actualAvailability);

        if (cartItemsNames[i].innerText == title) {

            
            if (actualAvailability > qtt) {
                cartItemQtt[i].innerHTML = qtt + 1;
            } else {
                alert("It's only " + qtt + " flower(s) available");
            }

            console.log(qtt);
            updateTotal();
            return;//it will stop our script

        }

    }

    
    let item = `
    <div class="cart-row row d-flex ">
        <div class="cart-item col-4 my-3 ">
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

        <span class="cart-availability col-2 h4 my-3">${availability}</span>
    </div>`;
    let cart = document.getElementById('cart-items');
    cart.innerHTML += item;
    documentReady();
}

function updateTotal() {
    let cart = document.getElementById("cart-items");
    let cartRows = cart.getElementsByClassName("cart-row");
    let total = 0; // it will be calculated from zero each time it is updated
    let quantItems = 0;
    let discountPrice = 0;

    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let price = parseFloat(cartRow.getElementsByClassName("cart-price")[0].innerText.replace("€", ""));//we need the first one
        let qtt = Number(cartRow.getElementsByClassName("cart-quantity")[0].innerText);
        //console.log(price, qtt);
        total += (price * qtt); 
        if (total >= 10) {
            discountPrice += total * 0.9;
        } else {
            discountPrice = 0;
        }
        quantItems += qtt;
        //console.log(quantItems);
        //console.log(total); 
    }
    
    //console.log(cartRows.length);
    total = total.toFixed(2);     //toFixed() will help rounding the number to 2 decimals
    discountPrice = discountPrice.toFixed(2);

    let totalElement = document.getElementById("total").querySelector('#price');
    let totalItems = document.getElementById("total").querySelector('#total-item');
    let totalDiscountPrice = document.getElementById("total").querySelector('#discount');
    // alternative let totalElement = document.getElementById("price");

    totalElement.innerHTML = "€" + total;
    totalItems.innerHTML = quantItems;
    totalDiscountPrice.innerHTML = "€" + discountPrice;
}

function plusQtt(e) {
    let itemPlus = e.target.parentElement;
    let itemPlus2 = e.target.parentElement.parentElement; //added to target availability
    let qtt = Number(itemPlus.querySelector('.cart-quantity').innerHTML);

    let availability = Number(itemPlus2.querySelector('.cart-availability').innerHTML); // added
    if (availability > qtt) {
        itemPlus.querySelector('.cart-quantity').innerHTML = qtt + 1;
    } else {
        alert("It's only " + qtt + " flower(s) available");
    }
        
    console.log(qtt);
    updateTotal();
}

function minusQtt(e) {
    let itemMinus = e.target.parentElement.parentElement;
    let qtt = Number(itemMinus.querySelector('.cart-quantity').innerHTML);
    if (qtt == 1) {
        console.log("There shouldn't be 0 products in the cart");
        delItem(e);
    } else {
        itemMinus.querySelector('.cart-quantity').innerHTML = qtt - 1;
        console.log(qtt);
        updateTotal();
    }
}

function delItem(e) {
    let delBtnAction = e.target.parentElement.parentElement.remove();
    updateTotal();
}

function purchase() {
    alert("Thank you for buying with us.");
    let cartItems = document.getElementById('cart-items');
    console.log(cartItems);
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    // cartItems.innerHTML = "";
    updateTotal();
}
