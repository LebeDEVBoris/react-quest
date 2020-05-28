import React from 'react';
import './../spinner.css'

export default function Question({ data, title, loading, computateResult}) {

  return (
    <div className="question">
      {!loading && <h2 dangerouslySetInnerHTML={{ __html: title }} />}
      
      {/* Loading HTML Class */}
      { loading && <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> }
      

      {!loading && data.map((question, index) => (
        <button key={index} onClick={() => computateResult(index)}>{question}</button>
      ))}
    </div>
  );
}
