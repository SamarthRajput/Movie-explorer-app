import { useEffect, useState } from "react"

export function SearchArea() {
    const [filter, setFilter] = useState("");

    // useEffect(() => {
    //     axios.get("")
    // }, []);
    

    return (
        <>
        <form action="">
            <div class="input-field">
                <input onChange={(e) => {
                    setFilter(e.target.value);
                }} type="text" name="" id="" />
            </div>
        </form>
        </>
    )
}