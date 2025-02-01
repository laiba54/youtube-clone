import './recommended.css'
import { useEffect, useState } from 'react'
import { API_Key, value_converter } from '../../data';
import moment from 'moment';
import { Link } from 'react-router-dom';
const Recommended = ({categoryId}) => {

    const [ApiData, setApiData] = useState([]);

    const fetchData = async() => {
        const relatedvideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_Key}`;
        await fetch(relatedvideo_url).then(response=>response.json()).then(data=>setApiData(data.items))
    }

    useEffect(()=>{
        fetchData();
    }, [categoryId])

    return ( 
        <div className="recommended">
            {ApiData.map((item, index)=>{
              return(
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={index}>
                       <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <div className="video-info">
                       <h4>{item.snippet.title}</h4>
                       <p>{item.snippet.channelTitle}</p>
                       <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                    </div>
                </Link>
              )
            })}
        </div>
     );
}
 
export default Recommended;