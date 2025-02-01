import { useState } from "react";
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import './Home.css'

const Home = ({sidebar}) => {

    const[category, setcategory] = useState(0)

    return ( 
        <>
        <Sidebar sidebar = {sidebar} category={category} setcategory={setcategory}/>
        <div className={`container ${ sidebar ? "" : 'large-container'}`}>
            <Feed category={category}/>
        </div>
        </>
     );
}
 
export default Home;