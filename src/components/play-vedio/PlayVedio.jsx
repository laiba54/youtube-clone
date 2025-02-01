import './playvedio.css'
import moment from 'moment'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { useEffect, useState } from 'react'
import { API_Key, value_converter } from '../../data'
import { useParams } from 'react-router-dom'


const PlayVedio = () => {
    const {videoId} = useParams();

    const [ApiData, setApiData] = useState(null);
    const [channeldata, setchanneldata] = useState(null);
    const [commentdata, setcommentdata] = useState([]);

    const fetchvideodata = async()=> {
        const videodetail_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_Key}`
        await fetch(videodetail_url).then(response=>response.json()).then(data=>setApiData(data.items[0]))
    }

    // fetch channel data
    const fetchotherdata = async()=> {
        const channeldata_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${ApiData.snippet.channelId}&key=${API_Key}`
        await fetch(channeldata_url).then(response=>response.json()).then(data=>setchanneldata(data.items[0]))

        // fetch comments
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_Key}`
        await fetch(comment_url).then(response=>response.json()).then(data=>setcommentdata(data.items))
    }
    
    useEffect(()=>{
        fetchvideodata();
    }, [videoId])

    useEffect(()=>{
        fetchotherdata();
    }, [ApiData])

    return ( 
        <div className="play-video">
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <h3>{ApiData?ApiData.snippet.title:"Title Here"}</h3>
            <div className="play-video-info">
                <p>{ApiData?value_converter(ApiData.statistics.viewCount):"16k"} views &bull; {ApiData?moment(ApiData.snippet.publishedAt).fromNow():""}</p>
                <div>
                    <span> <img src={like} alt="" /> {ApiData?value_converter(ApiData.statistics.likeCount):"55"} </span>
                    <span> <img src={dislike} alt="" /> </span>
                    <span> <img src={share} alt="" /> Share </span>
                    <span> <img src={save} alt="" /> Save </span>
                </div>
            </div>
            <hr />
            {/* Subscribe */}
            <div className="publisher">
                <img src={channeldata?channeldata.snippet.thumbnails.default.url:""} alt="" />
                <div>
                    <p>{ApiData?ApiData.snippet.channelTitle:"Title Here"}</p>
                    <span>{channeldata?value_converter(channeldata.statistics.subscriberCount):"16k"} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            {/* vedio description */}
            <div className="video-description">
                <p>{ApiData?ApiData.snippet.description.slice(0, 255):"Description Here"}</p>
                <hr />
                <h4>{ApiData?value_converter(ApiData.statistics.commentCount):"100"} Comments</h4>
                {commentdata.map((item, index)=>{
                    return(
                        <div className="comment" key={index}>
                           <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                        <div>
                        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                        <div className="comment-action">
                            <img src={like} alt="" /> <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                            <img src={dislike} alt="" />
                        </div>
                        </div>
                        </div>
                    )
                })}
            </div>

        </div>
     );
}
 
export default PlayVedio;