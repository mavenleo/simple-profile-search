import { mapGetters } from 'vuex'

export default {
  mounted() {
    if (!this.allUsers.length) {
      this.$store.dispatch('getUsers')
    }
  },

  computed: {
    ...mapGetters({
      allUsers: 'allUsers',
      users: 'filteredUsers',
      loadingState: 'loadingState',
    }),
  },
}
