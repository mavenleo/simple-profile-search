<script>
import StateMixin from '../mixins/StateMixin'
import Search from './Search'
import Loader from './Loader'
import User from './User'

export default {
  name: 'UserList',
  mixins: [StateMixin],

  methods: {
    changeUserStatus(index) {
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

        {!this.users.length && !this.loadingState && (
          <div class="text-center my-5 py-3">
            <h4 class="text-muted">No user matches this search.</h4>
          </div>
        )}

        {this.loadingState ? (
          <Loader />
        ) : (
          <ul class="user-profiles list-unstyled">
            <RecycleScroller
              class="scroller"
              items={this.users}
              item-size={158}
              key-field="email"
            >
              {({ item: user, index }) => {
                return (
                  <User
                    user={user}
                    onMarked={() => this.changeUserStatus(index)}
                  />
                )
              }}
            </RecycleScroller>
          </ul>
        )}
      </section>
    )
  },
}
</script>

<style lang="scss">
body {
  font-family: 'Roboto', sans-serif;
  background-color: #eee;
  margin: 0;
  padding: 0;
}

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

.text-highlight {
  background: #fff73b;
}
</style>
