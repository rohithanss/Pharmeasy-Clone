let lsData = JSON.parse(localStorage.getItem('product_Details'))
console.log(lsData);

let pro_flow_name = document.querySelector('#flow>a+p+p')   
pro_flow_name.innerHTML = lsData.product_name


let user = JSON.parse(localStorage.getItem('user_details')) || null;



/*---------------------------------------------appending data---------------------------------*/

const append_product_details = (lsData) => {
    let product_details = document.getElementById('product_details');
    product_details.innerHTML = null ;

    let prod_img_div = document.createElement('div')
    prod_img_div.className = 'prod_img_div'

    let prod_img = document.createElement('img')
    prod_img.src = lsData.image

    prod_img_div.append(prod_img)


    let prod_desc_div = document.createElement('div')
    prod_desc_div.className = 'prod_desc_div'

    let prod_final_div = document.createElement('div')
    prod_final_div.className = 'prod_final_div'

    let prod_desc = document.createElement('div')
    prod_desc.className = 'prod_desc' 


    let prod_name = document.createElement('h1')
    prod_name.innerText = lsData.product_name;
    prod_name.className = 'prod_name'



    /*--------------------price related div--------------------*/
    let price_div = document.createElement('div')
    price_div.className = 'price_div'

    let prod_original_price = document.createElement('p')
    prod_original_price.innerText = `MRP ₹`;
    let strikedOff_price = document.createElement('s')
    strikedOff_price.innerText = lsData.price;
    prod_original_price.append(strikedOff_price)

    let prod_final_price = document.createElement('p')
    prod_final_price.innerText = `₹ ${(lsData.price - (lsData.price*0.1))}`

    let prod_discount = document.createElement('p') 
    prod_discount.innerText = `${10}% OFF  `;

    price_div.append(prod_final_price, prod_original_price, prod_discount)
   /*-----------------------------------------------*/
   
   
    let tax = document.createElement('p')
    tax.innerText = 'Inclusive of all taxes'



    /*--------------------delivery div---------------------------*/
    let del_time = document.createElement('p')
    del_time.innerText = "Delivery by"
    del_time.style.fontSize = "12px"
    let del_time_details = document.createElement('span')
    del_time_details.innerText = '  Tomorrow, before 4:00 p.m'
    del_time_details.style.fontWeight = 700
    del_time.append(del_time_details)
    /*-----------------------------------------------------------*/



    /*--------------------Add to Cart button---------------------------*/
    let addToCartBtn = document.createElement('button')
    addToCartBtn.className = 'addToCartBtn'
    addToCartBtn.innerText = 'Add To Cart'
    addToCartBtn.onclick = () => {

        addToCartBtn.style.display = 'none'

        let selectopt = document.createElement('select')
        selectopt.className = 'selectopt'
        selectopt.innerHTML = seleopt()
        selectopt.style.padding = '5px 20px'

        prod_desc_div.append(prod_desc, selectopt)
        
        selectopt.onchange = () => {
          let value = +selectopt.value;
          AddtoCart(value);
        }

        // selectopt.onclick = () => {
        //     let value = selectopt.value;
        //     document.getElementById('num_of_items').innerText = `${value} Items in Cart`;
        // }
        

    }

    prod_desc.append(price_div, tax, del_time)
    prod_desc_div.append(prod_desc, addToCartBtn)
    prod_final_div.append(prod_name , prod_desc_div)
    product_details.append(prod_img_div,  prod_final_div)

}

append_product_details(lsData);


const seleopt = () => {
    return `
    <Option>
      1
    </Option>
    <Option>
      2
    </Option>
    <Option>
      3
    </Option>
    <Option>
      4
    </Option>
    <Option>
      5
    </Option>
    <Option>
      6
    </Option>
    <Option>
      7
    </Option>
    <Option>
      8
    </Option>
    <Option>
      9
    </Option>`;
  };

  console.log(cart)
  console.log(lsData.id)


let product_quantity = localStorage.getItem('product_quantity') || 0;

const AddtoCart = (value) => {
let cart =  JSON.parse(localStorage.getItem('ls_cart')) || [];

  if( user != null ){

    console.log('hey user')

  } else {

    if(cart.length !== 0 ){

      let flag = true;
      for(let i=0; i<cart.length; i++){
        if(cart[i].id === lsData.id){
          flag = false;
          console.log('same')
          product_quantity += +value;
          localStorage.setItem('product_quantity', product_quantity)
        } 
      } 

        if(flag){
          product_quantity += +value;
          cart.push(lsData)
          localStorage.setItem('product_quantity', product_quantity)
          localStorage.setItem('ls_cart', JSON.stringify(cart) )
        }

      

    } else{
      product_quantity = +value;
      cart.push(lsData)
      localStorage.setItem('product_quantity', product_quantity)
      localStorage.setItem('ls_cart', JSON.stringify(cart) )
    }

    // cart.push(lsData) 
    // localStorage.setItem('ls_cart', JSON.stringify(cart) )
  }
}