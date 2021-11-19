<script>
import { h } from 'vue'

export default {
  props: {
    tag: {
      type: String,
      default: 'button',
    },
  },
  setup(props, { slots, attrs }) {
    // return the render function
    return () => h(`${props.tag}`, attrs, slots)
  },
}
</script>
