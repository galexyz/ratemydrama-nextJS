import * as HIcons from "@heroicons/react/outline";

interface ActionButtonProps {
    callBack: () => any;
    text: string;
    icon: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
    callBack,
    icon,
    text,
}) => {
    return <div className="rounded-lg"></div>;
};

export default ActionButton;
