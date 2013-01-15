/*
 * Typer
 */
var Typer = (function(d,w){
		"use strict";
		
		var suffix = "<span id='blink'>_</span>",
			source,
			els,
			$ = function(e){ 
				return d.getElementById(e); 
			},
			kids = function(n){ 
				return n.childNodes;
			},
			paper = d.createElement("div"),
			i = 0,
			j = 0,
			animate,
			el,
			addEl = function(e){
				el = d.createElement(e);
				paper.appendChild(el);
			},
			addLetter = function(){
				//console.log(i + ": " + j);
				el.innerHTML = els[i].innerHTML.substr(0, j) + suffix; 
			},
			write = function(){
				clearInterval(animate);
				if(i<els.length){
					if(j<=els[i].innerHTML.length){
						addLetter(); 
						++j;
						animate = setInterval(write, 100);
					}else{
						++i;
						if(els[i]){
							el.removeChild($('blink'));
							j = 0;
							addEl(els[i].nodeName);
							addLetter();
							animate = setInterval(write, 1000);
						}
					}
				}
			};
		
			
		return {
			init : function(e){
				var tmp = [],
					k = 0,
					s;
				
				source = $(e);
				els = kids(source);
				
				for(;k<els.length;k++){
					//get ELEMENT_NODE only
					if (els[k].nodeType == 1) {
						tmp.push(els[k]);
					}
					
				}
				
				els = tmp;
				d.body.insertBefore(paper,source);
				source.parentNode.removeChild(source);
								
				addEl(els[0].nodeName);
				el.innerHTML = suffix;
				animate = setInterval(write, 1000);
				
			}
		}
	})(document,window,undefined);