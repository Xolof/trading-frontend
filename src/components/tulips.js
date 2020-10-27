import Vue from 'vue';
import Vuex from "vuex";

import chartStore from '../store/chartStore.js';
import eventBus from '../modules/EventBus.js';
import chart from "./chart.js";

Vue.use(Vuex);

const tulips = Vue.component("tulips", {
    chartStore,
    data: () => ({
      loaded: false
    }),
    template: `
        <div>
            <h1>Tulip bulb prices</h1>

            <div v-for="chart in graphData" class="overviewItem">

                <h2>{{ chart.datasets[0].label }}</h2>

                <div class="picAndBuySell">
                    <img alt="Tulip picture" class="tulipPic" v-bind:src="'http://localhost:3000/img/' + chart.image" />
                    <buy-sell
                        :itemId="chart.id"
                        :currentPrice="chart.datasets[0].data[chart.datasets[0].data.length -1].y"
                    />
                </div>

                <chart
                  v-if="loaded"
                  ref="lineChart"
                  :key="chart.id"
                  :chartData="chart"
                  :options="graphOptions"
                  :style="{ height: '40vh' }"
                />
            </div>
        </div>
    `,
      components: { chart },
      computed: {
        graphData () {
            return chartStore.state.graphData
        },
        graphOptions () {
            return chartStore.state.graphOptions
        }
      },
      created () {
          this.loaded = true;
      },
      beforeCreate() {
          if (!this.$root.pricesLoaded) {
              let url = "https://bulb-prices.oljo.me";
              if (process.env.NODE_ENV === "development") {
                  url = "http://localhost:4000/prices";
              }
              fetch(url)
              .then(res => res.json())
              .then(data => {
                  chartStore.commit("formatData", data);
                  eventBus.$emit("prices-loaded");

                  this.loaded = true;
              });
          }
      },
      async mounted () {
            this.$options.sockets.["stocks"] = (socketData) => {
            chartStore.commit("addMessage", socketData);
            this.$refs.lineChart.forEach((item) => {
                item.update();
            });
        };
      }
});

export default {
    components: {
        "tulips": tulips
    }
};
