import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    //used for redirect
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data ={
            name,
            email,
            whatsapp,
            city,
            state
        }

        try {
            const response = await api.post('/ngos', data);
    
            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');
        }catch (err){
            alert('Error on register. Try again later.');
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Register</h1>

                    <p>Register and help people to find the cases of your NGO.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        I'am  registered
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="NGO Name" 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp" 
                        value={whatsapp} 
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="City" 
                            value={city} 
                            onChange={e => setCity(e.target.value)}
                        />
                        <input 
                            style={{ width: 95 }} 
                            placeholder="State" 
                            value={state} 
                            onChange={e => setState(e.target.value)}
                        />
                    </div>

                    
                    <button className="button" type="submit">Register</button>

                </form>
            </div>
        </div>
    );
}