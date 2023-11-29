const mainURL = "/"

function purchase(){
    alert("hi there");
}

function register(){
    alert("Hi ther")
}

function pricing_get(){
    window.location=mainURL + 'purchase'
}

function login_get(){
    window.location=mainURL + 'login'

}

function login_post(){
    alert("Register-post")

}

function register_get(){
    window.location=mainURL + 'register'

}

function register_post(){
    alert("register - post")

}

function home_get(){
    window.location=mainURL
}

function purchase_get(){
    window.location=mainURL + 'purchase'

}

function contact_get(){
    window.location=mainURL + 'contact'

}

function documentation_get(){
    window.location=mainURL + 'documentation'

}


function nav_login(){
    if(document.getElementById("nav-login").innerHTML.trim()=="Login"){
        window.location=mainURL + 'login'
    }
    else{
        window.location=mainURL + 'profile'
    }

}