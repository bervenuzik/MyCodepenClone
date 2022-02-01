import React, { useState, useEffect ,useRef} from "react";
import "./styles/App.css";
import 'normalize.css';
import Redactor from  "./Redactor.jsx"

function App() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [source, setSource] = useState("");
  const topPanel = useRef()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSource(`<html>
      <body>${html}</body>
      <style>${css}</style>
      <script>
      try{
        ${js} 
      }catch (e){
        console.log(e)
      }
      </script>
      </html>
      `);
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [html, css, js]);

  return (
    <div className="mainWrapper">
      <Redactor html={html} setHtml={setHtml} css={css} setCss={setCss} js={js} setJs={setJs}></Redactor>
      <div className="panel bottom-panel">
        <iframe
          srcDoc={source}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"   
        />
      </div>
    </div>
  );
}

export default App;
