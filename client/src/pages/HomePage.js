import { useEffect, useState } from "react"
import Header from "../components/Header"
import BlogsContainer from "../components/BlogsContainer";
import { setBlogsData } from "../redux/Reducers/blogsSlice";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  //const [blogsData, setBlogsData] = useState([]);
  const [country, setCountry] = useState("")
  const [loading, setLoading] = useState(false);
  const geoData = {
    location: selectedRegion,
    country: country,
    loading: loading
  }
  const dispatch = useDispatch();
  useEffect(() => {
    const getUserLocationByIP = async () => {
      try {
       
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        setSelectedRegion(data.region)
        setCountry(data.country_name)
      } catch (error) {
        console.error("Error fetching user location by IP:", error);
      }
    };

    getUserLocationByIP();
  },[])

  useEffect(() => {
    const url = `${process.env.REACT_APP_API}blogs/${selectedRegion}`;

    async function fetchBlogs() {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        dispatch(setBlogsData(data));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }finally{
        setLoading(false);
      }
    }

    if (selectedRegion) {
      fetchBlogs();
    }
  }, [selectedRegion])
  return(
    <div className="">
      <Header setSelectedRegion={setSelectedRegion}/>
      <BlogsContainer geoData={geoData} loading={loading}/>
    </div>
  )
}
export default HomePage