import React, { Component } from 'react';
import M from 'materialize-css';
import PrivateRoute from './PrivateRoute';

export default class Salepage extends Component {
    constructor() {
        super();
        this.state = {
            _id: '',
            cart: [],
            clientID: '',
            clientName: '',
            seller: '',
            saleState: 'en proceso',
            total: '',
            sales: [],
            viewSales: [],
            filter: 'disponible',
            products: [],
            vacio: '',
            search: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        this.searchTask();
        this.fetchCart();
    }

    addTask(e) {
        e.preventDefault();
        if (this.state._id) {
            fetch(`https://catsoftbackend.herokuapp.com/api/sales/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    clientID: this.state.clientID,
                    clientName: this.state.clientName,
                    seller: this.state.seller,
                    saleState: this.state.saleState,
                    total: this.state.total
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    window.M.toast({ html: 'Venta Actualizada' });
                    this.setState({ _id: '', clientID: '', clientName: '', seller: '', sateState: 'en proceso', total: '' });
                    this.addEmptySale();
                    this.fetchSale();
                });
        }
    }

    deleteTask(id) {
        if (window.confirm('Are you sure you want to delete it?')) {
            fetch(`https://catsoftbackend.herokuapp.com/api/sales/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Venta Borrada' });
                    this.fetchSale();
                });
        }
    }

    editTask(id) {
        fetch(`https://catsoftbackend.herokuapp.com/api/sales/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    _id: data._id,
                    clientID: data.clientID,
                    clientName: data.clientName,
                    seller: data.seller,
                    saleState: data.saleState,
                    total: data.total

                });
                this.fetchCart()
            });
    }

    editPlus(id, productid, productdesc, eunit, unitprice, saleid) {
        fetch(`https://catsoftbackend.herokuapp.com/api/carts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                ProductID: productid,
                productDescription: productdesc,
                unit: (eunit + 1),
                unitPrice: unitprice,
                _id: id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.fetchCart();
            });
    }

    editMinus(id, productid, productdesc, eunit, unitprice, saleid) {
        if (eunit > 0) {
            fetch(`https://catsoftbackend.herokuapp.com/api/carts/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ProductID: productid,
                    productDescription: productdesc,
                    unit: (eunit - 1),
                    unitPrice: unitprice,
                    _id: id
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    this.fetchCart();
                });
        }
    }

    addProduct(id, description, price) {
        fetch('https://catsoftbackend.herokuapp.com/api/carts', {
            method: 'POST',
            body: JSON.stringify({
                ProductID: id,
                productDescription: description,
                unit: 1,
                unitPrice: price,
                saleID: this.state._id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.M.toast({ html: 'Venta guardada' });
                this.fetchCart();
            })
            .catch(err => console.error(err));
    }

    addEmptySale() {
        fetch('https://catsoftbackend.herokuapp.com/api/sales', {
            method: 'POST',
            body: JSON.stringify({
                clientID: '',
                clientName: '',
                seller: '',
                saleState: '',
                total: 0

            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.fetchSale();
            })
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.fetchSale();
        this.fetchProduct();
        this.fetchCart();
    }

    fetchSale() {
        fetch('https://catsoftbackend.herokuapp.com/api/sales')
            .then(res => res.json())
            .then(data => {
                this.setState({ sales: data });
                this.filterTableSales();
            });
    }

    fetchProduct() {
        fetch('https://catsoftbackend.herokuapp.com/api/products')
            .then(res => res.json())
            .then(data => {
                this.setState({ products: data });
                this.filterProductTable();
                this.filterSales();
            });

    }

    fetchCart() {
        fetch('https://catsoftbackend.herokuapp.com/api/carts')
            .then(res => res.json())
            .then(data => {
                this.setState({ cart: data });
                this.filterCartTable();
                this.refreshTotal()
            });
    }

    refreshTotal() {
        this.setState({ total: 0 });
        this.state.cart.map(carts => {
            return (
                this.setState({ total: parseFloat(this.state.total) + parseFloat(carts.unit * carts.unitPrice) })
            )
        });
    }


    filterSales() {
        this.state.sales.filter(item => {
            if (item.clientID === null) {
                return (this.setState({ _id: item._id }))
            }
        });
    }

    filterProductTable() {
        var filter = this.state.products.filter(item => {
            if (item.stock.toString() === "disponible") {
                return item
            }
        });
        this.setState({ products: filter });
    }

    filterCartTable() {
        var filter = this.state.cart.filter(item => {
            if (item.saleID.toString() === this.state._id) {
                return item
            }
        });
        this.setState({ cart: filter });
    }

    filterTableSales() {
        var filter = this.state.sales.filter(item => {
            if (item.clientID !== null) {
                return item
            }
        });
        this.setState({ viewSales: filter });
    }

    searchTask = () => {
        var search = this.state.viewSales.filter(item => {
            if (item._id.toString().includes(this.state.search) ||
                item.clientName.toString().includes(this.state.search)) {
                return item
            }
        });
        this.setState({ viewSales: search })
    }

    render() {
        return (
            <PrivateRoute>

            <div>
                <center>
                    <h4 className="grey-text text-darken-4" >Gestión de ventas</h4>
                </center>
                <div className="container">
                    <div className="row">
                        <div className="col s4">
                            <div className="card">
                                <div className="card-content">
                                    <div>
                                        <p>Generar ID</p>
                                        <button onClick={() => this.filterSales()} className="btn grey darken-4">
                                            <i className="material-icons">loop</i>
                                        </button>
                                    </div>
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="_id" onChange={this.handleChange} value={this.state._id} type="text" placeholder="ID Venta" disabled />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="clientID" onChange={this.handleChange} value={this.state.clientID} type="number" placeholder="ID Cliente" autoFocus />
                                            </div>
                                            <div className="input-field col s12">
                                                <input name="clientName" onChange={this.handleChange} value={this.state.clientName} type="text" placeholder="Nombre Cliente" autoFocus />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="Vendedor" type="text" onChange={this.handleChange} value={this.state.seller} placeholder="Seller"></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="saleState" type="text" placeholder="Estado" onChange={this.handleChange} value={this.state.saleState} disabled="disabled"></input>
                                            </div>
                                            <p>
                                                <label>
                                                    <input name="saleState" type="checkbox" className="filled-in" value="entregada" onChange={this.handleChange} />
                                                    <span style={{ margin: '4px' }}>Entregada</span>
                                                </label>
                                                <label>
                                                    <input name="saleState" type="checkbox" className="filled-in" value="cancelada" onChange={this.handleChange} />
                                                    <span style={{ margin: '4px' }}>Cancelada</span>
                                                </label>
                                            </p>
                                        </div>
                                        <button type="submit" className="btn grey darken-4">
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col s7">
                            <div className="card-panel">
                                <center>
                                    <h5 className="grey-text text-darken-4" >Productos disponibles</h5>
                                    <i className="material-icons">assignment_turned_in</i>
                                </center>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID Producto</th>
                                            <th>Descripción</th>
                                            <th>Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.products.map(products => {
                                                return (
                                                    <tr key={products._id}>
                                                        <td>{products._id}</td>
                                                        <td>{products.description}</td>
                                                        <td>{products.price}</td>
                                                        <td>
                                                            <button onClick={() => this.addProduct(products._id, products.description, products.price)} className="btn grey darken-4">
                                                                <i className="material-icons">local_grocery_store</i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="card-panel">
                        <center>
                            <h5 className="grey-text text-darken-4" >Carrito de compras</h5>
                            <i className="material-icons">local_grocery_store</i>
                        </center>
                        <div className="col s8">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio Unitario</th>
                                        <th>Descripción</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.cart.map(carts => {
                                            return (
                                                <tr key={carts._id}>
                                                    <td>{carts.ProductID}</td>
                                                    <td>
                                                        <button onClick={() => this.editPlus(carts._id, carts.ProductID, carts.productDescription, carts.unit, carts.unitPrice)} className="btn grey darken-4" style={{ margin: '4px' }}>
                                                            <i className="material-icons">expand_less</i>
                                                        </button>
                                                        {carts.unit}
                                                        <button onClick={() => this.editMinus(carts._id, carts.ProductID, carts.productDescription, carts.unit, carts.unitPrice)} className="btn grey darken-4" style={{ margin: '4px' }}>
                                                            <i className="material-icons">expand_more</i>
                                                        </button>
                                                    </td>
                                                    <td>{carts.unitPrice}</td>
                                                    <td>{carts.productDescription}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Total</th>
                                        <th>{this.state.total}</th>
                                        <th>
                                            <button onClick={() => this.fetchCart()} className="btn grey darken-4">
                                                <i className="material-icons">loop</i>
                                            </button>
                                        </th>
                                    </tr>
                                </tfoot>

                            </table>
                        </div>
                    </div>
                    <div className="card-panel">
                        <center>
                            <h4 className="grey-text text-darken-4" >Lista de ventas</h4>
                            <i className="material-icons">assignment</i>
                        </center>
                        <div className="nav-wrapper">
                            <form>
                                <div className="input-field">
                                    <input id="search" name="search" type="search" value={this.state.search} onChange={this.handleChange} required placeholder="Buscar venta por codigo o nombre cliente" />
                                    <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                    <i className="material-icons" onClick={() => this.fetchSale()}>close</i>
                                </div>
                            </form>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID Venta</th>
                                        <th>ID Cliente</th>
                                        <th>Nombre Cliente</th>
                                        <th>Vendedor</th>
                                        <th>Estado</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.viewSales.map(sales => {
                                            return (
                                                <tr key={sales._id}>
                                                    <td>{sales._id}</td>
                                                    <td>{sales.clientID}</td>
                                                    <td>{sales.clientName}</td>
                                                    <td>{sales.seller}</td>
                                                    <td>{sales.saleState}</td>
                                                    <td>{sales.total}</td>
                                                    <td>
                                                        <button onClick={() => this.editTask(sales._id)} className="btn grey darken-4" style={{ margin: '4px' }}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </PrivateRoute>
        )
    }
}