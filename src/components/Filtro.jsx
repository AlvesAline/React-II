import React, {useState, useEffect} from 'react';
import Axios from 'axios'

import './style.css';

const Filtro = () => {  //montando o componenete
    const [alunos, setAlunos] = useState([]) //guarda as informações e atualiza
    const [pesquisaAluno, setPesquisaAluno] = useState('') // usa para filtra os alunos
    const [pesquisaCasa, setPesquisaCasa] = useState('') 
    const [filtrosAlunos, setFiltrosAlunos] = useState([]) 

    useEffect(() => {
        todosAlunos()
    }, [])

    useEffect(() => {  //mostra o que ta dentro daqui primeiro?!
        setFiltrosAlunos(
            alunos.filter(e => {
                return e.name.toLowerCase().includes(pesquisaAluno.toLowerCase())
            })
        )
        //console.log(pesquisaAluno);
    },[pesquisaAluno, alunos])      
    
    useEffect(() => {
        setFiltrosAlunos(
            alunos.filter(e => {
                return e.house.toLowerCase().includes(pesquisaCasa.toLowerCase())
            })
        )
        console.log(pesquisaAluno);
    },[pesquisaCasa, alunos])    //recupero toda vez que é chamada

    const todosAlunos = async () => {
        const estados  = await Axios.get('http://hp-api.herokuapp.com/api/characters') 
        setAlunos(estados.data)
    }
    
    return (
        <div className="primeira-div">
            <h1>Harry Potter</h1>
            <input className="pesquisa-nome" onChange={e => {setPesquisaAluno(e.target.value)}} placeholder="Digite o nome Aluno"/> <br/>
            <input className="pesquisa-casa" onChange={e => {setPesquisaCasa(e.target.value)}} placeholder="Digite a casa Aluno"/>
            <ul>
            {filtrosAlunos.map(item => (
                <li  key={item.name}>
                    Nome: {item.name}<br />
                    Casa: {(item.house.length > 0) ? item.house : 'Sem Casa'}<br/>
                    Especies: {item.species}<br/>
                    <img src={item.image} width="200px" height="200px" alt={item.name}/>
                </li>
            ))}
            </ul>
        </div>
    ) 
}
export default Filtro
