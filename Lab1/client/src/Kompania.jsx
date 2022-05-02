import React,{Component, useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import KompaniaUpdate from './KompaniaUpdate';


export default function Kompania() {

    const[kompanite, setKompanite] = useState([]);

    const [refreshKey, setRefreshKey] = useState('0');
    
    //get data from database
    useEffect(() => {
        axios.get('https://localhost:7138/api/Kompania/GetKompanite')
            .then(response => {
                setKompanite(response.data);
            })
    }, [refreshKey])




    //Delete data in database    
    function deleteKompania(kompaniaId) {
        const confirmBox = window.confirm(
            "A jeni i sigurte qe po doni me fshi kompanine me id " + kompaniaId  +"? Mos paqsh mo pune me ta. " 
        )
        if (confirmBox === true) {
            axios.delete('https://localhost:7138/api/Kompania/FshijKompanine?id=' + kompaniaId)
                .then(() => {
                    setRefreshKey(refreshKey => refreshKey + 1)
                })
        }
        else {
            console.log("Process of deleting a company canceled !!");
        }
    }

    //Set data to database
    const [name, setName] = useState('');
    const [adress, setAdress] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    

    const handleAdd = (e) => {
        e.preventDefault();
        const kompania = { name, adress, city, email, contactNumber };

        axios.post('https://localhost:7138/api/Kompania/ShtoKompani', kompania)
            .then(() => {
               window.confirm('Kompania u shtua me sukses! Perhajr...')
            })
            .then(() => {
            setRefreshKey(refreshKey => refreshKey + 1)
        })
    }

        return(
            <div>

            <form onSubmit={handleAdd}>
                                <TextField
                                    required
                                    id="filled-required"
                                    label="Name"
                                    variant="standard"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            <TextField
                                id="filled-number"
                                label="Adress"
                                variant="standard"
                                value={adress}
                                onChange={(e) => setAdress(e.target.value)}
                            />
                            <TextField
                                id="filled"
                                label="City"
                                variant="standard"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <TextField
                                id="filled"
                                label="Email"
                                variant="standard"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                             <TextField
                                id="filled"
                                label="Numri Kontaktues"
                                type="number"
                                variant="standard"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                            />
                           
                           <button type="submit" className="btn btn-outline-secondary">
                               Shto Kompanine
                            </button>
                </form>
                <br />
                <br />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Emri</th>
                            <th>Adresa</th>
                            <th>Qyteti</th>
                            <th>Email</th>
                            <th>Numri kontaktues</th>
                            <th>Opsionet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kompanite.map(kompania=>(
                           <tr key={kompania.id}>
                               <td>{kompania.id}</td>
                               <td>{kompania.name}</td>
                               <td>{kompania.adress}</td>
                               <td>{kompania.city}</td>
                               <td>{kompania.email}</td>
                               <td>{kompania.contactNumber}</td>
                               <td>
                                  <button type="button"  
                                   className="btn btn-light mr-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                   </button>
                                   <button type="button" onClick={() => deleteKompania(kompania.id)}
                                   className="btn btn-light mr-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                   </button>
                               </td>
                           </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    )
    
}