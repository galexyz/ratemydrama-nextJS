interface TextBoxProps {
    text: string;
}

const TextBox: React.FC<TextBoxProps> = ({ text }) => {
    return (
        <div className="p-5 border border-blue-500 text-blue-700 rounded-lg">
            {text}
        </div>
    );
};

export default TextBox;
