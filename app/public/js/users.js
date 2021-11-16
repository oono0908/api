const usersModule = (() => {
  const BASE_URL = "http://localhost:3000/api/v1/users"

  return{
    fetchAllUsers: async () =>{
      const res = await fetch(BASE_URL)
      const users = await res.json()
      
      let body =""
      for (let i=0; i < users.length; i++){
        const user = users[i]
        body += `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.profile}</td>
        <td>${user.date_of_birth}</td>
        <td>${user.created_at}</td>
        <td>${user.updated_at}</td>
        </tr>`
        document.getElementById('users-list').insertAdjacentHTML('beforeend', body)
      }
    },
    createUser: async () => {
      const name = document.getElementById("name").value
      const profile = document.getElementById("profile").value
      const dateOfBirth = document.getElementById("date-of-birth").value

      // リクエストのbody
      const body = {
        name: name,
        profile: profile,
        date_of_birth: dateOfBirth
      }

      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      })

      return handleError(res)
    },
    setExistingValue: async (uid) => {
      const res = await fetch(BASE_URL + "/" + uid)
      const resJson = await res.json()

      document.getElementById('name').value = resJson.name
      document.getElementById('profile').value = resJson.profile
      document.getElementById('date-of-birth').value = resJson.date_of_birth
    },
    saveUser: async (uid) => {
      const name = document.getElementById("name").value
      const profile = document.getElementById("profile").value
      const dateOfBirth = document.getElementById("date-of-birth").value

      // リクエストのbody
      const body = {
        name: name,
        profile: profile,
        date_of_birth: dateOfBirth
      }

      const res = await fetch(BASE_URL + "/" + uid, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body)
      })

      return handleError(res)
    },
    deleteUser: async (uid) => {
      const ret = window.confirm('このユーザーを削除しますか？')

      if (!ret) {
        return false
      } else {
        const res = await fetch(BASE_URL + "/" + uid, {
          method: "DELETE",
          headers: headers
        })

        return handleError(res)
      }
    }
  }
})()