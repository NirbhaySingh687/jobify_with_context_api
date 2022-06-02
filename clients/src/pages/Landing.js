import React from "react"
import main from "../assets/images/main-alternative.svg"
import Wrapper from "../assets/wrappers/Testing";
import { Logo } from "../component";
import { NavLink} from "react-router-dom";

function Landing(){
    return(
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>
                        Computer security, cybersecurity, or information technology security (IT security) is the protection of computer systems and networks from information disclosure, theft of or damage to their hardware, software, or electronic data, as well as from the disruption or misdirection of the services they provide.[1]
                        The field has become significant due to the expanded reliance on computer systems, the Internet[2] and wireless network standards such as Bluetooth and Wi-Fi, and due to the growth of "smart" devices, including smartphones, televisions, and the various devices that constitute the Internet of things (IoT). Cybersecurity is also one of the significant challenges in the contemporary world, due to its complexity, both in terms of political usage and technology. Its primary goal is to ensure the system's dependability, integrity, and data privacy
                    </p>

                    <button className="btn btn-hero"><NavLink to="/register">Login/Register</NavLink></button>
                </div>
                <img src={main} alt="job-hunt" className="img main-img"/>
            </div>
        </Wrapper>
    )
}

export default Landing