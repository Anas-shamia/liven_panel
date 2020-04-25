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
                    <div class="bg-white-900 px-4 py-6 3sm:py-4 rounded-lg">
                        <router-link tag="p" :to="`/${profile.id}/reports`"
                                     class="mb-2 text-blue-800 text-sm font-bold underline">See All Reports
                        </router-link>
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
                    <div>
                        <div class="custom-shadow relative z-9 rounded-lg mb-8 ">
                            <div class="relative w-1/4 custom-input mb-0 flex items-center border-b ">
                                <img class="absolute top-0 left-0 ml-2 focus:outline-none" src="@/assets/img/date.svg"
                                     alt="date-icon">
                                <v-date-picker
                                        v-model='form.date'
                                        :popover="popover"
                                        :input-props='{
                                          class: "w-full rounded-sm px-8 focus:outline-none bg-transparent z-9",
                                          placeholder: "Search By Date",
                                        }'
                                />
                                <span class="cursor-pointer" @click="changeDate()">
                         <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" role="img"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                              class="svg-inline--fa fa-check w-6"><path
                                 fill="currentColor"
                                 d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"
                                 class=""></path></svg>
                    </span>
                            </div>
                        </div>
                        <ul class="flex flex-wrap items-center -mx-2 mb-6">
                            <li class="w-1/3 px-2 text-center">
                                <div @click="changeChart('today')" class="rounded-25px py-2 cursor-pointer"
                                     :class="selectedChart==='today'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                                >
                                    <span class="text-base font-medium">يوم</span>
                                </div>
                            </li>
                            <li class="w-1/3 px-2 text-center">
                                <div @click="changeChart('week')" class="rounded-25px py-2 cursor-pointer"
                                     :class="selectedChart==='week'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                                >
                                    <span class="text-base font-medium">أسبوع</span>
                                </div>
                            </li>
                            <li class="w-1/3 px-2 text-center">
                                <div @click="changeChart('month')" class="rounded-25px py-2 cursor-pointer"
                                     :class="selectedChart==='month'?'bg-primary-900 text-white-900':'bg-white-900 text-primary-900'"
                                >
                                    <span class="text-base font-medium">شهر</span>
                                </div>
                            </li>
                        </ul>
                        <p class="text-blue-900 font-medium text-2xl 4xl:text-lg mb-6 3sm:mb-4"
                           v-if="!chartOptions.series">
                            There is No Measurements in this Day
                        </p>
                        <div>
                            <highcharts :options="chartOptions"></highcharts>
                        </div>
                        <ul class="flex items-center justify-between bg-white-900 px-16 pb-2"
                            v-if="chartOptions.series">
                            <li class="text-xs font-bold text-blue-800">00:00</li>
                            <li class="text-xs font-bold text-blue-800">2:00</li>
                            <li class="text-xs font-bold text-blue-800">4:00</li>
                            <li class="text-xs font-bold text-blue-800">6:00</li>
                            <li class="text-xs font-bold text-blue-800">8:00</li>
                            <li class="text-xs font-bold text-blue-800">10:00</li>
                            <li class="text-xs font-bold text-blue-800">12:00</li>
                            <li class="text-xs font-bold text-blue-800">14:00</li>
                            <li class="text-xs font-bold text-blue-800">16:00</li>
                            <li class="text-xs font-bold text-blue-800">18:00</li>
                            <li class="text-xs font-bold text-blue-800">20:00</li>
                            <li class="text-xs font-bold text-blue-800">22:00</li>
                        </ul>

                        <div class="time-line">
                            <ul>
                                <li v-for="(item,index) in meals" :key="index" @click="openFoodModal">{{index+1}}</li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <SendNotification v-if="open" @close="open = false"/>
        <SendReport v-if="openReport" @close="openReport = false" :profile_id="profile.id"/>
        <FoodInfo v-if="openFood" @close="openFood = false" :profile_id="profile.id" :foods="meals"/>

    </div>
</template>
<script>
    import Profile from "../components/userDetails/Profile";
    import SendNotification from "../components/userDetails/SendNotification";
    import SendReport from "../components/userDetails/SendReport";
    import callPatient from "../components/userDetails/CallPatient";
    import FoodInfo from "../components/FoodInfo";

    export default {
        data() {
            return {
                open: false,
                openReport: false,
                openFood: false,
                openCall: false,
                profile: null,
                selectedChart: 'today',
                measurementAllByType: [],
                meals: [],
                user_id: this.$route.params.user,
                popover: {
                    visibility: 'focus',
                },
                form: {
                    user_id: this.$route.params.user,
                    date: new Date(),
                },
                chartOptions: {
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false
                    },
                    yAxis: {
                        title: {
                            text: 'CGM'
                        },
                        plotLines: [{
                            value: 70,
                            color: 'red',
                            dashStyle: 'shortdash',
                            width: 3,
                            label: {
                                text: '70 mg/dl'
                            }
                        }, {
                            value: 180,
                            color: 'red',
                            dashStyle: 'shortdash',
                            width: 3,
                            label: {
                                text: '180 mg/dl'
                            }
                        }]
                    },
                    xAxis: {
                        title: {
                            text: 'Time'
                        },
                        labels: {
                            enabled: false
                        }
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                        }
                    },


                    series: null,

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
            FoodInfo
        },
        methods: {
            openNotification() {
                this.open = !this.open;
            },
            openReportModal() {
                this.openReport = !this.openReport;
            },
            openFoodModal() {
                this.openFood = !this.openFood;
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
                this.axios.get(`/c_panel/diabetes/user/chart/${this.selectedChart}?user_id=${$id}`)
                    .then(response => {
                        this.measurementAllByType = response.data.data;
                        this.chartOptions.series = this.measurementAllByType;
                        // const $first = [
                        //     {
                        //         name: '2020-03-20',
                        //         data: [
                        //             {
                        //                 name: '12:00 am',
                        //                 y: 0
                        //             }
                        //         ],
                        //     }
                        // ];
                        // let measurements = this.measurementAllByType;
                        // if (this.selectedChart === 'month')
                        //     measurements = $first.concat(this.measurementAllByType);
                        // console.log(measurements);
                        // this.chartOptions.series = measurements;
                    });

            },
            formatDate() {
                let $date = this.form.date;
                if ($date){
                    let dd = String($date.getDate()).padStart(2, '0');
                    let mm = String($date.getMonth() + 1).padStart(2, '0'); //January is 0!
                    let yyyy = $date.getFullYear();
                    $date = mm + '-' + dd + '-' + yyyy;
                    return this.form.date = $date;
                }
            },
            changeDate() {
                this.formatDate();
                this.form.user_id = this.$route.params.user;
                this.axios.post('c_panel/user/public/search', this.form).then((res) => {
                    this.form = {
                        date: null,
                    };
                    this.chartOptions.series = res.data.data.chart_diabetes.length ? res.data.data.chart_diabetes[0] : null;
                    this.meals = res.data.data.meals.length ? res.data.data.meals : null;
                }).catch((error) => {
                    if (error.response) {
                        if (error.response.status === 422) {
                            console.log('test');
                        }
                    }
                });
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
        //     measurementAllByType($val) {
        //         console.log($val);
        //         this.chartOptions.series = $val.data.map(x => {
        //             return {
        //                 name: x.time,
        //                 y: x.value
        //             }
        //         });
        //     }
        // },
        mounted() {
            const $id = this.$route.params.user;
            this.axios.get(`c_panel/user/profile?user_id=${$id}`)
                .then(response => (this.profile = response.data.data[0]))
        },
        created() {
            this.changeChart('today');
            this.changeDate();
        }
    }
</script>

<style scoped lang="scss">
    .time-line {
        margin-top: 20px;
        text-align: center;

        ul {
            text-align: justify;
            position: relative;
            overflow: hidden;
            margin: 0;
            display: inline-block;
        }

        ul:before, li:after {
            content: '';
            width: 100%;
            border: 2px solid #693574;
            position: absolute;
            top: 1em;
            margin-top: -2px;
            z-index: 1;
        }

        li {
            width: 2em;
            height: 2em;
            text-align: center;
            line-height: 2em;
            border-radius: 50%;
            background: #693574;
            margin: 0 1em;
            display: inline-block;
            color: white;
            position: relative;
            z-index: 2;
            transition: all 0.25s ease;
            cursor: pointer;
        }
    }
</style>
