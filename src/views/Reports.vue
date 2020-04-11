<template>
    <div class="container-content">
        <div class="flex items-center mb-8 3sm:mb-4">
            <img src="@/assets/img/user.svg" alt="icon">
            <router-link tag="h2" to="/users" class="text-2xl 4xl:text-lg text-blue-900 px-4 cursor-pointer">Users
            </router-link>
            <img src="@/assets/img/right-chevron.svg" alt="icon">
            <router-link tag="p" :to="`/${this.user_id}/details`"
                         class="text-2xl 4xl:text-lg text-gray-900 pl-6 cursor-pointer">User Details
            </router-link>
        </div>
        <div class="flex items-center 3sm:flex-wrap bg-white-900 table-title px-4 py-4 border-b border-gray-200">
            <div class="w-3/4 flex items-center">
                <img class="mr-4" src="@/assets/img/user.svg" alt="user-icon">
                <h2 class="text-2xl 4xl:text-lg text-blue-900">Reports</h2>
                <span class="bg-primary-900 text-white-900 rounded-full h-6 w-8 flex items-center justify-center mx-4">{{tableData.length}}</span>
            </div>
            <div class="flex items-center w-1/4 3sm:w-full 3sm:mt-4">
                <el-input placeholder="Search" v-model="filters[0].value"></el-input>
            </div>
        </div>
        <div class="py-6 users-table">
            <data-tables :data="tableData" :filters="filters" :page-size="1"
                         :pagination-props="{ background: true, pageSizes: [10, 20, 50] }">
                <el-table-column v-for="(title,index) in titles" :prop="title.prop" :label="title.label" :key="index"
                                 :width="title.prop ==='id' ?120 : ''"
                                 :sortable="(title.prop === 'date')"
                >
                </el-table-column>
            </data-tables>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                user_id: this.$route.params.user,
                filters: [
                    {
                        prop: ['title', 'date'],
                        value: ''
                    },
                ],
                titles: [
                    {
                        prop: 'id',
                        label: '#'
                    },
                    {
                        prop: 'title',
                        label: 'Title'
                    },
                    {
                        prop: 'content',
                        label: 'Content'
                    },
                    {
                        prop: 'created_at',
                        label: 'Date'
                    },

                ],
                search: '',
                tableData: []
            }
        },
        mounted() {
            const $id = this.$route.params.user;
            this.axios.get(`c_panel/report/by/user?user_id=${$id}`)
                .then(response => (this.tableData = response.data.data))
        }

    }
</script>
