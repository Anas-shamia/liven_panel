<template>
    <div class="flex items-center justify-center">
        <div class="fixed inset-0 overlay flex items-center justify-center z-2" @click.self="$emit('close')">
            <div class="w-1/4 2xl:w-1/3 3sm:w-full 3sm:mx-4 bg-white-900 mx-auto flex items-center justify-center rounded-lg custom-shadow px-12 py-8 3sm:px-4 3sm:py-5">
                <div class="w-full">
                    <h3 class="text-blue-900 text-2xl 4xl:text-lg mb-6 flex items-center">
                        <span class="flex-grow">Upload CGM File</span>
                        <img class="w-4 cursor-pointer" src="@/assets/img/close.svg" alt="close"
                             @click="$emit('close')">
                    </h3>
                    <ValidationObserver ref="AddFile">
                        <form @submit.prevent="handleSubmit">
                            <ValidationProvider tag="div" vid="import_file" ref="import_file" name="import_file"
                                                rules="required"
                                                v-slot="{ errors }">
                                <div class="relative mx-auto text-center border-2 border-dashed border-gray-400 py-4">
                                    <button class="btn mx-auto w-1/4">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                             data-icon="file-upload"
                                             role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                                             class="svg-inline--fa fa-file-upload w-full">
                                            <path fill="#D1D5D9"
                                                  d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"
                                                  class=""></path>
                                        </svg>
                                    </button>
                                    <span class="block">{{fileName}}</span>
                                    <input type="file" class="absolute inset-0 opacity-0 w-full" @change="onFileChange"
                                           accept=".xls,.csv">
                                </div>
                                <p class="message-danger">{{ errors[0] }}</p>
                            </ValidationProvider>
                            <button type="submit"
                                    class="w-full rounded bg-primary-900 text-white-900 text-lg 3sm:text-base 3sm:py-2 py-3 block text-center my-3 3sm:mb-0"
                                    :disabled="loading">
                                Upload
                            </button>
                            <div class="bg-green-100 mt-4 rounded-10px text-center" v-if="success">
                                <p class="p-3 text-base text-blue-800 font-medium">Sent Successfully</p>
                            </div>
                        </form>
                    </ValidationObserver>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['user_id'],
        data() {
            return {
                success: false,
                loading: false,
                file: null,
                form: {
                    user_id: this.user_id,
                    import_file: null,
                },
                fileName: '',
            }
        },
        methods: {
            handleSubmit() {
                const $this = this;
                this.$refs['AddFile'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        const formData = new FormData();
                        formData.append('user_id', this.form.user_id);
                        formData.append('import_file', this.file);
                        this.axios.post('/c_panel/diabetes/upload/cgm', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then((res) => {
                            this.success = true;
                            this.loading = false;
                            this.form = {
                                import_file: null,
                            };
                            setTimeout(function () {
                                $this.success = false;
                                $this.$emit('close');
                                location.reload();
                            }, 2000);
                            this.$refs['AddFile'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.$refs['AddFile'].setErrors(error.response.data.errors);
                                }
                            }
                        });
                    }
                });
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                const $file = files[0];
                this.file = $file;
                this.fileName = this.file.name;
                this.$refs.import_file.validate(e);
                this.createInput($file);
            },
            createInput(file) {
                const reader = new FileReader();
                const vm = this;
                reader.onload = (e) => {
                    vm.form.import_file = e.target.result;
                };
                reader.readAsDataURL(file);

            }
        }
    }
</script>
<style lang="scss">
    .form-group label,
    .form-group textarea {
        color: #A0AEC0;
    }

    .v-select.form-control {
        border-bottom: 1px solid #D6D6D6;
    }

</style>
