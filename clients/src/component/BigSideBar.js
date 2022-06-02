import React from "react"
import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./Navlinks";
import Logo from "../component/Logo"
import { useAppContext} from "../context/appContext";

function BigSideBar(){
    const { showSidebar } = useAppContext()
    return(
        <Wrapper>
            <div className={ !showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
                <div className="content">
                    <header><Logo /></header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    )
}

export default BigSideBar