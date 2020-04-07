<template>
    <div>
        <div class="flex flex-wrap flex-wrap -mx-4 4xl:-mx-2">
            <div class="w-1/4 3sm:w-full 3sm:mb-4 px-4 4xl:px-2">
                <div class="bg-white-900 rounded-lg custom-shadow py-3 px-2">
                    <p class="flex items-center border-b border-gray-800 pb-2">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                             class="svg-inline--fa fa-clock w-4">
                            <path fill="currentColor"
                                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
                                  class=""></path>
                        </svg>
                        <span class="text-blue-900 text-base px-3">11:00 PM</span>
                    </p>
                    <div class="mt-4">
                        <img class="w-full object-cover rounded-lg meal-img" src="@/assets/img/meal.jpg" alt="img">
                    </div>
                </div>
            </div>
            <div class="w-3/4 3sm:w-full 3sm:mb-4 px-4 4xl:px-2">
                <div class="bg-white-900 custom-shadow rounded-lg py-3 3sm:py-4 px-4">
                    <p class="border-b border-gray-800 pb-2">Meal Type</p>
                    <form action="">
                        <div class="my-4 flex flex-wrap">
                            <div class="w-1/2 mb-2">
                                <input class="custom-radio" type="radio" id="radio_1" name="my-radio" value="1" checked>
                                <label for="radio_1">
                                    <span></span>
                                    breakfast
                                </label>
                            </div>
                            <div class="w-1/2 mb-2">
                                <input class="custom-radio" type="radio" id="radio_2" name="my-radio" value="1">
                                <label for="radio_2">
                                    <span></span>
                                    lunch
                                </label>
                            </div>
                            <div class="w-1/2 mb-2">
                                <input class="custom-radio" type="radio" id="radio_3" name="my-radio" value="1">
                                <label for="radio_3">
                                    <span></span>
                                    Snacks
                                </label>
                            </div>
                            <div class="w-1/2 mb-2">
                                <input class="custom-radio" type="radio" id="radio_4" name="my-radio" value="1">
                                <label for="radio_4">
                                    <span></span>
                                    dinner
                                </label>
                            </div>
                        </div>
                        <textarea class="bg-white-900 resize-none w-full px-4 py-2 rounded meal-area"
                                  placeholder="Notes From patient"></textarea>
                    </form>

                    <div class="flex items-center 3sm:flex-wrap -mx-4 3sm:-mx-2 mt-6" v-for="(meal, index) in meals" :key="index">
                        <div class="px-4 3sm:px-2 w-2/12 3sm:w-1/2 3sm:mb-4">
                            <label for="" class="block">Quantity</label>
                            <input type="text" class="form-control" placeholder="0" v-model="meal.quantity"
                                   name="meals[][quantity]">
                        </div>
                        <div class="px-4 3sm:px-2  w-3/12 3sm:w-1/2 3sm:mb-4">
                            <label for="" class="block">Unit</label>
                            <v-select class="form-control" :options="options" v-model="meal.unit"
                                      placeholder="Unit"></v-select>
                        </div>
                        <div class="px-4 3sm:px-2  w-3/12 3sm:w-1/2 3sm:mb-4">
                            <label for="" class="block">Category</label>
                            <v-select class="form-control" :options="options" v-model="meal.category"
                                      placeholder="Category"></v-select>
                        </div>
                        <div class="px-4 3sm:px-2  w-2/12 3sm:w-1/2 3sm:mb-4">
                            <label for="" class="block">calories</label>
                            <input type="text" class="form-control" placeholder="0" v-model="meal.calories">
                        </div>
                        <div class="px-4 flex items-center  w-2/12 3sm:w-full 3sm:mt-4 3sm:justify-end">
                            <span class="mx-2">
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus-circle"
                                     role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                     class="svg-inline--fa fa-plus-circle w-6 cursor-pointer" @click="addNewMeal">
                                    <path fill="#21b363"
                                          d="M384 240v32c0 6.6-5.4 12-12 12h-88v88c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-88h-88c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h88v-88c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v88h88c6.6 0 12 5.4 12 12zm120 16c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-48 0c0-110.5-89.5-200-200-200S56 145.5 56 256s89.5 200 200 200 200-89.5 200-200z"
                                          class=""></path></svg>
                            </span>
                            <span class="mx-2">
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="minus-circle"
                                     role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                     class="svg-inline--fa fa-minus-circle w-6 cursor-pointer"
                                     @click="removeMeal(index)">
                                <path fill="#d9534f"
                                      d="M140 284c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h232c6.6 0 12 5.4 12 12v32c0 6.6-5.4 12-12 12H140zm364-28c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-48 0c0-110.5-89.5-200-200-200S56 145.5 56 256s89.5 200 200 200 200-89.5 200-200z"
                                      class=""></path></svg>
                            </span>
                        </div>
                    </div>

                    <div class="flex items-center flex-wrap -mx-4 3sm:-mx-2 mt-10">
                        <div class="px-4 3sm:px-2 w-2/12 3sm:w-1/5">
                            <p class="block">Total</p>
                        </div>
                        <div class="px-4 3sm:px-2 w-4/12 3sm:w-2/5">
                            <input type="text" class="form-control" placeholder="Quantity">
                        </div>
                        <div class="px-4 3sm:px-2 w-4/12 3sm:w-2/5 ml-auto">
                            <input type="text" class="form-control" placeholder="Calories">
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                meal: {
                    quantity: '',
                    calories: '',
                    category: '',
                    unit: '',

                },
                meals: [{
                    quantity: '',
                    calories: '',
                    category: '',
                    unit: '',
                }],
                options: [
                    'anas',
                    'Akmal'
                ]
            }
        },
        methods: {
            addNewMeal: function () {
                this.meals.push(this.meal);
                // this.meals.push(Vue.util.extend({}, this.meal));

            },
            removeMeal: function (index) {
                this.meals.splice(this.meals.indexOf(index), 1);
            },

        }
    }
</script>
<style scoped lang="scss">
    .meal-img {
        height: 200px;
    }


    textarea {
        border: 1px solid #8492A6;
        height: 250px;
    }

</style>
