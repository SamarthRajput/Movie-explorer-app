import axios from "axios"
import { useEffect } from "react"

export const Dashboard = () => {

    useEffect(() => {
        axios.post(`https://api.themoviedb.org/3/account/${account_id}/favorite`)
    }, []);

    return (
        <>
        </>
    )
}