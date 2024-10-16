import { useState } from "react"
import Header from "../components/Header"

const HomePage = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  console.log(selectedRegion)
  return(
    <div className="">
      <Header setSelectedRegion={setSelectedRegion}/>
    </div>
  )
}
export default HomePage