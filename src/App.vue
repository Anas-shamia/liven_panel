<template>
    <div id="app">
        <component :is="layout">
            <router-view/>
        </component>
    </div>
</template>
<script>
    const default_layout = "auth";
    export default {
        computed: {
            layout() {
                return (this.$route.meta.layout || default_layout) + '-layout';
            }
        },
        // created() {
        //     if(localStorage.getItem('token')) {
        //         this.$router.push('/users');
        //     }
        //     else {
        //         this.$router.push('/login');
        //     }
        // },
    }
</script>
<style lang="scss">
    @import './assets/scss/styles.scss';
</style>
