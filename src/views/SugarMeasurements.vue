<template>
    <div class="container-content pb-24" v-if="profile">
        <div class="flex items-center mb-8 3sm:mb-4">
            <img src="@/assets/img/user.svg" alt="icon">
            <router-link tag="h2" to="/users" class="text-2xl 4xl:text-lg text-blue-900 px-4 cursor-pointer">Users
            </router-link>
            <img src="@/assets/img/right-chevron.svg" alt="icon">
            <router-link tag="p" :to="`/${this.user_id}/details`"
                         class="text-2xl 4xl:text-lg text-gray-900 pl-6 cursor-pointer"
                         @click="showDetails()">User Details
            </router-link>
        </div>

        <div class="flex flex-wrap -mx-4">
            <div class="w-1/4 3sm:w-full px-4 profile-info">
                <Profile/>
                <div class="mb-8 3sm:mb-4">
                    <h3 class="text-blue-900 font-medium text-2xl 4xl:text-lg mb-6">Reports</h3>
                    <div class="bg-white-900 px-4 py-8 3sm:py-4 rounded-lg">
                        <ul class="mb-8 3sm:mb-4" v-if="profile.reports.length">
                            <li class="border-b border-gray-800 mb-4 3sm:mb-2 flex items-center"
                                v-for="(item,index) in sortReports" :key="index" v-if="index <= 2">
                                <p class="mb-2 text-black-900 font-medium text-base 3sm:text-sm flex-grow">
                                    {{item.title}}</p>
                                <p class="mb-2 text-base 3sm:text-xs text-gray-700">{{item.created_at}}</p>
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
            <div class="w-3/4 3sm:w-full px-4 flex flex-wrap">
                <div class="w-3/5" v-if="OpenCallComponent">
                    <callPatient/>
                </div>
                <div class="w-full" v-if="OpenCallComponent === false">
                    <div v-if="measurementAllByType.length">
                        <div class="custom-shadow relative z-9 rounded-lg mb-8 ">
                            <div class="relative custom-input mb-0">
                                <img class="absolute top-0 left-0 ml-2 focus:outline-none" src="@/assets/img/date.svg"
                                     alt="date-icon">
                                <v-date-picker
                                        v-model='form.date'
                                        :popover="popover"
                                        @input="changeDate()"
                                        :input-props='{
                                          class: "w-full rounded-sm px-8 focus:outline-none bg-transparent z-9",
                                          placeholder: "Search By Date",
                                        }'
                                />
                            </div>
                            <hr class="mb-4">
                        </div>
                        <ul class="flex flex-wrap items-center -mx-2 mb-6">
                            <li class="w-1/3 px-2 text-center">
                                <div @click="changeChart('week')" class="rounded-25px py-2 cursor-pointer"
                                     :class="selectedChart==='week'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                                >
                                    <span class="text-base font-medium">اسبوع</span>
                                </div>
                            </li>
                            <li class="w-1/3 px-2 text-center">
                                <div @click="changeChart('month')" class="rounded-25px py-2 cursor-pointer"
                                     :class="selectedChart==='month'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                                >
                                    <span class="text-base font-medium">شهر</span>
                                </div>
                            </li>
                            <li class="w-1/3 px-2 text-center">
                                <div @click="changeChart('year')" class="rounded-25px py-2 cursor-pointer"
                                     :class="selectedChart==='year'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                                >
                                    <span class="text-base font-medium">سنة</span>
                                </div>
                            </li>
                        </ul>
                        <highcharts :options="chartOptions" v-if="measurementAllByType.length"></highcharts>
                    </div>
                    <p class="text-blue-900 font-medium text-2xl 4xl:text-lg mb-6 3sm:mb-4" v-else>
                        Please Add Measurements
                    </p>
                </div>
            </div>
        </div>
        <SendNotification v-if="open" @close="open = false"/>
        <SendReport v-if="openReport" @close="openReport = false" :profile_id="profile.id"/>

    </div>
</template>
<script>
    import Profile from "../components/userDetails/Profile";
    import SendNotification from "../components/userDetails/SendNotification";
    import SendReport from "../components/userDetails/SendReport";
    import callPatient from "../components/userDetails/CallPatient";

    export default {
        data() {
            return {
                open: false,
                openReport: false,
                openCall: false,
                profile: null,
                measurementAllByType: [],
                user_id: this.$route.params.user,
                popover: {
                    visibility: 'focus',
                },
                form: {
                    user_id: this.$route.params.user,
                    date: null,
                },
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

        components: {
            Profile,
            SendNotification,
            SendReport,
            callPatient,
        },
        methods: {
            openNotification() {
                this.open = !this.open;
            },
            openReportModal() {
                this.openReport = !this.openReport;
            },
            openCalls() {
                this.$store.dispatch("getMealShow", false);
                this.$store.dispatch("getCallOpen", true);
            },
            showDetails() {
                this.$store.dispatch("getCallOpen", false);
                this.$store.dispatch("getMealShow", false);
            },
            changeChart(type) {
                const $id = this.$route.params.user;
                this.selectedChart = type;
                this.chartOptions.series[0].data = [];
                console.log(`c_panel/diabetes/user/chart/${this.selectedChart}?user_id=${$id}`);
                this.axios.get(`c_panel/diabetes/user/chart/${this.selectedChart}?user_id=${$id}`)
                    .then(response => {
                        this.measurementAllByType = response.data.data;
                        this.chartOptions.series[0].data = this.measurementAllByType;
                    });

            },
            formatDate() {
                let $date = this.form.date;
                let dd = String($date.getDate()).padStart(2, '0');
                let mm = String($date.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = $date.getFullYear();
                $date = mm + '-' + dd + '-' + yyyy;
                return this.form.date = $date;
            },
            changeDate() {
                // this.formatDate();
                // this.axios.post('c_panel/meal/user/today/all', this.form).then((res) => {
                //     this.form = {
                //         date: null,
                //     };
                //     this.meals = this.meals = res.data.data;
                // }).catch((error) => {
                //     if (error.response) {
                //         if (error.response.status === 422) {
                //             console.log('test');
                //         }
                //     }
                // });
            },
        },
        computed: {
            ShowMealsComponent() {
                return this.$store.state.showMeal;
            },
            OpenCallComponent() {
                return this.$store.state.openCall;
            },
            sortReports: function () {
                if (this.profile.reports.length) {
                    return this.profile.reports = _.orderBy(this.profile.reports, ['id'], ['desc']);
                }
            }
        },
        // watch: {
        //     measurement($val) {
        //         if ($val) {
        //             this.chartOptions.series[0].data = $val.map(x => {
        //                 return {
        //                     name: x.name ? x.name : '0',
        //                     y: x.y ? x.y : 0
        //                 }
        //             });
        //         }
        //     }
        // },
        mounted() {
            const $id = this.$route.params.user;
            this.axios.get(`c_panel/user/profile?user_id=${$id}`)
                .then(response => (this.profile = response.data.data[0]))
        },
        created() {
            this.changeChart('week');
        }
    }
</script>

