<!-- <template>
  <div id="app">
    <h1>Vue.js To-Do App</h1>
    <form @submit.prevent="addTodo()">
      <input v-model="newTodo.name" placeholder="Add a new To-Do" />
      <button class="btn" type="submit">Add</button>
    </form>
    <ul>
      <li class="list" v-for="todo in todos" :key="todo.id">
        <span>{{ todo.name }}</span>
        <button class="delete-btn" @click="deleteTodo(todo.name)">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      todos: [],
      newTodo: {
        name: "",
        completed: false,
      },
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await axios.get("http://localhost:5000/todos");
        this.todos = response.data; 
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },

    async addTodo() {
      if (!this.newTodo.name) return;

      try {
        const response = await axios.post(
          "http://localhost:5000/todos",
          this.newTodo
        );
        this.todos.push(response.data); 
        this.newTodo.name = ""; 
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },

    async deleteTodo(name) {
      try {
        await axios.delete(`http://localhost:5000/todos/${name}`);
        this.todos = this.todos.filter((todo) => todo.name !== name);
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
    async updateTodo(name) {
      try {
        await axios.put(`http://localhost:5000/todos/${name}`);
        this.todos = this.todos.filter((todo) => todo.name !== name);
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 60px;
}
form input {
  padding: 10px;
  margin-right: 10px;
}
form button {
  padding: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
  width: 25vw;
}
li {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  /* flex-direction: column; */
  align-items: center;
  gap: 3rem;
  margin: 10px 0;
}
.btn {
  background-color: rgb(40, 218, 37);
  cursor: pointer;
  border: none;
  width: 5rem;
  color: rgb(0, 0, 0);
  border-radius: 0.3rem;
}
.btn:active {
  background-color: rgb(15, 204, 12);
}
button {
  width: 120%;
  margin: 2px;
}
.delete-btn {
  background-color: rgb(218, 55, 37);
  border: none;
  cursor: pointer;
  width: 5rem;
  height: 2rem;
  color: rgb(237, 237, 237);
  border-radius: 0.3rem;
}
.delete-btn:active {
  background-color: rgb(220, 26, 4);
}
</style> -->

<!-- ======================================== TODO APP ========================================== -->

<template>
  <div id="app">
    <h1>Marketplace</h1>
    <form @submit.prevent="addProd()">
      <input v-model="newProd.name" placeholder="Add a new Product" />
      <input v-model="newProd.price" placeholder="Enter Price" />
      <input v-model="newProd.desc" placeholder="Enter Description" />
      <button class="btn" type="submit">Add Product</button>
    </form>
    <button class="update-btn" @click="updateProduct()">Update Product</button>

    <ul>
      <li class="list" v-for="item in productlist" :key="item.id">
        <span class="dummyimg"></span>
        <span class="name">{{ item.name }}</span>
        <span>{{ item.price }}$</span>
        <span>{{ item.desc }}</span>
        <button class="delete-btn" @click="deleteProd(item.name)">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      productlist: [],
      newProd: {
        name: "",
        price: 0,
        desc: "",
      },
    };
  },
  created() {
    this.fetchProd();
  },
  methods: {
    async fetchProd() {
      try {
        const response = await axios.get("http://localhost:5000/products");
        this.productlist = response.data;
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    },
    async updateProduct() {
  const oldName = this.newProd.name; // Get the name from input
  const updatedProduct = {
    name: this.newProd.name,
    price: this.newProd.price,
    desc: this.newProd.desc,
  };
// ============================================= Updating Products =============================================
  try {
    const res = await fetch(`http://localhost:5000/products/${oldName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();
    console.log("Update success:", data);
    this.fetchProd(); // Refresh list
  } catch (error) {
    console.error("Error updating product:", error);
  }
}
,

// ========================================= New Product =========================================

    async addProd() {
      if (!this.newProd.name) return;

      try {
        const response = await axios.post(
          "http://localhost:5000/products",
          this.newProd
        );
        this.productlist.push(response.data);
        this.newProd.name = "";
        this.newProd.price = "";
        this.newProd.desc = "";
        this.fetchProd();
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },

    // ====================================== Deleting Product ======================================

    async deleteProd(name) {
      try {
        await axios.delete(`http://localhost:5000/products/${name}`);
        this.productlist = this.productlist.filter(
          (prod) => prod.name !== name
        );
        this.fetchProd();
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 60px;
}
form input {
  padding: 10px;
  margin-right: 10px;
}
form button {
  padding: 10px;
}
ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  list-style-type: none;
  gap: 2rem;
  padding: 0;
  width: 80vw;
}
.dummyimg {
  border-radius: 0.3rem;
  height: 9rem;
  width: 100%;
  background-color: rgb(231, 231, 231);
}
.name {
  font-weight: bold;
  font-size: 20px;
}
li {
  border-radius: 0.3rem;
  background: #f9f9f9;
  /* border: 2px solid green; */
  display: flex;
  padding: 0.5rem 0.5rem;
  justify-content: space-between;
  /* align-items: center; */
  flex-direction: column;
  align-items: left;
  gap: 0.2rem;
  margin: 10px 0;
}
.btn {
  background-color: rgb(40, 218, 37);
  cursor: pointer;
  border: none;
  width: 8rem;
  color: rgb(0, 0, 0);
  border-radius: 0.3rem;
}
.update-btn{
  background-color: rgb(218, 218, 37);
  cursor: pointer;
  border: none;
  height: 2rem;
  margin: 1rem 0rem;
  width: 8rem;
  color: rgb(0, 0, 0);
  border-radius: 0.3rem;
}
.btn:active {
  background-color: rgb(15, 204, 12);
}
button {
  width: 120%;
  margin: 2px;
}
.delete-btn {
  background-color: rgb(218, 55, 37);
  border: none;
  cursor: pointer;
  width: 5rem;
  height: 2rem;
  color: rgb(237, 237, 237);
  border-radius: 0.3rem;
}
.delete-btn:active {
  background-color: rgb(220, 26, 4);
}
</style>
