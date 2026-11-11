function setUserName (username){
    // compleax DB call
    this.username = username;
    console.log("called");
}

function creatUser(username, email, password){
    setUserName.call(this, username)
    this.email = email,
    this.password = password
}

const resposne = new creatUser("satish", "satish@facebook.com", "1235");
console.log(resposne);