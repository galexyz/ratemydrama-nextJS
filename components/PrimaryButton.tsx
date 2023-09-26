import React from "react";
import * as HIcons from "@heroicons/react/24/solid";

interface PrimaryButtonProps {
    callBack: () => any;
    disabled?: boolean;
    text: string;
    icon?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    callBack,
    text,
    disabled,
    icon,
}) => {
    const { ...icons } = HIcons;
    const TheIcon = icons[icon];

    return (
        <div
            onClick={callBack}
            className={`bg-blue-300 w-40 cursor-pointer rounded-full border-2 border-blue-500 flex flex-row items-center justify-around ${
                disabled && "opacity-40"
            }`}>
            {icon && <TheIcon className="w-6 h-6 text-white" />}
            <div className="text-center py-1 font-bold text-white">{text}</div>
        </div>
    );
};

export default PrimaryButton;
