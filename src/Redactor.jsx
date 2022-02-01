
import React, { useRef } from 'react';
import Editor from "./Editor.jsx"


const Redactor = function(props){

let  {html,setHtml,css,setCss,js,setJs} = props;
const topPanel = useRef()


    return(
    <div ref={topPanel} className="panel top-panel">
        <Editor parentElement={topPanel}  isFirst={true} value={html} valueHandler={setHtml} logo={"HTML"} lang="xml" />
        <Editor parentElement={topPanel}  value={css} valueHandler={setCss} logo={"CSS"} lang="css" />
        <Editor parentElement={topPanel}  value={js} valueHandler={setJs} logo={"JS"} lang="javascript" />
    </div>
    )
}
export default Redactor