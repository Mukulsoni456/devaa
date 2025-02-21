import EventCalender from "../components/EventCalender"

import Values from '../components/Values'
import Gallery from '../components/Gallery'
import Reviews from '../components/Reviews'
import Announcement from '../components/Announcement'
import Donation from '../components/Donation'
import VoluntarySignup from "../components/VolunteerSignup"
import Blogs from '../components/Blogs'
import Hero from '../components/hero'
import Footer from '../components/Footer'

function Home() {
    return (
      <div>
<Hero></Hero>
<EventCalender></EventCalender>
<Values></Values>
<Gallery></Gallery>
<Announcement></Announcement>
<Reviews></Reviews>

<Donation></Donation>

<Blogs></Blogs>
<VoluntarySignup></VoluntarySignup>

</div>
  )
}

export default Home        