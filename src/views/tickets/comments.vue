<template>
    <div class="container-content pb-24" v-if="tickets">
        <div class="flex flex-wrap -mx-4">
            <div class="w-1/4 3sm:w-full px-4 profile-info">
                <Profile/>
            </div>
            <div class="w-3/4 3sm:w-full px-4 flex flex-wrap">
                <div class="w-full" v-if="!OpenCallComponent">
                    <div class="w-full bg-white-900 rounded-sm comments-shadow" v-for="(item,index) in tickets"
                         :key="index">
                        <div class="px-12 3sm:px-4 py-4 3sm:py-2 flex items-center ticket-title">
                            <h2 class="flex-grow text-blue-900 text-2xl 4xl:text-lg 3sm:text-base">Ticket No.
                                {{item.id}}</h2>
                            <span class="bg-purple-300 py-1 px-4 text-white-900 text-sm rounded-lg 3sm:px-3 3sm:text-xs 3sm:py-2px"
                                  v-if="item.status === 0">Open</span>
                            <span class="closed py-1 px-4 text-white-900 text-sm rounded-lg 3sm:px-3 3sm:text-xs 3sm:py-2px"
                                  v-if="item.status === 1">Closed</span>
                        </div>

                        <div class="px-12 3sm:px-4 py-8 3sm:py-4 comment-box">
                            <p class="text-blue-90 font-medium text-lg 3sm:text-sm 3sm:mb-2 mb-3">
                                {{item.title}}
                            </p>
                            <p class="comment-date mb-4 font-semibold 3sm:text-sm 3sm:mb-2">{{item.created_at}}</p>

                            <p class="text-gray-900 text-lg mb-2 font-semibold 3sm:text-sm">Description</p>
                            <p class="text-blue-90 font-medium text-base 3sm:text-sm">
                                {{item.description}}
                            </p>
                        </div>

                        <div class="px-12 3sm:px-4 py-4 3sm:py-4 reply-box" v-for="(reply,index) in item.replays"
                             :key="index">
                            <p class="text-gray-900 text-lg mb-2 font-semibold 3sm:text-sm">You</p>
                            <p class="text-blue-90 font-medium text-base 3sm:text-sm">
                                {{reply.replay_text}}
                            </p>
                        </div>
                    </div>
                    <div class="w-full" v-if="tickets[0].status === 0">
                        <ValidationObserver ref="AddComment">
                            <form @submit.prevent="handleSubmit">
                                <div class="flex items-center 3sm:flex-wrap w-full bg-white-900 rounded-sm comments-shadow mt-4 px-12 3sm:px-4 py-4">
                                    <ValidationProvider class="w-full" tag="div"
                                                        vid="replay_text" name="Comment" rules="required"
                                                        v-slot="{ errors }">
                                        <input type="text"
                                               class="flex-grow py-2 focus:outline-none 3sm:w-full 3sm:mb-4 w-full"
                                               placeholder="Reply..." v-model="form.replay_text"
                                               :class="{ 'has-danger': errors.length }">
                                        <p class="message-danger">{{ errors[0] }}</p>
                                    </ValidationProvider>
                                    <button type="submit"
                                            class="comment-button text-white-900 py-2 px-6 3sm:text-sm 3sm:py-1 bg-blue-900 border border-blue-900 rounded-lg 3sm:rounded 3sm:w-full"
                                            :disabled="loading">
                                        Send
                                    </button>
                                </div>
                            </form>
                            <div class="bg-green-100 mt-4 rounded-10px text-center" v-if="success">
                                <p class="p-3 text-base text-blue-800 font-medium">Sent Successfully</p>
                            </div>
                            <button type="submit"
                                    class="comment-button text-white-900 py-2 px-8 bg-blue-900 border border-blue-900 rounded-lg 3sm:rounded mt-4 3sm:text-sm 3sm:py-1 3sm:w-full"
                                    @click="closeTicket" :disabled="ticketLoading">
                                Close Ticket
                            </button>
                            <div class="bg-green-100 mt-4 rounded-10px text-center" v-if="ticketSuccess">
                                <p class="p-3 text-base text-blue-800 font-medium">Ticket Closed Successfully</p>
                            </div>
                        </ValidationObserver>
                    </div>
                </div>
                <div class="w-3/5" v-if="OpenCallComponent">
                    <callPatient/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Profile from "../../components/userDetails/Profile";
    import callPatient from "../../components/userDetails/CallPatient";

    export default {
        data() {
            return {
                tickets: null,
                success: false,
                loading: false,
                ticketLoading: false,
                ticketSuccess: false,
                form: {
                    ticket_id: this.$route.params.id,
                    replay_text: null
                },
                ticket: {
                    ticket_id: this.$route.params.id,
                    status: 1,
                }
            }
        },
        components: {
            Profile,
            callPatient,
        },
        methods: {
            handleSubmit() {
                const $this = this;
                this.$refs['AddComment'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        this.axios.post('/c_panel/ticket/replay', this.form).then((res) => {
                            this.success = true;
                            this.loading = false;
                            this.form = {
                                replay_text: null,
                            };
                            setTimeout(function () {
                                $this.success = false;
                                location.reload();
                            }, 2000);
                            this.$refs['AddComment'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.$refs['AddComment'].setErrors(error.response.data.errors);
                                }
                            }
                        });
                    }
                });
            },
            closeTicket() {
                this.axios.post('/c_panel/ticket/status/update', this.ticket).then((res) => {
                    this.ticketSuccess = true;
                    this.ticketLoading = false;
                    setTimeout(function () {
                        $this.ticketSuccess = false;
                        location.reload();
                    }, 2000);
                }).catch((error) => {
                    this.ticketLoading = false;
                    if (error.response) {
                        if (error.response.status === 422) {
                            console.log('error');
                        }
                    }
                });
            },
        },
        computed: {
            OpenCallComponent() {
                return this.$store.state.openCall;
            }
        },
        mounted() {
            const $id = this.$route.params.id;
            this.axios.get(`c_panel/ticket/replays?ticket_id=${$id}`,)
                .then(response => (this.tickets = response.data.data))
        },
    }
</script>
<style scoped lang="scss">
    .comments-shadow {
        filter: drop-shadow(0px 3px 12px rgba(0, 0, 0, 0.13));
    }

    .ticket-title {
        border-bottom: 1px solid #e0e3da;
        filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16));
    }

    .comment-box,
    .reply-box {
        border-bottom: 1px solid #E6E6E6;
    }

    .comment-button {
        transition: all 0.25s ease;

        &:hover {
            background-color: transparent;
            color: #12133A;
        }
    }

    .closed {
        background-color: #82C99D;
    }
</style>
