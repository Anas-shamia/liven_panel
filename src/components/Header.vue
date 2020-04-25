<template>
    <div class="bg-primary-900 py-4 2md:py-2 header relative z-9">
        <div class="container-content flex items-center">
            <div @click="toggleMenu"
                 class="menu-icon md:bg-transparent hidden 2lg:block z-6"
                 :class="menuOpen?'active':''">
                <div>
                    <div class="table mx-auto menu-lines">
                        <span class="block w-6 h-2px bg-white-900"></span>
                        <span class="block w-6 h-2px bg-white-900 mt-1"></span>
                        <span class="block w-6 h-2px bg-white-900 mt-1"></span>
                    </div>
                </div>
            </div>
            <header class="flex items-center flex-grow">
                <a href="/users" class="mr-24 3lg:mr-12 md:mr-8 bg-transparent 2md:mr-0 header-logo">
                    <img class="w-16 2md:w-12 2md:mx-auto" src="@/assets/img/main-logo.png" alt="logo">
                </a>
                <div class="menu">
                    <ul class="flex items-center flex-grow">
                        <router-link tag="li"
                                     class="cursor-pointer text-white-900 text-xl 4xl:text-lg 3lg:text-base mr-12 3lg:mr-6 md:mr-2 "
                                     to="/users" exact>
                            <span class="block py-2 px-10 md:px-6 md:py-1">Users</span>
                        </router-link>
                        <router-link tag="li"
                                     class="cursor-pointer text-white-900 text-xl 4xl:text-lg 3lg:text-base mr-12 3lg:mr-6 md:mr-2 "
                                     to="/tickets" exact>
                            <span class="block py-2 px-10 md:px-6 md:py-1">Tickets</span>
                        </router-link>
                        <router-link tag="li" v-if="user === 'admin'"
                                     class="cursor-pointer text-white-900 text-xl 4xl:text-lg 3lg:text-base mr-12 3lg:mr-6 md:mr-2 "
                                     to="/dietician" exact>
                            <span class="block py-2 px-10 md:px-6 md:py-1">Dietician</span>
                        </router-link>
                        <router-link tag="li" v-if="user === 'admin'"
                                     class="cursor-pointer text-white-900 text-xl 4xl:text-lg 3lg:text-base mr-12 3lg:mr-6 md:mr-2 "
                                     to="/advices" exact>
                            <span class="block py-2 px-10 md:px-6 md:py-1">Advices</span>
                        </router-link>
                        <router-link tag="li" v-if="user === 'dietitian'"
                                     class="cursor-pointer text-white-900 text-xl 4xl:text-lg 3lg:text-base mr-12 3lg:mr-6 md:mr-2 "
                                     to="/appointments" exact>
                            <span class="block py-2 px-10 md:px-6 md:py-1">Appointments</span>
                        </router-link>
                    </ul>
                </div>
            </header>
            <div class="relative inline-block">
                <p class="flex items-center cursor-pointer text-white-900 text-lg 4xl:text-base 3lg:text-base md:text-sm  3sm:py-0 3sm:px-0 bg-purple-200 rounded-full 2md:bg-transparent py-2 px-6"
                   @click="openMenu()">
                    <span class="2md:hidden">Liven {{user_name}}</span>
                    <span class="bg-primary-900 rounded-full h-4 w-4 flex items-center justify-center ml-3 2md:hidden">
                        <img src="@/assets/img/chevron-down.svg" alt="icon">
                    </span>
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="user-circle" role="img"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"
                         class="svg-inline--fa fa-user-circle hidden 2md:block 2md:w-6">
                        <path fill="currentColor"
                              d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"
                              class=""></path>
                    </svg>
                </p>
                <ul class="absolute inset-x-0 bg-white-900 rounded-lg mt-2 dropdown-menu" :class="open? 'active':''">
                    <li class="py-2 px-4">
                        <a class="text-base font-bold text-black-600 cursor-pointer" @click="logout()">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                open: false
            }
        },
        computed: {
            menuOpen() {
                return this.$store.state.menuOpen;
            },
            user() {
                return localStorage.getItem('user') ? localStorage.getItem('user') : null;
            },
            user_name() {
                return localStorage.getItem('user_name') ? localStorage.getItem('user_name') : null;
            }
        },
        methods: {
            toggleMenu() {
                //this.menuOpen = !this.menuOpen;
                this.$store.dispatch('getOpenMenu', !this.$store.state.menuOpen);
                if (this.$store.state.menuOpen === true) {
                    document.getElementsByTagName('body')[0].classList.add('active-menu');
                } else {
                    document.getElementsByTagName('body')[0].classList.remove('active-menu');
                }
            },
            closeMenu() {
                this.$store.dispatch('getOpenMenu', false);
                this.$store.dispatch('getCallOpen', false);
                this.$store.dispatch("getMealShow", false);
                document.getElementsByTagName('body')[0].classList.remove('active-menu');
            },
            openMenu() {
                this.open = !this.open;
            },
            logout() {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('user_name');
                this.$router.push('/login');
            }
        },
        watch: {
            '$route': function ($val) {
                this.closeMenu();
                if ($val.path === '/') {
                    document.getElementsByTagName('body')[0].classList.add('product-details');
                } else {
                    document.getElementsByTagName('body')[0].classList.remove('product-details');
                }
            }
        },
    }
</script>
<style scoped lang="scss">
    .header {
        filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.16));
    }

    .dropdown-menu {
        transform: scaleY(0);
        transform-origin: top;
        transition: all 0.25s ease;

        &.active {
            transform: scaleY(1);
        }
    }

    .menu-icon {
        cursor: pointer;

        .menu-lines {
            > span {
                transition: all 0.25s ease;
            }
        }

        &.active {
            .menu-lines {
                min-height: 15px;

                > span {
                    transition: all 0.25s;
                    background-color: #fff;

                    &:first-child {
                        transform: rotate(45deg) translate(5px, 5px);
                    }

                    &:nth-child(2) {
                        opacity: 0;
                    }

                    &:last-child {
                        transform: rotate(-45deg) translate(2px, -3px);
                    }
                }
            }
        }
    }
</style>

