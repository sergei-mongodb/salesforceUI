// ==UserScript==
// @name         SalesForce Lightning navLeft toggle
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  try to take over the world!
// @author       You
// @match        https://mongodb.lightning.force.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=force.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
function log(msg) {
  if (console && console.log && (typeof console.log === "function")) console.log(msg)
}

var _readyFunc_interval = setInterval(function() {
    if((document.readyState === 'complete')&&(document.getElementsByClassName("navLeft").length>0)) {
        log("navLeft active.");
        clearInterval(_readyFunc_interval);
        const btn = document.createElement("span");
        const el = document.getElementsByClassName("navLeft")[0];
        const box = el.getBoundingClientRect();
        btn.style.position="absolute";
        btn.id = "navLeft_Toggle_Button";
        btn.style.top = box.top;
        btn.style.left = "4px";
        //btn.style.height = (box.height-8) +"px";
        btn.style.zIndex = 1000;
        btn.style.height = '100%';
        btn.style.padding = "3px 0";

        const navBarVisibility = function() {
          const pointright='<svg height="100%" viewBox="0 0 40 80"> <g> <path stroke="gray" fill="none" stroke-width="3" d="M13 20L27 40 13 60"></path> <path stroke="gray" fill="none" stroke-width="1" d="M10 0L30 0A10 10 0 0 1 40 10L40 70A10 10 0 0 1 30 80L10 80A10 10 0 0 1 0 70L0 10A10 10 0 0 1 10 0"></path> </g> </svg>';
          const pointleft='<svg height="100%" viewBox="0 0 40 80"> <g> <path stroke="gray" fill="none" stroke-width="3" d="M27 20L13 40 27 60"></path> <path stroke="gray" fill="none" stroke-width="1" d="M10 0L30 0A10 10 0 0 1 40 10L40 70A10 10 0 0 1 30 80L10 80A10 10 0 0 1 0 70L0 10A10 10 0 0 1 10 0"></path> </g> </svg>';

          const btnImg = document.getElementsByClassName("navLeft")[0];
          const oneHeader = document.getElementById('oneHeader');
          const bottomBar = document.getElementsByClassName("utilitybar")[0];

          let state = "none";
          btn.innerHTML = pointright;

          if(oneHeader.style.display == 'none'){
             state = "";
             btn.innerHTML = pointleft;
          }

          btnImg.style.display = state;
          oneHeader.style.display = state;
          bottomBar.style.display = state;
               
          window.dispatchEvent(new Event('resize'));
        }
        btn.onclick = navBarVisibility;
        el.parentNode.insertBefore(btn,el)
        log("navLeft set default");
        navBarVisibility();
    }
}, 1000)
})();
