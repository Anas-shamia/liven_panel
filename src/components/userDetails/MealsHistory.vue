<template>
    <div>
        <h3 class="text-blue-900 font-medium text-2xl 4xl:text-lg mb-6">Meals History</h3>
        <perfect-scrollbar class="meals-history">
            <div class="bg-white-900 custom-shadow rounded-lg px-10 py-6 3sm:px-4 3sm:py-4">
                <div class="relative custom-input mb-4">
                    <input type="text" class="w-full px-8 py-2 rounded-sm" placeholder="Search by date">
                    <img class="absolute top-0 left-0 ml-2" src="@/assets/img/date.svg" alt="date-icon">
                </div>
                <hr class="mb-4">
                <div class="mb-4 3sm:mb-0">
                    <p class="mb-4">Today</p>
                    <ul class="flex items-center 3sm:flex-wrap 3sm:justify-center  -mx-4 4xl:-mx-2">
                        <li class="w-1/3 3sm:w-1/2 px-4 4xl:px-2 3sm:mb-4">
                            <div class="relative rounded-lg overflow-hidden" @click="openMeal()">
                                <img class="w-full h-full" src="@/assets/img/meal.jpg" alt="meal">
                                <span class="absolute inset-x-0 bottom-0 py-2 text-white-900 text-center font-medium text-lg 4xl:text-base block span-overlay">Breakfast</span>
                            </div>
                        </li>
                        <li class="w-1/3 3sm:w-1/2 px-4 4xl:px-2 3sm:mb-4">
                            <div class="relative rounded-lg overflow-hidden">
                                <img class="w-full h-full" src="@/assets/img/meal-2.jpg" alt="meal">
                                <span class="absolute inset-x-0 bottom-0 py-2 text-white-900 text-center font-medium text-lg 4xl:text-base block span-overlay">Lunch</span>
                            </div>
                        </li>
                        <li class="w-1/3 3sm:w-1/2 px-4 4xl:px-2 3sm:mb-4">
                            <div class="relative rounded-lg overflow-hidden">
                                <img class="w-full h-full" src="@/assets/img/meal-one.jpg" alt="meal">
                                <span class="absolute inset-x-0 bottom-0 py-2 text-white-900 text-center font-medium text-lg 4xl:text-base block span-overlay">Dinner</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="mb-4 3sm:mb-0">
                    <p class="mb-4">Today</p>
                    <ul class="flex items-center 3sm:flex-wrap 3sm:justify-center  -mx-4 4xl:-mx-2">
                        <li class="w-1/3 3sm:w-1/2 px-4 4xl:px-2 3sm:mb-4">
                            <div class="relative rounded-lg overflow-hidden" @click="openMeal()">
                                <img class="w-full h-full" src="@/assets/img/meal.jpg" alt="meal">
                                <span class="absolute inset-x-0 bottom-0 py-2 text-white-900 text-center font-medium text-lg 4xl:text-base block span-overlay">Breakfast</span>
                            </div>
                        </li>
                        <li class="w-1/3 3sm:w-1/2 px-4 4xl:px-2 3sm:mb-4">
                            <div class="relative rounded-lg overflow-hidden">
                                <img class="w-full h-full" src="@/assets/img/meal-2.jpg" alt="meal">
                                <span class="absolute inset-x-0 bottom-0 py-2 text-white-900 text-center font-medium text-lg 4xl:text-base block span-overlay">Lunch</span>
                            </div>
                        </li>
                        <li class="w-1/3 3sm:w-1/2 px-4 4xl:px-2 3sm:mb-4">
                            <div class="relative rounded-lg overflow-hidden">
                                <img class="w-full h-full" src="@/assets/img/meal-one.jpg" alt="meal">
                                <span class="absolute inset-x-0 bottom-0 py-2 text-white-900 text-center font-medium text-lg 4xl:text-base block span-overlay">Dinner</span>
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
                meals: [
                    {
                        date: 'Today',
                        meal: [
                            {
                                src: 'img/meal.jpg',
                                title: 'Breakfast'
                            },
                            {
                                src: '/img/meal1.jpg',
                                title: 'Lunch'
                            },
                            {
                                src: '/img/meal2.jpg',
                                title: 'Dinner'
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            openMeal() {
                this.$store.dispatch("getMealShow", true);
            }
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
