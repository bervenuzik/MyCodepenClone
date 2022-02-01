
  function changeHeigth(event) {
    if (clicked === true) {
      let reachedNext = next
        ? element.childNodes[0].getBoundingClientRect().bottom >=
          next.getBoundingClientRect().top
        : null; //event.clientY >= nextHeader.getBoundingClientRect().top   - buttonOffsetNext //
      // let ReachedPrev =
      //   event.clientY <
      //   prevHeader.getBoundingClientRect().bottom + buttonOffsetPrev;
      let ReachedPrev = prev.offsetHeight <= prev.childNodes[0].getBoundingClientRect().height;
        
      offset = event.clientY - startPosition;

      if (offset < 0) {
        if (!ReachedPrev) {
          element.style.height = elHeight - offset + "px";
          console.log("working I")
          prev.style.height = prevHeight + offset + "px";
        }else{
          if(collision === true){
            changeStartPoint(event);
            collision = false;
        }
        }
      }


      /////////////////////////////////////////////////////////////////



      if (offset > 0 && elementHeader.getBoundingClientRect().bottom < window.innerHeight ) {
        
        
        if (reachedNext) {
          if (collision === true) {
            changeStartPoint(event);
            collision = false;
          }

          if (next.childNodes[0].getBoundingClientRect().bottom < window.innerHeight) {//next.offsetHeight > next.childNodes[0].getBoundingClientRect().height
            
           // if (next.offsetHeight > next.childNodes[0].offsetHeight) { 
              next.style.height = nextHeight - offset + "px";
              prev.style.height = prevHeight + offset + "px";
              console.log(offset, "offset");
              console.log(previuosOffset, "previous");
              console.log("working II")
              if (previuosOffset > offset) {
                changeStartPoint(event);
                collision = true;
                nextHeight = next.style.height  
              }
          }else{
            console.log(next.childNodes[0].offsetHeight)
            next.height = next.childNodes[0].offsetHeight + "px";
            nextHeight = next.childNodes[0].offsetHeight + "px";
            //next.childNodes[1].classList.add("lastEditorPanelDisabler")
            //changeStartPoint(event);
            return
          }
          previuosOffset = offset;
        }
        if (collision) {
          element.style.height = elHeight - offset + "px";
          prev.style.height = prevHeight + offset + "px";
        }
      }
    }
  }



  let clicked = false;
  let startPosition = 0;
  let element;
  let prev;
  let next;
  let elHeight;
  let prevHeight;
  let offset;
  let collision = true;
  let buttonOffsetPrev;
  let buttonOffsetNext;
  let prevHeader;
  let nextHeader;
  let nextHeight;
  let elementHeader;
  let previuosOffset;

  useEffect(() => {
    parentElement.current.addEventListener("mouseup", makeNotClicked);
    parentElement.current.addEventListener("mouseleave", makeNotClicked);
    parentElement.current.addEventListener("mousemove", resizeEditors);
  });

  function makeClicked(event) {
    clicked = true;
    element = editor.current;
    elHeight = editor.current.offsetHeight;
    startPosition = event.clientY;
    buttonOffsetPrev =
      event.clientY - element.childNodes[0].getBoundingClientRect().top; //event.target.getBoundingClientRect().top
    buttonOffsetNext = Math.abs(
      event.clientY - element.childNodes[0].getBoundingClientRect().bottom
    ); //event.target.getBoundingClientRect().bottom);
    prev = element.previousElementSibling;
    next = element.nextElementSibling ? element.nextElementSibling : null;
    prevHeight = prev.offsetHeight;
    prevHeader = prev.childNodes[0];
    nextHeader = next ? next.childNodes[0] : null;
    nextHeight = next ? next.offsetHeight : null;
    elementHeader = element.childNodes[0];
    previuosOffset = 0;

    //elementHeaderPadding = parseInt( window.getComputedStyle(element.childNodes[0], null).getPropertyValue('padding-top'));
  }
  function makeNotClicked() {
    clicked = false;
    element = null;
    elHeight = null;
    startPosition = 0;
    offset = 0;
    buttonOffsetPrev = 0;
    collision = true;
    previuosOffset = 0;
  }

  function changeStartPoint(event) {
    elHeight = element.offsetHeight; //+  "px"
    prevHeight = prev.offsetHeight; //  +  "px"
    offset = 0;
    previuosOffset = 0;
    startPosition = event.clientY;
    
  }



