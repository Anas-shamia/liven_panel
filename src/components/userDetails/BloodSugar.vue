<template>
    <div class="3sm:mb-4">
        <h3 class="text-blue-900 font-medium text-2xl 4xl:text-lg mb-6 3sm:mb-4">Blood Sugar</h3>

        <div class="bg-white-900 custom-shadow rounded-lg px-10 py-6 3sm:px-4 3sm:py-3">
            <div class="-mx-10 3sm:-mx-4">
                <highcharts :options="chartOptions" :style="'height: 250px;'"></highcharts>
            </div>
            <h4 class="text-primary-900 text-2xl 4xl:text-lg 3sm:text-base font-medium mb-4 3sm:mb-2">Measurements</h4>
            <ul>
                <li class="border-b border-gray-800 mb-6 3sm:mb-4">
                    <p class="text-black-900 font-medium text-lg 4xl:text-base 3sm:text-sm">120</p>
                    <p class="text-base 3sm:text-sm text-gray-700 mb-3 3sm:mb-2">Today , 02:30PM</p>
                </li>
                <li class="border-b border-gray-800 mb-6 3sm:mb-4">
                    <p class="text-black-900 font-medium text-lg 4xl:text-base 3sm:text-sm">120</p>
                    <p class="text-base 3sm:text-sm text-gray-700 mb-3 3sm:mb-2">Today , 02:30PM</p>
                </li>
                <li class="border-b border-gray-800 mb-6 3sm:mb-4">
                    <p class="text-black-900 font-medium text-lg 4xl:text-base 3sm:text-sm">120</p>
                    <p class="text-base 3sm:text-sm text-gray-700 mb-3 3sm:mb-2">Today , 02:30PM</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
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
                            text: 'CGM'
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
                            name: 'CGM',
                            data: [
                                {
                                    name: "15 min",
                                    y: 80,
                                },
                                {
                                    name: "30 min",
                                    y: 100,
                                },
                                {
                                    name: "45 min",
                                    y: 200,
                                },
                                {
                                    name: "60 min",
                                    y: 120,
                                },
                            ]
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
        }
    }

</script>
