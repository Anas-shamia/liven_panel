<template>
    <div class="flex items-center justify-center">
        <div class="fixed inset-0 z-9 overlay flex items-center justify-center" @click.self="$emit('close')">
            <div class="w-2/5 foods-modal 3sm:w-full 3sm:mx-4 bg-white-900 mx-auto flex items-center justify-center rounded-lg custom-shadow px-6 py-10 3sm:px-4 3sm:py-5">
                <div class="w-full modal-height">
                    <h3 class="text-blue-900 text-2xl 4xl:text-lg mb-6 flex items-center">
                        <span class="flex-grow">Meals Details</span>
                        <img class="w-4 cursor-pointer" src="@/assets/img/close.svg" alt="close"
                             @click="$emit('close')">
                    </h3>
                    <div v-for="(items,index) in foods" :key="index">
                        <p>{{items.date}}</p>
                        <div v-for="(item,index) in items.meals_today" :key="index">
                            <span class="py-2 text-primary-900 font-medium text-lg 4xl:text-base block"
                                  v-if="item.type === '1'">Breakfast</span>
                            <span class="py-2 text-primary-900 font-medium text-lg 4xl:text-base block"
                                  v-if="item.type === '2'">Lunch</span>
                            <span class="py-2 text-primary-900 font-medium text-lg 4xl:text-base block"
                                  v-if="item.type === '3'">Dinner</span>
                            <span class="py-2 text-primary-900 font-medium text-lg 4xl:text-base block"
                                  v-if="item.type === '4'">Snacks</span>
                            <div class="" v-if="item.image">
                                <img class="object-cover w-1/3 mx-auto" :src="item.image_url" alt="">
                            </div>
                            <div class="pb-4 border-b" v-if="item.notes">
                                <p class="text-primary-900 font-medium text-2xl 4xl:text-lg">Notes</p>
                                <p class="text-base text-blue-800">{{item.notes}}</p>
                            </div>
                            <div class="table-section" v-if="item.properties">
                                <table class="w-full">
                                    <thead>
                                    <tr>
                                        <th class="w-1/3 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Food</th>
                                        <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Quantity
                                        </th>
                                        <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Unit</th>
                                        <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Calories
                                        </th>
                                        <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Protein</th>
                                        <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Fat</th>
                                        <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Carbs</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(meal, index) in item.properties" :key="index">
                                        <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">{{meal.food.label}}
                                        </td>
                                        <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">{{meal.quantity}}
                                        </td>
                                        <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">g</td>
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
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            profile_id: {
                type: Number
            },
            foods: {
                type: Array
            }
        },
        data() {
            return {}
        },
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

    .foods-modal {
        z-index: 2;
        min-height: 50vh;
        overflow-y: scroll;
    }

    .table-section {
        max-height: 400px;
        overflow-y: scroll;

        table {
            max-height: 100%;
        }
    }

    .modal-height {
        height: 400px;
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
