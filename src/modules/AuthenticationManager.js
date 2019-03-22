const AuthenticationManager = {
    registerNewUser(userObject) {
        return fetch(`http://localhost:5002/users`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(userObject)
        }).then(r => r.json())
    },

    checkForEmail(userEmail) {
        return fetch(`http://localhost:5002/users/?email=${userEmail}`)
        .then(r => r.json())
    },

    checkForUsername(username) {
        return fetch(`http://localhost:5002/users/?username=${username}`)
    .then(r => r.json())
    },

    checkUsernameAndEmail(username, email) {
        return fetch(`http://localhost:5002/users/?username=${username}&&email=${email}`)
        .then(r => r.json())
    }

}



export default AuthenticationManager;