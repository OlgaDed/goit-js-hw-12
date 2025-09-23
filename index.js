import{a as d,S as p,i as n}from"./assets/vendor-hdXJlIEV.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const m="https://pixabay.com/api/",f="52420757-6c873b078c0d8d7d71d7f24d9";function g(e){const o={key:f,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40};return d.get(m,{params:o}).then(t=>t.data).catch(t=>{throw console.error("Error fetching images:",t),t})}const h=new p(".gallery a",{captionsData:"alt",captionDelay:250});function y(e){const o=document.querySelector(".gallery");if(!o)return;const t=e.map(i=>`
      <li class="gallery__item">
        <a class="gallery__link" href="${i.largeImageURL}">
          <div class="photo-card">
            <img 
              class="photo-card__image" 
              src="${i.webformatURL}" 
              alt="${i.tags}" 
              loading="lazy" 
            />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                <span>${i.likes}</span>
              </p>
              <p class="info-item">
                <b>Views</b>
                <span>${i.views}</span>
              </p>
              <p class="info-item">
                <b>Comments</b>
                <span>${i.comments}</span>
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <span>${i.downloads}</span>
              </p>
            </div>
          </div>
        </a>
      </li>
    `).join("");o.insertAdjacentHTML("beforeend",t),h.refresh()}function b(){const e=document.querySelector(".gallery");e&&(e.innerHTML="")}function L(){const e=document.querySelector(".loader");e&&(e.classList.add("is-active"),e.setAttribute("aria-hidden","false"))}function c(){const e=document.querySelector(".loader");e&&(e.classList.remove("is-active"),e.setAttribute("aria-hidden","true"))}const u=document.querySelector(".form"),l=u.querySelector('input[name="search-text"]');u.addEventListener("submit",S);function S(e){e.preventDefault();const o=l.value.trim();if(o===""){n.warning({title:"Warning",message:"Please enter a search term!",position:"topRight",timeout:3e3});return}b(),L(),console.log("Starting search for:",o),g(o).then(t=>{if(console.log("Search completed, data received:",t),c(),t.hits.length===0){console.log("No images found"),n.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:4e3});return}console.log("Creating gallery with",t.hits.length,"images"),y(t.hits),n.success({title:"Success",message:`Found ${t.hits.length} images!`,position:"topRight",timeout:2e3})}).catch(t=>{c(),console.error("Error:",t),n.error({title:"Error",message:"Something went wrong! Please try again later.",position:"topRight",timeout:4e3})}),l.value=""}
//# sourceMappingURL=index.js.map
