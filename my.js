class Todo {
    constructor(name) {
        this.name = name;
        this.completed = false;
        this.editing = false;
    }
}

var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      newTodoName: null,
      todoCollection: [
          new Todo("todo 1"),
          new Todo("todo 2"),
          new Todo("todo 3"),
          new Todo("todo 4")
      ]
    },
    methods: {
        onDblClickTodoName(todo){
            todo.editing = true;
        },
        OnEnterTodoName(todo){
            todo.editing = false;
        },
        OnEnterAddTodo(){
            if (this.newTodoName) {
                this.todoCollection.push(new Todo(this.newTodoName));
                this.newTodoName = "";
            }
        },
    }
  })