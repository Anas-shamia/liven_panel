<template>
    <div class="bg-white-900 px-3 py-10 rounded-lg mb-6 3sm:mb-4 3sm:py-5">
        <div class="mx-auto text-center mb-8 3sm:mb-4">
            <img class="object-cover w-24 h-24 rounded-full mx-auto mb-6" v-if="userProfile.url"
                 :src="userProfile.url"
                 alt="profile-pic">
            <img class="object-cover w-24 h-24 rounded-full mx-auto mb-6" v-else src="@/assets/img/avatar.svg"
                 alt="profile-pic">
            <h3 class="font-semibold text-gray-600 text-2xl 4xl:text-lg">{{userProfile.name}}</h3>
        </div>
        <div>
            <h4 class="uppercase font-bold text-sm 4xl:text-xs text-gray-700 px-4 py-2 bg-gray-800">USER
                INFO</h4>
            <ul class="pb-6 3sm:pb-4">
                <li class="flex items-center px-4 py-6 3sm:px-2 3sm:py-4 border-b border-gray-800">
                    <img class="w-4 mr-4" src="@/assets/img/ruler.svg" alt="icon">
                    <p class="text-gray-400 font-medium text-base 4xl:text-sm flex-grow">Height</p>
                    <p class="text-gray-400 font-medium text-base 4xl:text-sm">{{userProfile.length}}<span
                            class="pl-2">(cm)</span></p>
                </li>
                <li class="flex items-center px-4 py-6 3sm:px-2 3sm:py-4 border-b border-gray-800">
                    <img class="w-4 mr-4" src="@/assets/img/weight.svg" alt="icon">
                    <p class="text-gray-400 font-medium text-base 4xl:text-sm flex-grow">Weight</p>
                    <p class="text-gray-400 font-medium text-base 4xl:text-sm">{{userProfile.weight}}<span
                            class="pl-2">(kg)</span></p>
                </li>
                <li class="flex items-center px-4 py-6 3sm:px-2 3sm:py-4 border-b border-gray-800">
                    <img class="w-4 mr-4" src="@/assets/img/calendar.svg" alt="icon">
                    <p class="text-gray-400 font-medium text-base 4xl:text-sm flex-grow">Age</p>
                    <p class="text-gray-400 font-medium text-base 4xl:text-sm">{{userProfile.age}}</p>
                </li>
                <li class="flex items-center px-4 py-6 3sm:px-2 3sm:py-4 border-b border-gray-800">
                    <img class="w-4 mr-4" src="@/assets/img/gender.svg" alt="icon">
                    <p class="text-gray-400 font-medium text-base 4xl:text-sm flex-grow">Gender</p>
                    <p class="text-gray-400 font-medium text-base 4xl:text-sm">{{userProfile.gender}}</p>
                </li>
                <li class="flex items-center px-4 py-6 3sm:px-2 3sm:py-4 border-b border-gray-800">
                    <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="flag-alt" role="img"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                         class="svg-inline--fa fa-flag-alt w-4 mr-4">
                        <path fill="#858891"
                              d="M472.5 0c-7 0-14.3 1.5-21.2 4.6-50.5 22.7-87.8 30.3-119.1 30.3C266.1 34.9 227.7.4 151.4.4 119.8.4 81.2 6.9 32 23.6V16c0-8.8-7.2-16-16-16S0 7.2 0 16v488c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8V403.6c44.2-15.8 81.6-22 114.5-22 81.2 0 137.8 34.4 219.1 34.4 35.3 0 75.1-6.5 123.7-25 14-5.4 22.8-17.9 22.8-31.2V33.4C512 13 493.4 0 472.5 0zm-107 384c-75.6 0-133-34.4-219.1-34.4-36.7 0-74.4 6.5-114.5 19.8V57.2c46-16.7 85.3-24.8 119.4-24.8 69.5 0 108.4 34.5 180.8 34.5 39.8 0 81.8-10.5 132.1-33.1 9.4-4.2 15.7-.5 15.7 5.6v320.1c-.8 2.5-58.8 24.5-114.4 24.5z"
                              class=""></path>
                    </svg>
                    <p class="text-gray-400 font-medium text-base 4xl:text-sm flex-grow">Country</p>
                    <p class="text-gray-400 font-medium text-base 4xl:text-sm">{{userProfile.country}}</p>
                </li>
                <li class="flex items-center px-4 py-6 3sm:px-2 3sm:py-4 border-b border-gray-800">
                    <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="city" role="img"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
                         class="svg-inline--fa fa-city w-6 mr-5">
                        <path fill="#858891"
                              d="M132 368H92c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm0-96H92c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm0-96H92c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm96 192h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm0-96h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm0-96h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm192 96h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm0-96h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm0-96h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12V92c0-6.63-5.38-12-12-12zm128 288h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm0-96h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm68-80H512V24c0-13.26-10.75-24-24-24H312c-13.25 0-24 10.74-24 24v72h-64V8c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8v88h-64V8c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8v88H24c-13.25 0-24 10.74-24 24v384c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8V128h288V32h160v192h128v280c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8V216c0-13.26-10.75-24-24-24z"
                              class=""></path>
                    </svg>
                    <p class="text-gray-400 font-medium text-base 4xl:text-sm flex-grow">City</p>
                    <p class="text-gray-400 font-medium text-base 4xl:text-sm">{{userProfile.city}}</p>
                </li>
                <li class="flex items-center flex-wrap px-4 py-6 3sm:px-2 3sm:py-4 border-b border-gray-800">
                    <div class="w-full flex items-center">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="percent" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                             class="svg-inline--fa fa-percent w-3 mr-4">
                            <path fill="#858891"
                                  d="M112 224c61.9 0 112-50.1 112-112S173.9 0 112 0 0 50.1 0 112s50.1 112 112 112zm0-160c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zm224 224c-61.9 0-112 50.1-112 112s50.1 112 112 112 112-50.1 112-112-50.1-112-112-112zm0 160c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zM392.3.2l31.6-.1c19.4-.1 30.9 21.8 19.7 37.8L77.4 501.6a23.95 23.95 0 0 1-19.6 10.2l-33.4.1c-19.5 0-30.9-21.9-19.7-37.8l368-463.7C377.2 4 384.5.2 392.3.2z"
                                  class=""></path>
                        </svg>
                        <p class="text-gray-400 font-medium text-base 4xl:text-sm flex-grow">Completion rate</p>
                        <p class="text-gray-400 font-medium text-base 4xl:text-sm mr-3">{{userProfile.completion_rate}}%</p>
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                             class="svg-inline--fa fa-edit w-4 cursor-pointer" @click="openEdit()" v-if="!open">
                            <path
                                    fill="currentColor"
                                    d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
                                    class=""></path>
                        </svg>
                    </div>
                    <div class="w-full" v-if="open">
                        <ValidationObserver ref="addRate">
                            <form @submit.prevent="handleSubmit" class="w-full">
                                <ValidationProvider class="form-group mb-0 mt-2" tag="div"
                                                    vid="title" name="title" rules="required|integer"
                                                    v-slot="{ errors }">
                                    <div class="flex items-center">
                                        <input class="form-control flex-grow mr-4" type="text" placeholder="rate"
                                               :class="{ 'has-danger': errors.length }" v-model="form.value">
                                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check"
                                             role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                             class="svg-inline--fa fa-check w-6 cursor-pointer" @click="handleSubmit()">
                                            <path
                                                    fill="currentColor"
                                                    d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"
                                                    class=""></path>
                                        </svg>
                                    </div>
                                    <p class="message-danger">{{ errors[0] }}</p>
                                </ValidationProvider>
                            </form>
                        </ValidationObserver>
                    </div>
                </li>
                <li class="flex items-center px-4 py-6 3sm:px-2 3sm:py-4 border-b border-gray-800" v-if="success">
                    <div class="bg-green-100 mt-2 rounded-10px text-center w-full">
                        <p class="p-3 text-base text-blue-800 font-medium">Sent Successfully</p>
                    </div>
                </li>
            </ul>
            <button type="button"
                    class="font-medium rounded-full bg-primary-900 text-white-900 text-lg py-2 w-10/12 mx-auto block text-center 3sm:text-sm"
                    v-if="!OpenCallComponent" @click="openCalls">
                Call The Patient
            </button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                open: false,
                userProfile: [],
                success: false,
                loading: false,
                form: {
                    user_id: this.$route.params.user,
                    value: null,
                }
            }
        },
        methods: {
            openCalls() {
                this.$store.dispatch("getMealShow", false);
                this.$store.dispatch("getCallOpen", true);
            },
            openEdit() {
                this.open = !this.open;
            },
            handleSubmit() {
                const $this = this;
                this.$refs['addRate'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        this.axios.post('/c_panel/user/completion/rate', this.form).then((res) => {
                            this.success = true;
                            this.loading = false;
                            this.open = false;
                            this.form = {
                                value: null,
                            };
                            setTimeout(function () {
                                $this.success = false;
                                location.reload();
                            }, 2000);
                            this.$refs['addRate'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.$refs['addRate'].setErrors(error.response.data.errors);
                                }
                            }
                        });
                    }
                });
            },
        },
        computed: {
            OpenCallComponent() {
                return this.$store.state.openCall;
            }
        },
        mounted() {
            const $id = this.$route.params.user;
            this.axios.get(`c_panel/user/profile?user_id=${$id}`)
                .then(response => (this.userProfile = response.data.data[0]))
        }
    }
</script>
