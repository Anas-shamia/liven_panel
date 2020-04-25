<template>
    <div class="container-content">
        <div class="flex items-center 3sm:flex-wrap bg-white-900 table-title px-4 py-4 border-b border-gray-200">
            <div class="w-3/4 flex items-center">
                <img class="mr-4" src="@/assets/img/user.svg" alt="user-icon">
                <h2 class="text-2xl 4xl:text-lg text-blue-900">Users</h2>
                <span class="bg-primary-900 text-white-900 rounded-full h-6 w-8 flex items-center justify-center mx-4">{{tableData.length}}</span>
            </div>
            <div class="w-1/4 3sm:w-full 3sm:mt-4">
                <el-input placeholder="Search" v-model="filters[0].value"></el-input>
            </div>
        </div>
        <div class="py-6 users-table">
            <data-tables :data="tableData" :filters="filters" :page-size="1"
                         :pagination-props="{ background: true, pageSizes: [10, 20, 50] }">
                <el-table-column v-for="(title,index) in titles" :prop="title.prop" :label="title.label" :key="index"
                                 :width="title.prop ==='rownum' ?120 : ''"
                                 :sortable="(title.prop === 'age' || title.prop === 'type' || title.prop === 'name')"
                                 :filters="title.prop === 'gender'?[{ text: 'Male', value: 'Male' }, { text: 'Female', value: 'Female' }]:null || title.prop === 'subscription_state'?[{ text: 'paid', value: 'paid' }, { text: 'free', value: 'free' }]:null"
                                 :filter-method="title.prop === 'gender'?filterTag:null || title.prop === 'subscription_state'?filterSub:null"
                >

                    <template slot-scope="scope">
                        <div v-if="title.prop === 'dietitian' && scope.row.dietitian">
                           <span> {{scope.row.dietitian.name}}</span>
                        </div>
                        <el-tag v-else-if="title.prop === 'gender'"
                                :type="scope.row.gender === 'Male' ? 'male-class' : 'female-class'"
                                disable-transitions>{{scope.row.gender}}
                        </el-tag>
                        <div v-else>{{scope.row[title.prop]}}</div>
                    </template>
                </el-table-column>




                <el-table-column label="CGM File">
                    <template slot-scope="scope">
                        <el-button
                                type="link"
                                @click="openModal(scope.row)">
                            Upload
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="Details">
                    <template slot-scope="scope">
                        <el-button
                                type="link"
                                @click="handleEdit(scope.$index, scope.row)">View
                        </el-button>
                    </template>
                </el-table-column>
            </data-tables>
            <UploadFile v-if="open" @close="open = false" :user_id="this.my_user"/>
        </div>
    </div>
</template>
<script>
    import UploadFile from '../components/UploadFile'

    export default {
        components: {
            UploadFile
        },

        data() {
            return {
                open: false,
                my_user: null,
                filters: [
                    {
                        prop: ['name', 'phone'],
                        value: ''
                    },
                ],
                titles: [
                    {
                        prop: 'rownum',
                        label: '#'
                    },
                    {
                        prop: 'name',
                        label: 'User'
                    },
                    {
                        prop: 'phone',
                        label: 'Phone'
                    },
                    {
                        prop: 'gender',
                        label: 'Gender'
                    },
                    {
                        prop: 'age',
                        label: 'Age'
                    },
                    {
                      prop: 'dietitian',
                      label: 'Dietitian'
                    },
                    {
                        prop: 'subscription_state',
                        label: 'Type'
                    },

                ],
                search: '',
                tableData: []
            }
        },
        methods: {
            filterTag(value, row) {
                return row.gender === value;
            },
            filterSub(value, row) {
                return row.subscription_state === value;
            },
            handleEdit(index, row) {
                this.$router.push(`/${row.id}/details`);
            },
            openModal(row) {
                this.my_user = row.id;
                this.open = !this.open;
            }
        },
        mounted() {
            const $user = localStorage.getItem('user') ? localStorage.getItem('user') : null;
            if ($user === 'admin') {
                this.axios.get('c_panel/users/patient/all',)
                    .then(response => (this.tableData = response.data.data.data))
            }
            if ($user === 'dietitian') {
                this.axios.get('/c_panel/users/patient/of/dietitian/all',)
                    .then(response => (this.tableData = response.data.data))
            }

        }

    }
</script>
<style lang="scss">
    .el-tag.el-tag--male-class,
    .el-tag.el-tag--female-class {
        background-color: #5A9EE2;
        color: #fff;
        line-height: 1;
        height: 25px;
        width: 60px;
        border-radius: 5px;
        font-size: 14px;
        border-color: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .el-tag.el-tag--female-class {
        background-color: #C878D3;
        border-color: #C878D3;
    }

    .el-button.el-button--link {
        padding: 0;
        background-color: transparent;
        border: none;
        color: #693574;
        text-decoration: underline;

    }

    .table-title {
        filter: drop-shadow(5px 3px 6px rgba(0, 0, 0, 0.1));

    }
</style>
