(function(){function v(){document.querySelector("#contentArea").removeEventListener("DOMSubtreeModified",v);var e=document.querySelectorAll("a.photoTextTitle");e.length==0?setTimeout(v,100):d()}function m(){typeof c=="undefined"?y():b()}function g(){d=g;var e=document.querySelector("a.prev[ajaxify]");e?(document.querySelector("#contentArea").addEventListener("DOMSubtreeModified",v),e.click()):m()}function y(e){d=y;var t=Array.prototype.slice.call(document.querySelectorAll("a.photoTextTitle"));l=l.concat(t),c=l.length;for(var n=0;n<t.length;++n){var r=document.createElement("li");h.appendChild(r),r.style.textOverflow="ellipsis",r.style.overflow="hidden",r.style.whiteSpace="nowrap";var i=w(t[n]);r.appendChild(i)}var s=document.querySelector("a.next[ajaxify]");s?(document.querySelector("#contentArea").addEventListener("DOMSubtreeModified",v),s.click()):g()}function b(){c==0?(p.disabled=!0,p.style.background="grey",p.style.cursor="default"):(p.disabled=!1,p.style.background="black",p.style.cursor="pointer")}function w(e){var t=document.createElement("a");t.style.textDecoration="none",t.style.color="#444",e.remove=!0;var n=document.createElement("span");t.appendChild(n),n.innerHTML="&#9988;",n.style.display="inline-block",n.style.width="16px";var r=document.createElement("span");return t.appendChild(r),r.appendChild(document.createTextNode(e.text)),t.addEventListener("click",function(){e.remove?(e.remove=!1,n.style.opacity="0",t.style.color="#aaa",--c):(e.remove=!0,n.style.opacity="1",t.style.color="#444",++c),b()}),t}function E(){function t(n){var r=l[n];if(!r){e&&e.close(),location.reload();return}if(r.remove){e?e.location.href=r.href:e=window.open(r.href,"_removal_helper_window"),i();function i(){var t=e.document.querySelector('a[data-tooltip-content="Delete Album"]');t?setTimeout(function(){t.click(),s()},100):setTimeout(i,250)}function s(){var t=e.document.querySelector("form button[name=confirmed]");t?setTimeout(function(){t.click(),o()},100):setTimeout(s,250)}function o(){var r=e.document.querySelector(".fbStarGrid");r?setTimeout(o,250):t(n+1)}}else t(n+1)}t(0);var e}var e=document.querySelector("body"),t=document.querySelector("a.next"),n=document.querySelector("a.prev"),r=document.querySelectorAll("[name=album_remove_helper]");for(var i=0;i<r.length;++i)e.removeChild(r[i]);var s=document.createElement("div");e.appendChild(s),s.setAttribute("name","album_remove_helper"),s.style.position="fixed",s.style.zIndex="1000",s.style.top="53px",s.style.right="10px",s.style.width="310px",s.style.height="calc(100% - 68px)",s.style.padding="20px",s.style.boxSizing="border-box",s.style.background="white",s.style.boxShadow="1px 1px 6px 1px rgb(21, 21, 100)";var o=document.createElement("h1");s.appendChild(o),o.fontSize="30px",o.appendChild(document.createTextNode("Album Killer"));var u=document.createElement("a");s.appendChild(u),u.href="https://meramec.github.io/album_killer/",u.target="_blank",u.appendChild(document.createTextNode("https://meramec.github.io/album_killer/"));var a=document.createElement("a");s.appendChild(a),a.style.borderRadius="50%",a.style.width="16px",a.style.height="16px",a.style.lineHeight="16px",a.style.textAlign="center",a.style.display="block",a.style.position="absolute",a.style.top="8px",a.style.right="8px",a.style.background="grey",a.style.color="white",a.style.cursor="pointer",a.innerHTML="&#10006;",a.addEventListener("click",function(){e.removeChild(s)});if(location.host!="www.facebook.com"&&!location.search.match(/filter=albums/)){var f=document.createElement("div");s.appendChild(f),f.style.color="darkred",f.appendChild(document.createTextNode("This app only works on facebook albums"));return}var l=[],c,h=document.createElement("ul");s.appendChild(h),h.style.marginTop="10px",h.style.height="calc(100% - 50px)",h.style.overflow="auto";var p=document.createElement("button");s.appendChild(p),p.disabled=!0,p.style.position="absolute",p.style.bottom="16px",p.style.padding="8px",p.style.width="270px",p.style.border="0",p.style.background="grey",p.style.color="white",p.appendChild(document.createTextNode("Remove All")),p.addEventListener("click",E),g();var d})();