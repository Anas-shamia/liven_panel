<template>
    <div class="relative flex items-center justify-center">
        <img class="absolute max-auto mb-8 max-w-full 3sm:hidden block" src="@/assets/img/white-logo.png"
             alt="logo">
        <div class="container-auth flex items-center justify-center h-screen  3sm:pt-8 relative">
            <div class="login-form w-full bg-white-900 opacity-75 px-16 pt-10 pb-19 3xl:pt-6 3xl:pb-8 3sm:pt-4 3sm:pb-4 3sm:px-4">
                <img class="mx-auto mb-16 3sm:mb-4 3sm:w-1/3" src="@/assets/img/logo.png" alt="logo">
                <ValidationObserver ref="obsLogin">
                    <form @submit.prevent="handleSubmit">
                        <ValidationProvider class="form-group" tag="div"
                                            vid="email" name="email" rules="required"
                                            v-slot="{ errors }">
                            <input class="form-control py-3 px-6" type="text" placeholder="email"
                                   :class="{ 'has-danger': errors.length }" v-model="form.email"/>
                            <img class="w-4 absolute left-0 input-icon" src="@/assets/img/envelop.svg" alt="">
                            <p class="message-danger">{{ errors[0] }}</p>
                        </ValidationProvider>


                        <ValidationProvider class="form-group" tag="div" vid="password"
                                            name="Password"
                                            rules="required|min:6"
                                            v-slot="{ errors }">
                            <input class="form-control py-3 px-6" :type="show?'text':'password'" placeholder="Password"
                                   :class="{ 'has-danger': errors.length }"
                                   v-model="form.password"/>
                            <img class="w-4 absolute left-0 input-icon" src="@/assets/img/key.svg" alt="">
                            <div class="w-4 absolute right-0 input-icon cursor-pointer">
                                <svg v-if="!show" @click="showPassword" class="cursor-pointer"
                                     xmlns="http://www.w3.org/2000/svg" width="20.007"
                                     height="14.004"
                                     viewBox="0 0 20.007 14.004">
                                    <path
                                            d="M10.274,14h-.25a10.192,10.192,0,0,1-6.918-2.841A15.692,15.692,0,0,1,.134,7.5a1,1,0,0,1,0-1,15.729,15.729,0,0,1,3.053-3.76A10.106,10.106,0,0,1,9.734,0c.094,0,.189,0,.283,0,5.812,0,9.23,5.418,9.856,6.5a1,1,0,0,1,0,1C19.021,8.994,15.806,13.864,10.274,14ZM10,3.5A3.5,3.5,0,1,0,13.5,7,3.5,3.5,0,0,0,10,3.5Z"
                                            transform="translate(0 0)" fill="currentColor"/>
                                </svg>
                                <svg v-else @click="showPassword" class="cursor-pointer"
                                     xmlns="http://www.w3.org/2000/svg" width="20"
                                     viewBox="0 0 640 512">
                                    <path fill="currentColor"
                                          d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path>
                                </svg>
                            </div>
                            <p class="message-danger">{{ errors[0] }}</p>
                        </ValidationProvider>
                        <button type="submit"
                                class="login-btn border border-transparent w-full block text-center bg-primary-900 text-white-900 text-xl 3sm:text-base rounded py-4 3sm:py-2">
                            Login
                        </button>

                        <!--                        <router-link to="/"-->
                        <!--                                     class="w-full block text-center bg-primary-900 text-white-900 text-xl 3sm:text-base rounded py-4 3sm:py-2">-->
                        <!--                            Login-->
                        <!--                        </router-link>-->
                    </form>
                </ValidationObserver>
            </div>
            <p class="text-primary-900 absolute bottom-0 mb-8 3sm:mb-4 3sm:text-xs mx-auto">Copyright Liven. 2020</p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loading: false,
                error: false,
                errorMsg: null,
                form: {
                    email: 'admin@liven.com',
                    password: 12345678,
                },
                success: false,
                show: false,
            }
        },
        methods: {
            handleSubmit() {
                this.$refs['obsLogin'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        const $this = this;
                        this.axios.post('c_panel/login', this.form).then((res) => {
                            // this.loading = false;
                            // this.auth.setUserToken(res.data.data.access_token);
                            const $token = res.data.token;
                            localStorage.setItem('token',$token);
                            localStorage.setItem('user',res.data.user);
                            setTimeout(function () {
                                window.location.replace('/users');
                                // $this.$router.push('/users');
                            }, 500);
                            // this.$auth.ready();
                        }).catch((error) => {
                            this.loading = false;
                            this.error = true;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.$refs['obsForm'].setErrors(error.response.data.errors);
                                }
                            }
                        });
                    }
                });
            },
            showPassword() {
                this.show = !this.show;
            },
        }
    }
</script>
<style lang="scss" scoped>
    .login-btn{
        transition: all 0.25s ease;
        &:hover{
            background: #fff;
            border-color: #693574;
            color: #693574;
        }
    }
</style>

