//light-dark theme
const moon = document.getElementById("moon");
const sun = document.getElementById("sun");
moon.addEventListener("click", () => {
  document.body.classList.toggle("darkTheme");
  if (document.body.classList.contains("darkTheme")) {
    sun.classList.remove("d-none");
    moon.classList.add("d-none");
  } else {
    sun.classList.add("d-none");
    moon.classList.remove("d-none");
  }
});

//product show

const cartItems=document.getElementById('cart-item')
const productCard = document.getElementById("productCard");
const subtotal=document.getElementById('subtotal')
const productItems = () => {
  products.forEach(product => {
    // console.log(product);
    const {
      name,
      brand,
      id,
      img,
      price,
      size
    } = product;
    productCard.innerHTML += `
    <div class="col-4 mb-4">
            <div class="card w-100 h-100 shadow border-none">
                                                    <img src="${img}" class="img-fluid w-100" alt="...">
                                                    <div class="card-body">
                                                    <h5 class="card-title">Brand Name : ${brand}</h5>
                                                    <p class="card-text">Size : ${size}</p>
                                                    <p class="card-text">Price : ${price}</p>
                                                    <button  onclick="details(${id})" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#detailsModal">
                                                    Get Details
                                                  </button>
                                                    <button class="btn btn-warning" onclick="addToCart(${id})"><i class="fa-solid fa-cart-shopping"></i></button>
                                                    </div>
                                </div>
                                </div>
        `;
  });
};


// get details 
const details = (datas) => {
  console.log(datas);

  document.getElementById('showDetails').innerHTML += `
    <div className="row container">
    <div className="col-12">
    <h1 class="modal-title text-center fs-2 mb-5" id="mealDetailsLabel"></h1>
    <hr>
    <div class="row p-4">
    <div class="col-6">
    <h4>brand: ${datas.brand}</h4>
    <h4>Category: ${datas.name}</h4>
    </div>
    <div class="col-6">
    <img src="${datas.img}" class="img-fluid w-100 rounded"/>
    </div>
    </div>
    </div>
    </div>
    `
}

productItems();


let cart =localStorage.getItem('CART');
updateCart();
const addToCart=(id)=>{
  console.log(id);
  if(cart.some(item=>item.id===id)){
    alert('product already added!');
    changeNumOfUnits('plus',id);
  }else{
    const item=products.find(product=>product.id===id);
    cart.push({
      ...item,
      numberOfUnits:1

    })
  }
 updateCart()
}

const updateCart=()=>{
  renderCartItems();
  calcSubtotal();

  localStorage.setItem('CART',JSON.stringify(cart));
}

const removeItems=(id)=>{
  cart=cart.filter(item=>item.id !== id)
  updateCart();
}

// calculate subtotal 
const calcSubtotal=()=>{
  let totalPrice=0;
  let totalItems=0;
  cart.forEach(item=>{
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  })
  subtotal.innerHTML=`Subtotal (${totalItems} items) : ${totalPrice.toFixed(2)}`
}

const renderCartItems=()=>{
  cartItems.innerHTML='';
  cart.forEach(item=>{
    console.log(item);
    cartItems.innerHTML+=`
    <div class="cart-item d-flex justify-content-center align-items-center gap-2">
                    <div class="item-info d-flex" onclick="removeItems(${item.id})">
                        <img src="${item.img}" alt="" class="img-fluid w-25">
                        <h4>${item.brand}</h4>
                    </div><!--/item-info-->
                    <h5 class="unit-price">
                        <small>$</small>${item.price}
                    </h5><!--/unit-price-->
                    <div class="units d-flex">
                        <div class="btn-minus" onclick="changeNumOfUnits('minus',${item.id})">-</div><!--/btn-minus-->
                        <div class="number">${item.numberOfUnits}</div><!--/number-->
                        <div class="btn-plus" onclick="changeNumOfUnits('plus',${item.id})">+</div><!--/btn-plus-->
                    </div><!--/units-->
                </div><!--/cart-item-->
    `

  })
}

// change num of units 

const changeNumOfUnits=(action,id)=>{
  cart=cart.map(item=>{
    let numberOfUnits=item.numberOfUnits;
    if(item.id===id){
      if(action === "minus" && numberOfUnits > 1){
        numberOfUnits--;
      }else if(action === "plus" && numberOfUnits < item.instock){
numberOfUnits++;
      }
    }
    return{
      ...item,
      numberOfUnits,
    }
  })
updateCart();
}