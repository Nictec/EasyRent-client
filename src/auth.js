 import Vue from './main.js'
 const LOGIN_URL = "http://localhost:8000/auth/"
 const CURRENT = "http://localhost:8000/current-user"

export default{
  user: {
    authenticated: false,
    group: "",
  },
  error:false,
  logInfo:false,

  login(context, username, password){
    var data = new FormData()
    data.append('username', username)
    data.append('password', password)
    context.$http.post(LOGIN_URL, data, {emulateJSON:true}).then(function(response){
      localStorage.setItem('id_token', response.data.token)
      this.user.authenticated = true
      console.log("login sucessful:"+response.data.token)
    },function(response){
      this.user.authenticated = false
      console.log("login failed")
      this.error = true
    })
  },


  logout() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
    this.logInfo = true
  },

    getAuthHeader() {
        var jwt = localStorage.getItem('id_token')
        if(jwt){
          var string = "Token "
          return string+localStorage.getItem('id_token')
        }else{
          return null
        }
    },

  check(){
    var jwt = localStorage.getItem('id_token')
    if(jwt){
      this.user.authenticated = true
    }else{
      this.user.authenticated = false
    }
  },

  check_permissions(context){
    context.$http.get("current-user").then(function(response){
      context.$http.get("http://localhost/user/"+response.data.id+"/").then(function(response){
        this.user.group = response.data.groups
      })
    })
  }

};
