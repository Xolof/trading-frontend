import Vue from 'vue';
import eventBus from "../modules/EventBus";

const statusBar = Vue.component("main-nav", {
    template: `
    <div id="nav">
        <router-link to="/">Tulips</router-link>
        <router-link v-if="this.$root.$data.loggedIn" to="/overview">Overview</router-link>
        <router-link to="/register">Register</router-link>
        <router-link v-if="!this.$root.$data.loggedIn" to="/login">Login</router-link>
        <a href="#" v-else @click="logOut">Logout</a>
    </div>
    `,
    methods: {
        logOut() {
            eventBus.$emit("log-out");
        }
    }
});

export default {
    components: {
        "status-bar": statusBar
    }
};
