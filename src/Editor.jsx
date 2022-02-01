import React, { useRef, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./styles/Editor.css";
import { BiMoveVertical } from "react-icons/bi";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/css/css");
require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");

const Editor = function (props) {
  let { value, valueHandler, lang, logo, isFirst, parentElement } = props;
  const editor = useRef();
  const button = useRef();

  let element 
  let prev 
  let next 
  let elementHeight;
  let prevHeight;
  let offset;
  let nextHeight;
  let elementHeader;
  let prevHeader
  let nextHeader
  let startPosition = 0;
  let dirty = true; 
  let clicked = false;
  
  useEffect(() => {
    parentElement.current.addEventListener("mouseup", makeNotClicked);
    window.addEventListener("mousemove", changeHeigth);
    if(!editor.current.nextElementSibling){
      editor.current.classList.add("last")
    }
    
  });

  async function disableButtons (){
    const buttons = document.getElementsByClassName("movingButton");

    [...buttons].forEach(button => {
      button.disabled = true;
    });
    return true
  }
  async function enableButtons (){
    const buttons = document.getElementsByClassName("movingButton");

    [...buttons].forEach(button => {
      button.disabled = false;
    });
    return true
  }
  async function  expandAnimation(data){
  disableButtons();
  toggleTransition()
  const editors = document.getElementsByClassName("editor");
  const delay = 310

  console.log(editors);
  if(![...editors][0].classList.contains("expanded")){

  
  [...editors].forEach((editor)=>{
    if(editor === data.element){
       data.element.style.height = window.innerHeight  - data.elementHeader.offsetHeight * 2 + "px";
      }
      if(editor !== data.element){
        console.log('no')
        editor.style.height = data.elementHeader.offsetHeight +"px";
       }
       editor.classList.toggle("expanded")
      

  })
  let promise = new Promise ((resolve)=>{
    setTimeout(()=>{toggleTransition();enableButtons()},delay);
  })
  await promise;
}

if([...editors][0].classList.contains("expanded")){
  [...editors].forEach((editor)=>{
    
      
        editor.style.height = 33.3 +"%";
       editor.classList.toggle("expanded")
      

  })
  let promise = new Promise ((resolve)=>{
    setTimeout(()=>{toggleTransition();enableButtons();},delay);
  })
  await promise;
}

  }
  async function toggleTransition (){
    const editors = document.getElementsByClassName("editor");
    [...editors].forEach((editor)=>{
          editor.classList.toggle("transition")
    })
  }
  function makeClicked(event) {
    clicked = true;
    element = editor.current;
    prev = element.previousElementSibling;
    next = element.nextElementSibling ? element.nextElementSibling : null;
    elementHeight = editor.current.offsetHeight;
    startPosition = event.clientY;
    prevHeight = prev.offsetHeight;
    nextHeight = next ? next.offsetHeight : null;
    elementHeader = element.childNodes[0];
    prevHeader = prev.childNodes[0];
    nextHeader = next? next.childNodes[0] : null;
  }
  function makeNotClicked() {
    clicked = false;
    elementHeight = null;
    startPosition = 0;
    offset = 0;
    dirty = true;
  }
  function changeStartPoint(event) {
    elementHeight = element.offsetHeight; 
    prevHeight = prev.offsetHeight;    
    offset = 0;
    startPosition = startPosition = button.current.getBoundingClientRect().bottom - button.current.getBoundingClientRect().height / 2;
    
  }
  async function expandEditor(){
    const element = editor.current;
    const prev = element.previousElementSibling? element.previousElementSibling : null;
    const next = element.nextElementSibling ? element.nextElementSibling : null;
    const elementHeader = element.childNodes[0];
    
    const data = {
      element : element,
      prev :prev,
      next : next,
      elementHeader : elementHeader,
    }
    
    prevHeight = prev? prev.offsetHeight:null;
    nextHeight = next ? next.offsetHeight : null; 
    prevHeader = prev? prev.childNodes[0] :null;
    nextHeader = next? next.childNodes[0] : null;

    await expandAnimation(data)

  }
  function changeHeigth(event) {
    if (clicked === true) {
      let reachedPrev = prev.offsetHeight <= prevHeader.getBoundingClientRect().height; 
      let reachedNext = next ? element.offsetHeight === elementHeader.getBoundingClientRect().height:null                    
      offset = event.clientY - startPosition;

      if (offset < 0) { //увеличиваем
        if (!reachedPrev) {
          element.style.height = elementHeight - offset + "px";
          prev.style.height = prevHeight + offset + "px";
          if(prevHeight + offset <= 40){
            prev.style.height = 40 + "px";
            element.style.height = element.getBoundingClientRect().bottom - prev.getBoundingClientRect().bottom  + "px";
            if(next){
              next.style.height = nextHeight;
            }
            changeStartPoint(event)
          }
        }else{
          if(dirty === true){
            changeStartPoint(event);
            dirty = false;
        }
        }
      }

      if (offset > 0 && elementHeader.getBoundingClientRect().bottom < window.innerHeight ) { //уменьшаем
        
        
        if (reachedNext) {
          if (dirty) {                    // изменяем начальную точку осчета когда достигаем следующий элемент
            changeStartPoint(event);
            dirty = false;
          } 
        } 
        if(!reachedNext) {
            element.style.height = elementHeight - offset + "px";
            prev.style.height = prevHeight + offset + "px";          
        }
        if(next && elementHeader.getBoundingClientRect().bottom > nextHeader.getBoundingClientRect().top){    // Возвращаем нормальный вид если элемент залез за следующий 
          element.style.height = elementHeader.offsetHeight +'px'  
          prev.style.height = prev.offsetHeight - (elementHeader.getBoundingClientRect().bottom - nextHeader.getBoundingClientRect().top) +"px"
          changeStartPoint(event);
        }
      }
    }
  }

  return (
    <div ref={editor} className="editor">
      <div title="dblClick to expand" className="editor__header" onDoubleClick={expandEditor}>
        {logo}
        <div>
          {isFirst ? null : (
            <button className="movingButton" ref={button} onMouseDown={makeClicked}>
              <BiMoveVertical size={"18px"} />
            </button>
          )}
        </div>
      </div>
      <div className="editorPanel">
        <CodeMirror
          value={value}
          options={{
            mode: lang,
            theme: "material",
            lineNumbers: true,
            lineWrapping: true,
            lint: true,
          }}
          onBeforeChange={(editor, data, value) => {
            valueHandler(value);
          }}
        />
      </div>
    </div>
  );
};
export default Editor;
