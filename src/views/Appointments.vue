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
                    <datetime id="from" type="time"
                              class="theme-purple bg-transparent"
                              placeholder="From" v-model="form.from" use12-hour>
                    </datetime>
                </td>
                <td class="border-b px-4 py-6 4xl:py-4 3sm:px-2 3sm:text-xs">
                    <datetime id="to" type="time"
                              class="theme-purple bg-transparent"
                              placeholder="To" v-model="form.to" use12-hour>
                    </datetime>
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


                ]
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
                const $from = new Date(form.from);
                const Fromampm = $from.getHours() >= 12 ? 'pm' : 'am';
                const $hoursFrom = ($from.getHours() > 12 || $from.getHours() === 0) ? ($from.getHours() === 0 ? 12 : $from.getHours() - 12) : $from.getHours();
                form.from = this.getTiming($hoursFrom) + ':' + this.getTiming($from.getMinutes()) + ' ' + Fromampm;
                const $to = new Date(form.to);
                const ampmTo = $to.getHours() >= 12 ? 'pm' : 'am';
                const $hoursTo = ($to.getHours() > 12 || $to.getHours() === 0) ? ($to.getHours() === 0 ? 12 : $to.getHours() - 12) : $to.getHours();
                form.to = this.getTiming($hoursTo) + ':' + this.getTiming($to.getMinutes()) + ' ' + ampmTo;
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
            }
        },
        // mounted() {
        //     this.axios.get('c_panel/appointment',)
        //         .then(response => (this.appointment = response.data.data[0]))
        // }
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
