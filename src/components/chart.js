import { Line } from 'vue-chartjs';

export default {
    extends: Line,
    props: {
        chartData: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    methods: {
        update() {
            this.$data._chart.update()
        }
    },
    computed: {
      updatedData: function() {
        return this.chartData;
      }
    },
    mounted () {
        this.renderChart(this.updatedData, this.options);
    }
};
