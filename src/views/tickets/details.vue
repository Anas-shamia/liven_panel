<template>
    <div class="container-content pb-24" v-if="profile">
        <div class="flex items-center mb-8 3sm:mb-4">
            <img src="@/assets/img/user.svg" alt="icon">
            <router-link tag="h2" to="/users" class="text-2xl 4xl:text-lg text-blue-900 px-4 cursor-pointer">Users
            </router-link>
            <img src="@/assets/img/right-chevron.svg" alt="icon">
            <span class="text-2xl 4xl:text-lg text-gray-900 pl-6 cursor-pointer"
                  @click="showDetails()">User Details</span>
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
                <div class="w-3/5" v-if="OpenCallComponent ">
                    <callPatient/>
                </div>
                <div class="w-full" v-if="OpenCallComponent === false">
                    <SubscriptionDuration :start_date="profile.subscription_date"
                                          :end_date="profile.subscription_end_date"
                                          :next_meeting="next_meeting"/>
                    <WeightStatistics :user_id="profile.id" :weight="profile.weight" :height="profile.length"
                                      :waist="profile.body.length ? profile.body[0].waist: '0'"
                                      :hip="profile.body.length ? profile.body[0].highest: '0'"/>
                    <div class="flex flex-wrap -mx-6 4xl:-mx-4 3sm:-mx-4">
                        <div class="w-1/2 3sm:w-full px-6 4xl:px-4 3sm:px-4">
                            <BloodSugar :user_id="profile.id"/>
                        </div>
                        <div class="w-1/2 3sm:w-full px-6 4xl:px-4 3sm:px-4" v-if="profile.has_meals">
                            <MealsHistory :the_id="profile.id"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SendNotification v-if="open" @close="open = false"/>
        <SendReport v-if="openReport" @close="openReport = false" :profile_id="profile.id"/>

    </div>
</template>
<script>
    import Profile from "../../components/userDetails/Profile";
    import SubscriptionDuration from "../../components/userDetails/SubscriptionDuration";
    import WeightStatistics from "../../components/userDetails/WeightStatistics";
    import BloodSugar from "../../components/userDetails/BloodSugar";
    import MealsHistory from "../../components/userDetails/MealsHistory";
    import SendNotification from "../../components/userDetails/SendNotification";
    import SendReport from "../../components/userDetails/SendReport";
    import callPatient from "../../components/userDetails/CallPatient";

    export default {
        data() {
            return {
                open: false,
                openReport: false,
                openCall: false,
                profile: null,
                next_meeting: null,

            }
        },

        components: {
            Profile,
            SubscriptionDuration,
            WeightStatistics,
            BloodSugar,
            MealsHistory,
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
                this.$store.dispatch("getCallOpen", true);
            },
            showDetails() {
                this.$store.dispatch("getCallOpen", false);
            }
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

        mounted() {
            const $id = this.$route.params.user;
            this.axios.get(`c_panel/user/profile?user_id=${$id}`)
                .then(response => {
                    this.profile = response.data.data[0];
                    this.next_meeting = response.data.coming_appointment.length ? response.data.coming_appointment[0].concatenated_en : '';
                })
        }

    }
</script>

