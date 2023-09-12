const PrimaryButton = (props: any) => {
    return (
        <div
            onClick={props.callBack}
            className="bg-blue-300 w-48 cursor-pointer rounded-full border-2 border-blue-500">
            <div className="text-center py-1 font-bold text-white">
                {props.text}
            </div>
        </div>
    );
};

export default PrimaryButton;
