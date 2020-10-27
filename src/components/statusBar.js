import Vue from 'vue';

const statusBar = Vue.component("status-bar", {
    props: {
        loggedIn: {
            type: Boolean,
        },
    },
    computed: {
        userMsg() {
            return this.loggedIn
            ? "Logged in as: " + this.$root.$data.user + " | "
            : "";
        },
        balanceMsg() {
            return this.loggedIn
            ? "Balance: " + Math.round(this.$root.$data.userInfo.balance * 100) / 100 + "ƒ"
            : "";
        }
    },
    template: `
        <p class="status-bar" id="status-bar" v-bind:class="{ active : this.loggedIn }">
            <span class="statusSpan">
                {{ userMsg }}
            </span>
            <span class="statusSpan">
                {{ balanceMsg }}
            </span>
        </p>
    `
});

export default {
    components: {
        "status-bar": statusBar
    }
};
