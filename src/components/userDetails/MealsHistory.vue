<template>
    <div v-if="meals.length">
        <h3 class="text-blue-900 font-medium text-2xl 4xl:text-lg mb-6">Meals History</h3>
        <perfect-scrollbar class="meals-history">
            <div class="bg-white-900 custom-shadow rounded-lg px-10 py-6 3sm:px-4 3sm:py-4">
                <div class="relative custom-input mb-2">
                    <img class="absolute top-0 left-0 ml-2 " src="@/assets/img/date.svg" alt="date-icon">
                    <v-date-picker
                            v-model='form.date'
                            :popover="popover"
                            @input="changeDate()"
                            :input-props='{
                                          class: "w-full rounded-sm px-8",
                                          placeholder: "Search By Date",
                                        }'
                    />
                </div>
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
                    user_id: this.$route.params.user,
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
            formatDate() {
                let $date = this.form.date;
                let dd = String($date.getDate()).padStart(2, '0');
                let mm = String($date.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = $date.getFullYear();
                $date = mm + '-' + dd + '-' + yyyy;
                return this.form.date = $date;
            },
            changeDate() {
                this.formatDate();
                this.axios.post('c_panel/meal/user/today/all', this.form).then((res) => {
                    this.form = {
                        date: null,
                    };
                    this.meals = this.meals = res.data.data;
                }).catch((error) => {
                    if (error.response) {
                        if (error.response.status === 422) {
                            console.log('test');
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
