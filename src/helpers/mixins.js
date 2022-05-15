export const utilityMixin = {
    data() {
        return {
            isMobile: false,
            isTablet: false,
            isDesktop: true,
            windowWidth: 0,
        }
    },
    methods: {
        openForm() {
            window.removeEventListener('click', this.closeForm)
            this.$store.state.loginFormControl = !this.$store.state.loginFormControl
            setTimeout(this.watchClickEvent, 10)
        },
        watchClickEvent() {
            if (this.$store.state.loginFormControl === true) {
                window.addEventListener('click', this.closeForm)
            }
        },
        closeForm(e) {
            if (e.target.classList.value != 'login-form') {
                this.$store.state.loginFormControl = false
                window.removeEventListener('click', this.closeForm)
            }
        },
        closeLoginForm() {
            this.$store.state.loginFormControl = false
        }
    },
    mounted() {
        this.windowWidth = window.innerWidth;
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
        }, {
            passive: true
        });
    },
    watch: {
        windowWidth(newVal) {
            if (newVal < 481) {
                this.isMobile = true;
                this.isTablet = false;
                this.isDesktop = false;
            } else if (newVal > 480 && newVal < 1024) {
                this.isMobile = false;
                this.isTablet = true;
                this.isDesktop = false;
            } else if (newVal >= 1024) {
                this.isMobile = false;
                this.isTablet = false;
                this.isDesktop = true;
            }
        }
    }
}