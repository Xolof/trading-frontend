import Vue from 'vue';

import api from "../main.js";

const registerForm = Vue.component("register-form", {
    template: `
    <form class="register-form" @submit.prevent="onSubmit">
        <p v-if="errors.length" class="error-message" id="error-message">
            <ul>
                <li v-for="error in errors" class="error">{{ error }}</li>
            </ul>
        </p>

        <p v-if="messages.length" class="message">
            <ul>
                <li v-for="message in messages">{{ message }}</li>
            </ul>
        </p>

        <p>
           <label for="email">E-mail:</label>
           <input id="email" ref="email" v-model="email" placeholder="E-mail">
        </p>

        <p>
            <label for="password">Password:</label>
            <input type="text" id="password" v-model="password" placeholder="Password">
        </p>

        <p>
            <label for="card">Credit card:</label>
            <input @focus="showWarning()" type="text" id="card" v-model="card" placeholder="dddd-dddd-dddd-dddd">
        </p>

        <p v-if="warning" class="warning">
            Don't enter a real card number. This application is only intended for education.
        </p>

        <p>
            <input @click="hideWarning()" type="submit" value="Register" name="register">
        </p>
    </form>
    `,
    data() {
        return {
            email: "",
            password: "",
            card: "",
            errors: [],
            messages: [],
            warning: false,
        };
    },
    methods: {
        validate() {
            this.errors = [];

            // Regex for email and card
            var emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var cardRe = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;

            if (!emailRe.test(this.email)) {
                this.errors.push("Enter a valid email.");
            }

            if (!cardRe.test(this.card)) {
                this.errors.push("Enter a credit card number in the format dddd-dddd-dddd-dddd.");
            }

            // valid password
            if (this.password.length < 5) {
                console.log("Password has to be at least 5 characters.");
                this.errors.push("Password has to be at least 5 characters.");
            }

            if (this.errors.length) {
                return false;
            }

            return true;
        },
        onSubmit() {
            if (this.validate()) {
                let userData = {
                    email: this.email,
                    password: this.password,
                    card: this.card,
                };
                // POST with fetch API

                fetch(api + "/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.data) {
                            if (data.data.status === 201) {
                                this.messages.push("Användaren har registrerats.");
                            }
                        }

                        if (data.errors) {
                            this.errors.push("Registreringen misslyckades.");
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

                this.email = "";
                this.password = "";
                this.card = "";
                this.errors = [];
                this.messages = [];
            }
        },
        focusInput() {
            this.$refs.email.focus();
        },
        showWarning() {
            this.warning = true;
        },
        hideWarning() {
            this.warning = false;
        },
    },
    mounted() {
        this.focusInput();
    },
});

export default {
    components: {
        "register-form": registerForm
    }
};
