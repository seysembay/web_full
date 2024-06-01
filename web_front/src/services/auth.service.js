import api from "./api"
import TokenService from "./token.service"

class AuthService {
    login({ username, password }) {
        return api
            .post("/auth/signin/", {
                username,
                password
            })
            .then((response) => {
                if (response.status === 200) {
                    TokenService.setUser(response.data)
                }

                return response.data
            })
    }

    logout() {
        TokenService.removeUser()
    }

    register({ username, email, password, password2, first_name, last_name }) {
        return api.post("/auth/signup/", {
            username,
            email,
            password,
            password2,
            first_name,
            last_name
        })
    }
}

export default new AuthService()