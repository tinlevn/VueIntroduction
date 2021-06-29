app.component('product-display',{
    props: {
        premium:{
            type:Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">

          <div class="product-image">
            <img :src="image" > 
            <a :href="link">Link</a>
          </div>

          <div class="product-info">
            
            <h1>{{ title }}</h1>
            <p>{{sale}}</p>
            <p v-if="inStock">In stock</p>
            <p v-else>Out of stock</p>


            <p>Shipping {{shipping}}</p>
            <product-details :details="details"></product-details>

            <ul>
              <li v-for="size in sizes">{{size}}</li>
            </ul>

            <div v-for="(variant,index) in variants" 
            :key="variant.id" 
            @mouseover="updateVariant(index)"
            class="color-circle"
            :style="{backgroundColor:variant.color}"> </div>
            
            <button class="button"  
            :disabled="!inStock" 
            :class="{disabledButton: !inStock }" 
            @click="addToCart"> Add to cart </button>
            
            <button 
            class="button" 
            :class="{ disabledButton: !inStock }" 
            :disabled="!inStock" 
            @click="removeFromCart">
                Remove Item
            </button>
          </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
      </div>`,
      data() {
        return {
            product: 'Socks',
            brand:'Vue Master',
            selectedVariant: 0,
            link: 'https://www.youtube.com',
            details: ['50% cotton', '30% wool', '20% polyester'],
            sizes: ['S', 'M', 'L', 'XL'],
            variants: [
              { id: 2234, color: 'green',image:'./assets/images/socks_green.jpg'
              ,quantity: 50,onSale: false },
              { id: 2235, color: 'blue',image: './assets/images/socks_blue.jpg'
              ,quantity:5 ,onSale: true},
            ],reviews:[]
        }
    },
    methods:{
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        removeFromCart(){
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
            }
        ,
        addReview(review){
            this.reviews.push(review)
        },
        updateVariant(index){
            this.selectedVariant=index
        }
    },
    computed: {
        title(){
            return this.brand +' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].image
        },
        inStock(){
            return this.variants[this.selectedVariant].quantity
        },
        sale(){
            if (this.variants[this.selectedVariant].onSale){
                return this.brand+ ' '+ this.product+ ' is on sale'
            }
            return ''
        },
        shipping(){
            if (this.premium){
                return 'Free'
            }
            return 2.99
        }
    }
})