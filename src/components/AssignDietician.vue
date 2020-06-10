<template>
    <div class="flex items-center justify-center">
        <div class="fixed z-2 inset-0 overlay flex items-center justify-center" @click.self="$emit('close')">
            <div class="w-1/4 2xl:w-1/3 3sm:w-full 3sm:mx-4 bg-white-900 mx-auto flex items-center justify-center rounded-lg custom-shadow px-12 py-10 3sm:px-4 3sm:py-5">
                <div class="w-full">
                    <h3 class="text-blue-900 text-2xl 4xl:text-lg mb-6 flex items-center">
                        <span class="flex-grow">Assign Dietician</span>
                        <img class="w-4 cursor-pointer" src="@/assets/img/close.svg" alt="close"
                             @click="$emit('close')">
                    </h3>
                    <ValidationObserver ref="AssignDietician">
                        <form @submit.prevent="handleSubmit">
                            <ValidationProvider class="form-group mb-8 3sm:mb-4" tag="div"
                                                vid="title" name="title" rules="required"
                                                v-slot="{ errors }">
                                <v-select class="form-control"
                                          :options="dietitian"
                                          label="name"
                                          :searchable="true"
                                          placeholder="Select Dietician"
                                          v-model="assign.dietitian_id">
                                </v-select>
                                <p class="message-danger">{{ errors[0] }}</p>
                            </ValidationProvider>
                            <button type="submit"
                                    class="w-full rounded bg-primary-900 text-white-900 text-lg 3sm:text-base 3sm:py-2 py-3 block text-center mb-6 3sm:mb-0"
                                    :class="loading?'btn-loading':''"
                                    :disabled="loading">
                                <span>Assign</span>
                                <div v-if="loading" class="spinner">
                                    <div class="double-bounce1"></div>
                                    <div class="double-bounce2"></div>
                                </div>
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
        data() {
            return {
                success: false,
                loading: false,
                dietitian: [],
                assign: {
                    patient_id: this.$route.params.user,
                    dietitian_id: null,
                }
            }
        },
        methods: {
            handleSubmit() {
                const $this = this;
                let $fields = _.cloneDeep(this.assign);
                this.patient_id = this.$route.params.user;
                $fields.dietitian_id = $fields.dietitian_id.id;
                this.$refs['AssignDietician'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        this.axios.post('/c_panel/user/assign/patient', $fields).then((res) => {
                            this.success = true;
                            this.loading = false;
                            this.assign = {
                                id: null,
                            };
                            setTimeout(function () {
                                $this.success = false;
                                $this.$emit('close');
                                location.reload();
                            }, 2000);
                            this.$refs['AssignDietician'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.$refs['AssignDietician'].setErrors(error.response.data.errors);
                                }
                            }
                        });
                    }
                });
            },

        },
        mounted() {
            this.axios.get('c_panel/users/dietitian/all',)
                .then(response => (this.dietitian = response.data.data))
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
