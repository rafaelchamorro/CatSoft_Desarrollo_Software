import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";




export default function Navigation() {
    
    const { loginWithRedirect } = useAuth0();
    

    useEffect (()=>{

    }
    )

    const { logout } = useAuth0();


    const cerrarSesion = () => {
        logout({ returnTo: 'http://localhost:3000' });
        
      };
    return (

        <div>
            {/* NAVIGATION */}
            <nav className="brown">
                <div className="container">
                    <div className="nav-wrapper">
                        <Link className="brand-logo" to="/">
                            Don Cat's Shop
                        </Link>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><Link className="nav-link" to="/products">Productos</Link></li>
                            <li><Link className="nav-link" to="/sales">Ventas</Link></li>
                            <li><Link className="nav-link" to="/users">Usuarios</Link></li>
                            <li><Link className="nav-link" onClick={() => loginWithRedirect()}>Iniciar Sesión</Link></li>
                            <li><Link className="nav-link" onClick={() => cerrarSesion()}>Cerrar Sesión</Link></li>
                            </ul>
                        
                    </div>
                </div>
            </nav>
        </div>
        

        
    )
}