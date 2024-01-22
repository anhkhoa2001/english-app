import './TitleComponent.scss';

const TitleComponent: React.FC<{ type: string, count_results: number, display: boolean }> = 
({type, count_results, display}) => {

    return <div className="title-common">
        <h1>{type}</h1>
        {display ? <p>{count_results} results</p> : <></>}
    </div>
}


export default TitleComponent;