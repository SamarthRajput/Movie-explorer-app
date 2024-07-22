import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from 'axios';
import { BottomWarning} from "../components/BottomWarning";

export const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();
    

    return (
        <div>
            <InputBox onChange={(e) => {
                setEmail(e.target.value)
            }} label={"email"} placeholder={"JohnDoe@gmail.com"}  ></InputBox>
            <InputBox onChange={(e) => {
                setPassword(e.target.value)
            }} label={"password"} placeholder={"123456"}></InputBox>
            <InputBox onChange={(e) => {
                setFirstName(e.target.value)
            }} label={"First Name"} placeholder={"John"} ></InputBox>
            <InputBox onChange={(e) => {
                setLastName(e.target.value)
            }} label={"Last Name"} placeholder={"Doe"}></InputBox>

            <div className="pt-4">
                <Button label={"Sign Up"} onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/auth/signup", {
                        email,
                        password,
                        firstName,
                        lastName
                    })
                    .catch((error) => {
                        alert("Email already taken/ incorrect inputs");
                    }) 

                    localStorage.getItem("token", response.data.token)
                    navigate("/dashboard");
                }}></Button>
            </div>

            <BottomWarning label={"Already have an account"} buttonText={"Sign In"} to={'/signin'}></BottomWarning>
        </div>
    )
}