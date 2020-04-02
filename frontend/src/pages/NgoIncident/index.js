import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { useState } from 'react';

export default function NgoIncident(){
    const ngoName = localStorage.getItem('ngoName');
    const ngoId = localStorage.getItem('ngoId');
    
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    
    //execute function when the variable changes. If it doesn't change, it executes only once.
    useEffect(() => {
        api.get('/ngo-incident', {
            headers: {
                Authorization: ngoId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ngoId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ngoId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id))
        }catch(err){
            alert('Error. Try again');
        }

    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="ngoIncident-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Welcome {ngoName}</span>

                <Link className="button" to="/ngo/incidents/new">Create new case</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Existing cases</h1>
            <ul>
            {incidents.map(incident => (
                 <li key={incident.id}>
                 <strong>CASE:</strong>
                 <p>{incident.title}</p>

                 <strong>DESCRIPTION:</strong>
                 <p>{incident.description}</p>

                 <strong>VALUE:</strong>
                 <p>{ Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(incident.value) }</p>
             
                 <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                     <FiTrash2 size={20} color="#a8a8b3" />
                 </button>
             </li>
            
            ))}
            </ul>
        </div>
    );
}
