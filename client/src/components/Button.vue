<script lang="tsx">
import { defineComponent, ref } from 'vue';

const Button = defineComponent({
  setup() {
    const count = ref(0);
    return {
      count,
    };
  },
  render() {
    return (
      <button onClick={() => this.count++}>
        Count is {this.count}
      </button>
    );
  }
});

export default Button;
</script>
