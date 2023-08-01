const formEl = {
    name: document.querySelector('#formName'),
    imgUrl: document.querySelector('#formImgUrl'),
    price: document.querySelector('#formPrice'),
    size: document.querySelector('#formSize'),
    moreInfo: document.querySelector('#formMoreInfo'),
    btnCreate: document.querySelector('#formBtn')
}

const productsEl = document.querySelector('#products')

let products = []

const renderProducts = () => { 
    productsEl.innerHTML = ""
    products.forEach((product )=> { 
        productsEl.innerHTML += `
        <div product-id="${product.id}" class="productsCard">
            <p class="title">${product.name}</p>
            <img src="${product.imgUrl}">
            <p class="price"> Price: ${product.price} грн</p>
            <p class="size">Size: ${product.size}</p>
            <p class="moreInfo">${product.moreInfo}</p>
            <button product-id="${product.id}" class="btn">Переглянути докладніше</button>
        </div>
        `
    })
    const btnMore = document.querySelectorAll('.btn')
    .forEach((btnEl)=> {
        btnEl.addEventListener("click", () => {
            const productId = btnEl.getAttribute("product-id")
            window.location.href = `http://127.0.0.1:5500/product.html#${productId}`
        })
    })
}


const getProducts = () => {
    axios.get("http://localhost:4000/products/list")
        .then((res) => {
            products = [
                ...res.data
            ]
            renderProducts()
        })
}
getProducts()

formEl.btnCreate.addEventListener('click', () => {
    const formData = {
        name: formEl.name.value,
        imgUrl: formEl.imgUrl.value,
        price: formEl.price.value,
        size: formEl.size.value,
        moreInfo: formEl.moreInfo.value
    }
    axios.post('http://localhost:4000/products/create',{...formData})
        .then(res=> {
            console.log(res.data)
            getProducts()
        })
})