<template>
    <div v-if="token">
        <Header/>
        <div class="pt-12 3sm:pt-6 bg-gray-500 default-layout">
            <router-view/>
        </div>
    </div>
</template>
<script>
    import Header from '../components/Header'

    export default {
        components: {
            Header
        },
        mounted() {
            if (!this.token) {
                this.$router.push('/login');
                console.log(this.token);
            }
        },
        computed: {
            token() {
                return localStorage.getItem('token') ? localStorage.getItem('token') : null;
            }
        }
    }
</script>
<style lang="scss">
    .default-layout {
        min-height: calc(100vh - 106px);
    }
</style>
