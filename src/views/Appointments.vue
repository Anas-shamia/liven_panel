<template>
    <div class="container-content pb-24">
        <table class="table-fixed w-full">
            <thead>
            <tr>
                <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Day</th>
                <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">From</th>
                <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">To</th>
                <th class="w-1/4 text-left px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">Options</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                    <v-select
                            class="form-control"
                            :options="days"
                            label="name"
                            placeholder="Select Day"
                            v-model="form.day">
                    </v-select>
                </td>
                <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                    <v-select
                            class="form-control"
                            :options="FromHours"
                            label="name"
                            placeholder="From"
                            :searchable="true"
                            v-model="form.from">
                    </v-select>
                </td>
                <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                    <v-select
                            class="form-control"
                            :options="ToHours"
                            label="name"
                            placeholder="To"
                            :searchable="true"
                            v-model="form.to">
                    </v-select>
                </td>
                <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                    <button type="button" class="bg-primary-900 text-white-900 px-4 py-1 text-base rounded-lg mx-2"
                            @click="submitForm()">
                        Save
                    </button>
                    <button type="button" class="bg-blue-800 text-white-900 px-4 py-1 text-base rounded-lg mx-2">
                        Delete
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                appointment: [],
                form: {
                    day: null,
                    from: null,
                    to: null
                },
                days: [
                    {
                        name: 'Saturday',
                        id: 0
                    },
                    {
                        name: 'Sunday',
                        id: 1
                    },
                    {
                        name: 'Monday',
                        id: 2
                    },
                    {
                        name: 'Tuesday',
                        id: 3
                    }, {
                        name: 'Wednesday',
                        id: 4
                    }, {
                        name: 'Thursday',
                        id: 5
                    },
                    {
                        name: 'Friday',
                        id: 6
                    },


                ],
                FromHours: [
                    '00:00',
                    '00:30',
                    '01:00',
                    '01:30',
                    '02:00',
                    '02:30',
                    '03:00',
                    '03:30',
                    '04:00',
                    '04:30',
                    '05:00',
                    '05:30',
                    '06:00',
                    '06:30',
                    '07:00',
                    '07:30',
                    '08:00',
                    '08:30',
                    '09:00',
                    '09:30',
                    '10:00',
                    '10:30',
                    '11:00',
                    '11:30',
                    '12:00',
                    '12:30',
                    '13:00',
                    '13:30',
                    '14:00',
                    '14:30',
                    '15:00',
                    '15:30',
                    '16:00',
                    '16:30',
                    '17:00',
                    '17:30',
                    '18:00',
                    '18:30',
                    '19:00',
                    '19:30',
                    '20:00',
                    '20:30',
                    '21:00',
                    '21:30',
                    '22:00',
                    '22:30',
                    '23:00',
                    '23:30',
                ],
                ToHours: [
                    '00:00',
                    '00:30',
                    '01:00',
                    '01:30',
                    '02:00',
                    '02:30',
                    '03:00',
                    '03:30',
                    '04:00',
                    '04:30',
                    '05:00',
                    '05:30',
                    '06:00',
                    '06:30',
                    '07:00',
                    '07:30',
                    '08:00',
                    '08:30',
                    '09:00',
                    '09:30',
                    '10:00',
                    '10:30',
                    '11:00',
                    '11:30',
                    '12:00',
                    '12:30',
                    '13:00',
                    '13:30',
                    '14:00',
                    '14:30',
                    '15:00',
                    '15:30',
                    '16:00',
                    '16:30',
                    '17:00',
                    '17:30',
                    '18:00',
                    '18:30',
                    '19:00',
                    '19:30',
                    '20:00',
                    '20:30',
                    '21:00',
                    '21:30',
                    '22:00',
                    '22:30',
                    '23:00',
                    '23:30',
                ],
            }
        },
        methods: {
            getTiming(n) {
                if (n < 10) {
                    return '0' + n;
                } else {
                    return n
                }
            },
            submitForm() {
                const $this = this;
                let form = _.cloneDeep(this.form);
                form.day = form.day.id;
                this.axios.post('/c_panel/appointment', form).then((res) => {
                    this.form = {
                        day: null,
                        from: null,
                        to: null
                    };
                    setTimeout(function () {
                        // $this.success = false;
                        // $this.$router.push('/food-plan');
                    }, 2000);
                }).catch((error) => {
                    this.loading = false;
                    if (error.response) {
                        if (error.response.status === 422) {
                        }
                    }
                });
            },

        },
        mounted() {
            // this.axios.get('c_panel/appointment',)
            //     .then(response => (this.appointment = response.data.data[0]))
        }
    }
</script>
<style lang="scss" scoped>
    thead {
        tr th {
            background-color: #EFF2F7;
            color: #555F6B;
        }
    }

    tbody {
        td {
            border-color: #C0CCDA;
        }

        tr:nth-child(even) td {
            background-color: #fff;
        }

        tr:nth-child(odd) td {
            background-color: #F9FAFC;
        }
    }

</style>
