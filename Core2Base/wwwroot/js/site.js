﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


$('.carousel').carousel({
    interval: 2000
})

$(document).on("click", ".plusButton", function (e) {
    numberInCart = $(this).prev();
    let counter = 1;
    if (numberInCart.val() < 99) {
        numberInCart.val(parseInt(numberInCart.val(), 10) + counter);
    }
    if (numberInCart.val() >= 99) {
        numberInCart.val(parseInt(numberInCart.val(), 10) + 0);
        alert("Sorry, The purchase limit for each product is 99.");
    }
});

$(document).on("click", ".minusButton", function (e) {
    numberInCart1 = $(this).next()
    let counter = 1;
    if (numberInCart1.val() > 1 && numberInCart.val() != 0) {
        numberInCart1.val(parseInt(numberInCart1.val(), 10) - counter);
    }
});

$(document).on("keyup", ".quantity", function (e) {
    if ($(this).val() < 1 && $(this).val() != ' ') {
        alert("Sorry, the minimum purchase quantity is 1. Please click the Remove All button to remove product from your cart.");
    }

    if ($(this).val() >= 99) {
        alert("Sorry, The purchase limit for each product is 99.");
    }

    if (/^[0-9]*$/.test($(".quantity").val()) == false) {
        alert("Sorry, no special characters or alphabets are allowed in quantity field.");
    }
});

//var currentItems = 0;
//$(document).ready(function () {

//    $(".add-to-cart").click(function () {
//        currentItems++;
//        $(".qtyInCart").text(currentItems);
//    });
//});

$('.search-button').click(function () {
    if ($.trim($('.searchbar').val()) == '' && ($('.searchbar').val()) != '')
        alert('Input is blank. Please fill in your search parameters');
});

window.onload = function () {
    let elemList = document.getElementsByName("add-to-cart");
    let elemList1 = document.getElementsByName("subtract-from-cart");
    let elemList2 = document.getElementsByName("remove-from-cart");

    for (let i = 0; i < elemList.length; i++) {
        elemList[i].addEventListener("click", onAdd);
    }
    for (let j = 0; j < elemList1.length; j++) {
        elemList1[j].addEventListener("click", onSubtract);
    }
    for (let k = 0; k < elemList2.length; k++) {
        elemList2[k].addEventListener("click", onRemove);
    }
}

function onAdd(event) {
    let elem = event.currentTarget;
    let elemId = elem.getAttribute("id");

    addcartlogin(elemId);
}

function addcartlogin(elemId) {
    let xhr = new XMLHttpRequest();

    xhr.open("Post", "/ShoppingCart/AddtoCart");
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf8");
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            // check if HTTP operation is okay
            if (this.status !== 200)
                return;

            let data = JSON.parse(this.responseText);

            if (!data.success)
                return;

            let elem = document.getElementById(elemId);
            if (!elem)
                return;
            $("#shoppingcartnumber").load(" #shoppingcartnumber > *");
            $("#shoppingCartTable").load(" #shoppingCartTable > *", function () {
                let elemList = document.getElementsByName("add-to-cart");
                let elemList1 = document.getElementsByName("subtract-from-cart");
                let elemList2 = document.getElementsByName("remove-from-cart");

                for (let i = 0; i < elemList.length; i++) {
                    elemList[i].addEventListener("click", onAdd);
                }
                for (let j = 0; j < elemList1.length; j++) {
                    elemList1[j].addEventListener("click", onSubtract);
                }
                for (let k = 0; k < elemList2.length; k++) {
                    elemList2[k].addEventListener("click", onRemove);
                }
        });
            return;
        }
    }

    xhr.send(JSON.stringify({ productid: elemId }));
}

function onSubtract(event) {
    let elem1 = event.currentTarget;
    let elem1Id = elem1.getAttribute("id");

    subtractcartlogin(elem1Id);

}

function subtractcartlogin(elem1Id) {
    let xhr = new XMLHttpRequest();

    xhr.open("Post", "/ShoppingCart/SubtractFromCart");
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf8");
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            // check if HTTP operation is okay
            if (this.status !== 200)
                return;

            let data = JSON.parse(this.responseText);

            if (!data.success)
                return;

            let elem1 = document.getElementById(elem1Id);
            if (!elem1)
                return;
                $("#shoppingcartnumber").load(" #shoppingcartnumber > *");
                $("#shoppingCartTable").load(" #shoppingCartTable > *", function () {
                let elemList = document.getElementsByName("add-to-cart");
                let elemList1 = document.getElementsByName("subtract-from-cart");
                let elemList2 = document.getElementsByName("remove-from-cart");

                for (let i = 0; i < elemList.length; i++) {
                    elemList[i].addEventListener("click", onAdd);
                }
                for (let j = 0; j < elemList1.length; j++) {
                    elemList1[j].addEventListener("click", onSubtract);
                }
                for (let k = 0; k < elemList2.length; k++) {
                    elemList2[k].addEventListener("click", onRemove);
                }
        });
            return;
        }
    }

    xhr.send(JSON.stringify({ productid: elem1Id }));
}

function onRemove(event) {
    let elem = event.currentTarget;
    let elemId = elem.getAttribute("id");

    removecartlogin(elemId);
}

function removecartlogin(elem2Id) {
    let xhr = new XMLHttpRequest();

    xhr.open("Post", "/ShoppingCart/RemoveFromCart");
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf8");
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            // check if HTTP operation is okay
            if (this.status !== 200)
                return;

            let data = JSON.parse(this.responseText);

            if (!data.success)
                return;

            let elem2 = document.getElementById(elem2Id);
            if (!elem2)
                return;
            $("#shoppingcartnumber").load(" #shoppingcartnumber > *");
            $("#shoppingCartTable").load(" #shoppingCartTable > *", function () {
                let elemList = document.getElementsByName("add-to-cart");
                let elemList1 = document.getElementsByName("subtract-from-cart");
                let elemList2 = document.getElementsByName("remove-from-cart");

                for (let i = 0; i < elemList.length; i++) {
                    elemList[i].addEventListener("click", onAdd);
                }
                for (let j = 0; j < elemList1.length; j++) {
                    elemList1[j].addEventListener("click", onSubtract);
                }
                for (let k = 0; k < elemList2.length; k++) {
                    elemList2[k].addEventListener("click", onRemove);
                }
        });
            return;
        }
    }

    xhr.send(JSON.stringify({ productid: elem2Id }));
}

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
    //toggle the type of attribute

    const type = password.getAttribute('type') === 'password' ? 'text' : 'password'
    password.setAttribute('type', type);


    //toggling eye slash icon

    this.classList.toggle("fa-eye-slash")
});

const togglePassword2 = document.querySelector('#togglePassword2');
const password2 = document.querySelector('#confirmpassword');

togglePassword2.addEventListener('click', function (e) {
    //toggle the type of attribute

    const type = password2.getAttribute('type') === 'password' ? 'text' : 'confirmpassword'
    password2.setAttribute('type', type);


    //toggling eye dropper icon

    this.classList.toggle("fa-eye-dropper")
});
