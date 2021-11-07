import React, { Component } from 'react'
import M from 'materialize-css';

export default class Userpage extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            userState: 'pendiente',
            rol: 'ninguno',
            _id: '',
            users: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    addTask(e) {
        e.preventDefault();
        if (this.state._id) {
            fetch(`https://catsoftbackend.herokuapp.com/api/users/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    userState: this.state.userState,
                    rol: this.state.rol
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    window.M.toast({ html: 'User Updated' });
                    this.setState({ _id: '', name: '', email: '', userState: 'pendiente', rol: 'ninguno' });
                    this.fetchUser();
                });
        } else {
            fetch('https://catsoftbackend.herokuapp.com/api/users', {
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
                    window.M.toast({ html: 'User Saved' });
                    this.setState({ name: '', email: '', userState: 'pendiente', rol: '' });
                    this.fetchUser();
                })
                .catch(err => console.error(err));
        }

    }

    deleteTask(id) {
        if (window.confirm('Are you sure you want to delete it?')) {
            fetch(`https://catsoftbackend.herokuapp.com/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'User deleted' });
                    this.fetchUser();
                });
        }
    }

    editTask(id) {
        fetch(`https://catsoftbackend.herokuapp.com/api/users/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    name: data.name,
                    email: data.email,
                    userState: data.userState,
                    rol: data.rol,
                    _id: data._id
                });
            });
    }

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser() {
        fetch('https://catsoftbackend.herokuapp.com/api/users')
            .then(res => res.json())
            .then(data => {
                this.setState({ users: data });
                console.log(this.state.users);
            });
    }


    render() {
        return (
            <div>
                <center>
                    <h4 className="blue-grey-text text-darken-2">Gestión de usuarios</h4>
                </center>
                <div className="container">
                    <div className="row">
                        <div className="col s4">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="Ingrese nombre y apellido" autoFocus />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="email" type="email" className="validate" onChange={this.handleChange} value={this.state.email} />
                                                <label htmlFor="email">Email</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="userState" type="text" placeholder={this.state.userState} onChange={this.handleChange} value={this.state.userState} disabled="disabled"></input>
                                            </div>
                                            <p>
                                                <label>
                                                    <input name="userState" type="checkbox" className="filled-in" value="autorizado" onChange={this.handleChange} />
                                                    <span style={{ margin: '4px' }}>Autorizado</span>
                                                </label>
                                                <label>
                                                    <input name="userState" type="checkbox" className="filled-in" value="no autorizado" onChange={this.handleChange} />
                                                    <span style={{ margin: '4px' }}>No Autorizado</span>
                                                </label>
                                            </p>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="rol" type="text" placeholder="Rol de usuario" onChange={this.handleChange} value={this.state.rol} disabled="disabled"></input>
                                            </div>
                                            <p>
                                                <label>
                                                    <input name="rol" type="checkbox" className="filled-in" value="admin" onChange={this.handleChange} />
                                                    <span style={{ margin: '4px' }}>Administrador</span>
                                                </label>
                                                <label>
                                                    <input name="rol" type="checkbox" className="filled-in" value="seller" onChange={this.handleChange} />
                                                    <span style={{ margin: '4px' }}>Vendedor</span>
                                                </label>
                                            </p>
                                        </div>

                                        <button type="submit" className="btn blue-grey darken-2">
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s8">
                            <div class="card-panel">
                                <center>
                                    <h5 className="grey-text text-darken-4" >Lista de usuarios</h5>
                                    <i className="material-icons">assignment</i>
                                </center>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Estado</th>
                                            <th>Rol</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.users.map(users => {
                                                return (
                                                    <tr key={users._id}>
                                                        <td>{users.name}</td>
                                                        <td>{users.email}</td>
                                                        <td>{users.userState}</td>
                                                        <td>{users.rol}</td>
                                                        <td>
                                                            <button onClick={() => this.deleteTask(users._id)} className="btn blue-grey darken-2">
                                                                <i className="material-icons">delete</i>
                                                            </button>
                                                            <button onClick={() => this.editTask(users._id)} className="btn blue-grey darken-2" style={{ margin: '4px' }}>
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
        )
    }
}