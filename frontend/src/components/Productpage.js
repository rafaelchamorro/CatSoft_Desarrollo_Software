import React, { Component } from 'react'
import M from 'materialize-css';
import PrivateRoute from './PrivateRoute';


export default class Productpage extends Component {
    constructor() {
        super();
        this.state = {
            description: '',
            price: '',
            stock: '',
            _id: '',
            products: [],
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
    }

    addTask(e) {
        e.preventDefault();
        if (this.state._id) {
            fetch(`https://catsoftbackend.herokuapp.com/api/products/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    description: this.state.description,
                    price: this.state.price,
                    stock: this.state.stock
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    window.M.toast({ html: 'Task Updated' });
                    this.setState({ _id: '', description: '', price: '', stock: '' });
                    this.fetchProduct();
                });
        } else {
            fetch('https://catsoftbackend.herokuapp.com/api/products', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.M.toast({ html: 'Task Saved' });
                    this.setState({ description: '', price: '', stock: '' });
                    this.fetchProduct();
                })
                .catch(err => console.error(err));
        }

    }

    deleteTask(id) {
        if (window.confirm('Are you sure you want to delete it?')) {
            fetch(`https://catsoftbackend.herokuapp.com/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Task deleted' });
                    this.fetchProduct();
                });
        }
    }

    editTask(id) {
        fetch(`https://catsoftbackend.herokuapp.com/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    _id: data._id
                });
            });
    }

    searchTask = () => {
        var search = this.state.products.filter(item => {
            if (item.description.toString().includes(this.state.search) ||
                item._id.toString().includes(this.state.search)) {
                return item
            }
        });
        this.setState({ products: search })
    }

    componentDidMount() {
        this.fetchProduct();
    }

    fetchProduct() {
        fetch('https://catsoftbackend.herokuapp.com/api/products')
            .then(res => res.json())
            .then(data => {
                this.setState({ products: data });
                console.log(this.state.products);
            });
    }


    render() {
        return (
            <PrivateRoute>

            <div>
                <center>
                    <h4 className="brown-text text-darken-2">Gestión de productos</h4>
                </center>
                <div className="nav-wrapper">
                    <form>
                        <div className="input-field">
                            <input id="search" name="search" type="search" value={this.state.search} onChange={this.handleChange} required placeholder="Buscar producto por codigo de barras o descripción" />
                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            <i className="material-icons" onClick={() => this.fetchProduct()}>close</i>
                        </div>
                    </form>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col s4">
                            <div className="card">
                                <div className="card-content">

                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="codeID" onChange={this.handleChange} value={this.state._id} type="text" placeholder="Codigo de barras" disabled />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} value={this.state.description} cols="30" rows="10" placeholder="Descripción de producto" className="materialize-textarea"></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="price" onChange={this.handleChange} value={this.state.price} type="number" placeholder="Precio por unidad $" autoFocus />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="stock" type="text" placeholder="Stock" onChange={this.handleChange} value={this.state.stock} disabled="disabled"></input>
                                            </div>
                                            <p>
                                                <label>
                                                    <input name="stock" type="checkbox" className="filled-in" value="disponible" onChange={this.handleChange} />
                                                    <span style={{ margin: '4px' }}>Disponible</span>
                                                </label>
                                                <label>
                                                    <input name="stock" type="checkbox" className="filled-in" value="no disponible" onChange={this.handleChange} />
                                                    <span style={{ margin: '4px' }}>No Disponible</span>
                                                </label>
                                            </p>
                                        </div>

                                        <button type="submit" className="btn brown darken-2">
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s8">
                            <div class="card-panel">
                                <center>
                                    <h5 className="grey-text text-darken-4" >Lista de productos</h5>
                                    <i className="material-icons">assignment</i>
                                </center>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Codigo de barras</th>
                                            <th>Descripción</th>
                                            <th>Precio</th>
                                            <th>Stock</th>
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
                                                        <td>{products.stock}</td>
                                                        <td>
                                                            <button onClick={() => this.deleteTask(products._id)} className="btn brown darken-2">
                                                                <i className="material-icons">delete</i>
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button onClick={() => this.editTask(products._id)} className="btn brown darken-2" style={{ margin: '4px' }}>
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

            </div>
            </PrivateRoute>
        )
    }
}