import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning} from "../components/BottomWarning";
import axios from 'axios';

export const Signin = () => {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const navigate = useNavigate();

    return <div>

        <div>
            <InputBox onChange={(e) => {
                setEmail(e.target.value);
            }}
            label={"email"} placeholder={"JohnDoe@gmail.com"}></InputBox>

            <InputBox onChange={(e) => {
                setPassword(e.target.value);
            }} label={"password"} placeholder={"123123123"}></InputBox>
        </div>

        <div>
            <Button onClick={async () => {
                try{

                    const response = await axios.post("http://localhost:3000/api/auth/signin" , {
                        email,
                        password
                    }, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
                    navigate("/dashboard")
                }
                catch(error){
                    console.log(error);
                    alert("incorrect inputs");
                }
                }} label={"Sign In"}></Button>

                <div>
                    <BottomWarning label={"Make a new account"} buttonText={"SignUp"} to={"/signup"}></BottomWarning>
                </div>
        </div>



    </div>

}