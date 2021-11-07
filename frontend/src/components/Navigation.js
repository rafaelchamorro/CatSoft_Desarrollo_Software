import React from 'react';
import { Link } from 'react-router-dom'

export default function Navigation() {
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
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}