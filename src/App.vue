<template>
  <div id="app">
    <status-bar v-bind:logged-in="this.$root.$data.loggedIn" />
    <div id="header">
        <h1>BulbXchange</h1>
    </div>
    <main-nav />
    <router-view />
    <footer id="footer">
        <p>Project created by Olof Johansson for the course <a href="http://jsramverk.se">jsramverk</a>.</p>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
}

* {
    box-sizing: border-box;
    margin: 0;
}

h1, h2, h3, a, p, pre {
    margin: 0.2rem 0 1rem;
}

h1, h2, h3 {
    margin-top: 1.2rem;
}

pre {
    margin-top: 0.4rem;
}

#nav {
  padding: 30px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
}

#nav a {
  font-weight: bold;
  color: #595959;
  font-size: 1.5em;
  text-decoration: none;
  margin: 0 0.6em 0.4em;
}

#nav a.router-link-exact-active {
  color: #2c3e50;
  text-decoration: underline;
}

code {
    background: #2e2b2b;
    color: #ccc;
    padding: 6px 6px 4px;
    border-radius: 2px;
    font-size: 1.2em;
}

#header {
    padding: 1em;
    background: rgb(254,84,84);
    background: linear-gradient(90deg, rgba(135, 245, 152, 1) 30%, rgba(134, 213, 246, 1) 100%);
}

#footer {
    display:block;
    padding: 0.8em;
    margin-top: 1.4em;
    border-top: 1px solid #ccc;
    width: 100%;
    color: #7c7c7c;
}

.message,
.error-message {
    padding: 1em;
}

.message {
    color: green;
}

.error-message {
    color: red;
}

.error-message ul,
.message ul {
    width: 100%;
    margin: 0;
    padding: 0;
}

.error-message ul li,
.message ul li  {
    margin: 0 0 1.4em;
    width: 100%;
    text-align: center;
    list-style: none;
}

.status-bar {
    color: #333;
    padding: 1em;
    margin: 0;
    position: sticky;
    top: 0;
    background: #fff;
    width: 100%;
    border-bottom: 1px solid #e2dfdf;
    font-size: 1.2em;
    display: none;
}

.status-bar.active {
    color: green;
    display: block;
}

.reports-nav ul {
    list-style: none;
    display: flex;
    flex-flow: wrap;
    padding: 0;
}

.reports-nav ul li {
    padding: 1em;
}

.reports-nav ul li a {
    font-size: 1.2em;
    text-decoration: none;
    color: #595959;
}

.reports-nav ul li a.active {
    text-decoration: underline;
    color: #2c3e50;
}

.register-form *,
.login-form * {
    width: 80%;
    display: block;
    margin: 0 auto;
}

.register-form input,
.login-form input {
    margin-bottom: 1.4em;
    border: 1px solid #ccc;
    text-align: center;
    padding: 0.6em 0;
    font-size: 1.1em;
}

.register-form input:focus,
.login-form input:focus {
    border: 2px solid blue;
}

.register-form input[type="submit"],
.login-form input[type="submit"] {
    background: #4bcf88;
    cursor: pointer;
    width: 80%;
}

.register-form input[type="submit"]:hover,
.login-form input[type="submit"]:hover {
    background: #97e0f1;
    border: 1px solid #000;
}

.warning {
    color: #e40d0d;
    padding: 0 0 1em;
}

.report button,
.report input[type="submit"]
 {
    display: block;
    width: 40%;
    margin: 3em auto 0;
    background: #4bcf88;
    cursor: pointer;
    padding: 0.6em 0;
    font-size: 1.1em;
    border: 1px solid #ccc;
}

.report button:hover,
.report input[type="submit"]:hover {
    background: #97e0f1;
    border: 1px solid #000;
}

.report textarea {
    width: 100%;
    resize: vertical;
    height: 300px;
    min-height: 150px;
    max-height: 400px;
    font-size: 1.2em;
}

.all-messages {
    width: 90%;
    height: 30vh;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 0 auto 2rem;
    overflow-y: scroll;
}

.all-messages p {
    margin: 0 auto 0;
    padding: 0.6em 0.4em 1em;
    text-align: left;
}

.all-messages p:nth-child(2n) {
    background-color: #c3f1d1;
}

#new-message {
    width: 90%;
}

.messageInfo {
    display: block;
    color: #134670;
}

.messageMessage {
    display:block;
    margin-top: 0.5em;
}

.messageTime {
    float: right;
}

.picAndBuySell {
    display: flex;
    justify-content: space-evenly;
}

.buySellBtnInp {
    display: block;
    margin-bottom: 1.4em;
}

.quantityInp {
    padding: 0.4em;
    border-radius: 6px;
    border: 2px solid #ccc;
    text-align: center;
}

.error-inp {
    border: 2px solid red;
    padding: 0.4em;
    border-radius: 6px;
}

.overviewItem {
    padding: 1em 0 3em;
}

.overviewItem:nth-child(odd) {
    background: #def6ff;
}

.buyBtn, .sellBtn {
    background-color: #32ed66;
    cursor: pointer;
    padding: 0.4em 1.4em;
    border-radius: 6px;
    border: 1px solid #32ed66;
}

.buyBtn:hover, .sellBtn:hover {
    background-color: #68f08d;
}

.tulipPic {
    height: 250px;
    border-radius: 4px;
}

.buyAndSell p {
    text-align: left;
}

.buyAndSell {
    font-size: 1.2em;
}

table {
    distplay: block;
    margin: 0 auto 1.4em;
}

@media (max-width: 700px) {
    .picAndBuySell {
        flex-direction: column;
    }

    .tulipPic {
        display: block;
        margin: 0 auto 1.4em;
        width: 95%;
        height: auto;
    }

    .buyAndSell div p,
    .buyAndSell p {
        text-align: center;
    }

    .statusSpan {
        display: block;
    }
}

</style>
