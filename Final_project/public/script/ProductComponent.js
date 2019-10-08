Vue.component('product', {
    data() {
        return {
            productUrl: 'json/productUrl.json',
            productImg: 'img/table/Layer_3.jpg',
            productImgSvg: 'img/cart-product.svg',
            product: [],
            link: 'single%20page.html'
        }
    },

    mounted() {
        this.$parent.getJson('/api/productIndex')
            .then(data => {
                for (let el of data) {
                    this.product.push(el);
                }
            });
    },

    template: ` <div class="containProduct">
                <prod
                v-for="el of product"
                :key="el.id_product"
                :prod="el"
                :img="productImg"
                :imgs="productImgSvg"
                :link="link"></prod>
            </div>`
});

Vue.component('prod', {
    props: ['prod', 'img', 'link', 'imgs'],

    template: ` <div class="product"> 
                    <a :href="link" class="man_link"> <img class="product__img" :src="img"></a>
                <div class="product__text">
                    <a :href="link"><p>{{prod.product_name}}</p></a>
                    <span> $ {{prod.price}}</span>
                </div>
                <div :href="link" class="product__cart" @click="$root.$refs.cartHeader.addProduct(prod)"> <img :src="imgs">
                    Add to Cart</div>
                </div>`
});
