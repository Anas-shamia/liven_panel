<template>
    <div class="flex items-center justify-center">
        <div class="fixed z-2 inset-0 overlay flex items-center justify-center" @click.self="$emit('close')">
            <div class="w-1/3 3sm:w-full  3sm:mx-4 bg-white-900 overflow-hidden mx-auto flex items-center justify-center rounded-lg custom-shadow px-12 py-10 3sm:px-4 3sm:py-5">
                <div class="w-full">
                    <h3 class="text-blue-900 text-2xl 4xl:text-lg mb-6 flex items-center">
                        <span class="flex-grow">Advice Details</span>
                        <img class="w-4 cursor-pointer" src="@/assets/img/close.svg" alt="close"
                             @click="$emit('close')">
                    </h3>
                    <div v-if="details">
                        <p class="text-blue-800 text-lg mb-2"><span class="text-blue-800 text-xl font-bold pr-2">Advice Title:</span></p>
                        <p class="text-blue-800 text-lg mb-2">{{details.title}}</p>
<!--                        <p class="text-blue-800 text-xl font-bold">Details:</p>-->
<!--                        <p class="text-blue-800 text-lg mb-2">{{details.content}}</p>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['id','url','msg'],
        data() {
            return {
                myID: this.id,
                myUrl : this.url,
                details:null,
            }
        },
        methods: {
            viewDetails() {
                let $itemID = this.myID;
                this.axios.get(`${this.myUrl}/${$itemID}`).then(response => (this.details = response.data.data))
            }
        },
        mounted() {
            this.viewDetails();
        }
    }
</script>

