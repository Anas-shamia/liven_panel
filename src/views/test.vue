<template>
    <div class="container-content">
        <h1>test</h1>
        <highcharts class="stock" :constructor-type="'stockChart'" :options="stockOptions"></highcharts>
    </div>
</template>

<script>
    import {Chart} from 'highcharts-vue';
    import Highcharts from 'highcharts';
    import stockInit from 'highcharts/modules/stock';
    stockInit(Highcharts);
    export default {
        data() {
            return {
                stockOptions: {
                    rangeSelector: {
                        selected: 1
                    },
                    title: {
                        text: 'AAPL Stock Price'
                    },
                    series: [{
                        data: [
                            [1587350460, 70],
                            [1587404100, 180],
                            [1587427020, 155],
                            [1587500760, 120],
                            [1587512520, 140],
                            [1587599160, 200],
                            [1587868680, 144],
                            [1587889920, 100],
                            [1587933060, 130],
                            [1587961920, 70],
                            [1588008720, 86],
                            [1588023180, 133]
                        ]
                    }]
                }
            }
        }
    }
</script>
<style scoped>
    .stock {
        width: 70%;
        margin: 0 auto
    }
</style>
