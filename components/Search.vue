<script>
import { debounce } from 'lodash'
import StateMixin from '../mixins/StateMixin'

export default {
  name: 'Search',
  mixins: [StateMixin],
  data() {
    return {
      search: '',
    }
  },
  watch: {
    deep: true,
    search: debounce(function (query = '') {
      this.$store.dispatch('filterUsers', query).then(() => {
        const path = query ? `/search/${query}` : '/'
        this.$router.push({ path })
      })
    }, 1000),
  },
  mounted() {
    this.search = this.$route.params.query || ''

    this.$refs.searchInput.focus()
  },

  render(createElement, context) {
    return (
      <section class="mb-2">
        <div class="form-group search-bar rounded">
          <div class="d-flex align-items-center">
            <div class="p-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.54"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.502 11H11.708L11.432 10.726C12.407 9.58897 13 8.11497 13 6.49997C13 2.90997 10.09 -3.24249e-05 6.5 -3.24249e-05C2.91 -3.24249e-05 0 2.90997 0 6.49997C0 10.09 2.91 13 6.5 13C8.115 13 9.588 12.408 10.725 11.434L11.001 11.708V12.5L15.999 17.491L17.49 16L12.502 11ZM6.5 11C4.014 11 2 8.98597 2 6.49997C2 4.01497 4.014 1.99997 6.5 1.99997C8.985 1.99997 11 4.01497 11 6.49997C11 8.98597 8.985 11 6.5 11Z"
                  fill="black"
                />
              </svg>
            </div>

            <div class="flex-grow-1">
              <input
                ref="searchInput"
                vModel={this.search}
                type="text"
                class="search-bar-input border-0"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      </section>
    )
  },
}
</script>

<style scoped lang="scss">
.search-bar {
  border: none;
  outline: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
  & * {
    background: #fafafa;
  }
  &-input {
    width: 100%;
    &::placeholder {
      color: #999;
    }
    &:focus {
      outline: none;
    }
  }
}
</style>
