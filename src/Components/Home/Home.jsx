import Navbar from '../Common/Navbar'
import Footer from '../Common/Footer'
import Categories from './Categories'

const Home = () => {
  return (
    <div className="flex flex-col  min-w-[384px] max-w-[1500px] maxi:m-auto">
        <Navbar/>
        
        <Categories/>
        <Footer/>
    </div>
  )
}

export default Home