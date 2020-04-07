<template>
    <div class="container-content pb-24">
        <div class="flex flex-wrap -mx-4">
            <div class="w-1/4 3sm:w-full px-4 profile-info">
                <Profile/>
            </div>
            <div class="w-3/4 3sm:w-full px-4 flex flex-wrap">
                <div class="w-full" v-if="!OpenCallComponent">
                    <div class="w-full bg-white-900 rounded-sm comments-shadow">
                        <div class="px-12 3sm:px-4 py-4 3sm:py-2 flex items-center ticket-title">
                            <h2 class="flex-grow text-blue-900 text-2xl 4xl:text-lg 3sm:text-base">Ticket No. 130</h2>
                            <span class="bg-purple-300 py-1 px-4 text-white-900 text-sm rounded-lg 3sm:px-3 3sm:text-xs 3sm:py-2px">Open</span>
                        </div>

                        <div class="px-12 3sm:px-4 py-8 3sm:py-4 comment-box">
                            <p class="text-blue-90 font-medium text-lg 3sm:text-sm 3sm:mb-2 mb-3">مشكلة في قياسات السكر</p>
                            <p class="comment-date mb-4 font-semibold 3sm:text-sm 3sm:mb-2">Today , 02:30PM</p>

                            <p class="text-gray-900 text-lg mb-2 font-semibold 3sm:text-sm">Description</p>
                            <p class="text-blue-90 font-medium text-base 3sm:text-sm">المشكلة يا دكتور أني كلما أقيس عبر الجهاز
                                الالكتروني بالصيدلية، عبر أجهزة متعددة وحديثة، وذات
                                جودة؛ أجد السكر 150 أو 160، وعندما أذهب للمختبر أجده طبيعيا جدا.
                            </p>
                        </div>

                        <div class="px-12 3sm:px-4 py-8 3sm:py-4 ">
                            <p class="text-gray-900 text-lg mb-2 font-semibold 3sm:text-sm">You</p>
                            <p class="text-blue-90 font-medium text-base 3sm:text-sm">
                                تحليل السكر العشوائي 160 تحليل طبيعي لإجرائه بعد الساعة الأولى من الأكل، وتشخيص السكر
                                يعتمد
                                في الأساس على تحليل السكر الصائم لمدة 10 إلى 12 ساعة، ثم تناول الإفطار، وإعادة التحليل
                                بعد
                                ساعتين من الإفطار
                            </p>
                        </div>

                    </div>
                    <div class="w-full">
                        <form action="">
                            <div class="flex items-center 3sm:flex-wrap w-full bg-white-900 rounded-sm comments-shadow mt-4 px-12 3sm:px-4 py-4">
                                <input type="text" class="flex-grow py-2 focus:outline-none 3sm:w-full 3sm:mb-4" placeholder="Reply...">
                                <button type="button"
                                        class="comment-button text-white-900 py-2 px-6 3sm:text-sm 3sm:py-1 bg-blue-900 border border-blue-900 rounded-lg 3sm:rounded 3sm:w-full">
                                    Send
                                </button>
                            </div>
                        </form>
                        <button type="button"
                                class="comment-button text-white-900 py-2 px-8 bg-blue-900 border border-blue-900 rounded-lg 3sm:rounded mt-4 3sm:text-sm 3sm:py-1 3sm:w-full">
                            Close Ticket
                        </button>
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
        components: {
            Profile,
            callPatient
        },
        computed: {
            OpenCallComponent() {
                return this.$store.state.openCall;
            }
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

    .comment-box {
        border-bottom: 1px solid #E6E6E6;
    }

    .comment-button {
        transition: all 0.25s ease;

        &:hover {
            background-color: transparent;
            color: #12133A;
        }
    }
</style>
