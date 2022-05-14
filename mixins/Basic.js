import { mapGetters } from 'vuex'

export default {
  mounted() {
    if (this.userStore.length === 0) {
      this.$store.dispatch('getUsers')
    }
  },

  computed: {
    ...mapGetters({
      userStore: 'userStore',
      users: 'users',
      loadingUsers: 'loadingUsers',
    }),
  },
}
