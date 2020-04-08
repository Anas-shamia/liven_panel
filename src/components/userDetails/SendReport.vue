<template>
    <div class="flex items-center justify-center">
        <div class="fixed inset-0 overlay flex items-center justify-center" @click.self="$emit('close')">
            <div class="w-1/4 2xl:w-1/3 3sm:w-full 3sm:mx-4 bg-white-900 mx-auto flex items-center justify-center rounded-lg custom-shadow px-12 py-10 3sm:px-4 3sm:py-5">
                <div class="w-full">
                    <h3 class="text-blue-900 text-2xl 4xl:text-lg mb-6 flex items-center">
                        <span class="flex-grow">Report</span>
                        <img class="w-4 cursor-pointer" src="@/assets/img/close.svg" alt="close"
                             @click="$emit('close')">
                    </h3>
                    <ValidationObserver ref="sendReport">
                        <form @submit.prevent="handleSubmit">
                            <ValidationProvider class="form-group mb-8 3sm:mb-4" tag="div"
                                                vid="title" name="title" rules="required"
                                                v-slot="{ errors }">
                                <input class="form-control" type="text" placeholder="Report Title"
                                       :class="{ 'has-danger': errors.length }" v-model="form.title"/>
                                <p class="message-danger">{{ errors[0] }}</p>
                            </ValidationProvider>
                            <ValidationProvider class="form-group mb-8 3sm:mb-4" tag="div"
                                                vid="title" name="title" rules="required"
                                                v-slot="{ errors }">
                                <label class="mb-2 block 3sm:text-sm">Report</label>
                                <textarea class="form-control border rounded-lg border-gray-200 resize-none"
                                          :class="{ 'has-danger': errors.length }" v-model="form.content"></textarea>
                                <p class="message-danger">{{ errors[0] }}</p>
                            </ValidationProvider>
                            <button type="submit"
                                    class="w-full rounded bg-primary-900 text-white-900 text-lg 3sm:text-base 3sm:py-2 py-3 block text-center mb-6 3sm:mb-0"
                                    :disabled="loading">
                                Send
                            </button>
                            <div class="bg-green-100 mt-4 rounded-10px text-center" v-if="success">
                                <p class="p-3 text-base text-blue-800 font-medium">Sent Successfully</p>
                            </div>
                        </form>
                    </ValidationObserver>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['profile_id'],
        data() {
            return {
                success: false,
                loading: false,
                form: {
                    user_id: this.profile_id,
                    title: null,
                    content: null,
                    category_id: '0'
                }
            }
        },
        methods: {
            handleSubmit() {
                const $this = this;
                this.$refs['sendReport'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        this.axios.post('/c_panel/report', this.form).then((res) => {
                            this.success = true;
                            this.loading = false;
                            this.form = {
                                title: null,
                                content: null,
                            };
                            setTimeout(function () {
                                $this.success = false;
                                $this.$emit('close');
                            }, 2000);
                            this.$refs['sendReport'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.$refs['sendReport'].setErrors(error.response.data.errors);
                                }
                            }
                        });
                    }
                });
            },
        }
    }
</script>
<style lang="scss">
    .form-group label,
    .form-group textarea {
        color: #A0AEC0;
    }

    .v-select.form-control {
        border-bottom: 1px solid #D6D6D6;
    }

</style>
