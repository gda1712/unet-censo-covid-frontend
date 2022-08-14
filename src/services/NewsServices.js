// Imports
import AxiosConfig from '@/config/axios'

export const getNotifications = async (payload) => {
    const url = '/notifications'

    try {
        const { data } = await AxiosConfig.get(url, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            params: payload
        });

        if (!data) return []

        return data
    } catch (e) {
        throw new Error(e)
    }
}


export const createNotifications = async (payload) => {
    const url = '/notifications'

    try {
        const { data } = await AxiosConfig.post(url, payload, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });

        if (!data) return []

        return data
    } catch (e) {
        throw new Error(e)
    }
}