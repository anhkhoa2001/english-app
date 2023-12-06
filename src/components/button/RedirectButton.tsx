
const RedirectButton: React.FC<{content: string}> = ({content}) => {

    return <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
        {content}</button>
}

export default RedirectButton;