class User {

    constructor(name, gender, birth, country, email, password, photo, admin){

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
    }

    get register(){
        return this._register;
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get gender(){
        return this._gender;
    }

    get birth(){
        return this._birth;
    }

    get country(){
        return this._country;
    }

    get email(){
        return this._email;
    }

    get password(){
        return this._password;
    }
    
    get admin(){
        return this._admin;
    }

    get photo(){
        return this._photo;
    }
    
    set photo(value){
        this._photo = value;
    }

    loadFromJSON(json){
        
        for (let name in json){
            
            switch(name){
                case '_register':
                    this[name] = new Date(json[name]);
                    break;
                default:
                    this[name] = json[name];

            }


        }
    }

    //Metodo que retorna os usuarios do localStorage
    static getUsersStorage(){
        let users = [];

        if(localStorage.getItem("users")){
            users = JSON.parse(localStorage.getItem("users"));
        }

        return users;
    }

    //Metodo para gerar o id do usuario
    getNewID(){
        let users = User.getUsersStorage();
        let lastUser = users.length - 1;
                   
        window.id = users.length > 0 ?  users[lastUser]._id : 0; 

        id++;

        return id;
    }

    //Metodo para salvar usuario
    save(){
        let users = User.getUsersStorage();

        if(this.id > 0){

            users.map(u => {

                console.log(u);
                if(u._id == this.id){
                    Object.assign(u, this);
                }
                
                return u;

            });

        }else{
            this._id = this.getNewID();
            
            users.push(this);
    
        }
        localStorage.setItem('users', JSON.stringify(users));
        
    }

    //Metodo para remover usuario
    remove(){
        let users = User.getUsersStorage();

        users.forEach((userData, index) => {
            
            if(this._id == userData._id){
                
                users.splice(index, 1);

            }

        });

        localStorage.setItem('users', JSON.stringify(users));

    }
}