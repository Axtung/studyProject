Vue.component('product', {
    data() {
        return {
            singlePageUrl: 'json/singlePageUrl.json',
            productSingle: [],
            productIndexImg: 'img/table/Layer_3.jpg',
            singleImgSvg: 'img/cart-product.svg',
            link: 'single%20page.html'
        }
    },

    mounted() {
        this.$parent.getJson('/api/productIndex')
            .then(data => {
                for (let el of data) {
                    this.productSingle.push(el);
                }
            });
    },

    template: ` <div class="containSingle">
                <prod
                v-for="el of productSingle.slice(0, 4)"
                :key="el.id_product"
                :prod="el"
                :img="productIndexImg"
                :imgs="singleImgSvg"
                :link="link"></prod>
            </div>`
});

Vue.component('prod', {
    props: ['prod', 'img', 'link', 'imgs'],

    template: ` <div class="product"> 
                    <a :href="link"> <img class="product__img" :src="img"></a>
                <div class="product__text">
                    <a :href="link"><p>{{prod.product_name}}</p></a>
                    <span> $ {{prod.price}}</span>
                </div>
                <div :href="link" class="product__cart" @click="$root.$refs.cartHeader.addProduct(prod)"> <img :src="imgs">
                    Add to Cart</div>
                </div>`
});

Vue.component('singleProd', {
    data() {
        return {
            singleProdUrl: 'json/singleProd.json',
            singleProdImg: 'img/single_page/Layer_42.png',
            singleProdArray: []
        }
    },

    mounted() {
        this.$parent.getJson(this.singleProdUrl)
            .then(data => {
                for (let el of data) {
                    this.singleProdArray.push(el);
                }
            });
    },

    template: `<div><
                <oneProd
                v-for="el of singleProdArray"
                :key="el.id_product"
                :quantity="el.quantity"
                :one-prod="el"
                :img="singleProdImg"></oneProd>
                </div>`
});

Vue.component('oneProd', {
    props: ['oneProd', 'img', 'quantity'],

    template: `<div>
            <div class="single__slider">
            <div class="arrow_slider">
                <a class="slider_link" href="#"><img src="img/single_page/left.png" alt="left"></a>
            </div>
            <div class="container slider__product">
                <img class="img_slider" :src="img" alt="layer42">
            </div>
            <div class="arrow_slider">
                <a class="slider_link" href="#"><img src="img/single_page/right.png" alt="right"></a>
            </div>
        </div>
        <div class="container product__collection">
            <div class="container collection__one">
                <h2 class="collOne_heading">WOMEN COLLECTION</h2>
                <h1>{{oneProd.product_name}}</h1>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <p class="one_description">Compellingly actualize fully researched processes before proactive
                    outsourcing. Progressively syndicate collaborative architectures before cutting-edge services.
                    Completely visualize parallel core competencies rather than exceptional portals. </p>
                <h3>MATERIAL: <span class="one_span">COTTON</span></h3>
                <h3>DESIGNER: <span class="one_span">BINBURHAN</span></h3>
                <p class="one_price">$ {{oneProd.price}}</p>
            </div>
            <div class="collection__two">
                <div class="options"><h3 class="two_heading">CHOOSE COLOR</h3>
                    <details class="choose">
                        <summary class="choose_list first">Red</summary>
                    </details>
                </div>
                <div class="options"><h3 class="two_heading">CHOOSE SIZE</h3>
                    <details class="choose">
                        <summary class="choose_list second">XXL</summary>
                    </details>
                </div>
                <div class="options"><h3 class="two_heading">QUANTITY</h3>
                    <input class="choose number" type="number" :placeholder="quantity"></div>
            </div>
            <div class="collection__link"  @click="$root.$refs.cartHeader.addProduct(oneProd)"> <img class="collection_cart" src="img/single_page/Forma_1_copy.svg"
                                                       alt="cart">Add to Cart</div>
        </div>  
        </div>`
});
