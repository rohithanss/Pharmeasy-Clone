const api = 'http://localhost:1010';

const append_data = async () => {
    let res = await fetch(`${api}/products`)
    res = await res.json();
    // console.log(res)
    data = res.skin_care;
    console.log(data)
    append_product_data(data)
}

append_data()

const append_product_data = (data) => {
    let product_data = document.getElementById('product_data');
    product_data.innerHTML = null ;

    data.forEach((el) => {
        let div = document.createElement('div')
        div.id = 'product_card'

        let p_img = document.createElement('img')
        p_img.src = el.image;
        p_img.className = 'product_img'

        let p_name = document.createElement('p')
        p_name.innerText = el.product_name;
        p_name.className = 'product_name'

        let price_div = document.createElement('div')
        price_div.className = 'price_div';

        let price = document.createElement('p')
        price.innerText = `MRP ₹`;
        price.className = 'product_price'

        let strikedOff_price = document.createElement('s')
        strikedOff_price.innerText = el.price;

        price.append(strikedOff_price)

        let discount = document.createElement('p')
        discount.innerText = `${10}% OFF  `;
        discount.className = 'discount';


        let final_price = document.createElement('p')
        final_price.className = 'product_final_price'
       final_price.innerText =` ₹ ${(el.price - el.price*0.1)}`;


        price_div.append(price,discount)
        div.append(p_img,p_name,price_div,final_price)
        product_data.append(div);
    }); 

}


const sorting_data = async () => {
    let res = await fetch(`${api}/products`)
    res = await res.json();
    // console.log(res)
    data = res.skin_care;
    sorting(data)
}

let select = document.getElementById('sorting')
select.onclick = () => {
    sorting_data();
}
const sorting = (data) => {
    let selected = select.value;
    console.log(selected)
    if(selected === 'LH'){
        data.sort(function (a, b) {
            return a.price - b.price;
        })
        append_product_data(data);
    }
    if(selected === 'HL'){
        data.sort( function (a, b) {
            return b.price - a.price;
        })
        append_product_data(data);
    }
    if(selected === "Popularity"){
        append_product_data(data);
    }
    
}


