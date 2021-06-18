import React, {useState, useEffect} from 'react';
import Axios from 'axios'

const Filtro = () => {  //montando o componenete
    const [lista, setLista] = useState([]) //guarda as informações e atualiza
    const [pesquisa, setPesquisa] = useState('') // usa para filtra os estados
    const [filtrosEstados, setfiltrosEstados] = useState([]) 

    useEffect(() => {
        todosEstados()
    }, [])

    useEffect(() => {
        setfiltrosEstados(
            lista.filter(e => {
                return e.nome.includes(pesquisa)
            }
                
            )
        )
        console.log(pesquisa);
    },[pesquisa, lista])                                       //recupero toda vez que é chamada

    const todosEstados = async () => {
        const estados  = await Axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados') 
        console.log(estados.data);
        setLista(estados.data)
    }

    const estadosBr = async () =>{
        const estados = await Axios.get('http://servicodados.ibge.gov.br/api/v3/malhas/estados/{id} ')
        const lista = await estados.SE
        console.log(lista);
    }
    
    return (
        <div>
            <h1>Ola mundo</h1>

            <input onChange={e => {setPesquisa(e.target.value)}} placeholder="Digite o estado"/>
            <button onClick={estadosBr}>
                Buscar UF
            </button>
            <ul>
            {filtrosEstados.map(item => (
                <li><a key={item.id} href="#">{item.nome}</a></li>
            ))}
            </ul>
        </div>
    ) 
}
export default Filtro