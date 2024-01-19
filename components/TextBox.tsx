interface TextBoxProps {
    text: string;
}

const TextBox: React.FC<TextBoxProps> = ({ text }) => {
    return (
        <div className="p-5 border border-primary text-txt rounded-lg">
            {text}
        </div>
    );
};

export default TextBox;
