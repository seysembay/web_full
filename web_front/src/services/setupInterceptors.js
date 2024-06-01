import axiosInstance from "./api"
import TokenService from "./token.service"
import {jwtDecode} from "jwt-decode"
import router from "../router/index.js";
const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken()
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    axiosInstance.interceptors.response.use(
        (res) => {
            return res
        },
        async (err) => {
            const originalConfig = err.config
            if (originalConfig.url !== "/auth/signin" && err.response) {
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true
                    try {
                        const refreshToken = TokenService.getLocalRefreshToken()
                        const decodedRefreshToken = jwtDecode(refreshToken)
                        const tokenDate = new Date(decodedRefreshToken.exp * 1000)
                        const now = new Date()
                        if (now > tokenDate) {
                            TokenService.removeUser()
                            await router.push('login')
                        }
                        else {
                            const rs = await axiosInstance.post("/token/refresh/", {
                                refresh: TokenService.getLocalRefreshToken(),
                            })
                            if (rs.status === 200) {
                                const {access} = rs.data
                                store.dispatch('auth/refreshToken', access)
                                TokenService.updateLocalAccessToken(access)
                            }
                        }
                        return axiosInstance(originalConfig)
                    } catch (_error) {
                        return Promise.reject(_error)
                    }
                }
            }
            return Promise.reject(err)
        }
    )
}

export default setup