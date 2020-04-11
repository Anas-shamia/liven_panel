<template>
    <div>
        <div class="mb-6 bg-white-900 custom-shadow rounded-lg px-8 py-10 3sm:px-4 3sm:py-5 3sm:mb-4 relative z-2">
            <div class="flex items-center mb-4 3sm:mb-2">
                <p class="text-gray-600 font-medium 3sm:font-normal text-xl 4xl:text-lg 3sm:text-base pr-4">
                    Subscription Start:
                </p>
                <span class="text-gray-600 font-medium 3sm:font-normal text-xl 4xl:text-lg 3sm:text-base" v-if="!open">{{this.start_date}}</span>
                <div v-if="open">
                    <v-date-picker
                            v-model='form.subscription_start_date'
                            :popover="popover"
                            :min-date="new Date()"
                            :input-props='{
                          class: "form-control",
                          placeholder: "Subscription Start",
                        }'
                    />
                </div>
            </div>
            <p class="text-gray-600 font-medium 3sm:font-normal text-xl 4xl:text-lg 3sm:text-base 3sm:mb-2 mb-4">
                Subscription End: <span class="pl-4">{{this.end_date}}</span></p>
            <div class="flex items-center 3sm:flex-wrap">
                <p class="text-gray-600 font-medium 3sm:font-normal text-xl 4xl:text-lg 3sm:text-base 3sm:mb-2 capitalize">
                    The next meeting will be on:</p>
                <span class="3sm:w-1/2 text-gray-600 font-medium 3sm:font-normal text-xl 4xl:text-lg 3sm:text-base 3sm:px-0 3sm:flex-grow px-4">25-10-2020</span>
                <span class="3sm:w-1/2 text-gray-600 font-medium 3sm:font-normal text-xl 4xl:text-lg 3sm:text-base">8:30 pm</span>
            </div>
            <button type="button"
                    class="font-medium rounded px-4 mt-4 bg-primary-900 text-white-900 text-lg 3sm:text-base 3sm:font-normal py-2 block text-center"
                    @click="openAssignModal()">Assign To Dietician
            </button>
            <span class="absolute right-0 top-0 mt-4 mr-5 cursor-pointer" @click="openEdit()" v-if="!open">
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" role="img"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-edit w-6"><path
                    fill="currentColor"
                    d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
                    class=""></path></svg>
        </span>
            <span class="absolute right-0 top-0 mt-4 mr-5 cursor-pointer" v-if="open" @click="saveDate()">
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" role="img"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-check w-6"><path
                    fill="currentColor"
                    d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"
                    class=""></path></svg>
        </span>

        </div>
        <AssignDietician v-if="openAssign" @close="openAssign = false"/>
    </div>
</template>
<script>
    import AssignDietician from "../../components/AssignDietician";

    export default {
        props: ['start_date', 'end_date'],
        components: {
            AssignDietician
        },
        data() {
            return {
                open: false,
                openAssign: false,
                form: {
                    user_id: this.$route.params.user,
                    subscription_start_date: null,
                },
                popover: {
                    visibility: 'focus',
                },
            }
        },
        methods: {
            formatDate() {
                let $date = this.form.subscription_start_date;
                let dd = String($date.getDate()).padStart(2, '0');
                let mm = String($date.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = $date.getFullYear();
                $date = mm + '-' + dd + '-' + yyyy;
                return this.form.subscription_start_date = $date;
            },
            openEdit() {
                this.open = !this.open;
            },
            saveDate() {
                this.open = false;
                this.formatDate();
                this.axios.post('/c_panel/user/subscription', this.form).then((res) => {
                    this.open = false;
                    this.form = {
                        subscription_start_date: null,
                    };
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                }).catch((error) => {
                    if (error.response) {
                        if (error.response.status === 422) {
                            console.log('error');
                        }
                    }
                });
            },
            openAssignModal() {
                this.openAssign = !this.openAssign;
            },
        }
    }
</script>
