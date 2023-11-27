import { useState } from "react";
import "./signup.css";
import InputField from "../../Components/Input Field";
import logoLarge from "../../assets/images/logo-devlinks-large.svg";
import emailIcon from "../../assets/images/icon-email.svg";
import passwordIcon from "../../assets/images/icon-password.svg";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const userSignUp = async () => {
        try {
            console.log({
                email,
                password,
                repeatPassword,
            });
            const res = await axios.post(`${import.meta.env.VITE_URL}/signup`, {
                email,
                password,
                repeatPassword,
            });
            setEmail("");
            setPassword("");
            setRepeatPassword("");
            console.log("res", res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="signup-container">
            <div className="logo">
                <img src={logoLarge} alt="Logo" />
            </div>
            <div className="signup-card">
                <div className="signup-head">
                    <h2>Create account</h2>
                    <p>Let’s get you started sharing your links!</p>
                </div>
                <div className="signup-fields">
                    <InputField
                        value={email}
                        label="Email address"
                        iconSrc={emailIcon}
                        altText="Email"
                        placeholderText="e.g. alex@email.com"
                        onInputChange={(emailVal) => setEmail(emailVal)}
                    />
                    <InputField
                        value={password}
                        label="Create password"
                        type="password"
                        iconSrc={passwordIcon}
                        altText="Password"
                        placeholderText="At least 8 characters"
                        onInputChange={(passVal) => setPassword(passVal)}
                    />

                    <InputField
                        value={repeatPassword}
                        label="Confirm password"
                        type="password"
                        iconSrc={passwordIcon}
                        altText="Confirm Password"
                        placeholderText="At least 8 characters"
                        onInputChange={(repPassVal) =>
                            setRepeatPassword(repPassVal)
                        }
                    />

                    <Button handleClick={userSignUp} buttonText="Signup" />
                    <p>
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="create-account"
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
