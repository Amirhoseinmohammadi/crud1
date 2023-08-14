const tableContent = document.getElementById("data-show")

async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users")
  const data = await response.json()
  users = data
  renderData(users)
}

function renderData(users) {
  tableContent.innerHTML = ""
  users.forEach((user) => {
    tableContent.innerHTML += `<tr >
      <td>${user.name}</td>
       <td>${user.username}</td>
       <td>${user.email}</td>
        <td>${user.id}</td>
        <td><button id="${user.id}" class="delete-Botton">Delete</button></td>
    
     <td>
     <button  id="${user.id}" class="  edit-botton ">UserEdit</button>
     <button  id="${user.id}" class="  update">update</button>

     </td>
  `
  })

  addEventListeners(users)
}

async function deleteUser(users, id) {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
    users = users.filter((user) => +user.id !== +id)
    renderData(users)
  } catch (error) {
    console.log(error)
  }
}

async function addUser(users = []) {
  const userName = document.getElementById("userfirstname").value
  const userLastName = document.getElementById("userlastname").value
  const userEmail = document.getElementById("useremial").value

  if (userEmail == "" || userLastName == "" || userName == "") {
    return alert("iputs are required")
  }

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        username: userLastName,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
    const data = await response.json()
    users.push(data)
    renderData(users)
    document.getElementById("userfirstname").value = ""
    document.getElementById("userlastname").value = ""
    document.getElementById("useremial").value = ""
  } catch (error) {
    console.log(error)
  }
}

// function addUser(users = []) {
//   const userName = document.getElementById("userfirstname").value
//   const userLastName = document.getElementById("userlastname").value
//   const userEmail = document.getElementById("useremial").value

//   if (userEmail == "" || userLastName == "" || userName == "") {
//     return alert("iputs are required")
//   }

//   return fetch("https://jsonplaceholder.typicode.com/users", {
//     method: "POST",
//     body: JSON.stringify({
//       name: userName,
//       email: userEmail,
//       username: userLastName,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       users.push(data)
//       renderData(users)
//       document.getElementById("userfirstname").value = ""
//       document.getElementById("userlastname").value = ""
//       document.getElementById("useremial").value = ""
//     })
// }

function addEventListeners(users) {
  document.getElementById("getData").addEventListener("click", (e) => {
    e.preventDefault()
    getUsers()
  })

  document.querySelectorAll(".delete-Botton").forEach((button) => {
    button.addEventListener("click", () => {
      const getUserId = button.id
      deleteUser(users, getUserId)
    })
  })
  document.getElementById("addUser").addEventListener("click", () => {
    addUser(users)
  })

  document.querySelectorAll(".edit-botton").forEach((button) => {
    button.addEventListener("click", () => {
      const userId = button.id
      getUserInput(users, userId)
    })
  })
  document.querySelectorAll(".update").forEach((button) => {
    button.addEventListener("click", () => {
      const userId = button.id
      editUser(users, userId)
    })
  })
}

function getUserInput(users, id) {
  let edit = users.find((user) => user.id == id)
  document.getElementById("userfirstname").value = edit.name
  document.getElementById("userlastname").value = edit.username
  document.getElementById("useremial").value = edit.email
}
async function editUser(users, id) {
  const userName = document.getElementById("userfirstname").value
  const userLastName = document.getElementById("userlastname").value
  const userEmail = document.getElementById("useremial").value

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          username: userLastName,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
    const data = await response.json()
    users = users.map((user) => {
      if (user.id == id) {
        user.name = data.name
        user.username = data.username
        user.email = data.email
      }
      return user
    })
    renderData(users)
  } catch (error) {
    console.error(error)
  }
}
addEventListeners()
//

// async function editUser(users, id) {
// const userName = document.getElementById("userfirstname").value
// const userLastName = document.getElementById("userlastname").value
// const userEmail = document.getElementById("useremial").value
//
// try {
// const response = await fetch(
// `https://jsonplaceholder.typicode.com/users/${id}`,
// {
// method: "PUT",
// body: JSON.stringify({
// name: userName,
// email: userEmail,
// username: userLastName,
// }),
// headers: {
// "Content-type": "application/json; charset=UTF-8",
// },
// }
// )
// const data = await response.json()
// users = users.map((user) => {
// if (user.id == id) {
// user.name = data.name
// user.username = data.username
// user.email = data.email
// }
// return user
// })
// renderData(users)
// } catch (error) {
// console.error(error)
// }
// }
//
