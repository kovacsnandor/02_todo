class Todo {
  constructor(name) {
    this.name = name;
    this.completed = false;
    this.editing = false;
  }
}

var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
    filter: "all",
    newTodoName: null,
    completedOnOff: false,
    editingTodoName: null,
    todoCollection: [],
    url: "http://localhost:3000/todos",
    urlAuth: "http://localhost:4000",
    errorMessage: null,
    userName: null,
    password: null,
    accessToken: null,
    refreshToken: null,
    userId: 0,
    number: 0,
    loginSuccess: 0,
    loginError: 0,
  },
  async mounted() {
    this.getTodos();
  },
  methods: {
    loginErrorMessage(){
      console.log("error message");
      this.loginError = 1;
      setTimeout(()=>{
        this.loginError = 0;
      }, 3000);
    },
    async login() {
      const url = `${this.urlAuth}/login`;
      const user = {
        userName: this.userName,
        password: this.password
      };
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      try {
        this.errorMessage = null;
        const response = await fetch(url, config);
        if (!response.ok) {
          this.errorMessage = "Server error1";
          return;
        }
        const data = await response.json();
        console.log("login", data);
        if (data.success) {
          //sikeres bejelentkezés
          this.loginSuccess = data.success;
          this.accessToken = data.data.accessToken;
          this.refreshToken = data.data.refreshToken;
          this.userId = data.data.userId;
          this.number = data.data.number;
          this.loginSuccess = data.success;
          this.getTodos();
        }else{
          //sikertelen bejelenkezés
          this.loginErrorMessage();
        }
      } catch (error) {
        this.errorMessage = `Server error`;
      }
    },
    logout() {
      this.clearUserdata();
    },
    clearUserdata(){
      this.userName = null;
      this.password = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.userId = 0;
      this.number = 0;
      this.loginSuccess = 0;
    },
    async getTodos() {
      const config= {
        method: "GET",
        headers: {Authorization: `Bearer ${this.accessToken}`}
      }
      try {
        this.errorMessage = null;
        const url = `${this.url}/${this.userId}`;
        const response = await fetch(url, config);
        if (!response.ok) {
          this.errorMessage = "Server error1";
          return;
        }
        data = await response.json();

        if (data.success == -10) {
          //rossz, vagy lejárt token
          this.clearUserdata();
          return;
        }
        if (data.success != 1) {
          this.errorMessage = `Server error2`;
          return;
        }
        this.todoCollection = data.data;
      } catch (error) {
        this.errorMessage = `Server error`;
      }
    },
    async postTodo() {
      const newTodo = {
        name: this.newTodoName,
        completed: 0,
        userId: this.userId
      };
      const config = {
        method: "POST",
        headers: {
          headers: {Authorization: `Bearer ${this.accessToken}`},
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      };
      try {
        this.errorMessage = null;
        const response = await fetch(this.url, config);
        if (!response.ok) {
          this.errorMessage = "Server error1";
          return;
        }
        this.getTodos();
      } catch (error) {
        this.errorMessage = `Server error`;
      }
    },
    async putTodo(todo) {
      const id = todo.id;
      const newTodo = {
        name: todo.name,
        completed: todo.completed ? 1 : 0,
        userId: this.userId
      };
      const config = {
        method: "PUT",
        headers: {
          headers: {Authorization: `Bearer ${this.accessToken}`},
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      };

      try {
        this.errorMessage = null;
        const url = `${this.url}/${id}`;
        const response = await fetch(url, config);
        if (!response.ok) {
          this.errorMessage = "Server error1";
          return;
        }
        this.getTodos();
      } catch (error) {
        this.errorMessage = `Server error`;
      }
    },
    async deleteTodo() {
      const config = {
        headers: {Authorization: `Bearer ${this.accessToken}`},
        method: "DELETE"
      };
      try {
        this.errorMessage = null;
        const response = await fetch(this.url, config);
        if (!response.ok) {
          this.errorMessage = "Server error1";
          return;
        }
        this.getTodos();
      } catch (error) {
        this.errorMessage = `Server error`;
      }
    },
    onClickCompleted(index) {
      console.log(index);
      const todo = this.todoCollection[index];
      this.putTodo(todo);
    },
    async onDblClickTodoName(todo, index) {
      //Ha már pipált, ne lehseen editálni
      if (todo.completed) {
        return;
      }
      todo.editing = true;
      this.editingTodoName = todo.name;
      //megvárja, amíg a dom teljesen frissült
      await this.$nextTick();
      //Az index-edik inputx-el jelölt elemet teszi fókuszba
      this.$refs.todoNames[index].focus();
    },
    OnEnterTodoName(todo) {
      todo.editing = false;
      //Csak akkor tároljuk, ha nem üres
      if (this.editingTodoName) {
        todo.name = this.editingTodoName;
        this.putTodo(todo);
      }
      this.editingTodoName = null;
    },
    OnCancelTodoName(todo) {
      todo.editing = false;
      this.editingTodoName = null;
    },
    OnEnterAddTodo() {
      if (this.newTodoName) {
        this.postTodo();
        this.newTodoName = "";
      }
    },
    OnClickAllDone() {
      //A filter csak azért kell, hogy mindegyiken végigmenjen
      //lehetne foreach-el is
      this.completedOnOff = !this.completedOnOff;
      let completed = this.completedOnOff;
      this.todoCollection.filter(function (todo) {
        todo.completed = completed;
      });
    },
    SetFilter(filter) {
      this.filter = filter;
      console.log(this.filter);
    },
    OnClickRemoveCompleted() {
      // this.todoCollection = this.todoCollection.filter(function(todo){
      //     return !todo.completed;
      // });
      this.deleteTodo();
    },
    GetFilterButtonClass(filter) {
      return {
        "btn-outline-secondary": filter != this.filter,
        "btn-secondary": filter == this.filter,
      };
    },
  },
  computed: {
    counter() {
      return this.todoCollection.length;
    },

    items() {
      return this.counter > 1 ? "items" : "item";
    },
    filteredTodoCollection() {
      //A this-t fére kell teni, mert a belső függvényben az már mást jelent
      let vm = this;
      return this.todoCollection.filter(function (todo) {
        switch (vm.filter) {
          case "all":
            return true;
          case "active":
            return !todo.completed;
          case "completed":
            return todo.completed;
        }
      });
    },
  },
});
