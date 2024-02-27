import React ,{useState , useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [users,setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3003/users");
        setUsers(result.data.reverse());
    };

    const deleteUser = async id => {
        await axios.delete(`http://localhost:3003/users/${id}`);
        loadUsers();
    }

    return(
        <div className="container">
            <div className="py-4">
                <h1>home page</h1>
                <table class="table border shadow">
                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                    {
                        users.map((user,index) => (
                            <tr>
                                <th scope="row">{index  + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link class="btn btn-primary" to={`/user/${user.id}`}>view</Link><Link> </Link>
                                    <Link class="btn btn-outline-primary" to={`/users/edit/${user.id}`}>Edit</Link><Link> </Link>
                                    <Link class="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</Link>
                                </td>
                            </tr>
                        ))
                    }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
