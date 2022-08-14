import AxiosConfig from '@/config/axios'

export const getReportCountDiseases = async (payload) => {
    const url = '/reports'

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

export const getReportCountSymptoms = async (payload) => {
    const url = '/reports/stats'

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