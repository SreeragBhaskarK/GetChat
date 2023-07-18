import Dashboard from "../../Components/Admin/Dashboard/Dashboard"
import Footer from "../../Components/Admin/Footer/Footer"
import NavSideBar from "../../Components/Admin/Nav/NavSideBar"
import NavTopBar from "../../Components/Admin/Nav/NavTopBar"
import '../../assets/Admin/css/admin.css'
import '@fortawesome/fontawesome-free/css/all.css';
const DashboardPageAdmin = () => {
  
    return (

        <>
            <NavSideBar  />
            <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
                <NavTopBar navLocation='Dashboard'  />
                <Dashboard />
                <Footer />
            </main>
        </>
    )
}

export default DashboardPageAdmin