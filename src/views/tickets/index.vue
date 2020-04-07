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
                         :pagination-props="{ background: true, pageSizes: [5, 10, 20] }">
                <el-table-column v-for="(title,index) in titles" :prop="title.prop" :label="title.label" :key="index"
                                 :width="title.prop ==='ticket_id' ?120 : ''"
                                 :sortable="(title.prop === 'ticket_id' || title.prop === 'date' || title.prop === 'user')"
                                 :filters="title.prop === 'status'?[{ text: 'Closed', value: 'Closed' }, { text: 'Open', value: 'Open' }]:null"
                                 :filter-method="title.prop === 'status'?filterTag:null"
                >
                    <template slot-scope="scope">
                        <el-button
                                v-if="title.prop === 'user'"
                                type="link"
                                @click="user(scope.$index, scope.row)">
                            {{scope.row.user}}
                        </el-button>
                        <el-tag v-else-if="title.prop === 'status'"
                                :type="scope.row.status === 'Closed' ? 'closed-class' : 'open-class'"
                                disable-transitions>{{scope.row.status}}
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
                        prop: ['ticket_id', 'ticket_title', 'user', 'date'],
                        value: ''
                    },
                ],
                titles: [
                    {
                        prop: 'ticket_id',
                        label: 'Ticket No.'
                    },
                    {
                        prop: 'ticket_title',
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
                        prop: 'date',
                        label: 'Date/Time'
                    },
                    {
                        prop: 'status',
                        label: 'Status'
                    },


                ],
                tableData: [
                    {
                        ticket_id: '130',
                        ticket_title: 'مشكلة في قياسات السكرمشكلة في قياسات السكرمشكلة في قياسات السكرمشكلة في قياسات السكر',
                        category: 'Customer Services',
                        user: 'John Smith',
                        date: '26/11/19 - 05:00 PM',
                        status: 'Closed',
                    },
                    {
                        ticket_id: '130',
                        ticket_title: ' قياسات السكر',
                        category: 'Customer Services',
                        user: 'Anas Smith',
                        date: '26/11/19 - 044:00 PM',
                        status: 'Opened',
                    },
                ],
                search: '',
            }
        },
        methods: {
            filterTag(value, row) {
                return row.status === value;
            },
            handleEdit(index, row) {
                this.$router.push(`/tickets/${row.user}/comments`);
            },
            user(index, row) {
                this.$router.push(`/${row.user}/details`);
            },

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
