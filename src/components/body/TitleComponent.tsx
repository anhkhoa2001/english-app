import './TitleComponent.scss';

const TitleComponent: React.FC<{ type: string, count_results: number }> = ({type, count_results}) => {

    return <div className="title-common">
        <h1>{type}</h1>
        <p>{count_results} results</p>
    </div>
}


export default TitleComponent;