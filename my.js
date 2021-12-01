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
        filter: "all",
        newTodoName: null,
        todoCollection: [
            new Todo("todo 1"),
            new Todo("todo 2"),
            new Todo("todo 3"),
            new Todo("todo 4")
        ]
    },
    methods: {
        onDblClickTodoName(todo) {
            todo.editing = true;
        },
        OnEnterTodoName(todo) {
            todo.editing = false;
        },
        OnEnterAddTodo() {
            if (this.newTodoName) {
                this.todoCollection.push(new Todo(this.newTodoName));
                this.newTodoName = "";
            }
        },
        OnClickAllDone() {
            //A filter csak azért kell, hogy mindegyiken végigmenjen
            //lehetne foreach-el is
            this.todoCollection.filter(function (todo) {
                todo.completed = true;
            });
        },
        SetFilter(filter){
            this.filter = filter;
            console.log(this.filter);
        },
        OnClickRemoveCompleted(){
            this.todoCollection = this.todoCollection.filter(function(todo){
                return !todo.completed;
            });
        },
        GetFilterButtonClass(filter){
            return {
                "btn-outline-secondary" : filter != this.filter,
                "btn-secondary" : filter == this.filter
            }
        }
    },
    computed: {
        counter() {
            return this.todoCollection.length;
        },

        items() {
            return this.counter > 1 ? "items" : "item";
        },
        filteredTodoCollection(){
            //A this-t fére kell teni, mert a belső függvényben az már mást jelent
            let vm = this;
            return this.todoCollection.filter(function(todo){
                switch(vm.filter){
                    case 'all':
                        return true;
                    case 'active':
                        return !todo.completed;
                    case 'completed':
                        return todo.completed;
                }
            });
        }

    }
})