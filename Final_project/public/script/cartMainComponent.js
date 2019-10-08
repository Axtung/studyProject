Vue.component('cartMain', {
    data() {
        return {
            cartHeaderUrl: 'json/cartHeaderUrl.json',
            cartHeaderImg: 'img/drop_cart/dropcart1.png',
            cartHeaderPng: 'img/drop_cart/exit.png',
            cartArray: [],
            linkSinglePage: 'single%20page.html',
        }
    },

    mounted() {
        this.$parent.getJson(this.cartHeaderUrl)
            .then(data => {
                for (let el of data) {
                    this.cartArray.push(el);
                }
            });
    },

    template: `<div class="containCart">
                <p v-if="!cartArray.length"> Cart is empty</p>
                <cart
                v-for="el of cartArray"
                :key="el.id_product"
                :cart="el"
                :img="cartHeaderImg"
                :imgs="cartHeaderPng"
                :linkSinglePage="linkSinglePage"></cart>  
                <div class="to_cart_price">
                                <h3>total</h3>
                                <h3>$500.00</h3>
                            </div>   
                            </div>`
});

Vue.component('cart', {
    props: ['cart', 'img', 'linkSinglePage', 'imgs'],

    template: `<div class="first_drop">
                            <div class="to_cart_image">
                                    <img :src="img" alt="dropcat1">
                                </div>
                                <div class="to_cart_description">
                                    <a :href="linkSinglePage" class="link_cartDes"><h3>{{cart.product_name}}</h3></a>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <p>{{cart.quantity}}X{{cart.price*cart.quantity}}</p>
                                </div>
                                <div class="cancel">
                                    <img :src="imgs" alt="cancel">
                                </div>
                        </div>`
});