const APIURL = '/api/todos/';

export async function getTodos(){
  return fetch(APIURL)
    .then(response => {
      if(!response.ok){
        if(response.status >= 400 && response.status < 500){
          return response.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else{
          let err = {errorMessage: 'Please try again later, server is not responding'};
          throw err;
        }
      }
      return response.json();
    })
}

export async function createTodo(val){
  return fetch(APIURL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({name: val})
  })
  .then(response => {
    if(!response.ok){
      if(response.status >= 400 && response.status < 500){
        return response.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        })
      } else{
        let err = {errorMessage: 'Please try again later, server is not responding'};
        throw err;
      }
    }
    return response.json();
  })
}

export async function removeTodo(id){
  const deleteURL = APIURL + id;

    fetch(deleteURL, {
      method: 'delete'
    })
    .then(response => {
      if(!response.ok){
        if(response.status >= 400 && response.status < 500){
          return response.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else{
          let err = {errorMessage: 'Please try again later, server is not responding'};
          throw err;
        }
      }
      return response.json();
    })
}

export async function updateTodo(todo){
  const updateURL = APIURL + todo._id;

  return fetch(updateURL, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({completed: !todo.completed})
  })
  .then(response => {
    if(!response.ok){
      if(response.status >= 400 && response.status < 500){
        return response.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        })
      } else{
        let err = {errorMessage: 'Please try again later, server is not responding'};
        throw err;
      }
    }
    return response.json();
  })
}