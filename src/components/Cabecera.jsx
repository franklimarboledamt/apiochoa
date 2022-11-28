import React, { useState, useEffect } from 'react'

function Cabecera() {

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
      <div>
         Cabecera
         {
            data.map((item) => <p>{item.status}</p>)
         }
      </div>
   )
}
export default Cabecera;