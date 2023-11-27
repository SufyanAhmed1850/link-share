import "./linkscustomization.css";
import handle from "../../assets/images/icon-drag-and-drop.svg";
import InputField from "../Input Field";
import LinkIcon from "../../assets/images/icon-link.svg";
import DropDown from "../DropDown/DropDown";
import { useEffect, useState } from "react";

const Linkscustomization = ({ order, handleChange }) => {
    const [url, setUrl] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState(null);

    const [linkData, setlinkData] = useState({});

    const handlePlatformChange = (newPlatform) => {
        setSelectedPlatform(newPlatform);
    };

    useEffect(() => {
        setlinkData({
            link: url,
            platform: selectedPlatform,
            order,
        });
    }, [url]);

    useEffect(() => {
        handleChange(linkData);
    }, [linkData]);

    return (
        <div className="link-customization-not-empty-container">
            <div className="link-header">
                <div className="link-handle">
                    <div className="link-handle-img">
                        <img src={handle} alt="Drag and Drop Handle" />
                    </div>
                    <h3>Link #{order}</h3>
                </div>
                <div className="link-remove">
                    <p>Remove</p>
                </div>
            </div>
            <div className="links-dropdown">
                <span>Platform</span>
                <DropDown onSelectPlatform={handlePlatformChange} />
            </div>
            <div className="link-url">
                <InputField
                    disabled={selectedPlatform ? false : true}
                    value={url}
                    label={"Link"}
                    iconSrc={LinkIcon}
                    altText={"Link"}
                    onInputChange={(urlVal) => setUrl(urlVal)}
                    placeholderText={
                        selectedPlatform
                            ? selectedPlatform.placeholder
                            : "Select an option from dropdown"
                    }
                />
            </div>
        </div>
    );
};

export default Linkscustomization;
