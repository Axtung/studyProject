Vue.component('cartProd', {
    data() {
        return {
            cartArray: [],
            cartImg: 'img/shopping_cart/cart1.jpg',
            linkSinglePage: 'single%20page.html',
            totalPrice: 0
        }
    },

    mounted() {
        this.$parent.getJson('/api/cartHeader')
            .then(data => {
                for (let el of data) {
                    this.cartArray.push(el);
                }
            });
    },

    methods: {
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cartHeader/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.deleteJson(`/api/cartHeader/`)
                    .then(data => {
                        if (data.result) {
                            this.cartArray.splice(this.cartArray.indexOf(product), 1);
                        }
                    });
            }
        },
        removeAll() {
            this.$parent.deleteJson(`/api/shoppingCart/`)
                .then(data => {
                    if (data.result) {
                        this.cartArray.splice(0);
                    }
                });
        }
    },

    computed: {
        getTotalPrice() {
            if (this.cartArray.length !== 0) {
                let sum = 0;
                for (let i = 0; i < this.cartArray.length; i++) {
                    sum += this.cartArray[i].price * this.cartArray[i].quantity;
                }
                this.totalPrice = sum;
                return this.totalPrice;
            }

        }
    },

    mounted() {
        this.$parent.getJson('/api/cartHeader')
            .then(data => {
                for (let el of data) {
                    this.cartArray.push(el);
                }
            });
    },

    template: `<div class="containCart">
                <div v-if="!cartArray.length">Cart is empty</div>
                <cartItem
                v-for="el of cartArray"
                :key="el.id_product"
                :cart-item="el"
                :img="cartImg"
                :linkSinglePage="linkSinglePage"
                @remove="remove"></cartItem>
                <proceed
                @removeAll="removeAll"></proceed>
                <price
                :price="getTotalPrice"></price> 
                            </div>`
});

Vue.component('cartItem', {
    props: ['cartItem', 'img', 'linkSinglePage'],

    template: `<div class="cartItem">
                <img :src="img" alt="cart1">
                <div class="products_descriptoin">
                    <h4>{{cartItem.product_name}}</h4>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <p>Color: red</p>
                    <p>Size: XII</p>
                </div>
                <p>$ {{cartItem.price}}</p>
                <p>{{cartItem.quantity}}</p>
                <p>free</p>
                <p>$ {{cartItem.price*cartItem.quantity}}</p>
                <p class="delete-btn" data-id="cartItem.id_product" @click="$emit('remove', cartItem)">x</p>
            </div>`
});

Vue.component('proceed', {
    template: `<div class="proceed">
                <div class="proceed__button removeAll" @click="$emit('removeAll')">
                    <p class="proceed_text">CLEAR SHOPPING CART</p>
                </div>
                <div class="proceed__button">
                    <a class="proceed__link" href="#"><p class="proceed_text">CONTINUE SHOPPING</p></a>
                </div>
            </div>`
});

Vue.component('price', {
    props: ['price'],

    template: `<div class="shopping_information">
                <div class="shopping__adress">
                    <h2 class="shoppnig_heading">Shipping Adress</h2>
                    <div class="adress_country">
                        <details class="country_all">
                            <summary class="country_list">Bangladesh</summary>
                        </details>
                    </div>
                    <br>
                    <input class="adress_text" type="text" placeholder="State">
                    <br>
                    <input class="adress_text" type="text" placeholder="Postcode / Zip">
                    <div class="shopping__link">
                        <a class="link_apply" href="#">get a quote</a>
                    </div>
                </div>
                <div class="shopping__coupon">
                    <h2 class="shoppnig_heading">Shipping Adress</h2>
                    <p>Enter your coupon code if you have one</p>
                    <br>
                    <input class="adress_text" type="text" placeholder="State">
                    <br>
                    <div class="shopping__link">
                        <a class="link_apply" href="#">Apply coupon</a>
                    </div>
                </div>
                <div class="shopping__total">
                    <div class="total__width">
                        <div class="total__text">
                            <p>Sub total {{price}}</p>
                            <h2 class="total_heading">GRAND TOTAL <span class="span_price">$ {{price}}</span></h2>
                        </div>
                        <div class="shopping__check">
                            <a class="check__link" href="#">proceed to checkout</a>
                        </div>
                    </div>
                </div>
            </div>`
});









