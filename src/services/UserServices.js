// Imports
import AxiosConfig from '@/config/axios'

export const getUsers = async (payload) => {
    const url = '/users'

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
