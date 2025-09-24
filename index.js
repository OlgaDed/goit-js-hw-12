import{a as y,S as h,i as n}from"./assets/vendor-hdXJlIEV.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();const b="https://pixabay.com/api/",L="52420757-6c873b078c0d8d7d71d7f24d9";async function v(e,t=1){const i={key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};try{return(await y.get(b,{params:i})).data}catch(r){throw console.error("Error fetching images:",r),r}}const w=new h(".gallery a",{captionsData:"alt",captionDelay:250});function S(e){const t=document.querySelector(".gallery");if(!t)return;const i=e.map(r=>`
      <li class="gallery__item">
        <a class="gallery__link" href="${r.largeImageURL}">
          <div class="photo-card">
            <img
              class="photo-card__image"
              src="${r.webformatURL}"
              alt="${r.tags}"
              loading="lazy"
            />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                <span>${r.likes}</span>
              </p>
              <p class="info-item">
                <b>Views</b>
                <span>${r.views}</span>
              </p>
              <p class="info-item">
                <b>Comments</b>
                <span>${r.comments}</span>
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <span>${r.downloads}</span>
              </p>
            </div>
          </div>
        </a>
      </li>
    `).join("");t.insertAdjacentHTML("beforeend",i),w.refresh()}function q(){const e=document.querySelector(".gallery");e&&(e.innerHTML="")}function P(){const e=document.querySelector(".loader");e&&(e.classList.add("is-active"),e.setAttribute("aria-hidden","false"))}function u(){const e=document.querySelector(".loader");e&&(e.classList.remove("is-active"),e.setAttribute("aria-hidden","true"))}function _(){const e=document.querySelector(".load-more");e&&e.classList.add("is-visible")}function f(){const e=document.querySelector(".load-more");e&&e.classList.remove("is-visible")}const m=document.querySelector(".form"),d=m.querySelector('input[name="search-text"]'),E=document.querySelector(".load-more");let p="",a=1,l=0;const M=15;m.addEventListener("submit",B);E.addEventListener("click",R);async function B(e){e.preventDefault();const t=d.value.trim();if(t===""){n.warning({title:"Warning",message:"Please enter a search term!",position:"topRight",timeout:3e3});return}p=t,a=1,q(),f(),await g(),d.value=""}async function R(){a+=1,await g(),$()}async function g(){P();try{const e=await v(p,a);if(u(),l=e.totalHits,e.hits.length===0&&a===1){n.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:4e3});return}S(e.hits),a===1&&n.success({title:"Success",message:`Found ${l} images!`,position:"topRight",timeout:2e3});const t=Math.ceil(l/M);a<t?_():(f(),a>1&&n.info({title:"End of results",message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:4e3}))}catch(e){u(),console.error("Error:",e),n.error({title:"Error",message:"Something went wrong! Please try again later.",position:"topRight",timeout:4e3})}}function $(){const e=document.querySelectorAll(".gallery__item");if(e.length>0){const t=e[0].getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
