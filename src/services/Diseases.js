// Imports
import AxiosConfig from '@/config/axios'

export const getDiesesTypes = async (payload) => {
    const url = '/diseases/types'

    try {
        const { data } = await AxiosConfig.get(url, {
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


export const createDiseases = async (payload) => {
    const url = '/diseases'

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

