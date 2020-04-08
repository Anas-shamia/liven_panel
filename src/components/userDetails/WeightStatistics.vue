<template>
    <div class="mb-8 3sm:mb-0">
        <h3 class="text-blue-900 font-medium text-2xl 4xl:text-lg mb-6">Body Statistics</h3>
        <div class="flex flex-wrap -mx-6 4xl:-mx-6 3sm:-mx-2">
            <router-link tag="div" :to="`/tickets/${this.user_id}/statistics`"
                         class="w-1/4 3sm:w-1/2 3sm:mb-4 px-6 4xl:px-4 3sm:px-2 cursor-pointer">
                <div class="weight-box bg-white-900 flex items-start 3sm:flex-wrap 3sm:justify-center py-8 px-6 3sm:px-4 3sm:py-4 rounded-lg custom-shadow">
                    <img class="w-10 3sm:w-8" src="@/assets/img/pink-weight.svg" alt="weight">
                    <div class="pl-5 3sm:w-full 3sm:text-center 3sm:pl-0">
                        <p class="text-black-900 text-base 4xl:text-sm mb-1 3sm:mb-0 3sm:pt-2">Weight</p>
                        <p class="text-3xl 3sm:text-lg text-black-900 font-bold">{{this.weight}} <span
                                class="text-gray-700 text-base 4xl:text-sm pl-1">kg</span></p>
                        <!--                        <p class="text-gray-700 text-base 4xl:text-sm">Ideal</p>-->
                    </div>
                </div>
            </router-link>
            <router-link tag="div" :to="`/tickets/${this.user_id}/statistics`"
                         class="w-1/4 3sm:w-1/2 3sm:mb-4 px-6 4xl:px-4 3sm:px-2 cursor-pointer">
                <div class="weight-box bg-white-900 flex items-start 3sm:flex-wrap 3sm:justify-center py-8 px-6 3sm:px-4 3sm:py-4 rounded-lg custom-shadow">
                    <img class="w-10 3sm:w-8" src="@/assets/img/fat.svg" alt="weight">
                    <div class="pl-5 3sm:w-full 3sm:text-center 3sm:pl-0">
                        <p class="text-black-900 text-base 4xl:text-sm mb-1 3sm:mb-0 3sm:pt-2">Waist</p>
                        <p class="text-3xl 3sm:text-lg text-black-900 font-bold">{{this.waist}} <span
                                class="text-gray-700 text-base 4xl:text-sm pl-1">CM</span></p>
                        <!--                        <p class="text-gray-700 text-base 4xl:text-sm">Normal</p>-->
                    </div>
                </div>
            </router-link>
            <router-link tag="div" :to="`/tickets/${this.user_id}/statistics`"
                         class="w-1/4 3sm:w-1/2 3sm:mb-4 px-6 4xl:px-4 3sm:px-2 cursor-pointer">
                <div class="weight-box bg-white-900 flex items-start 3sm:flex-wrap 3sm:justify-center py-8 px-6 3sm:px-4 3sm:py-4 rounded-lg custom-shadow">
                    <img class="w-10 3sm:w-8" src="@/assets/img/fat.svg" alt="weight">
                    <div class="pl-5 3sm:w-full 3sm:text-center 3sm:pl-0">
                        <p class="text-black-900 text-base 4xl:text-sm mb-1 3sm:mb-0 3sm:pt-2">Hip</p>
                        <p class="text-3xl 3sm:text-lg text-black-900 font-bold">{{this.hip}} <span
                                class="text-gray-700 text-base 4xl:text-sm pl-1">CM</span></p>
                        <!--                        <p class="text-gray-700 text-base 4xl:text-sm">Normal</p>-->
                    </div>
                </div>
            </router-link>
            <router-link tag="div" :to="`/tickets/${this.user_id}/statistics`"
                         class="w-1/4 3sm:w-1/2 3sm:mb-4 px-6 4xl:px-4 3sm:px-2 cursor-pointer">
                <div class="weight-box bg-white-900 flex items-start 3sm:flex-wrap 3sm:justify-center py-8 px-6 3sm:px-4 3sm:py-4 rounded-lg custom-shadow">
                    <img class="w-10 3sm:w-8" src="@/assets/img/scale.svg" alt="weight">
                    <div class="pl-5 3sm:w-full 3sm:text-center 3sm:pl-0">
                        <p class="text-black-900 text-base 4xl:text-sm mb-1 3sm:mb-0 3sm:pt-2">BMI</p>
                        <p class="text-3xl 3sm:text-lg text-black-900 font-bold">
                            {{bmi(this.height,this.weight)}}
                            <span
                                    class="text-gray-700 text-base 4xl:text-sm pl-1">%</span></p>
                        <!--                        <p class="text-gray-700 text-base 4xl:text-sm">Normal Weight</p>-->
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['user_id', 'weight', 'waist', 'hip', 'height'],
        methods: {
            bmi(height, weight) {
                let finalBmi = weight / (height / 100 * height / 100);
                return finalBmi.toFixed(2);
            }
        },
        mounted() {
            this.bmi();
        }
    }
</script>
