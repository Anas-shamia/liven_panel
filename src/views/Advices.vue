<template>
    <div class="container-content">
        <div class="flex items-center 3sm:flex-wrap bg-white-900 table-title px-4 py-4 border-b border-gray-200">
            <div class="w-3/4 flex items-center">
                <img class="mr-4" src="@/assets/img/user.svg" alt="user-icon">
                <h2 class="text-2xl 4xl:text-lg text-blue-900">Advices</h2>
                <span class="bg-primary-900 text-white-900 rounded-full h-6 w-8 flex items-center justify-center mx-4">{{tableData.length}}</span>
            </div>
            <div class="flex items-center w-1/4 3sm:w-full 3sm:mt-4">
                <button type="submit"
                        class="text-white-900 mr-4 py-2 px-8 bg-primary-900 border border-primary-900 rounded-lg 3sm:rounded 3sm:text-sm 3sm:py-1 3sm:w-full"
                        @click="openAddAdvice()">
                    Create
                </button>
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

                <el-table-column label="View">
                    <template slot-scope="scope">
                        <el-button
                                type="link"
                                @click="openAdviceModal(scope.row)">
                            View
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="Delete">
                    <template slot-scope="scope">
                        <el-button
                                type="link"
                                @click="openDeleteModal(scope.row)">
                            Delete
                        </el-button>
                    </template>
                </el-table-column>
            </data-tables>
        </div>
        <AddAdvice v-if="openModal" @close="openModal = false"/>
        <ConfirmDelete v-if="openDelete" @close="openDelete = false" :id="myId" :url="'/c_panel/advice'"/>
        <ViewAdvice v-if="openAdvice" @close="openAdvice = false" :id="myId" :url="'/c_panel/advice'"/>
    </div>
</template>
<script>
    import AddAdvice from '../components/AddAdvice'
    import ConfirmDelete from '../components/ConfirmDelete';
    import ViewAdvice from '../components/userDetails/ViewAdvice';

    export default {
        data() {
            return {
                myId: null,
                openDelete: false,
                openModal: false,
                openAdvice: false,
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
                        prop: 'date',
                        label: 'Date'
                    },

                ],
                search: '',
                tableData: []
            }
        },
        components: {
            AddAdvice,
            ConfirmDelete,
            ViewAdvice
        },
        methods: {
            openAddAdvice() {
                this.openModal = !this.openModal;
            },
            openDeleteModal(row) {
                this.myId = row.id;
                this.openDelete = !this.openDelete;
            },
            openAdviceModal(row) {
                this.myId = row.id;
                this.openAdvice = !this.openAdvice;
            },
        },
        mounted() {
            this.axios.get('c_panel/advice/all',)
                .then(response => (this.tableData = response.data.data))
        }

    }
</script>
