<template>
    <div class="flex items-center justify-center">
        <div class="fixed inset-0 overlay flex items-center justify-center z-2" @click.self="$emit('close')">
            <div class="w-1/4 2xl:w-1/3 3sm:w-full 3sm:mx-4 bg-white-900 mx-auto flex items-center justify-center rounded-lg custom-shadow px-12 py-10 3sm:px-4 3sm:py-5">
                <div class="w-full">
                    <h3 class="text-blue-900 text-2xl 4xl:text-lg mb-6 flex items-center">
                        <span class="flex-grow">Add Dietician Account</span>
                        <img class="w-4 cursor-pointer" src="@/assets/img/close.svg" alt="close"
                             @click="$emit('close')">
                    </h3>
                    <ValidationObserver ref="AddDietician">
                        <form @submit.prevent="handleSubmit">
                            <ValidationProvider class="form-group mb-8 3sm:mb-4" tag="div"
                                                vid="name" name="Name" rules="required"
                                                v-slot="{ errors }">
                                <input class="form-control" type="text" placeholder="Name"
                                       :class="{ 'has-danger': errors.length }" v-model="form.name"/>
                                <p class="message-danger">{{ errors[0] }}</p>
                            </ValidationProvider>
                            <ValidationProvider class="form-group mb-8 3sm:mb-4" tag="div"
                                                vid="email" name="Email" rules="required|email"
                                                v-slot="{ errors }">
                                <input class="form-control" type="text" placeholder="Email"
                                       :class="{ 'has-danger': errors.length }" v-model="form.email"/>
                                <p class="message-danger">{{ errors[0] }}</p>
                            </ValidationProvider>
                            <ValidationProvider class="form-group mb-8 3sm:mb-4" tag="div"
                                                vid="phone" name="Mobile" rules="required|integer"
                                                v-slot="{ errors }">
                                <input class="form-control" type="text" placeholder="Mobile no."
                                       :class="{ 'has-danger': errors.length }" v-model="form.phone"/>
                                <p class="message-danger">{{ errors[0] }}</p>
                            </ValidationProvider>
                            <ValidationProvider class="form-group mb-8 3sm:mb-4" tag="div"
                                                vid="password" name="password" rules="required"
                                                v-slot="{ errors }">
                                <input class="form-control" type="password" placeholder="password"
                                       :class="{ 'has-danger': errors.length }" v-model="form.password"/>
                                <p class="message-danger">{{ errors[0] }}</p>
                            </ValidationProvider>
                            <button type="submit"
                                    class="w-full rounded bg-primary-900 text-white-900 text-lg 3sm:text-base 3sm:py-2 py-3 block text-center mb-6 3sm:mb-0"
                                    :disabled="loading">
                                Create
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
                    name: null,
                    email: null,
                    phone: null,
                    password: null
                }
            }
        },
        methods: {
            handleSubmit() {
                const $this = this;
                this.$refs['AddDietician'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        this.axios.post('/c_panel/user', this.form).then((res) => {
                            this.success = true;
                            this.loading = false;
                            this.form = {
                                name: null,
                                email: null,
                                phone: null,
                                password: null
                            };
                            setTimeout(function () {
                                $this.success = false;
                                $this.$emit('close');
                                location.reload();
                            }, 2000);
                            this.$refs['AddDietician'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    const serverErrors = error.response.data.errors;
                                    console.log(serverErrors);
                                    if (serverErrors)
                                        this.$refs['AddDietician'].setErrors(serverErrors);
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
