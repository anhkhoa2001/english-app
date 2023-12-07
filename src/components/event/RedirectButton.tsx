import './RedirectButton.scss'

const RedirectButton: React.FC<{content: string}> = ({content}) => {

    return <li className="redirect-button">
            {content}
            <span></span><span></span><span></span><span></span>
        </li>
}

export default RedirectButton;