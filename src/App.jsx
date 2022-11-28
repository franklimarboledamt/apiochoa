import React, { useEffect, useState } from 'react';
import Cabecera from './components/Cabecera';
import './styles/styles.css';

function App() {

  /*   const url = 'http://enlazaa.ws/api/v1/test/gettest/937756ea-6c3a-44fb-876b-7d7bc4b430b9';
    const [prueba, setPrueba] = useState();
    const [cabece, setCabece] = useState();
    const fetchApi = async () => {
      const response = await fetch(url);
      //console.log(response.status);
      const responseJSON = await response.json();
      const areas = responseJSON.data.areas;
      setPrueba(areas);
      let infoCabecera = []
      infoCabecera = responseJSON.data;
      console.log(areas);
      console.log(infoCabecera);
  
      setCabece(infoCabecera);
    }
  
    useEffect(() => {
      fetchApi();
    }, [])
   */

  const [data, setData] = useState([]);
  const getData = () => {
    fetch('pruebas_academicas.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        console.log(response)
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div className="App">
      {
        data.map((item) => {
          const prueba = item.data.areas;
          return <div className='contenedor'>
            <div className='cabecera'>
              <div className='imagen'>
                <img src={item.data.image_url} alt='Imagen' />
              </div>
              <div className='contenidoInfoPrueba'>
                <div className='labelsPrueba'>
                  <h2>Prueba:</h2>
                  <h2>Áreas:</h2>
                  <h2>Grado:</h2>
                </div>
                <div className='infoPrueba'>
                  <h2>{item.data.name}</h2>
                  <h2>{Object.keys(item.data.areas).length}</h2>
                  <h2>{item.data.grado}</h2>
                </div>
              </div>
            </div>
            <div className='contenido'>
              <div className='area'>
                <ul>
                  {
                    //!prueba ? 'Cargando...' :
                    prueba.map((area) => {
                      const materias = area.subjects;
                      return <li key={area.id}>
                        <h1 className='nombreArea'>{area.name}</h1>
                        <div className='materia'>
                          <ul>
                            {
                              materias.map((mat) => {
                                const preguntas = mat.questions;
                                return <li key={mat.id}>
                                  <h3 className='nombreMateria'>{mat.name}</h3>
                                  <div className='preguntas'>
                                    <ul>
                                      {
                                        preguntas.map((pre) => {
                                          const opciones = pre.responses;
                                          return <div className='pregunta'>
                                            <li key={pre.question_uuid}>
                                              <h4 className='nombrePregunta'>{pre.slug}</h4>
                                              <h5 className='contenidoPregunta' dangerouslySetInnerHTML={{ __html: pre.statement }}></h5>
                                              <div className='opciones'>
                                                <ul>
                                                  {
                                                    opciones.map((opc) => {
                                                      return <li key={opc.option}>
                                                        <input type='radio' value={opc.option} name={pre.question_uuid} />
                                                        {opc.option}. <span dangerouslySetInnerHTML={{ __html: opc.content }}></span>
                                                      </li>
                                                    })
                                                  }
                                                </ul>
                                              </div>
                                            </li>
                                          </div>
                                        })
                                      }
                                    </ul>
                                  </div>
                                </li>
                              })
                            }
                          </ul>
                        </div>
                      </li>
                    })
                  }
                </ul>
              </div>
            </div >
          </div >
        })
      }
    </div >
  );
}

export default App;
