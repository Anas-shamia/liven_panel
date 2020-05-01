<template>
    <div>
        <h3 class="text-blue-900 font-medium text-2xl 4xl:text-lg mb-6">Meals History</h3>
        <perfect-scrollbar class="meals-history">
            <div class="bg-white-900 custom-shadow rounded-lg px-10 py-6 3sm:px-4 3sm:py-4">
                <div class="relative custom-input mb-2 w-full flex items-center">
                    <img class="absolute top-0 left-0 ml-2 " src="@/assets/img/date.svg" alt="date-icon">
                    <div class="w-full flex-grow">
                        <v-date-picker
                                v-model='form.date'
                                :popover="popover"
                                :input-props='{
                                          class: "w-full rounded-sm px-8 flex-grow",
                                          placeholder: "Search By Date",
                                        }'
                        />
                    </div>
                    <span class="cursor-pointer" @click="changeDate()">
                         <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" role="img"
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                              class="svg-inline--fa fa-check w-6"><path
                                 fill="currentColor"
                                 d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"
                                 class=""></path></svg>
                    </span>
                </div>
                <hr class="mb-4">
                <div class="mb-4 3sm:mb-0" v-for="(item,index) in meals" :key="index" v-if="meals.length">
                    <p class="mb-4">{{item.date}}</p>
                    <ul class="flex items-center 3sm:flex-wrap 3sm:justify-center -mx-2">
                        <router-link tag="li" :to="`/${the_id}/${meal.id}/meal-info`"
                                     class="w-1/3 3sm:w-1/2 px-2 3sm:mb-4"
                                     v-for="(meal,index) in item.meals_today"
                                     :key="index">
                            <div class="relative rounded-lg overflow-hidden" @click="openMeal()">
                                <img class="meal-img object-cover w-full" v-if="meal.image_url" :src="meal.image_url"
                                     alt="meal">
                                <img class="meal-img object-cover w-full" v-else src="@/assets/img/default-img.png"
                                     alt="">
                                <span class="absolute inset-x-0 bottom-0 py-2 text-white-900 text-center font-medium text-lg 4xl:text-base block span-overlay"
                                      v-if="meal.type === '1'">Breakfast</span>
                                <span class="absolute inset-x-0 bottom-0 py-2 text-white-900 text-center font-medium text-lg 4xl:text-base block span-overlay"
                                      v-if="meal.type === '2'">Lunch</span>
                                <span class="absolute inset-x-0 bottom-0 py-2 text-white-900 text-center font-medium text-lg 4xl:text-base block span-overlay"
                                      v-if="meal.type === '3'">Dinner</span>
                                <span class="absolute inset-x-0 bottom-0 py-2 text-white-900 text-center font-medium text-lg 4xl:text-base block span-overlay"
                                      v-if="meal.type === '4'">Snacks</span>
                            </div>
                        </router-link>
                    </ul>
                </div>
                <p class="text-blue-900 font-medium text-2xl 4xl:text-lg mb-6 3sm:mb-4" v-if="meals.length === 0">
                    There is No Meals to show
                </p>
            </div>
        </perfect-scrollbar>
    </div>
</template>
<script>
    export default {
        props: ['the_id'],
        data() {
            return {
                meals: [],
                url:null,
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
                if (this.form.date) {
                    let $date = this.form.date;
                    let dd = String($date.getDate()).padStart(2, '0');
                    let mm = String($date.getMonth() + 1).padStart(2, '0'); //January is 0!
                    let yyyy = $date.getFullYear();
                    $date = mm + '-' + dd + '-' + yyyy;
                    return this.form.date = $date;
                }
            },
            changeDate() {
                if (this.form.date) {
                    this.form.user_id = this.$route.params.user;
                    this.formatDate();
                    this.axios.post('c_panel/meal/user/today/all', this.form).then((res) => {
                        this.form = {
                            date: null,
                        };
                        this.meals = res.data.data;
                    }).catch((error) => {
                        if (error.response) {
                            if (error.response.status === 422) {
                                console.log('test');
                            }
                        }
                    });
                }
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
