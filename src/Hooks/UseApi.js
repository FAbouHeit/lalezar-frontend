import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axiosInstance from "../Utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

const useApi = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    // const [data, setData] = useState(null)
    const { setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const apiCall = async ({ url, method, data = null }) => {

        try {
            setLoading(true)
            const response = await axiosInstance({ url, method, data })
            setLoading(false)
            return response.data
        } catch (error) {
            setError(error)
            setLoading(false)
            if (error.response) {
                if (error.response.status === 401) {
                    console.log(error.response.data.message)
                    setUser(null)
                    navigate('/login')
                }
                else if (error.response.status === 403) {
                    console.log("forbidden access")
                }
            }
        } finally{
            setLoading(false)
        }
    }
    return { apiCall, error, loading }
}
export default useApi