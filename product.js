const productEl = document.querySelector('#product')
const productId = window.location.hash.substring(1)

let productInfo

const renderProduct = () => {
    productEl.innerHTML = `
        <img src="${productInfo.imgUrl}">
        <p>${productInfo.name}</p>
        <p>${productInfo.price} грн</p>
        <button product-id="${productInfo.id}" class="btnReviews">Написати відгук</button>
    `
    const btnEl = document.querySelector('.btnReviews')
    btnEl.addEventListener('click', () => {
        window.location.href = `http://127.0.0.1:5500/Reviews.html#${productId}`
    })
}

const getProduct = () => {
    axios.get(`http://localhost:4000/products/item?id=${productId}`)
        .then((res) => {
            productInfo = res.data
            renderProduct()
        })
}

getProduct()