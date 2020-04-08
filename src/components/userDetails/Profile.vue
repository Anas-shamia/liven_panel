<template>
    <div class="bg-white-900 px-3 py-10 rounded-lg mb-6 3sm:mb-4 3sm:py-5">
        <div class="mx-auto text-center mb-8 3sm:mb-4">
            <img class="object-cover w-24 h-24 rounded-full mx-auto mb-6" v-if="userProfile.image"
                 :src="userProfile.image"
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
                        <path fill="currentColor"
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
                        <path fill="currentColor"
                              d="M132 368H92c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm0-96H92c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm0-96H92c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm96 192h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm0-96h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm0-96h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm192 96h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm0-96h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm0-96h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12V92c0-6.63-5.38-12-12-12zm128 288h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm0-96h-40c-6.62 0-12 5.37-12 12v40c0 6.63 5.38 12 12 12h40c6.62 0 12-5.37 12-12v-40c0-6.63-5.38-12-12-12zm68-80H512V24c0-13.26-10.75-24-24-24H312c-13.25 0-24 10.74-24 24v72h-64V8c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8v88h-64V8c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8v88H24c-13.25 0-24 10.74-24 24v384c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8V128h288V32h160v192h128v280c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8V216c0-13.26-10.75-24-24-24z"
                              class=""></path>
                    </svg>
                    <p class="text-gray-400 font-medium text-base 4xl:text-sm flex-grow">City</p>
                    <p class="text-gray-400 font-medium text-base 4xl:text-sm">{{userProfile.city}}</p>
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
                userProfile: []
            }
        },
        methods: {
            openCalls() {
                this.$store.dispatch("getMealShow", false);
                this.$store.dispatch("getCallOpen", true);
            }
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
