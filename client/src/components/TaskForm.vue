<template>
  <div
    class="p-3"
    @submit.prevent="insertTask(todo)"
  >
    <h2 class="text-2xl font-bold mb-4">To do</h2>
    <form class="text-left">
      <input
        v-model="todo"
        type="text"
        class="text-black border-2 border-black focus:outline-none rounded-md px-3 py-2"
        required
      >
      <button
        type="submit"
        class="bg-red-600 text-white px-3 py-2 rounded-md ml-2"
      >Add Task</button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import axios from 'axios'

  const emits = defineEmits(['addTask'])
  const todo = ref('')

  function insertTask(task) {
    axios
      .post('http://localhost:3030/api/todos', {
        todo: task,
        mark_done: false,
      })
      .then((response) => {
        emits('addTask', response.data.message)
        todo.value = ''
      })
      .catch((error) => console.log(error))
  }
</script>