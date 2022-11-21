import axios from "axios"

const fetcher = async <T>(url: string): Promise<T> => {
    return await axios
        .get<T>(url, { withCredentials: true })
        .then((resp) => resp.data)
}

export default fetcher
