import type { NextPage } from 'next'
import {FormEvent, useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

const Home: NextPage = () => {
    const [nombre, setNombre] = useState('');
    const [medida, setMedida] = useState('');
    const [celular, setCelular] = useState('');
    const [message, setMessage] = useState('');
    const [direccion, setDireccion] = useState('');
    const [medio_pago, setMedio_pago] = useState('');
    const [sabor, setSabor] = useState('');
    const [sabores, setSabores] = useState<{ value: string; label: string }[]>([]);
    const [saboresSeleccionados, setSaboresSeleccionados] = useState<{ value: string; label: string }[]>([]);


    useEffect(() => {
        const fetchSabores = async () => {
            const response = await fetch('/api/fetchData');
            const data = await response.json();
            const options = data.rows.map((row: string[]) => ({ value: row[0], label: row[0] }));
            setSabores(options);
        };

        fetchSabores();
    }, []);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let form = {
            nombre,
            medida,
            sabor,
            celular,
            direccion,
            medio_pago,
            message,
            sabores: saboresSeleccionados.map(sabor => sabor.value).join(', ')

        }

        const rawResponse = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
        const content = await rawResponse.json();

        // print to screen
        alert(content.data.tableRange)

        // Reset the form fields
        setNombre('')
        setMedida('')
        setCelular('')
        setDireccion('')
        setMessage('')
        setSaboresSeleccionados([])

    }

    return (
        <main className="bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto py-16">
                <form className="py-4 space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center space-y-2">
                        <FontAwesomeIcon icon={faIceCream} className="text-4xl text-indigo-600" />
                        <h2 className="text-2xl font-bold text-center text-indigo-600">Heladeria</h2>
                    </div>
                    <div className="flex items-center justify-center">
                        <label htmlFor="nombre" className="sr-only">Nombre</label>
                        <input value={nombre} onChange={e => setNombre(e.target.value)} type="text" name="nombre" id="nombre" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md" placeholder="Tu nombre" />
                    </div>
                    <div className="flex items-center justify-center">
                        <label htmlFor="medida" className="sr-only">Medida</label>
                        <select 
                        required 
                        value={medida} 
                        onChange={e => setMedida(e.target.value)} 
                        name="medida" 
                        id="medida" 
                        className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md">
                            <option value="" disabled hidden>Elegi el tamaño</option>
                            <option value="un cuarto">1/4</option>
                            <option value="medio kg">1/2 KG</option>
                            <option value="medio kg">1 KG</option>
                        </select>
                    </div>  
                    <div className="flex items-center justify-center">
                        <label htmlFor="sabores" className="sr-only">Sabores</label>
                        <Select
                            required
                            isMulti
                            value={saboresSeleccionados}
                            onChange={options => setSaboresSeleccionados(options ? options.slice(0, 4) : [])}
                            options={sabores}
                            placeholder="Elegí hasta 4 sabores"
                            className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md"
                            isSearchable={false}
                        />

                    </div>
        
                    <div className="flex items-center justify-center">
                        <label htmlFor="celular" className="sr-only">Celular</label>
                        <input required value={celular} onChange={e => setCelular(e.target.value)} type="number" name="celular" id="celular" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md" placeholder="Celular" />
                    </div>
                    <div className="flex items-center justify-center">
                        <label htmlFor="direccion" className="sr-only">Direccion</label>
                        <input required value={direccion} onChange={e => setDireccion(e.target.value)} type="tel" name="direccion" id="direccion" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md" placeholder="Direccion de envio" />
                    </div>
                    <div className="flex items-center justify-center">
                        <label htmlFor="medio_pago" className="sr-only">Medio de pago</label>
                        <select required value={medio_pago} onChange={e => setMedio_pago(e.target.value)} name="medio_pago" id="medio_pago" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md">
                            <option value="" disabled hidden>Metodo de pago</option>
                            <option value="efectivo">Efectivo</option>
                            <option value="transferencia">Transferencia</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        <label htmlFor="message" className="sr-only">Message</label>
                        <textarea value={message} onChange={e => setMessage(e.target.value)} id="message" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md" placeholder="Your Message" />
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="flex items-center justify-center text-sm w-64 rounded-md shadow py-3 px-2 text-white bg-indigo-600">Save</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Home
