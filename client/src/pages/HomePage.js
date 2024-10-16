import { useEffect, useState } from "react"
import Header from "../components/Header"
import BlogsContainer from "../components/BlogsContainer";

const HomePage = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [blogsData, setBlogsData] = useState([]);
  const [country, setCountry] = useState("")
  const [loading, setLoading] = useState(false);
  const geoData = {
    location: selectedRegion,
    country: country,
    loading: loading
  }

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
    const url = `${process.env.REACT_APP_API}blog/${selectedRegion}`;

    async function fetchBlogs() {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        setBlogsData(data);
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
      <BlogsContainer blogsData={blogsData} setBlogsData={setBlogsData} geoData={geoData} loading={loading}/>
    </div>
  )
}
export default HomePage