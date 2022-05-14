<script>
export default {
  name: 'Loader',

  render(createElement, context) {
    return (
      <div class="d-block text-center my-5 py-3">
        <span class="spinner-border-md text-primary spinner-border" />
      </div>
    )
  },
}
</script>
