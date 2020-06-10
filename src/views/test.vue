<template>
    <div class="container-content">
        <h1>test</h1>
        <highcharts :options="stockOptions"></highcharts>
    </div>
</template>

<script>
    import {Chart} from 'highcharts-vue';
    import Highcharts from 'highcharts';
    import stockInit from 'highcharts/modules/stock';

    stockInit(Highcharts);

    function randomData(points, positive, multiplier) {
        points = !points ? 1 : points;
        positive = positive !== true ? false : true;
        multiplier = !multiplier ? 1 : multiplier;

        function rnd() {
            return ((
                Math.random() +
                Math.random() +
                Math.random() +
                Math.random() +
                Math.random() +
                Math.random()
            ) - 3) / 3;
        }

        var rData = [];
        for (var i = 0; i < points; i++) {
            let val = rnd();
            val = positive === true ? Math.abs(val) : val;
            val = multiplier > 1 ? (val * multiplier) : val;
            rData.push(val);
        }
        return rData;
    }

    var chart;
    //doesn't even matter what date, just that the start time is correct
    var pointStart = 1435723200000;
    var dates = {};
    dates.ser1 = Date.UTC(2015, 3, 17);
    dates.ser2 = Date.UTC(2015, 5, 12);


    export default {
        data() {
            return {
                stockOptions: {
                    chart: {type: 'area'},
                    title: {},
                    subtitle: {},
                    legend: {enabled: true},
                    tooltip: {
                        shared: true,
                        useHTML: true,
                        dateTimeLabelFormats: {
                            hour: "%H:%M:%S"
                        }
                    },
                    plotOptions: {
                        series: {
                            fillOpacity: 0.1,
                            lineWidth: 0.25,
                            pointInterval: 3600 * 1000,
                        }
                    },
                    xAxis: {
                        type: 'datetime',
                        showLastLabel: true,
                        endOnTick: true,
                        labels: {
                            formatter: function () {
                                return Highcharts.dateFormat('%H:%M', this.value);
                            }
                        },
                        title: {text: 'Time'}
                    },
                    yAxis: {title: {text: 'Values'}},
                    series: [
                        {
                            name: 'Apr 17, 2015',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 2014',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 2013',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 2012',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 2011',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 2010',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 2009',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 2008',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 2007',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 2006',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 2005',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 2004',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 2003',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 2002',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 2001',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 2000',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 1999',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 1998',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 1997',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 1996',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 1995',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 1994',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 1993',
                            data: randomData(24),
                        },
                        {
                            name: 'Apr 17, 1992',
                            data: randomData(24),
                        },
                    ]
                }
            }
        },
        methods:{
            test(){
                console.log(randomData(24));
            }
        },
        mounted() {
            this.test();
        }
    }
</script>
<style scoped>
    .stock {
        width: 70%;
        margin: 0 auto
    }
</style>
