Vue.component('cartHeader', {
    data() {
        return {
            cartHeaderImg: 'img/drop_cart/dropcart1.png',
            cartHeaderPng: 'img/drop_cart/exit.png',
            cartArray: [],
            linkSinglePage: 'single%20page.html',
            totalPrice: 0
        }
    },

    methods: {

        addProduct(product) {
            let find = this.cartArray.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cartHeader/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result) {
                            find.quantity++
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/api/cartHeader/', prod)
                    .then(data => {
                        if (data.result) {
                            this.cartArray.push(prod);
                        }
                    })
            }
        },

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

    template: `<div class="containCartHeader">
                <p v-if="!cartArray.length"> Cart is empty</p>
                <cart
                v-for="el of cartArray"
                :key="el.id_product"
                :cart="el"
                :img="cartHeaderImg"
                :imgs="cartHeaderPng"
                :linkSinglePage="linkSinglePage"
                @remove="remove"></cart>
                <div class="to_cart_price">
                           <h3>Total Price: {{getTotalPrice}}</h3>
                              </div>
                </div>`
});

Vue.component('cart', {
    props: ['cart', 'img', 'linkSinglePage', 'imgs', 'sum'],

    template: `<div>
                            <div class="first_drop">
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
                                    <p>{{cart.quantity}}X $ {{cart.price*cart.quantity}}</p>
                                </div>
                                <div class="cancel" @click="$emit('remove', cart)">
                                    <img :src="imgs"  alt="cancel">
                                </div>
                        </div>
                         
                            </div> `
});



