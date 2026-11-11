class User {
    constructor(email, password){
        this.email = email,
        this.password = password
    }
    get email(){
        return this._email.toLowerCase();
    }
    set email(value){
        this._email = value;
    }
    get password(){
        return `${this._password}1235`
    }
    set password(value){
        `${this._password = value}`
    }
}

const result = new User("s@facebook.com", "satish");
console.log(result.email);
console.log(result.password);