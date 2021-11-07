import React from 'react';
import sample from '../images/sample.jpg';

export default function Home() {
    return (
        <div>
            <div className="container">
                <div className="col s12 m7">
                    <div className="card">
                        <div className="card-image">
                            <img src={sample} />
                            <span className="card-title">Don Cat's Shop</span>
                        </div>
                        <div className="card-content">
                            <p>Bienvenidos a la app de gestión de la tienda de productos para mascotas Don Cat´s Shop, elaborado por el equipo de desarrollo CatSoft de misión TIC ciclo 3.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}