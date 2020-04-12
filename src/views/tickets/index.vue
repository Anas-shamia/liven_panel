<template>
    <div class="container-content">
        <div class="flex items-center 3sm:flex-wrap bg-white-900 table-title px-4 py-4 border-b border-gray-200">
            <div class="w-3/4 flex items-center">
                <img class="mr-4" src="@/assets/img/tickets.svg" alt="icon">
                <h2 class="text-2xl 4xl:text-lg text-blue-900">Tickets</h2>
                <span class="bg-primary-900 text-white-900 rounded-full h-6 w-8 flex items-center justify-center mx-4">{{tableData.length}}</span>
            </div>
            <div class="w-1/4 3sm:w-full 3sm:mt-4">
                <el-input placeholder="Search" v-model="filters[0].value"></el-input>
            </div>
        </div>
        <div class="py-6 tickets-table">
            <data-tables :data="tableData" :filters="filters" :page-size="1"
                         :pagination-props="{ background: true, pageSizes: [10, 20, 50] }">
                <el-table-column v-for="(title,index) in titles" :prop="title.prop" :label="title.label" :key="index"
                                 :width="title.prop ==='id' ?120 : ''"
                                 :sortable="(title.prop === 'id' || title.prop === 'date' || title.prop === 'user')"
                                 :filters="title.prop === 'status_text'?[{ text: 'Closed', value: 'Closed' }, { text: 'Opened', value: 'Opened' }]:null"
                                 :filter-method="title.prop === 'status_text'?filterTag:null"
                >
                    <template slot-scope="scope">
                        <div v-if="title.prop === 'category'">
                            {{scope.row.category.name}}
                        </div>
                        <el-button
                                v-else-if="title.prop === 'user'"
                                type="link"
                                @click="user(scope.$index, scope.row)">
                            {{scope.row.user.name}}
                        </el-button>
                        <el-tag v-else-if="title.prop === 'status_text'"
                                :type="scope.row.status_text === 'Closed' ? 'closed-class' : 'open-class'"
                                disable-transitions>{{scope.row.status_text}}
                        </el-tag>
                        <span v-else>{{scope.row[title.prop]}}</span>
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
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                filters: [
                    {
                        prop: ['id', 'description'],
                        // prop: ['id', 'description', 'user', 'date'],
                        value: ''
                    },
                ],
                titles: [
                    {
                        prop: 'id',
                        label: 'Ticket No.'
                    },
                    {
                        prop: 'title',
                        label: 'Ticket Title'
                    },
                    {
                        prop: 'category',
                        label: 'Category'
                    },
                    {
                        prop: 'user',
                        label: 'User'
                    },
                    {
                        prop: 'created_at',
                        label: 'Date/Time'
                    },
                    {
                        prop: 'status_text',
                        label: 'Status'
                    },


                ],
                tableData: [],
                // tableData: [
                //     {
                //         ticket_id: '130',
                //         ticket_title: 'مشكلة في قياسات السكرمشكلة في قياسات السكرمشكلة في قياسات السكرمشكلة في قياسات السكر',
                //         category: 'Customer Services',
                //         user: 'John Smith',
                //         date: '26/11/19 - 05:00 PM',
                //         status: 'Closed',
                //     },
                //     {
                //         ticket_id: '130',
                //         ticket_title: ' قياسات السكر',
                //         category: 'Customer Services',
                //         user: 'Anas Smith',
                //         date: '26/11/19 - 044:00 PM',
                //         status: 'Opened',
                //     },
                // ],
                search: '',
            }
        },

        methods: {
            filterTag(value, row) {
                return row.status_text === value;
            },
            handleEdit(index, row) {
                this.$router.push(`/tickets/${row.user_id}/${row.id}/comments`);
            },
            user(index, row) {
                this.$router.push(`/${row.user.id}/details`);
            },

        },

        computed: {
            // category() {
            //     let test = [];
            //     if (this.tableData.length) {
            //         _.forEach(this.tableData, function (value) {
            //             console.log(value.category.name);
            //             test.push(value.category.name);
            //         });
            //         return test;
            //     }
            // },
        },
        mounted() {
            this.axios.get('/c_panel/ticket/all',)
                .then(response => (this.tableData = response.data.data))
        },
        created() {
        }
    }
</script>
<style lang="scss">
    .el-tag.el-tag--open-class,
    .el-tag.el-tag--closed-class {
        background-color: #82C99D;
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

    .el-tag.el-tag--open-class {
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
