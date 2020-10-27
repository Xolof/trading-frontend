import Vue from 'vue';
import App from './App.vue';
import VueSimpleMarkdown from 'vue-simple-markdown';

import router from './router';
import eventBus from "./modules/EventBus";
import registerForm from "./components/registerForm";
import loginForm from "./components/loginForm";
import statusBar from "./components/statusBar";
import mainNav from "./components/mainNav";
import overview from "./components/overview";
import buySell from "./components/buySell";
import tulips from "./components/tulips";

let api = "https://me-api.oljo.me";
if (process.env.NODE_ENV === "development") {
    api = "http://localhost:3000";
}
// // Mock API
// import { makeServer } from "./server"
// if (process.env.NODE_ENV === "development") {
//     makeServer()
// }

Vue.config.productionTip = false;

Vue.use(VueSimpleMarkdown);

new Vue({
    router,
    components: {
        "main-nav": mainNav,
        "register-form": registerForm,
        "login-form": loginForm,
        "status-bar": statusBar,
        "overview": overview,
        "tulips": tulips,
        "buy-sell": buySell,
    },
    data() {
        return {
            loggedIn: false,
            token: null,
            user: null,
            pricesLoaded: false,
            userInfo: null,
            items: null
        };
    },
    methods: {
        logIn(data) {
            this.loggedIn = true;
            this.token = data.token;
            this.user = data.user;
            this.userInfo = data.userInfo;
            this.$router.push("/");
        },
        logOut() {
            this.token = null;
            this.user = null;
            this.userInfo = null;
            this.loggedIn = false;
            this.$router.push("/");
        },
        setPricesLoaded() {
            this.pricesLoaded = true;
        },
        updateUserInfo(userInfo) {
            this.userInfo = userInfo;
        },
    },
    mounted() {
        fetch(api)
        .then((res) => res.json())
        .then((res) => this.items = res.data.items);

        eventBus.$on("log-in", (data) => {
            this.logIn(data);
        });
        eventBus.$on("log-out", () => {
            this.logOut();
        });
        eventBus.$on("prices-loaded", () => {
            this.setPricesLoaded();
        });
        eventBus.$on("update-user-info", (userInfo) => {
            this.updateUserInfo(userInfo);
        });
    },
    render: h => h(App)
}).$mount('#app');

export default api;
