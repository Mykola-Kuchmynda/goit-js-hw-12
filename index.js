import{a as f,S as d,i as a}from"./assets/vendor-Db2TdIkw.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const p="49553304-bb2269abcee8455e1256fbbe8",y="https://pixabay.com/api/";async function m(n){try{return(await f.get(y,{params:{key:p,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data.hits}catch(r){throw console.error("Помилка при запиті до Pixabay API:",r),r}}const c=document.querySelector(".gallery"),l=document.querySelector(".loader"),g=new d(".gallery a");function h(){l.style.display="block"}function b(){l.style.display="none"}function L(n){if(n.length===0){a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}const r=n.map(t=>`
    <li class="gallery-item">
      <a href="${t.largeImageURL}">
        <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p>Likes: ${t.likes}</p>
        <p>Views: ${t.views}</p>
        <p>Comments: ${t.comments}</p>
        <p>Downloads: ${t.downloads}</p>
      </div>
    </li>
  `).join("");c.innerHTML=r,g.refresh()}function w(){c.innerHTML=""}const u=document.querySelector(".form"),P=u.querySelector("input");u.addEventListener("submit",async n=>{n.preventDefault();const r=P.value.trim();if(!r){a.warning({title:"Warning",message:"Please enter a search term!"});return}w(),h();try{const t=await m(r);L(t)}catch{a.error({title:"Error",message:"Something went wrong! Please try again later."})}finally{b()}});
//# sourceMappingURL=index.js.map
