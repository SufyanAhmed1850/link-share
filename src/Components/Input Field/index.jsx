import { useEffect, useRef, useState } from "react";
import "./index.css";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import linkContext from "../../../context/linkContext";

const linkPatterns = {
    GitHub: /^(https?:\/\/(www\.)?github\.com\/\S+)\/?$/,
    Twitter: /^(https?:\/\/(www\.)?twitter\.com\/\S+)\/?$/,
    LinkedIn: /^(https?:\/\/(www\.)?linkedin\.com\/in\/\S+)\/?$/,
    YouTube: /^(https?:\/\/(www\.)?youtube\.com\/\S+)\/?$/,
    Facebook: /^(https?:\/\/(www\.)?facebook\.com\/\S+)\/?$/,
    Twitch: /^(https?:\/\/(www\.)?twitch\.tv\/\S+)\/?$/,
    DevTo: /^(https?:\/\/(www\.)?dev\.to\/\S+)\/?$/,
    CodeWars: /^(https?:\/\/(www\.)?codewars\.com\/users\/\S+)\/?$/,
    CodePen: /^(https?:\/\/(www\.)?codepen\.io\/\S+)\/?$/,
    FreeCodeCamp: /^(https?:\/\/(www\.)?freecodecamp\.org\/\S+)\/?$/,
    GitLab: /^(https?:\/\/(www\.)?gitlab\.com\/\S+)\/?$/,
    Hashnode: /^(https?:\/\/(www\.)?hashnode\.com\/@\S+\/?)$/,
    StackOverflow: /^(https?:\/\/(www\.)?stackoverflow\.com\/users\/\S+)\/?$/,
    FrontendMentor:
        /^(https?:\/\/(www\.)?frontendmentor\.io\/profile\/\S+)\/?$/,
};

const InputField = ({
    label,
    iconSrc,
    altText,
    placeholderText,
    imgYes,
    onInputChange,
    onKeyPress,
    type,
    value,
    disabled,
    index,
    error,
}) => {
    const location = useLocation();
    const [inputValue, setInputValue] = useState("");
    const { linksData, updateLinksData, setLinksData } =
        useContext(linkContext);
    const [isFocused, setIsFocused] = useState(false);
    const [haveError, setHaveError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        type == "password"
            ? setErrorMessage("Please check again")
            : setErrorMessage("Can’t be empty");
        error && setHaveError(true);
    }, [error]);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        onInputChange(e.target.value);
        return;
    };

    const handleInputBlur = (index) => {
        setIsFocused(false);

        const platform = linksData[index].platform.text;
        const pattern = linkPatterns[platform];

        const isValid = pattern.test(inputValue);
        setHaveError(!isValid);
        setErrorMessage(isValid ? "" : "Please check the URL");

        if (!isValid) {
            console.log(`Invalid ${platform} link.`);
            return;
        }

        setLinksData((prevLinksData) => {
            const updatedLinksData = [...prevLinksData];
            updatedLinksData[index] = {
                ...updatedLinksData[index],
                link: inputValue,
            };
            return updatedLinksData;
        });
        console.log(`Valid ${platform} link: ${inputValue}`);
    };

    return (
        <div className="input-field-parent">
            <span>{label}</span>
            <div
                style={{
                    border: isFocused
                        ? "1px solid var(--purple-90-)"
                        : "1px solid var(--black-30-)",
                    boxShadow: isFocused ? "0 0 32px 0 #633cff40" : "none",
                    ...(haveError
                        ? { border: "1px solid var(--red-90-)" }
                        : {}),
                }}
                className="input-container"
            >
                {imgYes || (
                    <div>
                        <img src={iconSrc} alt={altText} />
                    </div>
                )}
                <input
                    disabled={disabled && disabled}
                    value={inputValue}
                    onChange={(e) => handleInputChange(e)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={
                        location.pathname === "/"
                            ? () => handleInputBlur(index)
                            : () => {
                                  if (!inputValue) {
                                      type == "password"
                                          ? setErrorMessage(
                                                "Please check again",
                                            )
                                          : setErrorMessage("Can’t be empty");

                                      setHaveError(true);
                                  } else {
                                      setHaveError(false);
                                  }
                                  setIsFocused(false);
                              }
                    }
                    onKeyDown={onKeyPress || null}
                    type={type || "text"}
                    placeholder={placeholderText}
                />
                {haveError && (
                    <span className="input-error">{errorMessage}</span>
                )}
            </div>
        </div>
    );
};

export default InputField;
