import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    connected: false,
    error: '',
    message: '',
    graphData: [],
    graphOptions: {
        scales: {
            yAxes: [ {
                display: true,
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 10
                }
            } ],
            xAxes: [{
                display: true,
                type: 'time',
                time: {
                  parser: 'HH:mm',
                  tooltipFormat: 'll HH:mm',
                  unit: 'minute',
                  unitStepSize: 1,
                  displayFormats: {
                    'minute': 'HH:mm'
                  }
                }
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
    },
  },
  mutations: {
    SOCKET_CONNECT(state) {
      state.connected = true
    },
    SOCKET_DISCONNECT(state) {
      state.connected = false
    },
    SOCKET_MESSAGE(state, message) {
      state.message = message
    },
    SOCKET_HELLO_WORLD(state, message) {
      state.message = message
    },
    SOCKET_ERROR(state, message) {
      state.error = message.error
    },
    addMessage(state, message) {

        let dataCopy = { ...this.state.graphData };
        let newData = [];

        message.forEach((bulb) => {
            for (let prop in dataCopy) {
                let chart = dataCopy[prop];
                if (chart.id === bulb.id) {
                    chart.datasets[0].data.push({
                        t: bulb.time,
                        y: Math.round(bulb.startingPoint * 100) / 100
                    });

                    chart.labels.push(bulb.time);

                    if (chart.labels.length > 100) {
                        chart.labels.shift();
                        chart.datasets[0].data.shift();
                    }

                    newData.push(chart);
                }
            }
        });

        this.state.graphData = newData;
    },
    formatData(state, data) {
        let chartIds = [];

        let bulbNames = [];

        let labels = [];

        let datasets = [];

        let images = [];

        let colors = [
            'rgba(31, 72, 215, 1)',
            'rgba(215, 31, 31, 1)',
            'rgba(31, 215, 50, 1)',
            'rgba(215, 31, 131, 1)',
            'rgba(17, 175, 160, 1)',
            'rgba(94, 97, 47, 1)',
            'rgba(215, 98, 31, 1)',
            'rgba(134, 215, 31, 1)',
            'rgba(255, 252, 0, 1)',
            'rgba(171, 34, 34, 1)'
        ];

        let first = true;

         // Organize the data
         data.map((item) => {
             item.bulbs.forEach((bulb) => {
                 if (first) {
                     chartIds.push(bulb.id);
                     labels["label-" + bulb.id] = [];
                     datasets["dataset-" + bulb.id] = [];
                     bulbNames["bulb-" + bulb.id] = bulb.name;
                     images["image-" + bulb.id] = bulb.image;
                 }
                 labels["label-" + bulb.id].push(bulb.time);
                 datasets["dataset-" + bulb.id].push(
                     {
                        t: bulb.time,
                        y: Math.round(bulb.startingPoint * 100) / 100
                     }
                 );
             });

             if (first) {
                 first = false;
             }
         });

         // Create charts with the data
         chartIds.forEach((chartId, i) => {
            this.state.graphData.push({
                id: chartId,
                image: images["image-" + chartId],
                labels: labels["label-" + chartId],
                datasets: [
                  {
                      label: bulbNames["bulb-" + chartId],
                      data: datasets["dataset-" + chartId],
                      backgroundColor: [
                      'rgba(0, 0, 0, 0)'
                    ],
                    borderColor: [
                      colors[i]
                   ],
                    borderWidth: 4
                  }
                ]
             });
         });
    }
  },
});
