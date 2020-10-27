import Vue from 'vue';
import eventBus from "../modules/EventBus";

import api from "../main.js";

const registerForm = Vue.component("login-form", {
    template: `
    <form class="login-form" @submit.prevent="onSubmit">
        <p v-if="errors.length" class="error-message">
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>

        <p>
           <label for="email">E-mail:</label>
           <input id="email" ref="email" v-model="email" placeholder="E-mail">
        </p>

        <p>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" placeholder="Password">
        </p>

        <p>
            <input type="submit" value="Login" id="login">
        </p>
    </form>
    `,
    data() {
        return {
            email: null,
            password: null,
            errors: [],
        };
    },
    methods: {
        onSubmit() {
            if (this.email && this.password) {
                let userData = {
                    email: this.email,
                    password: this.password,
                };

                fetch(api + "/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.data) {
                            if (data.data.status === 200) {
                                eventBus.$emit("log-in", { user: userData.email, token: data.data.token, userInfo: data.userInfo });
                            }
                        }

                        if (data.errors) {
                            this.errors.push("Login failed.");
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

                this.email = null;
                this.password = null;
                this.errors = [];
            } else {
                this.errors = [];
                if (!this.email) {this.errors.push("Enter email.");}
                if (!this.password) {this.errors.push("Enter password.");}
            }
        },
        focusInput() {
            this.$refs.email.focus();
        }
    },
    mounted() {
        this.focusInput();
    }
});

export default {
    components: {
        "register-form": registerForm
    }
};
