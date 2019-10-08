Vue.component('product', {
    data() {
        return {
            productIndexUrl: 'json/productIndexUrl.json',
            productIndex: [],
            productIndexImg: 'img/table/Layer_2.jpg',
            indexImgSvg: 'img/cart-product.svg',
            link: 'single%20page.html'
        }
    },

    mounted() {
        this.$parent.getJson('/api/productIndex')
            .then(data => {
                for (let el of data) {
                    this.productIndex.push(el);
                }
            });
    },

    template: ` <div class="containIndex">
                <prod
                v-for="el of productIndex.slice(0, 8)"
                :key="el.id_product"
                :prod="el"
                :img="productIndexImg"
                :imgs="indexImgSvg"
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
                <div class="product__cart" data-set="prod.id_product" @click="$root.$refs.cartHeader.addProduct(prod)"> <img :src="imgs">
                    Add to Cart</div>
                </div>`
});
