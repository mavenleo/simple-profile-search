<script>
export default {
  name: 'User',
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    changeUserStatus() {
      this.$emit('marked', true)
      this.$forceUpdate()
    },
  },

  render(createElement, context) {
    return (
      <li key={this.user.email} class="user-profile list-item d-flex">
        <div class="user-picture">
          <img src={this.user.avatar} alt="" />
        </div>

        <div class="flex-grow-1 px-3 py-2">
          <span
            class="float-right text-muted small"
            domPropsInnerHTML={this.user.email}
          />
          <h5 domPropsInnerHTML={this.user.name}></h5>
          <h6
            class="font-weight-bold text-muted m-0"
            domPropsInnerHTML={this.user.title}
          />

          <p
            class="text-muted border-bottom pb-2 small"
            domPropsInnerHTML={`${this.user.address}, ${this.user.city}`}
          />

          <div class="mt-auto mt-sm-3">
            <a href="#" onClick={this.changeUserStatus}>
              <h6 class="m-0 profile-action">
                {this.user.marked ? 'SKIP SELECTION' : 'MARK AS SUITABLE'}
              </h6>
            </a>
          </div>
        </div>
      </li>
    )
  },
}
</script>

<style scoped lang="scss">
.user-profile {
  background: #fafafa;
  height: 134px;
  border-radius: 5px;
  margin-bottom: 24px;
  overflow: hidden;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.05), 0 2px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    border: 1px solid #4765ff;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  .user-picture {
    height: 100%;
    width: 130px;
    background: #ccc;
    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .profile-action {
    color: #009688;
  }
}
</style>
