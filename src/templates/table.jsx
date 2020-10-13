import React, { Component } from 'react'


class Table extends Component {
    state = { 
        title: "", columns: {} }


    renderHeader = (header) =>{
      return(
    <thead>
        <tr>
        {header.map(h => <th scope="col" className={h.className}>{h.label}</th>)}
        </tr>
      </thead>

      )}

    renderBody = () =>{
        
    }
    

}
 
export default Table;