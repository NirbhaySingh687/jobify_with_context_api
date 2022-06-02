import React from "react"
import { Outlet, Link } from "react-router-dom"
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Navbar, SmallSidebar, BigSideBar } from "../../component"

function SharedLayout() {
    return (
        <Wrapper>
            <main className="dashboard">
                <SmallSidebar />
                <BigSideBar />

                <div>
                    <Navbar />
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>
            {/*<nav>
                <Link to="add-jobs">Add job</Link>
                <Link to="all-jobs">All job</Link>
            </nav>*/}

        </Wrapper>
    )
}

export default SharedLayout