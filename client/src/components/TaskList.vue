<template>
  <div class="max-h-[32rem] p-3">
    <h2 class="font-bold">To do Task</h2>
    <ul class="max-h-80 overflow-y-auto my-3">
      <li
        v-for="task in props.tasks"
        class="bg-stone-600 p-5 rounded-lg flex justify-between mb-3"
      >
        <p :class="task.mark_done ? 'line-through' : ''">{{ task.todo }}</p>
        <div>
          <button
            :class="(task.mark_done) ? 'text-gray-500 border-zinc-800 border py-1 px-3 rounded-md mr-3' : 'text-white bg-green-600 py-1 px-3 rounded-md mr-3'"
            :disabled="task.mark_done"
            @click="emits('editTask', task)"
          >Mark as Done</button>
          <button
            class="bg-red-600 text-white py-1 px-3 rounded-md"
            @click="emits('deleteTask', task.id)"
          >x</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
  const props = defineProps(['tasks'])
  const emits = defineEmits([
    'editTask',
    'deleteTask'
  ])
</script>