<template>
    <div class="3sm:mb-4">
        <router-link tag="div" :to="`/${this.user_id}/sugar-measurements`">
            <h3 class="text-blue-900 font-medium text-2xl 4xl:text-lg mb-6 3sm:mb-4">Blood Sugar</h3>

            <div class="bg-white-900 custom-shadow rounded-lg px-10 py-6 3sm:px-4 3sm:py-3" >
               <div v-if="measurement.length">
                   <div class="-mx-10 3sm:-mx-4">
                       <highcharts :options="chartOptions" :style="'height: 250px;'"></highcharts>
                   </div>
                   <h4 class="text-primary-900 text-2xl 4xl:text-lg 3sm:text-base font-medium mb-4 3sm:mb-2">Measurements</h4>
                   <ul>
                       <li class="border-b border-gray-800 mb-6 3sm:mb-4" v-for="(item,index) in measurement" :key="index"
                           v-if="index <= 2">
                           <p class="text-black-900 font-medium text-lg 4xl:text-base 3sm:text-sm">{{item.value}}</p>
                           <p class="text-base 3sm:text-sm text-gray-700 mb-3 3sm:mb-2">{{item.time}}</p>
                       </li>
                   </ul>
               </div>
                <p class="text-blue-900 font-medium text-2xl 4xl:text-lg mb-6 3sm:mb-4" v-else>
                    There is No Measurements to show
                </p>
            </div>
        </router-link>
    </div>
</template>
<script>
    export default {
        props: ['user_id'],
        data() {
            return {
                measurement: [],
                chartOptions: {
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false
                    },
                    accessibility: {
                        announceNewData: {
                            enabled: true
                        }
                    },
                    xAxis: {
                        type: 'category',
                        title: {
                            text: 'Time'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'معدل السكر'
                        }
                    },
                    legend: {
                        enabled: false
                    },

                    plotOptions: {
                        series: {
                            color: '#9355AA',
                            dataLabels: {
                                enabled: true,
                            }
                        }
                    },

                    series: [
                        {
                            name: 'معدل السكر',
                            data: []
                        }
                    ],

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 576
                            },
                        }]
                    }
                }
            }
        },
        watch: {
            measurement($val) {
                this.chartOptions.series[0].data = $val.map(x => {
                    return {
                        name: x.timing,
                        y: x.value
                    }
                });
            }
        },
        mounted() {
            const $id = this.$route.params.user;
            this.axios.get(`c_panel/diabetes/user/today/all?user_id=${$id}`)
                .then(response => (this.measurement = response.data.data))
        }
    }

</script>
