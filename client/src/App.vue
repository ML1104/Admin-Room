<template>
  <div id="app">
    <p v-if="error" class="error">Couldn't load articles</p>
    <router-link to="/add"><button>Add New Article</button></router-link>
    <router-view @addNew="addArticle"></router-view>
    <table>
      <tr>
        <th>id</th>
        <th>title</th>
        <th>category</th>
        <th>author</th>
        <th>options</th>
      </tr>
      <Article @delete="deleteArticle" v-for="row in db" :key="row.id" :article="row"></Article>
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
      db: []
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
      // eslint-disable-next-line
      console.log('Error message:', message);
    },
    socketOpen(message) {
      // eslint-disable-next-line
      console.log('On open message:', message);
    },
    socketClose(message) {
      // eslint-disable-next-line
      console.log('On close message:', message);
    },
    socketMessage(message) {
      // eslint-disable-next-line
      console.log("Message is here");
      let response = JSON.parse(message.data);
      if (response.type == 'db') {
        this.db = response.data;
        this.error = false;
      } 
      
    },
    addArticle(info) {
        let addition = {
          type: 'add',
          data: JSON.stringify(info)
        }
        this.socket.send(JSON.stringify(addition));
    },
    deleteArticle(index) {
      this.db.forEach((el, key) => {
        if (el.id === index) {
          this.db.splice(key, 1);
        }
      });
      let deletion = {
        type: 'deletion',
        data: index
      }
      this.socket.send(JSON.stringify(deletion));
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
