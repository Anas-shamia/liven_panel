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
                <div class="w-full" v-if="OpenCallComponent">
                    <callPatient :channel_id="profile.channel_id"/>
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
                           v-if="!chartOptions.series.length"
                        >
                            There is No Measurements To Show
                        </p>
                        <div class="spinner" v-if="loading">
                            <div class="double-bounce1"></div>
                            <div class="double-bounce2"></div>
                        </div>
                        <div v-if="chartOptions.series.length && !loading">
                            <highcharts
                                    :options="chartOptions"></highcharts>
                        </div>

                        <div class="time-line" v-if="selectedChart ==='today'">
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
        <FoodInfo v-if="openFood" @close="openFood = false" :profile_id="profile.id"
                  :foods="meals" :drug="medicine"/>
    </div>
</template>
<script>
    import Profile from "../components/userDetails/Profile";
    import SendNotification from "../components/userDetails/SendNotification";
    import SendReport from "../components/userDetails/SendReport";
    import callPatient from "../components/userDetails/CallPatient";
    import FoodInfo from "../components/FoodInfo";
    import {Chart} from 'highcharts-vue';
    import Highcharts from 'highcharts';
    import stockInit from 'highcharts/modules/stock';

    stockInit(Highcharts);


    export default {
        data() {
            return {
                open: false,
                openReport: false,
                openFood: false,
                openCall: false,
                profile: null,
                loading: false,
                selectedChart: 'today',
                measurementAllByType: [],
                meals: [],
                medicine: [],
                user_id: this.$route.params.user,
                popover: {
                    visibility: 'focus',
                },
                form: {
                    user_id: this.$route.params.user,
                    date: new Date(),
                },
                // chartOptions: {
                //     title: {
                //         text: ''
                //     },
                //     credits: {
                //         enabled: false
                //     },
                //     yAxis: {
                //         title: {
                //             text: 'CGM'
                //         },
                //         plotLines: [{
                //             value: 70,
                //             color: 'red',
                //             dashStyle: 'shortdash',
                //             width: 3,
                //             label: {
                //                 text: '70 mg/dl'
                //             }
                //         }, {
                //             value: 180,
                //             color: 'red',
                //             dashStyle: 'shortdash',
                //             width: 3,
                //             label: {
                //                 text: '180 mg/dl'
                //             }
                //         }]
                //     },
                //     xAxis: {
                //         title: {
                //             text: 'Time'
                //         },
                //         labels: {
                //             enabled: false
                //         }
                //     },
                //     plotOptions: {
                //         series: {
                //             label: {
                //                 connectorAllowed: false
                //             },
                //         }
                //     },
                //     series: [],
                //
                //     responsive: {
                //         rules: [{
                //             condition: {
                //                 maxWidth: 576
                //             },
                //         }]
                //     }
                // }
                chartOptions: {
                    connectNulls : false,
                    chart: {type: 'area'},
                    title: {
                        text: ''
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {enabled: true},
                    tooltip: {
                        shared: true,
                        useHTML: true,
                        dateTimeLabelFormats: {
                            hour: "%H:%M:%S"
                        }
                    },
                    plotOptions: {
                        area: {
                            lineWidth: 1,
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                radius: 4
                            }
                        },
                        arearange: {
                            lineWidth: 1
                        },
                        areaspline: {
                            lineWidth: 1,
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                radius: 4
                            }
                        },
                        areasplinerange: {
                            lineWidth: 1
                        },
                        boxplot: {
                            groupPadding: 0.05,
                            pointPadding: 0.05,
                            fillColor: 'rgba(255,255,255,.75)'
                        },
                        bubble: {
                            minSize: '0.25%',
                            maxSize: '17%'
                        },
                        column: {
                            //stacking:'normal',
                            groupPadding: 0.05,
                            pointPadding: 0.05
                        },
                        columnrange: {
                            groupPadding: 0.05,
                            pointPadding: 0.05
                        },
                        errorbar: {
                            groupPadding: 0.05,
                            pointPadding: 0.05,
                            showInLegend: true
                        },
                        line: {
                            lineWidth: 1,
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                radius: 4
                            }
                        },
                        scatter: {
                            marker: {
                                symbol: 'circle',
                                radius: 5
                            }
                        },
                        spline: {
                            lineWidth: 1,
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                radius: 4
                            }
                        },
                        series: {
                            fillOpacity: 0,
                            lineWidth: 0.25,
                            pointStart: 1435723200000,
                            pointInterval: 3600 * 1000,
                            shadow: false,
                            borderWidth: 0,
                            states: {
                                hover: {
                                    lineWidthPlus: 0,
                                }
                            }
                        }
                    },
                    xAxis: {
                        type: 'datetime',
                        showLastLabel: true,
                        endOnTick: false,
                        labels: {
                            formatter: function () {
                                return Highcharts.dateFormat('%H:%M', this.value);
                            }
                        },
                        title: {text: 'Time'}
                    },
                    yAxis: {title: {text: 'Values'}},
                    series: null
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
                this.loading = true;
                this.axios.get(`/c_panel/diabetes/user/chart/${this.selectedChart}?user_id=${$id}`)
                    .then(response => {
                        let myData = response.data.data.map(function (x) {
                            return {
                                name: new Date(x.data[0][0]).toISOString().slice(0, 10),
                                data: x.data.map(function (r) {
                                    return r[1]
                                })
                            }
                        });
                        
                        

                        this.measurementAllByType = myData;
                        this.chartOptions.series = this.measurementAllByType;
                        this.loading = false;
                    });

            },
            formatDate($date) {
                if ($date) {
                    let dd = String($date.getDate()).padStart(2, '0');
                    let mm = String($date.getMonth() + 1).padStart(2, '0'); //January is 0!
                    let yyyy = $date.getFullYear();
                    let $formated = mm + '-' + dd + '-' + yyyy;
                    return $formated;
                }
            },
            changeDate() {
                const $form = _.cloneDeep(this.form);
                $form.user_id = this.$route.params.user;
                $form.date = this.formatDate($form.date);
                this.axios.post('c_panel/user/public/search', $form).then((res) => {
                    console.log(res.data.data.chart_diabetes);
                    this.chartOptions.series = res.data.data.chart_diabetes.length ? res.data.data.chart_diabetes : [];
                    this.meals = res.data.data.meals.length ? res.data.data.meals : null;
                    this.medicine = res.data.data.medicine.length ? res.data.data.medicine : null;
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

    .spinner {
        width: 68px;
        height: 68px;
    }

    .double-bounce1, .double-bounce2 {
        background-color: #693574 !important;
    }
</style>
