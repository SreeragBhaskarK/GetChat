import Audience from "../../Components/Admin/Audience/Audience"
import Footer from "../../Components/Admin/Footer/Footer"
import NavSideBar from "../../Components/Admin/Nav/NavSideBar"
import NavTopBar from "../../Components/Admin/Nav/NavTopBar"
import '../../assets/Admin/css/admin.css'
import '@fortawesome/fontawesome-free/css/all.css';


const AudiencePageAdmin = () => {
    return (
        <>
            <NavSideBar />
            <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl min-h-screen transition-all duration-200">
                <NavTopBar navLocation='Audience' />
                <Audience />
                <Footer />
            </main>
        </>
    )
}

export default AudiencePageAdmin