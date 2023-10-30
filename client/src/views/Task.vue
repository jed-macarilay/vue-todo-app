<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <Message
      :show-message="showMessage"
      :message="message"
      :status="messageStatus"
      @close-message-modal="showMessage = false"
    />
    <div class="max-w-md w-full mx-4 bg-stone-900 shadow-lg rounded-lg p-6 text-left text-white divide-y">
        <TaskForm @add-task="insertTask" />
        <TaskList
          :tasks="tasks"
          @edit-task="updateTask"
          @delete-task="deleteTask"
        />
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import axios from 'axios'
  import TaskForm from '../components/TaskForm.vue'
  import TaskList from '../components/TaskList.vue'
  import Message from '../components/Message.vue'

  const tasks = ref([])
  const showMessage = ref(false)
  const message = ref('')
  const messageStatus = ref('')

  onMounted(() => {
    fetchTasks()
  })
  
  function fetchTasks() {
    axios
      .get('http://localhost:3030/api/todos')
      .then((response) => {
        tasks.value = response.data
      })
      .catch((error) => {
        showMessage.value = true
        message.value = error.response.data.error_message
      })
  }

  function insertTask(createTaskMessage) {
    fetchTasks()
    showMessage.value = true
    message.value = createTaskMessage
  }

  function updateTask(task) {
    axios
      .put(`http://localhost:3030/api/todos/${task.id}`, {
        todo: task.todo,
        mark_done: true,
      })
      .then((response) => {
        showMessage.value = true
        message.value = response.data.message
        fetchTasks()
      })
      .catch((error) => {
        showMessage.value = true
        message.value = error.response.data.error_message
      })
  }

  function deleteTask(id) {
    axios
      .delete(`http://localhost:3030/api/todos/${id}`)
      .then((response) => {
        fetchTasks()
        showMessage.value = true
        message.value = response.data.message
      })
      .catch((error) => {
        showMessage.value = true
        message.value = error.response.data.error_message
      })
  }
</script>

