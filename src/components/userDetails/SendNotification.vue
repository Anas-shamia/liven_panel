<template>
    <div class="flex items-center justify-center">
        <div class="fixed inset-0 overlay flex items-center justify-center" @click.self="$emit('close')">
            <div class="w-1/4 2xl:w-1/3 3sm:w-full 3sm:mx-4 bg-white-900 mx-auto flex items-center justify-center rounded-lg custom-shadow px-12 py-10 3sm:px-4 3sm:py-5">
                <div class="w-full">
                    <h3 class="text-blue-900 text-2xl 4xl:text-lg mb-6 flex items-center">
                        <span class="flex-grow">Post Notification</span>
                        <img class="w-4 cursor-pointer" src="@/assets/img/close.svg" alt="close"
                             @click="$emit('close')">
                    </h3>
                    <ValidationObserver ref="sendNotification">
                        <form @submit.prevent="handleSubmit">
                            <ValidationProvider class="form-group mb-10 3sm:mb-4" tag="div"
                                                vid="title" name="title" rules="required"
                                                v-slot="{ errors }">
                                <input class="form-control" type="text" placeholder="Notification Title"
                                       :class="{ 'has-danger': errors.length }" v-model="form.title"/>
                                <p class="message-danger">{{ errors[0] }}</p>
                            </ValidationProvider>
                            <ValidationProvider class="form-group mb-10 3sm:mb-4" tag="div"
                                                vid="content" name="content" rules="required"
                                                v-slot="{ errors }">
                                <input class="form-control" type="text" placeholder="Notification Text"
                                       :class="{ 'has-danger': errors.length }" v-model="form.content"/>
                                <p class="message-danger">{{ errors[0] }}</p>
                            </ValidationProvider>
                            <button type="submit"
                                    class="w-full rounded bg-primary-900 text-white-900 text-lg 3sm:text-base 3sm:py-2 py-3 block text-center mb-6 3sm:mb-4"
                                    :disabled="loading">
                                Create
                            </button>
                            <div class="bg-green-100 mt-4 rounded-10px text-center" v-if="success">
                                <p class="p-3 text-base text-blue-800 font-medium">Sent Successfully</p>
                            </div>
                            <!--                        <div class="flex items-center flex-wrap -mx-3" v-if="openSendLater">-->
                            <!--                            <ValidationProvider class="form-group mb-6 w-1/2 px-3" tag="div"-->
                            <!--                                                vid="title" name="title" rules="required"-->
                            <!--                                                v-slot="{ errors }">-->
                            <!--                                <datetime class="form-control theme-purple w-full" placeholder="Date"></datetime>-->
                            <!--                                <p class="message-danger">{{ errors[0] }}</p>-->
                            <!--                            </ValidationProvider>-->
                            <!--                            <ValidationProvider class="form-group mb-6 w-1/2 px-3" tag="div"-->
                            <!--                                                vid="title" name="title" rules="required"-->
                            <!--                                                v-slot="{ errors }">-->
                            <!--                                <datetime type="time" class="form-control theme-purple w-full" placeholder="Time"></datetime>-->
                            <!--                                <p class="message-danger">{{ errors[0] }}</p>-->
                            <!--                            </ValidationProvider>-->
                            <!--                        </div>-->
                            <!--                        <button type="button"-->
                            <!--                                class="w-full font-medium rounded text-primary-900 border border-primary-900 text-lg 3sm:text-base 3sm:py-2 py-3 block text-center" @click="sendLater">-->
                            <!--                            Send later-->
                            <!--                        </button>-->
                        </form>
                    </ValidationObserver>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                openSendLater: false,
                success: false,
                loading: false,
                form: {
                    title: null,
                    content: null,
                    date: null
                }
            }
        },
        methods: {
            getToday() {
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();
                today = dd + '/' + mm + '/' + yyyy;
                return this.form.date = today;
            },
            handleSubmit() {
                const $this = this;
                this.getToday();
                this.$refs['sendNotification'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        this.axios.post('/c_panel/notification', this.form).then((res) => {
                            this.success = true;
                            this.loading = false;
                            this.form = {
                                title: null,
                                content: null,
                                date: null,
                            };
                            setTimeout(function () {
                                $this.success = false;
                                $this.$emit('close');
                            }, 2000);
                            this.$refs['sendNotification'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.$refs['sendNotification'].setErrors(error.response.data.errors);
                                }
                            }
                        });
                    }
                });
            },
            // sendLater() {
            //     this.openSendLater = !this.openSendLater;
            // }
        },
    }
</script>
