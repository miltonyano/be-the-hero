import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ngoId = localStorage.getItem('ngoId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data ={
            title,
            description,
            value
        };

        try{
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ngoId
                }
            });

            history.push('/ngo/incidents');
        }catch(err){
            alert('Error. Please try again later');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Create new case</h1>

                    <p>Describe your case to find a hero to solve it.</p>

                    <Link className="back-link" to="/ngo/incidents">
                        <FiArrowLeft size={16} color="#E02041" />
                        Back to home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Case Title" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Description" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Value" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Create</button>

                </form>
            </div>
        </div>
    );
}