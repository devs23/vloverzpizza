let carts=document.querySelectorAll('.add-cart');

let products=[
    {
        name:"Margherita",
        tag:"margherita",
        price:3,
        inCart:0
    },
    {
        name:"Peppy Paneer",
        tag:"peppypaneer",
        price:4,
        inCart:0
    },
    {
        name:"Deluxe Veggie",
        tag:"deluxeveggie",
        price:2,
        inCart:0
    },
    {
        name:"Cheese N Corn",
        tag:"cheesencorn",
        price:3,
        inCart:0
    },
    {
        name:"Double Cheese Margherita",
        tag:"doublecheesemargherita",
        price:4,
        inCart:0
    },
    {
        name:"Veg Extravaganza",
        tag:"vegextravaganza",
        price:5,
        inCart:0
    }
];
for (let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
function onloadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;

    }
}
function cartNumbers(product) {
    let productNumbers=localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers + 1);
        document.querySelector('.cart span').textContent=productNumbers + 1;
    } else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent=1;
    }
    
    setItems(product);
 }
 function setItems(product){
     let cartItems=localStorage.getItem('productsInCart');
     cartItems=JSON.parse(cartItems);
     if(cartItems !=null){
         if(cartItems[product.tag]==undefined){
             cartItems={
                 ...cartItems,
                 [product.tag]:product
             }
         }
         cartItems[product.tag].inCart +=1;
     } else{
        product.inCart=1;
        cartItems={
            [product.tag]:product
        }
     }
     localStorage.setItem("productsInCart",JSON.stringify(cartItems))
 }
 function totalCost(product){
     //console.log("fghhjjj",product.price);
     let cartCost =localStorage.getItem('totalCost');

     if(cartCost!=null){
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost + product.price);
     } else{
        localStorage.setItem("totalCost",product.price);
     }
 }
 function displayCart(){
     
     let cartItems=localStorage.getItem("productsInCart");
     cartItems=JSON.parse(cartItems);
     let productContainer=document.querySelector(".products");
     let cartCost=localStorage.getItem('totalCost');
     if (cartItems && productContainer){
        productContainer.innerHTML='';
        Object.values(cartItems).map(item =>{
           productContainer.innerHTML += `
            <div class="products-container"> 
                <div class="product-title">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQmIPp04K_3aDX9C-ETXQ4BnJksJZvN0K0iwn0nu6eerQAX1nQZ&usqp=CAU" width="120" height="120">
                    <h5>${item.name}</h5>
                </div>
                <div class="price">$${item.price}.00</div>   
                <div class="quantity">
                    <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon class="decrease" name="arrow-dropright-circle"></ion-icon>
                </div>
                <div class="total">
                    $${item.inCart*item.price}.00
                </div>

            `
        });
        productContainer.innerHTML +=`
            <div class="basketTotalContainer">
                <h2 class="basketTotalTitle">
                    Basket Total
                </h2>
                <h2 class="basketTotal">
                    $${cartCost},00
                </h2>
        
        `;
     }
    }

 onloadCartNumbers();
 displayCart();
