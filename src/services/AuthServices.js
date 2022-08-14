// Imports
import AxiosConfig from '@/config/axios'

// Get groups fields
export const createUser = async (payload) => {
    const url = 'users'

    try {
        const { data } = await AxiosConfig.post(url, payload);

        if (!data) return []

        return data
    } catch (e) {
        throw new Error(e)
    }
}


export const login = async (payload) => {
    const url = '/auth'

    try {
        const { data } = await AxiosConfig.post(url, {}, {
            auth: payload
        });

        localStorage.setItem("token", data.meta.access_token);

        if (!data) return []

        return data
    } catch (e) {
        throw new Error(e)
    }
}
