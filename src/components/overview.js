import Vue from 'vue';
import eventBus from "../modules/EventBus";

import api from "../main.js";

const overview = Vue.component("overview", {
    template: `
        <div>
            <h1>Customer Overview</h1>

            <p>Balance: {{ Math.round(this.$root.userInfo.balance * 100) / 100 }}ƒ</p>
            <p>Card: {{ userInfo.card }}</p>

            <h2>Assets</h2>
            <table>
                <tr><th>Item ID</th><th>Item Name</th><th>Quantity</th></tr>
                <tr v-for="item in userInfo.items">
                    <td>{{ item.itemid }}</td>{{ item.name }}</td><td>{{ item.quantity }}</td>
                </tr>
            </table>

            <button @click="refill()" class="buyBtn">Refill</button>
            <input
                type="text"
                @input="quantityChanged"
                @change="quantityChanged"
                name="refillQuantity"
                ref="refillInp"
                placeholder="Quantity to refill"
                :class="{ 'error-inp': refillInpErr }"
                class="quantityInp"
            >

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
    `,
    data: () => ({
      userInfo: null,
      items: null,
      refillQuantity: "",
      refillInpErr: false,
      errors: [],
      messages: [],
    }),
    computed: {},
    created () {
        this.userInfo = this.$root.userInfo;
        this.items = this.$root.items;
        this.userInfo.items.map((userItem) => {
            this.items.forEach((item) => {
                if (item.id === userItem.itemid) {
                    userItem.name = item.name;
                }
            });
        });

        let sortedItems = this.userInfo.items.sort((a, b) => {
            return a.itemid > b.itemid;
        });

        this.userInfo.items = sortedItems;
    },
    methods: {
        quantityChanged(event) {
            let replaced = event.target.value.replace(/\D/g,'');
            event.target.value = replaced;
            this.[event.target.name] = replaced;
        },
        emptyInputs() {
            this.refillQuantity = "";
            this.$refs.refillInp.value = "";
        },
        refill() {
            this.messages = [];
            this.refillInpErr = false;
            if (this.refillQuantity === "") {
                this.errors = [];
                this.errors.push("Enter a quantity to refill.");
                this.refillInpErr = true;
                return;
            }

            fetch(api + "/refill", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": this.$root.$data.token
                },
                body: JSON.stringify({
                    amount: this.refillQuantity
                })
            })
            .then(res => res.json())
            .then(result => {
                if (!result.errors) {
                    this.errors = [];
                    eventBus.$emit("update-user-info", result);
                    this.messages.push("Added " + this.refillQuantity + "ƒ to your account from card " + this.userInfo.card + ".");
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
        "overview": overview
    }
};
