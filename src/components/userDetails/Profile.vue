<template>
    <div class="bg-white-900 px-3 py-10 rounded-lg mb-6 3sm:mb-4 3sm:py-5">
        <div class="mx-auto text-center mb-8 3sm:mb-4">
            <img class="object-cover w-24 h-24 rounded-full mx-auto mb-6" v-if="userProfile.image" :src="userProfile.image"
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
