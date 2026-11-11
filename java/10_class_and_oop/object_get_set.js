const User = {
    _email: "sa@facebook.com",
    _password: "satish8646",

    get email(){
        return this._email.toLowerCase();
    },
    set email(value){
        this._email = value
    }
}

const result = Object.create(User);
console.log(result.email);