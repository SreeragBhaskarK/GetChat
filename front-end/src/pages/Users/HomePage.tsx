import Home from "../../Components/Users/Home/Home"
import NavRightSide from "../../Components/Users/Nav/NavRightSide";
import NavSideBar from "../../Components/Users/Nav/NavSideBar"
import "../../assets/User/css/user.css";
const HomePage = () => {
  return (
    <>
      <NavSideBar />
      <main className="ease-soft-in-out xl:ml-68.5 xl:mr-68.5 relative h-full max-h-screen rounded-xl min-h-screen transition-all duration-200">
        <Home />
      </main>
      <NavRightSide />
    </>
  )
}

export default HomePage