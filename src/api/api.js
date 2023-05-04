import axios from "axios";

export default {
    getData(url) {
        return axios.get(url)
    },

    createOrder(url, data) {
        return axios.post(url, data)
    }
}
