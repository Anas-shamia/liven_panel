<template>
    <div class="container-content pb-24" v-if="profile">
        <div class="flex flex-wrap -mx-4">
            <div class="w-1/4 3sm:w-full px-4 profile-info">
                <Profile/>
                <div class="mb-8 3sm:mb-4">
                    <h3 class="text-blue-900 font-medium text-2xl 4xl:text-lg mb-6">Reports</h3>
                    <div class="bg-white-900 px-4 py-8 3sm:py-4 rounded-lg">
                        <ul class="mb-8 3sm:mb-4">
                            <li class="border-b border-gray-800 mb-4 3sm:mb-2 flex items-center">
                                <p class="mb-2 text-black-900 font-medium text-base 3sm:text-sm flex-grow">Weight
                                    Statistics</p>
                                <p class="mb-2 text-base 3sm:text-xs text-gray-700">Today , 02:30PM</p>
                            </li>
                            <li class="border-b border-gray-800 mb-4 3sm:mb-2 flex items-center">
                                <p class="mb-2 text-black-900 font-medium text-base 3sm:text-sm flex-grow">Blood
                                    Sugar</p>
                                <p class="mb-2 text-base 3sm:text-xs text-gray-700">Today , 02:30PM</p>
                            </li>
                            <li class="border-b border-gray-800 mb-4 3sm:mb-2 flex items-center">
                                <p class="mb-2 text-black-900 font-medium text-base 3sm:text-sm flex-grow">Meals
                                    History</p>
                                <p class="mb-2 text-base 3sm:text-xs text-gray-700">Today , 02:30PM</p>
                            </li>
                        </ul>
                        <button type="button"
                                class="font-medium rounded bg-primary-900 text-white-900 text-lg 3sm:text-base 3sm:font-normal py-2 w-10/12 mx-auto block text-center"
                                @click="openReportModal">
                            Write a Report
                        </button>
                    </div>
                </div>
                <button type="button"
                        class="font-medium rounded-full bg-primary-900 text-white-900 text-lg 3sm:text-base 3sm:font-normal 3sm:mb-4 py-2 w-10/12 mx-auto block text-center"
                        @click="openNotification">
                    Send Notification
                </button>
            </div>
            <div class="w-3/4 3sm:w-full px-4">
                <h2 class="text-2xl 4xl:text-lg text-blue-900 mb-6">Body Stats</h2>
                <highcharts :options="chartOptions2"></highcharts>
                <div class="flex flex-wrap -mx-6 4xl:-mx-6 3sm:-mx-2 mt-8">
                    <div class="w-1/4 3sm:w-1/2 3sm:mb-4 px-6 4xl:px-4 3sm:px-2">
                        <div class="relative weight-box bg-white-900 flex items-start 3sm:flex-wrap 3sm:justify-center py-8 px-6 3sm:px-4 3sm:py-4 rounded-lg custom-shadow">
                            <img class="w-10 3sm:w-8" src="@/assets/img/pink-weight.svg" alt="weight">
                            <div class="pl-5 3sm:w-full 3sm:text-center 3sm:pl-0">
                                <p class="text-black-900 text-base 4xl:text-sm mb-1 3sm:mb-0 3sm:pt-2">Weight</p>
                                <p class="text-3xl 3sm:text-lg text-black-900 font-bold">{{profile.weight}} <span
                                        class="text-gray-700 text-base 4xl:text-sm pl-1">kg</span></p>
                            </div>
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                 class="svg-inline--fa fa-edit w-6 absolute top-0 right-0 cursor-pointer mt-8 mr-4">
                                <path fill="currentColor"
                                      d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
                                      class=""></path>
                            </svg>

                        </div>
                    </div>
                    <div class="w-1/4 3sm:w-1/2 3sm:mb-4 px-6 4xl:px-4 3sm:px-2">
                        <div class="relative weight-box bg-white-900 flex items-start 3sm:flex-wrap 3sm:justify-center py-8 px-6 3sm:px-4 3sm:py-4 rounded-lg custom-shadow">
                            <img class="w-10 3sm:w-8" src="@/assets/img/fat.svg" alt="weight">
                            <div class="pl-5 3sm:w-full 3sm:text-center 3sm:pl-0">
                                <p class="text-black-900 text-base 4xl:text-sm mb-1 3sm:mb-0 3sm:pt-2">Waist</p>
                                <p class="text-3xl 3sm:text-lg text-black-900 font-bold" v-if="profile.body.length">{{profile.body[0].waist}} <span
                                        class="text-gray-700 text-base 4xl:text-sm pl-1">CM</span></p>
                            </div>
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                 class="svg-inline--fa fa-edit w-6 absolute top-0 right-0 cursor-pointer mt-8 mr-4">
                                <path fill="currentColor"
                                      d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
                                      class=""></path>
                            </svg>
                        </div>
                    </div>
                    <div class="w-1/4 3sm:w-1/2 3sm:mb-4 px-6 4xl:px-4 3sm:px-2">
                        <div class="relative weight-box bg-white-900 flex items-start 3sm:flex-wrap 3sm:justify-center py-8 px-6 3sm:px-4 3sm:py-4 rounded-lg custom-shadow">
                            <img class="w-10 3sm:w-8" src="@/assets/img/fat.svg" alt="weight">
                            <div class="pl-5 3sm:w-full 3sm:text-center 3sm:pl-0">
                                <p class="text-black-900 text-base 4xl:text-sm mb-1 3sm:mb-0 3sm:pt-2">Hip</p>
                                <p class="text-3xl 3sm:text-lg text-black-900 font-bold" v-if="profile.body.length">{{profile.body[0].highest}}
                                    <span
                                            class="text-gray-700 text-base 4xl:text-sm pl-1">CM</span></p>
                            </div>
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                 class="svg-inline--fa fa-edit w-6 absolute top-0 right-0 cursor-pointer mt-8 mr-4">
                                <path fill="currentColor"
                                      d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
                                      class=""></path>
                            </svg>
                        </div>
                    </div>
                    <div class="w-1/4 3sm:w-1/2 3sm:mb-4 px-6 4xl:px-4 3sm:px-2">
                        <div class="relative weight-box bg-white-900 flex items-start 3sm:flex-wrap 3sm:justify-center py-8 px-6 3sm:px-4 3sm:py-4 rounded-lg custom-shadow">
                            <img class="w-10 3sm:w-8" src="@/assets/img/scale.svg" alt="weight">
                            <div class="pl-5 3sm:w-full 3sm:text-center 3sm:pl-0">
                                <p class="text-black-900 text-base 4xl:text-sm mb-1 3sm:mb-0 3sm:pt-2">BMI</p>
                                <p class="text-3xl 3sm:text-lg text-black-900 font-bold">
                                    {{bmi(profile.length,profile.weight)}} <span
                                        class="text-gray-700 text-base 4xl:text-sm pl-1">%</span></p>
                            </div>
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                 class="svg-inline--fa fa-edit w-6 absolute top-0 right-0 cursor-pointer mt-8 mr-4">
                                <path fill="currentColor"
                                      d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
                                      class=""></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="mt-8 3sm:mt-4">
                    <h2 class="text-2xl 4xl:text-lg text-blue-900 mb-6 3sm:mb-4">History</h2>
                    <table class="table-fixed w-full ">
                        <thead>
                        <tr>
                            <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Date</th>
                            <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Weight (Kg)</th>
                            <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Waist (cm)</th>
                            <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Hip (cm)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in stats" :key="index">
                            <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">{{item.date}}</td>
                            <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">{{item.weight}}</td>
                            <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">{{item.waist}}</td>
                            <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">{{item.hip}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <SendNotification v-if="open" @close="open = false"/>
            <SendReport v-if="openReport" @close="openReport = false"/>
        </div>
    </div>
</template>
<script>
    import Profile from "../../components/userDetails/Profile";
    import SendNotification from "../../components/userDetails/SendNotification";
    import SendReport from "../../components/userDetails/SendReport";

    export default {
        data() {
            return {
                open: false,
                openReport: false,
                chartOptions2: {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Weight'
                    },
                    accessibility: {
                        announceNewData: {
                            enabled: true
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        type: 'category',
                        title: {
                            text: 'Years'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Dollars'
                        }

                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true,
                            }
                        }
                    },

                    tooltip: {
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    },

                    series: [
                        {
                            name: "Dollars",
                            colorByPoint: true,
                            data: [
                                {
                                    name: "2010",
                                    y: 100,
                                },
                                {
                                    name: "2012",
                                    y: 200,
                                },
                                {
                                    name: "2014",
                                    y: 300,
                                },
                                {
                                    name: "2016",
                                    y: 400,
                                },
                                {
                                    name: "2018",
                                    y: 500,
                                },
                                {
                                    name: "2019",
                                    y: 600,
                                },
                                {
                                    name: "2020",
                                    y: 0,
                                }
                            ]
                        }
                    ]
                },
                stats: [
                    {
                        date: '15-8-2017',
                        weight: '100',
                        waist: '40',
                        hip: '20',
                    },
                    {
                        date: '15-8-2017',
                        weight: '100',
                        waist: '40',
                        hip: '20',
                    },
                    {
                        date: '15-8-2017',
                        weight: '100',
                        waist: '40',
                        hip: '20',
                    },
                ],
                profile: null
            }
        },
        components: {
            Profile,
            SendNotification,
            SendReport,
        },
        methods: {
            openNotification() {
                this.open = !this.open;
            },
            openReportModal() {
                this.openReport = !this.openReport;
            },
            bmi(height, weight) {
                let finalBmi = weight / (height / 100 * height / 100);
                return finalBmi.toFixed(2);
            }
        },
        mounted() {
            const $id = this.$route.params.user;
            this.axios.get(`c_panel/user/profile?user_id=${$id}`)
                .then(response => (this.profile = response.data.data[0]))
        }
    }
</script>
<style scoped lang="scss">
    thead {
        tr th {
            background-color: #EFF2F7;
            color: #555F6B;
        }
    }

    tbody {
        td {
            border-color: #C0CCDA;
        }

        tr:nth-child(even) td {
            background-color: #fff;
        }

        tr:nth-child(odd) td {
            background-color: #F9FAFC;
        }
    }
</style>
