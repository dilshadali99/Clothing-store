
const shop = document.getElementById('shop');


let basket = JSON.parse(localStorage.getItem("data")) || [];

const generateShop = ()=> {
    return (shop.innerHTML = shopItems.map((x)=>{
        const {id, name, price, desc, img} = x;
        let search = basket.find((x)=> x.id === id) || []
          return ` <div id=product-id-${id} class="item">
          <img width="200" src=${img} alt="">
          <div class="details">
              <h3>${name}</h3>
              <p>${desc}</p>
              <div class="price-quantity">
                  <h2>$ ${price}</h2>
                  <div class="buttons">
                      <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
                      <div id=${id} class="quantity">
                      ${search.item === undefined ? 0: search.item}
                      </div>
                      <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                  </div>
              </div>
              <button onclick = "increment(${id})"  class="addToCart">Add to Cart</button>
          </div>
       </div>`
    }).join(""));
};

generateShop()

let increment = (id)=>{
    let selectedItem = id;

    let search = basket.find((x)=> x.id === selectedItem.id);

    // If the selectedItem  not present in the basket then 
    // We are pushing in the basket that item 
    if(search === undefined){
        basket.push({
            id:selectedItem.id,
            item: 1,
        });
    }
    else{   
        search.item += 1;
    }
//   console.log(basket)
update(selectedItem.id)

localStorage.setItem("data",JSON.stringify(basket));
};

let decrement = (id)=>{
    let selectedItem = id;
    let search = basket.find((x)=> x.id ===selectedItem.id);

    if(search === undefined) return
    else if(search.item === 0) return;
    else{
        search.item -= 1;
    }

    update(selectedItem.id)

    basket = basket.filter((x) => x.item !== 0);

    localStorage.setItem("data",JSON.stringify(basket));

    
    // console.log(search)
};

let update = (id)=>{
 let search = basket.find((x)=> x.id === id);
 document.getElementById(id).innerHTML = search.item;
//  console.log(search)
 calculation();
};

let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0);
}

calculation();
// 1 hour 46 mins