<template>
    <div class="container-content pb-24">
        <div class="flex items-center mb-8 3sm:mb-4">
            <img src="@/assets/img/user.svg" alt="icon">
            <router-link tag="h2" to="/users" class="text-2xl 4xl:text-lg text-blue-900 px-4 cursor-pointer">Users
            </router-link>
            <img src="@/assets/img/right-chevron.svg" alt="icon">
            <router-link tag="p" :to="`/${this.user_id}/details`"
                         class="text-2xl 4xl:text-lg text-gray-900 pl-6 cursor-pointer">User Details
            </router-link>
        </div>
        <div class="flex flex-wrap -mx-4">
            <div class="w-1/4 3sm:w-full px-4 profile-info">
                <Profile/>
            </div>
            <div class="w-3/4 3sm:w-full px-4 flex flex-wrap">
                <div class="w-3/5" v-if="OpenCallComponent">
                    <callPatient/>
                </div>
                <div class="w-full flex flex-wrap -mx-4" v-if="OpenCallComponent === false">
                    <div class="w-full 3sm:w-full 3sm:mb-4 px-4 4xl:px-2" v-if="mealInfo">
                        <div class="bg-white-900 custom-shadow rounded-lg py-3 3sm:py-4 px-4">
                            <p class="border-b border-gray-800 pb-2">Meal Type</p>
                            <div class="my-4 flex flex-wrap">
                                <div class="w-1/2 mb-2">
                                    <input class="custom-radio" type="radio" id="radio_1" name="my-radio" value="1"
                                           :checked="mealInfo.type==='1'"
                                           disabled>
                                    <label for="radio_1">
                                        <span></span>
                                        breakfast
                                    </label>
                                </div>
                                <div class="w-1/2 mb-2">
                                    <input class="custom-radio" type="radio" id="radio_2" name="my-radio" value="1"
                                           :checked="mealInfo.type==='2'"
                                           disabled>
                                    <label for="radio_2">
                                        <span></span>
                                        lunch
                                    </label>
                                </div>
                                <div class="w-1/2 mb-2">
                                    <input class="custom-radio" type="radio" id="radio_3" name="my-radio" value="1"
                                           :checked="mealInfo.type==='4'"
                                           disabled>
                                    <label for="radio_3">
                                        <span></span>
                                        Snacks
                                    </label>
                                </div>
                                <div class="w-1/2 mb-2">
                                    <input class="custom-radio" type="radio" id="radio_4" name="my-radio" value="1"
                                           :checked="mealInfo.type==='3'"
                                           disabled>
                                    <label for="radio_4">
                                        <span></span>
                                        dinner
                                    </label>
                                </div>
                            </div>
                            <div class="flex flex-wrap">
                                    <textarea class="w-3/4 bg-white-900 resize-none px-4 py-2 rounded meal-area"
                                              placeholder="Notes From patient" disabled
                                              readonly>{{mealInfo.notes}}</textarea>
                                <div class="w-1/4 3sm:w-full 3sm:mb-4 px-4 4xl:px-2" v-if="mealInfo">
                                    <div class="px-2">
                                        <p class="flex items-center border-b border-gray-800 pb-2">
                                            <svg aria-hidden="true" focusable="false" data-prefix="far"
                                                 data-icon="clock" role="img"
                                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                 class="svg-inline--fa fa-clock w-4">
                                                <path fill="currentColor"
                                                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
                                                      class=""></path>
                                            </svg>
                                            <span class="text-blue-900 text-base px-3">{{mealInfo.timing}}</span>
                                        </p>
                                        <div class="mt-4">
                                            <img v-if="mealInfo.image_url"
                                                 class="w-full object-cover rounded-lg meal-img"
                                                 :src="mealInfo.image_url"
                                                 alt="img">
                                            <img v-else class="w-full object-cover rounded-lg meal-img"
                                                 src="@/assets/img/default-img.png"
                                                 alt="img">
                                        </div>
                                    </div>
                                </div><!--wrap-->
                            </div>

                            <div class="w-1/2 mt-4">
                                <input type="text" class="form-control" placeholder="Search" @input="changeText"
                                       v-model="search">
                            </div>

                            <table class="table-fixed w-full mt-6" v-if="results.length">
                                <thead>
                                <tr>
                                    <th class="w-1/3 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Food</th>
                                    <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Quantity</th>
                                    <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Unit</th>
                                    <th class="w-1/3 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Category</th>
                                    <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Calories</th>
                                    <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Protein</th>
                                    <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Fat</th>
                                    <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Carbs</th>
                                    <th class="w-1/5 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Select</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(meal, index) in results" :key="index">
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        {{meal.food.label}}

                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        <input type="text" class="form-control" placeholder="0"
                                               :data-kcal="meal.food.nutrients.ENERC_KCAL"
                                               :data-fat="meal.food.nutrients.FAT"
                                               @input="changeQty($event,meal,index)" v-model="meal.quantity"/>
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        g
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        {{meal.food.category}}
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        {{parseFloat(meal.food.nutrients.ENERC_KCAL).toFixed(2)}}
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        {{parseFloat(meal.food.nutrients.PROCNT).toFixed(2)}}
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        {{parseFloat(meal.food.nutrients.FAT).toFixed(2)}}
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        {{parseFloat(meal.food.nutrients.CHOCDF).toFixed(2)}}
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        <input class="custom-radio" :id="`check_${index}`" type="checkbox"
                                               @input="onChange($event,meal)"/>
                                        <label :for="`check_${index}`">
                                            <span></span>
                                        </label>
                                    </td>
                                </tr>
                                </tbody>
                            </table>


                            <div class="flex items-center flex-wrap -mx-4 3sm:-mx-2 mt-10">
                                <div class="px-4 3sm:px-2 w-1/12 3sm:w-1/5">
                                    <p class="block">Total</p>
                                </div>
                                <div class="px-4 3sm:px-2 w-2/12 3sm:w-2/5">
                                    <label>Quantity</label>
                                    <input type="text" class="form-control" v-model="sumQty" placeholder="Quantity">
                                </div>
                                <div class="px-4 3sm:px-2 w-2/12 3sm:w-2/5 ml-auto">
                                    <label>Calories</label>
                                    <input type="text" class="form-control" v-model="sumCalory" placeholder="Calories">
                                </div>
                                <div class="px-4 3sm:px-2 w-2/12 3sm:w-2/5 ml-auto">
                                    <label>Protein</label>
                                    <input type="text" class="form-control" v-model="sumFat" placeholder="Calories">
                                </div>
                                <div class="px-4 3sm:px-2 w-2/12 3sm:w-2/5 ml-auto">
                                    <label>Fat</label>
                                    <input type="text" class="form-control" v-model="sumProtein" placeholder="Calories">
                                </div>
                                <div class="px-4 3sm:px-2 w-2/12 3sm:w-2/5 ml-auto">
                                    <label>Carbs</label>
                                    <input type="text" class="form-control" v-model="sumCarbs" placeholder="Calories">
                                </div>
                                <div class="px-4 3sm:px-2 w-1/12 3sm:w-1/5">
                                    <button class="font-medium rounded bg-primary-900 text-white-900 text-base 3sm:font-normal p-2 mx-auto block text-center"
                                            type="button" @click="saveProperties" :disabled="selectedResults<=0">Save
                                    </button>
                                </div>
                            </div>

                            <div class="bg-green-100 mt-4 rounded-10px text-center" v-if="success">
                                <p class="p-3 text-base text-blue-800 font-medium">Save Successfully</p>
                            </div>
                        </div><!--bg white-->


                        <div class="bg-white-900 custom-shadow rounded-lg py-3 3sm:py-4 px-4 mt-4">
                            <div class="flex items-center border-b border-gray-800 pb-2">
                                <p class="flex-1">Meals Information History</p>
                                <button class="font-medium rounded bg-primary-900 text-white-900 text-base 3sm:font-normal p-2 mx-auto block text-center"
                                        type="button" @click="clearProperties">Clear
                                </button>
                            </div>

                            <table class="table-fixed w-full" v-if="mealInfo.properties">
                                <thead>
                                <tr>
                                    <th class="w-1/3 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Food</th>
                                    <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Quantity</th>
                                    <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Unit</th>
                                    <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Category</th>
                                    <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Calories</th>
                                    <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Protein</th>
                                    <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Fat</th>
                                    <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Carbs</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(meal, index) in mealInfo.properties" :key="index">
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">{{meal.food.label}}
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">{{meal.quantity}}</td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">g</td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        {{meal.food.category}}
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        {{parseFloat(meal.food.nutrients.ENERC_KCAL).toFixed(2)}}
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        {{parseFloat(meal.food.nutrients.PROCNT).toFixed(2)}}
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        {{parseFloat(meal.food.nutrients.FAT).toFixed(2)}}
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        {{parseFloat(meal.food.nutrients.CHOCDF).toFixed(2)}}
                                    </td>

                                </tr>
                                <tr>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        Total
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">quantity</td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs"></td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                      test
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        test
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                        test
                                    </td>
                                    <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                                      test
                                    </td>

                                </tr>
                                </tbody>
                            </table>
                            <p class="text-blue-900 font-medium text-2xl 4xl:text-lg mt-6 3sm:mb-4" v-else>No Meals
                                History</p>

                        </div><!--bg white-->
                    </div><!--info-->
                </div><!--wrap-->
            </div><!--w 3/4-->
        </div><!--wrap-->

    </div>
</template>
<script>
    import Profile from "../components/userDetails/Profile";
    import callPatient from "../components/userDetails/CallPatient";

    export default {
        components: {
            Profile,
            callPatient,
        },
        data() {
            return {
                mealInfo: null,
                search: null,
                openReport: false,
                openCall: false,
                user_id: this.$route.params.user,
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
                results: [],
                resultsOriginal: [],
                selectedResults: [],
                sumQty: 0,
                sumCalory: 0,
                sumFat: 0,
                sumProtein: 0,
                sumCarbs: 0,
                sumNutrients: 0,
                success: false,
                loading: false,
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
            changeQty($e, meal, index) {
                let $meal = this.results[index];
                const $qty = parseInt($e.target.value);
                const $mealOriginal = this.resultsOriginal[index];
                const $kcalOriginal = parseFloat($mealOriginal.food.nutrients.ENERC_KCAL).toFixed(2) / 100;
                const $fatOriginal = parseFloat($mealOriginal.food.nutrients.FAT).toFixed(2) / 100;
                const $procnt = parseFloat($mealOriginal.food.nutrients.PROCNT).toFixed(2) / 100;
                const $carbs = parseFloat($mealOriginal.food.nutrients.CHOCDF).toFixed(2) / 100;
                $meal.food.nutrients.ENERC_KCAL = $kcalOriginal * $qty;
                $meal.food.nutrients.FAT = $fatOriginal * $qty;
                $meal.food.nutrients.PROCNT = $procnt * $qty;
                $meal.food.nutrients.CHOCDF = $carbs * $qty;

                const $selectedIdx = this.selectedResults.findIndex((x) => {
                    return x === meal;
                });
                this.selectedResults[$selectedIdx] = $meal;
                this.getTotal();
            },
            getCalory($val) {
                return parseFloat($val).toFixed(2);
            },
            changeText() {
                if (this.search) {
                    this.axios.get(`https://api.edamam.com/api/food-database/parser?ingr=${this.search}&app_id=691cdfff&app_key=85704859d9ba587b4181bb4d6af9215e`)
                        .then(res => {
                            this.results = res.data.hints.map((x) => {
                                return {
                                    ...x,
                                    quantity: 100
                                }
                            });
                            this.resultsOriginal = _.cloneDeep(this.results);
                        });
                }
            },
            getTotal() {
                let $calories = 0;
                let $fat = 0;
                let $protein = 0;
                let $carbs = 0;
                let $sumNutrients = 0;
                let $sumQty = 0;
                this.selectedResults.forEach((x) => {
                    $calories += x.food.nutrients.ENERC_KCAL;
                    $fat += x.food.nutrients.FAT;
                    $protein += x.food.nutrients.PROCNT;
                    $carbs += x.food.nutrients.CHOCDF;
                    // $sumNutrients += x.food.nutrients.PROCNT + x.food.nutrients.FAT + x.food.nutrients.CHOCDF;
                    $sumQty += parseFloat(x.quantity);
                    console.log($fat);
                });
                this.sumCalory = parseFloat($calories).toFixed(2);
                this.sumFat = parseFloat($fat).toFixed(2);
                // this.sumNutrients = parseFloat($protein).toFixed(2);
                this.sumProtein = parseFloat($protein).toFixed(2);
                this.sumCarbs = parseFloat($carbs).toFixed(2);
                this.sumQty = parseFloat($sumQty).toFixed(2);
            },
            onChange($e, item) {
                if ($e.target.checked) {
                    this.selectedResults.push(item);
                } else {
                    const $idx = this.selectedResults.findIndex((x) => {
                        return x.food.foodId == item.food.foodId;
                    });
                    this.selectedResults.splice($idx, 1);
                }
                this.getTotal();
            },
            clearProperties() {
                this.mealInfo.properties = [];
                this.saveProperties();
            },
            saveProperties() {
                let $properties = this.mealInfo.properties;
                $properties = $properties.concat(this.selectedResults);
                const $form = {
                    meal_id: this.$route.params.meal,
                    properties: $properties
                };
                this.loading = true;
                const $this = this;
                this.axios.post('/c_panel/meal/properties', $form).then((res) => {
                    this.success = true;
                    this.loading = false;
                    this.search = null;
                    this.results = [];
                    this.sumQty = 0;
                    this.sumCalory = 0;
                    this.sumFat = 0;
                    this.sumProtein = 0;
                    this.sumCarbs = 0;
                    this.loadMealInfo();
                    setTimeout(function () {
                        $this.success = false;
                    }, 2000);
                }).catch((error) => {
                    this.loading = false;
                });
            },
            openNotification() {
                this.open = !this.open;
            },
            openCalls() {
                this.$store.dispatch("getCallOpen", true);
            },
            showDetails() {
                this.$store.dispatch("getCallOpen", false);
            },
            loadMealInfo() {
                const $id = this.$route.params.meal;
                this.axios.get(`c_panel/meal/info?id=${$id}`)
                    .then(response => {
                        this.mealInfo = response.data.data;
                        if (!this.mealInfo.hasOwnProperty('properties')) {
                            this.mealInfo = Object.assign(this.mealInfo, {
                                properties: []
                            });
                        }
                    });
            },
        },
        computed: {
            OpenCallComponent() {
                return this.$store.state.openCall;
            },
        },
        mounted() {
            this.loadMealInfo();
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

    thead {
        tr th {
            background-color: #EFF2F7;
            color: #555F6B;
        }
    }

    tbody {
        td {
            border-color: #C0CCDA;
        }

        tr:nth-child(even) td {
            background-color: #fff;
        }

        tr:nth-child(odd) td {
            background-color: #F9FAFC;
        }
    }
</style>
