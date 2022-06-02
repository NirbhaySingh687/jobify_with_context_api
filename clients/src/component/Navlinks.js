import link from "../utils/Link";
import { NavLink } from "react-router-dom";

function NavLinks({ toggleSidebar }){
    return(
        <div className="nav-links">
            {
                link.map((l) => {
                    const { text, path, id, icon } = l;
                    return (
                        <NavLink to={path} key={id} onClick={toggleSidebar}
                                 className={({ isActive}) => isActive ? 'nav-link active' : "nav-link"}
                        >
                            <span className="icon">{icon}</span>
                            {text}
                        </NavLink>
                    )
                })
            }
        </div>
    )
}

export default NavLinks