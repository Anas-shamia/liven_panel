<template>
    <div class="flex items-center justify-center relative">
        <div class="fixed inset-0 overlay flex items-center justify-center z-2" @click.self="$emit('close')">
            <div class="w-1/4 4xl:w-1/3 3sm:w-full 3sm:mx-4 bg-white-900 mx-auto flex items-center justify-center rounded-lg custom-shadow px-12 pt-4 3sm:px-4 3sm:py-5">
                <div class="w-full mb-4">
                    <h3 class="text-blue-900 text-lg mb-6 flex items-center pb-2">
                        <span class="flex-grow">Change Status</span>
                        <img class="w-4 cursor-pointer" src="@/assets/img/close.svg" alt="close"
                             @click="$emit('close')">
                    </h3>
                    <p>Are you Sure you want to change this status ?</p>
                    <div class="bg-green-100 mt-4 rounded-10px text-center" v-if="success">
                        <p class="p-3 text-base text-blue-800 font-medium">Changed Successfully</p>
                    </div>
                    <div class="flex flex-wrap mt-4 -mx-4">
                        <div class="w-1/2 px-4">
                            <button type="button"
                                    class="w-full bg-primary-900 py-2 rounded-lg text-sm font-medium text-white-900 "
                                    @click="deleteSugar(myID)">
                                Confirm
                            </button>
                        </div>
                        <div class="w-1/2 px-4">
                            <button type="button" @click.self="$emit('close')"
                                    class="w-full bg-blue-800 py-2 rounded-lg text-sm font-medium text-white-900 ">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['id', 'url'],
        data() {
            return {
                success: false,
                myID: this.id,
                myUrl: this.url,
                form: {
                    user_id: this.myID,
                }
            }
        },
        methods: {
            deleteSugar() {
                const $this = this;
                this.form.user_id = this.myID;
                this.axios.post(`${this.myUrl}`, this.form).then((res) => {
                    this.success = true;
                    setTimeout(function () {
                        $this.success = false;
                        location.reload();
                    }, 3000);
                }).catch((error) => {
                });
            }
        }
    }
</script>

