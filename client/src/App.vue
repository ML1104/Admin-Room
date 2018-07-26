<template>
  <div id="app">
    <p v-if="error" class="error">Couldn't load articles</p>
    <table>
      <tr>
        <th>title</th>
        <th>category</th>
        <th>author</th>
      </tr>
      <Article v-for="row in db" :key="row.id" :article="row"></Article>
    </table>
  </div>
</template>

<script>
import Article from './components/Article.vue'
export default {
  name: 'app',
  components: {
    Article
  },
  data() {
    return {
      error: true,
      socket: "",
      db: {}
    }
  },
  mounted() {
    this.socket = new WebSocket('ws://localhost:2607');
    this.socket.addEventListener('error', this.socketError);
    this.socket.addEventListener('open', this.socketOpen);
    this.socket.addEventListener('close', this.socketClose);
    this.socket.addEventListener('message', this.socketMessage);
  },
  methods: {
    socketError(message) {
      console.log('Error message:', message);
    },
    socketOpen(message) {
      console.log('On open message:', message);
    },
    socketClose(message) {
      console.log('On close message:', message);
    },
    socketMessage(message) {
      console.log("Message is here");
      this.db = JSON.parse(message.data);
      this.error = false;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

table tr th, table tr td {
  padding: 5px;
}

.error {
  padding: 10px;
  margin: 5px;
  border: 1px solid darkred;
}
</style>
