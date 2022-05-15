<script>
import StateMixin from '../mixins/StateMixin'
import Search from './Search'
import Loader from './Loader'
import User from './User'

export default {
  name: 'UserList',
  mixins: [StateMixin],

  methods: {
    markUserAsSuitable(index) {
      this.users[index].marked = !this.users[index].marked
    },
  },

  render(createElement, context) {
    return (
      <section class="users">
        <div>
          <Search />
          <div class="d-flex justify-content-end">
            <small class="font-italic text-muted">
              Total users found: <strong>{this.users.length}</strong>
            </small>
          </div>
        </div>

        {this.users.length === 0 && !this.loadingState && (
          <div class="text-center my-5 py-3">
            <h4 class="text-muted">No user matches this search.</h4>
          </div>
        )}

        {this.loadingState ? (
          <Loader />
        ) : (
          <ul class="user-profiles list-unstyled">
            <RecycleScroller
              scopedSlots={{
                default: ({ item: user, index }) => {
                  return (
                    <User
                      user={user}
                      onMarked={() => this.markUserAsSuitable(index)}
                    />
                  )
                },
              }}
              class="scroller"
              items={this.users}
              item-size={158}
              key-field="email"
            />
          </ul>
        )}
      </section>
    )
  },
}
</script>

<style lang="scss">
.users {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 24px 24px;
  max-width: 650px;
  width: 100%;
  min-width: 300px;
  margin: 30px auto;
  height: calc(100% - 60px);
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  .user-profiles {
    overflow: auto;
    flex-grow: 1;
    height: 100%;

    .scroller {
      height: inherit;
    }
  }
}
</style>
