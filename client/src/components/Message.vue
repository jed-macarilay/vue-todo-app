<template>
  <div
    v-show="props.showMessage"
    :class="`grid grid-cols-2 text-grey-600 bg-grey-400 w-full max-w-md rounded-full border-4 border-black p-5 mb-5`"
  >
    <div>
      {{ props.message }}
    </div>
    <button class="text-right" @click="emits('closeMessageModal')">x</button>
  </div>
</template>

<script setup>
  const props = defineProps([
    'message',
    'showMessage',
  ])

  const emits = defineEmits('closeMessageModal')
</script>