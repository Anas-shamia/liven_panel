<template>
    <div v-if="meals.length">
        <h3 class="text-blue-900 font-medium text-2xl 4xl:text-lg mb-6">Meals History</h3>
        <perfect-scrollbar class="meals-history">
            <div class="bg-white-900 custom-shadow rounded-lg px-10 py-6 3sm:px-4 3sm:py-4">
                <ValidationObserver ref="AddAdvice">
                    <form>
                        <ValidationProvider class="relative custom-input mb-2" tag="div"
                                            vid="date" name="Date" rules="required"
                                            v-slot="{ errors }">
                            <img class="absolute top-0 left-0 ml-2 " src="@/assets/img/date.svg" alt="date-icon">
                            <v-date-picker
                                    v-model='form.date'
                                    :popover="popover"
                                    :min-date="new Date()"
                                    @input="changeText"
                                    :input-props='{
                                          class: "w-full rounded-sm px-8",
                                          placeholder: "Search By Date",
                                        }'
                            />
                            <p class="message-danger" v-if="errors[0]">{{ errors[0] }}</p>
                        </ValidationProvider>
                    </form>
                </ValidationObserver>
                <hr class="mb-4">
                <div class="mb-4 3sm:mb-0" v-for="(item,index) in meals" :key="index">
                    <p class="mb-4">{{item.date}}</p>
                    <ul class="flex items-center 3sm:flex-wrap 3sm:justify-center  -mx-4 4xl:-mx-2">
                        <li class="w-1/3 3sm:w-1/2 px-4 4xl:px-2 3sm:mb-4" v-for="(meal,index) in item.meals_today"
                            :key="index">
                            <div class="relative rounded-lg overflow-hidden" @click="openMeal()">
                                <img class="meal-img object-cover w-full" :src="meal.image_url" alt="meal">
                                <span class="absolute inset-x-0 bottom-0 py-2 text-white-900 text-center font-medium text-lg 4xl:text-base block span-overlay"
                                      v-if="meal.type === '1'">Breakfast</span>
                                <span class="absolute inset-x-0 bottom-0 py-2 text-white-900 text-center font-medium text-lg 4xl:text-base block span-overlay"
                                      v-if="meal.type === '2'">Lunch</span>
                                <span class="absolute inset-x-0 bottom-0 py-2 text-white-900 text-center font-medium text-lg 4xl:text-base block span-overlay"
                                      v-if="meal.type === '3'">Dinner</span>
                                <span class="absolute inset-x-0 bottom-0 py-2 text-white-900 text-center font-medium text-lg 4xl:text-base block span-overlay"
                                      v-if="meal.type === '4'">Snacks</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </perfect-scrollbar>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                meals: [],
                form: {
                    date: null,
                },
                popover: {
                    visibility: 'focus',
                },
            }
        },
        methods: {
            openMeal() {
                this.$store.dispatch("getMealShow", true);
            },
            changeText() {
                this.axios.post('/c_panel/advice', this.form).then((res) => {
                    this.success = true;
                    this.loading = false;
                    this.form = {
                        name: null,
                        date: null,
                    };
                    setTimeout(function () {
                        $this.success = false;
                        $this.$emit('close');
                        location.reload();
                    }, 2000);
                    this.$refs['AddAdvice'].reset();
                }).catch((error) => {
                    if (error.response) {
                        if (error.response.status === 422) {
                            log
                        }
                    }
                });
            },
        },
        mounted() {
            const $id = this.$route.params.user;
            this.axios.get(`c_panel/meal/user/all?user_id=${$id}`)
                .then(response => (this.meals = response.data.data))
        }

    }
</script>

<style scoped lang="scss">
    .span-overlay {
        background-color: rgba(18, 19, 58, 0.5);
    }

    .meals-history {
        height: 600px;
        overflow-y: scroll;
        touch-action: none;
    }

    .meal-img {
        height: 130px;
    }

    .custom-input {
        input {
            background: #fff;
            filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16));
        }

        img {
            top: 30%;
        }
    }

    hr {
        color: #E0E3DA;
    }
</style>
