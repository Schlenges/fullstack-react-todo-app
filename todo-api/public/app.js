$(document).ready(() => {
  $.getJSON("/api/todos")
  .then(addTodos)

  $('#todoInput').keypress((event) => {
    if(event.which == 13) {
      createTodo();
    }
  });

  $('.list').on('click', 'span', function(){ // we have to add the click event to an element that already exists from the beginning
    removeTodo($(this).parent()); // why is event propagation not a problem here?
  })

  $('.list').on('click', 'li', function(){
    updateTodo($(this));
  })
  
});

function addTodos(todos){
  todos.forEach((todo =>{
    addTodo(todo);
  }))
};

function addTodo(todo){
  let newTodo = $(`<li class="task">${todo.name}<span>X</span></li>`);
  newTodo.data('id', todo._id); // jQuery method to add data to any element

  if(todo.completed){
    newTodo.addClass("done");
  }

  $('.list').append(newTodo);
}

function createTodo(){
  let input = $('#todoInput').val();

  $.post('/api/todos',{name: input})
  .then((newTodo) => {
    $('#todoInput').val('');
    addTodo(newTodo);
  })
  .catch((err) => {
    console.log(err);
  })
}

function removeTodo(todo){ // todo == $(this).parent()
  let id = todo.data('id');
  
  $.ajax({
    method: 'DELETE',
    url: `/api/todos/${id}`
  })
  .then((data) => {
    todo.remove();
  })
  .catch(err => {
    console.log(err);
  })
};

function updateTodo(todo){
  let id = todo.data('id');
  let done = !todo.data('completed');

  $.ajax({
    method: 'PUT',
    url: `/api/todos/${id}`,
    data: {completed: done}
  })
  .then((data) => {
    todo.toggleClass('done');
    todo.data('completed', done);
  })
  .catch(err => {
    console.log(err);
  })

};

