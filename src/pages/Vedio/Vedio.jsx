import { useParams } from 'react-router-dom';
import PlayVedio from '../../components/play-vedio/PlayVedio';
import Recommended from '../../components/recommended/Recommended';
import './vedio.css'

const Vedio = () => {

    const {videoId, categoryId} = useParams();

    return ( 
        <>
        <div className="play-container">
            <PlayVedio videoId={videoId}/>
            <Recommended categoryId={categoryId}/>
        </div>
        </>
     );
}
 
export default Vedio;