let lsData = JSON.parse(localStorage.getItem('product_Details'))

let pro_flow_name = document.querySelector('#flow>a+p+p')
pro_flow_name.innerHTML = lsData.product_name

const append_product_data = (data) => {
    let product_details = document.getElementById('product_details');
    product_details.innerHTML = null ;

    let prod_img_div = document.createElement('div')

    let prod_img = document.createElement('img')



    let prod_desc = document.createElement('div')

    let prod_name = document.createElement('h2')

    let prod_final_price = document.createElement('p')
    
    let prod_discount = document.createElement('p')

    


}