import Vue from 'vue';
import eventBus from "../modules/EventBus";

import api from "../main.js";

const buySell = Vue.component("buy-sell", {
    template: `
    <div class="buyAndSell">

        <p>Current price: {{ currentPrice }}ƒ</p>

        <div v-if="this.$root.$data.loggedIn">
            <p v-if="itemsOwned">You own {{ itemsOwned }} of this item.</p>

            <span class="buySellBtnInp">
                <button @click="buy()" class="buyBtn">Buy</button>
                <input
                    type="text"
                    @input="quantityChanged"
                    @change="quantityChanged"
                    name="buyQuantity"
                    ref="buyInp"
                    placeholder="Quantity to buy"
                    :class="{ 'error-inp': buyInpErr }"
                    class="quantityInp"
                >
            </span>

            <span class="buySellBtnInp" v-if="itemsOwned">
                <button @click="sell()" class="sellBtn">Sell</button>
                <input
                    type="text"
                    @input="quantityChanged"
                    @change="quantityChanged"
                    name="sellQuantity"
                    ref="sellInp"
                    placeholder="Quantity to sell"
                    :class="{ 'error-inp': sellInpErr }"
                    class="quantityInp"
                >
            </span>

            <p v-if="errors.length" class="error-message">
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>

            <p v-if="messages.length" class="message">
                <ul>
                    <li v-for="message in messages">{{ message }}</li>
                </ul>
            </p>
        </div>
    </div>
    `,
    props: ["itemId", "currentPrice"],
    data () {
        return {
            sellQuantity: "",
            buyQuantity: "",
            errors: [],
            messages: [],
            sellInpErr: false,
            buyInpErr: false,
        }
    },
    computed: {
      itemsOwned: function() {
          let result = 0;

          if (this.userInfo) {
              let ownedItems = this.userInfo.items.filter(item => {
                  return item.itemid == this.itemId;
              });

              if (ownedItems.length) {
                  result = ownedItems[0].quantity;
              }
          }

          return result;
      },
      userInfo: function () {
          return this.$root.$data.userInfo;
      },
    },
    methods: {
        quantityChanged(event) {
            let replaced = event.target.value.replace(/\D/g,'');
            event.target.value = replaced;
            this.[event.target.name] = replaced;
        },
        emptyInputs() {
            this.sellQuantity = "";
            this.buyQuantity = "";
            this.$refs.buyInp.value = "";
            if (this.$refs.sellInp) {
                this.$refs.sellInp.value = "";
            }
        },
        buy () {
            this.messages = [];
            this.sellInpErr = false;
            this.buyInpErr = false;
            if (this.buyQuantity === "") {
                this.errors = [];
                this.errors.push("Enter a quantity to buy.");
                this.sellInpErr = false;
                this.buyInpErr = true;
                return;
            }

            fetch(api + "/buy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": this.$root.$data.token
                },
                body: JSON.stringify({
                    item_id: this.itemId,
                    quantity: this.buyQuantity
                })
            })
            .then(res => res.json())
            .then(result => {
                if (!result.errors) {
                    this.errors = [];
                    eventBus.$emit("update-user-info", result);
                    this.messages.push("You purchased " + this.buyQuantity + "  item #" + this.itemId + " for " + Math.round(this.currentPrice * this.buyQuantity * 100) / 100 + "ƒ.");
                } else {
                    if (result.errors.title === "Validation failed.") {
                        eventBus.$emit("log-out");
                    }
                    this.errors = [];
                    if (!this.errors.includes(result.errors.title)) {
                        this.errors.push(result.errors.title);
                    }
                }
                this.emptyInputs();
            });
        },
        sell () {
            this.messages = [];
            this.sellInpErr = false;
            this.buyInpErr = false;
            if (this.sellQuantity === "") {
                this.errors = [];
                this.errors.push("Enter a quantity to sell.");
                this.buyInpErr = false;
                this.sellInpErr = true;
                return;
            }
            fetch(api + "/sell", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": this.$root.$data.token
                },
                body: JSON.stringify({
                    item_id: this.itemId,
                    quantity: this.sellQuantity
                })
            })
            .then(res => res.json())
            .then(result => {
                if (!result.errors) {
                    this.errors = [];
                    eventBus.$emit("update-user-info", result);
                    this.messages.push("You sold " + this.sellQuantity + " item #" + this.itemId + " for " + Math.round(this.currentPrice * this.sellQuantity * 100) / 100 + "ƒ.");
                } else {
                    if (result.errors.title === "Validation failed.") {
                        eventBus.$emit("log-out");
                    }
                    this.errors = [];
                    if (!this.errors.includes(result.errors.title)) {
                        this.errors.push(result.errors.title);
                    }
                }
                this.emptyInputs();
            });
        }
    }
});

export default {
    components: {
        "buy-sell": buySell
    }
};
