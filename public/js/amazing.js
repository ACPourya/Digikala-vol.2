/////////Count-down/////////
document.addEventListener("DOMContentLoaded", function() {
  function startCountdown(element) {
    const secondsElem = element.querySelector('.seconds');
    const minutesElem = element.querySelector('.minutes');
    const hoursElem = element.querySelector('.hours');

    let seconds = parseInt(secondsElem.textContent);
    let minutes = parseInt(minutesElem.textContent);
    let hours = parseInt(hoursElem.textContent);

    setInterval(function() {
      if (seconds > 0) {
        seconds--;
      } else {
        if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else {
          if (hours > 0) {
            seconds = 59;
            minutes = 59;
            hours--;
          } else {
            clearInterval(this);
          }
        }
      }

      secondsElem.textContent = seconds < 10 ? '0' + seconds : seconds;
      minutesElem.textContent = minutes < 10 ? '0' + minutes : minutes;
      hoursElem.textContent = hours < 10 ? '0' + hours : hours;
    }, 1000);
  }

  const countdowns = document.querySelectorAll('.countdown');
  countdowns.forEach(function(countdown) {
    startCountdown(countdown);
  });
});
/////////Count-down/////////

/////////Mobile Pop-Ups/////////
function openPopup(id) {
  document.getElementById(id).classList.add("show");
  document.body.classList.add("overflow-hidden");
}

function closePopup(id) {
  document.getElementById(id).classList.remove("show");
  document.body.classList.remove("overflow-hidden");
}

function closeAllPopups() {
  const Popups = document.querySelectorAll('.popup');
  Popups.forEach(popup => popup.classList.remove('show'));
  document.body.classList.remove('overflow-hidden');
}

function closePopupOnOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget.id);
  }
}

function handleResize() {
  if (window.innerWidth >= 1024) {
    closeAllPopups();
  }
}

window.addEventListener('resize', handleResize);

document.addEventListener('DOMContentLoaded', function() {
  handleResize();
});
/////////Mobile Pop-Ups/////////

/////////Price Range/////////
function range() {
  return {
      minprice: 0, 
      maxprice: 50000000,
      min: 0, 
      max: 50000000,
      minthumb: 0,
      maxthumb: 0, 
      
      mintrigger() {   
          this.minprice = Math.min(this.minprice, this.maxprice - 1000);      
          this.minthumb = ((this.minprice - this.min) / (this.max - this.min)) * 100;
          this.minprice = Math.round(this.minprice); 
      },
      
      maxtrigger() {
          this.maxprice = Math.max(this.maxprice, this.minprice + 1000); 
          this.maxthumb = 100 - (((this.maxprice - this.min) / (this.max - this.min)) * 100);
          this.maxprice = Math.round(this.maxprice); 
      },
  }
}
/////////Price Range/////////

/////////Check-Mark/////////

document.addEventListener("DOMContentLoaded", function() {
  const listItems = document.querySelectorAll("#selectable-list .selectable-item");

  listItems.forEach((item) => {
    const img = item.querySelector("img");
    img.classList.add("hidden");
    item.addEventListener("click", () => {

      listItems.forEach((otherItem) => {
        otherItem.querySelector("img").classList.add("hidden");
      });

      img.classList.remove("hidden");
      img.classList.add("block");
    });
  });
});
/////////Check-Mark/////////

/////////Amazing's slides/////////
let fetchCategoryShopingSlider = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let slider = res.categoryShoping.map((elem) => {
    return `
    <div class="swiper-slide">
      <a href="#" class="w-[114px] gap-y-3 h-[160px] flex flex-col justify-start items-center py-2">
        <img src="${elem.image}" alt="${elem.alt}">
        <span>${elem.category}</span>
      </a>
    </div>`;
  });
  document
    .querySelector(".category-picker")
    .insertAdjacentHTML("afterbegin", slider.join(""));
  let firstSlide = `
    <div class="swiper-slide">
      <a href="#" class="w-[114px] gap-y-3 h-[160px] flex flex-col justify-start items-center py-2 bg-neutral-100 rounded-[10px]">
        <img src="./public/images/shegeft-angizha/image/grouping/digibag.png" alt="">
        <span class="font-bold">همه دسته‌بندی‌ها</span>
      </a>
    </div>`;
  document
    .querySelector(".category-picker")
    .insertAdjacentHTML("afterbegin", firstSlide);
};
let fetchMontakhabSlider = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let slider = res.shegeftMontakhab.map((elem) => {
    return `
    <div class="swiper-slide rounded-lg">
    <div class="w-fit-content p-2 flex flex-col gap-y-4 ">
      <div><img src="./public/images/svg/pishnahad-shegeft.svg" alt="" class="!w-[116px] !h-[14px]"></div>
      <div class="flex justify-center">
        <img
        src="${elem.image}"
        alt=""
        class="!w-[150px] !h-[150px]"
      /></div>
      <h3 class="h-[38px] text-neutral-700 font-bold text-[12px] line-clamp-2 text-ellipsis text-right">${elem.productName}</h3>
      <div class="flex justify-start items-center gap-x-1">
        <img src="./public/images/svg/today-send.svg" alt="" class="!w-[18px] !h-[18px]">
        <p class="text-neutral-600 text-[11px]">ارسال امروز</p>
      </div>
      <div class="flex flex-col gap-x-1">
        <div class="flex items-center justify-between">
          <div
            class="bg-[#d32f2f] w-[35px] h-[20px] rounded-[16px] flex items-center justify-center"
          >
            <span class="text-white text-[12px] font-bold px-1"
              >${elem.off}</span
            >
          </div>
          <div class="flex items-center justify-end gap-x-1">
            <span
              class="text-neutral-700 text-[15px] font-bold font-digikala"
              >${elem.price}</span
            >
            <img src="./public/images/svg/تومان.svg" alt="" />
          </div>
        </div>
        <div class="w-full flex justify-end">
          <span class="text-neutral-300 ml-4 line-through text-[13px] font-digikala">${elem.discount}</span>
        </div>
        <div
          class="w-full h-1 mt-3 flex flex-row-reverse bg-slate-200 rounded"
        >
          <span
            class="w-[50%] h-inherit bg-red-500 rounded"
          ></span>
        </div>
      </div>
    </div>
  </div>`;
  });
  document
    .querySelector(".shegeft-montakhab-picker")
    .insertAdjacentHTML("afterbegin", slider.join(""));
  let firstSlide = `
  <div class="swiper-slide">
  <div class="w-full h-full flex flex-col items-center justify-center p-6 bg-[#ef3a50] ">
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M64.3974 26.1993C64.3974 27.0177 64.2381 27.7988 63.9488 28.5135H78.8578C81.065 28.5135 82.714 26.8642 82.714 24.6565V23.8851C82.714 21.6775 81.065 20.0281 78.8578 20.0281H69.9884C69.2943 20.0281 69.1606 19.406 69.6028 18.871L76.0981 10.5744C76.3989 10.2107 76.8464 10 77.3183 10H80.2811C80.8772 10 81.2038 10.6943 80.824 11.1536L76.9297 16.1712H78.8578C83.2802 16.1712 86.5702 19.4617 86.5702 23.8851V24.6565C86.5702 26.0844 86.2274 27.3943 85.6143 28.5135H94.5164C95.7945 28.5135 96.8306 27.4774 96.8306 26.1993V21.5709C96.8306 21.1449 97.176 20.7995 97.602 20.7995H99.9162C100.342 20.7995 100.688 21.1449 100.688 21.5709V26.1993C100.688 27.0177 100.528 27.7988 100.239 28.5135H102.991C104.269 28.5135 105.305 27.4774 105.305 26.1993V21.5709C105.305 21.1449 105.65 20.7995 106.076 20.7995H108.39C108.816 20.7995 109.162 21.1449 109.162 21.5709V26.1993C109.162 27.0177 109.003 27.7988 108.713 28.5135H109.173C110.451 28.5135 111.487 27.4774 111.487 26.1993V21.5709C111.487 21.1449 111.833 20.7995 112.259 20.7995H114.573C114.999 20.7995 115.344 21.1449 115.344 21.5709V26.1993C115.344 29.6075 112.581 32.3704 109.173 32.3704H108.431C108.178 32.3704 107.941 32.2463 107.797 32.0381L107.002 30.8893C105.923 31.8127 104.522 32.3704 102.991 32.3704H99.9347C99.6815 32.3704 99.4445 32.2463 99.3004 32.0381L98.5134 30.9013C97.4366 31.8175 96.0411 32.3704 94.5164 32.3704H85.021C84.7679 32.3704 84.5309 32.2463 84.3868 32.0381L83.5732 30.863C82.2902 31.8186 80.6689 32.3704 78.8578 32.3704H41.7586C41.5055 32.3704 41.2685 32.2463 41.1244 32.0381L40.3374 30.9013C39.2606 31.8175 37.865 32.3704 36.3404 32.3704H11.1712C7.76292 32.3704 5 29.6075 5 26.1993V21.5709C5 21.1449 5.34536 20.7995 5.77139 20.7995H8.08559C8.51162 20.7995 8.85698 21.1449 8.85698 21.5709V26.1993C8.85698 27.4774 9.89306 28.5135 11.1712 28.5135H36.3404C37.6185 28.5135 38.6546 27.4774 38.6546 26.1993V21.5709C38.6546 21.1449 39 20.7995 39.426 20.7995H41.7402C42.1662 20.7995 42.5116 21.1449 42.5116 21.5709V26.1993C42.5116 27.0177 42.3523 27.7988 42.063 28.5135H52.5037C52.2144 27.7988 52.0551 27.0177 52.0551 26.1993V23.8851C52.0551 20.4769 54.818 17.7139 58.2263 17.7139C61.6345 17.7139 64.3974 20.4769 64.3974 23.8851V26.1993ZM60.5404 23.8851V26.1993C60.5404 27.4774 59.5044 28.5135 58.2263 28.5135C56.9482 28.5135 55.9121 27.4774 55.9121 26.1993V23.8851C55.9121 22.607 56.9482 21.5709 58.2263 21.5709C59.5044 21.5709 60.5404 22.607 60.5404 23.8851ZM73.8386 10C73.6005 10 73.3758 10.1099 73.2297 10.2978L68.3036 16.6313C68.2051 16.758 68.2954 16.9426 68.4559 16.9426H69.2271C69.4651 16.9426 69.6898 16.8327 69.8359 16.6447L74.762 10.3112C74.8605 10.1846 74.7703 10 74.6098 10H73.8386ZM59.3827 10.7714C59.7997 10.7714 60.1073 11.0479 60.1491 11.4455L60.1539 11.5393V13.8429C60.1539 14.2583 59.8762 14.5643 59.4769 14.6059L59.3827 14.6108H56.6833C56.2662 14.6108 55.9587 14.3344 55.9169 13.9367L55.9121 13.8429V11.5393C55.9121 11.124 56.1898 10.8179 56.5891 10.7762L56.6833 10.7714H59.3827ZM103.096 16.2868C102.665 16.2868 102.31 15.9619 102.265 15.5449L102.26 15.4543L102.26 11.6039C102.26 11.1748 102.586 10.8215 103.005 10.7763L103.096 10.7714H105.44C105.871 10.7714 106.226 11.0961 106.271 11.5132L106.276 11.6039L106.277 12.6906L108.972 12.6905C109.403 12.6905 109.758 13.0151 109.803 13.4322L109.808 13.523V15.4543C109.808 15.8831 109.482 16.2367 109.063 16.2819L108.972 16.2868H103.096ZM27.6213 17.6166C27.5795 17.2191 27.2721 16.9426 26.8549 16.9426H20.6849L20.5906 16.9474C20.1912 16.989 19.9136 17.2952 19.9136 17.7104V20.014L19.9185 20.1079C19.9603 20.5055 20.2677 20.7819 20.6849 20.7819H26.8549L26.9491 20.7771C27.3485 20.7355 27.6261 20.4294 27.6261 20.014V17.7104L27.6213 17.6166ZM84.2221 44.6982C84.3682 44.5103 84.5929 44.4004 84.831 44.4004H85.6022C85.7626 44.4004 85.8529 44.585 85.7544 44.7116L80.8283 51.0451C80.6822 51.233 80.4575 51.3429 80.2194 51.3429H79.4482C79.2878 51.3429 79.1975 51.1584 79.296 51.0317L84.2221 44.6982ZM62.8498 48.16C62.808 47.7625 62.5004 47.486 62.0834 47.486H59.7689L59.6747 47.4908C59.2754 47.5324 58.9977 47.8386 58.9977 48.2538V50.5575L59.0025 50.6513C59.0443 51.049 59.3518 51.3253 59.7689 51.3253H62.0834L62.1776 51.3205C62.5769 51.2789 62.8546 50.9728 62.8546 50.5575V48.2538L62.8498 48.16ZM73.6528 68.9899C74.07 68.9899 74.3774 69.2664 74.4192 69.664L74.4241 69.7578V72.0614C74.4241 72.4768 74.1465 72.7829 73.7471 72.8245L73.6528 72.8293H67.4828C67.0656 72.8293 66.7582 72.5529 66.7165 72.1553L66.7116 72.0614V69.7578C66.7116 69.3426 66.9892 69.0364 67.3886 68.9948L67.4828 68.9899H73.6528ZM103.352 47.486C103.769 47.486 104.077 47.7625 104.119 48.16L104.123 48.2538V50.5575C104.123 50.9728 103.846 51.2789 103.446 51.3205L103.352 51.3253H100.653C100.236 51.3253 99.9282 51.049 99.8864 50.6513L99.8816 50.5575V48.2538C99.8816 47.8386 100.159 47.5324 100.559 47.4908L100.653 47.486H103.352ZM56.6835 60.9854C56.6835 64.1806 54.0932 66.7708 50.898 66.7708H34.313C30.9048 66.7708 28.1418 64.0079 28.1418 60.5997V47.486C28.1418 47.0599 28.4872 46.7146 28.9132 46.7146H31.2274C31.6535 46.7146 31.9988 47.0599 31.9988 47.486V60.5997C31.9988 61.8778 33.0349 62.9139 34.313 62.9139H35.8558V58.2855C35.8558 54.8773 38.6187 52.1143 42.027 52.1143C44.3112 52.1143 46.3055 53.3554 47.3725 55.1999L50.898 55.1999C54.0932 55.1999 56.6835 57.7902 56.6835 60.9854ZM44.3411 58.2855C44.3411 57.0074 43.3051 55.9713 42.027 55.9713C40.7489 55.9713 39.7128 57.0074 39.7128 58.2855V62.9139H44.3411V58.2855ZM48.1981 62.9139V59.0569H50.898C51.9631 59.0569 52.8265 59.9203 52.8265 60.9854C52.8265 62.0505 51.9631 62.9139 50.898 62.9139H48.1981ZM95.5197 64.413L96.922 66.4385C97.0661 66.6467 97.3031 66.7708 97.5562 66.7708H102.937C106.346 66.7708 109.109 64.0079 109.109 60.5997V55.9713C109.109 55.5453 108.763 55.1999 108.337 55.1999H106.023C105.597 55.1999 105.252 55.5453 105.252 55.9713V60.5997C105.252 61.8778 104.216 62.9139 102.937 62.9139H96.6067C97.2198 61.7946 97.5626 60.4848 97.5626 59.0569V58.2855C97.5626 53.8621 94.2726 50.5715 89.8502 50.5715H87.922L91.8164 45.554C92.1962 45.0946 91.8696 44.4004 91.2735 44.4004H88.3106C87.8388 44.4004 87.3913 44.611 87.0905 44.9748L80.5952 53.2714C80.1529 53.8064 80.2867 54.4285 80.9808 54.4285H89.8502C92.0574 54.4285 93.7064 56.0778 93.7064 58.2855V59.0569C93.7064 61.2645 92.0574 62.9139 89.8502 62.9139H77.0329C77.3222 62.1992 77.4815 61.4181 77.4815 60.5997V55.9713C77.4815 55.5453 77.1361 55.1999 76.7101 55.1999H74.3959C73.9698 55.1999 73.6245 55.5453 73.6245 55.9713V60.5997C73.6245 61.8778 72.5884 62.9139 71.3103 62.9139H62.9049V55.9713C62.9049 55.5453 62.5595 55.1999 62.1335 55.1999H59.8193C59.3933 55.1999 59.0479 55.5453 59.0479 55.9713V65.2281C59.0479 67.4357 57.3997 69.085 55.1924 69.085H51.9248C51.2307 69.085 51.097 69.7071 51.5392 70.2421L53.1897 72.3503C53.4821 72.7238 53.9301 72.942 54.4044 72.942H55.1924C59.6149 72.942 62.9049 69.6515 62.9049 65.2281V65.215L63.752 66.4385C63.8961 66.6467 64.1331 66.7708 64.3862 66.7708H71.3103C72.8577 66.7708 74.2721 66.2013 75.3553 65.2604L76.5378 66.7708H89.8502C92.1457 66.7708 94.1361 65.8843 95.5197 64.413ZM111.453 47.486C111.453 47.0599 111.798 46.7146 112.224 46.7146H114.538C114.964 46.7146 115.309 47.0599 115.309 47.486V65.9994C115.309 66.4255 114.964 66.7708 114.538 66.7708H112.224C111.798 66.7708 111.453 66.4255 111.453 65.9994V47.486ZM12.7146 63.8414C12.7583 64.2377 13.066 64.5145 13.4805 64.5145H20.4194L20.4229 64.5145H21.9768V67.1565C21.9768 68.208 21.0999 69.085 20.0486 69.085H13.4854C13.4413 69.085 13.3996 69.0912 13.3605 69.1026L11.1625 69.1026L11.0265 69.0987C9.81171 69.0283 8.84829 68.0208 8.84829 66.7858L8.85627 59.8881L8.85141 59.7944C8.80957 59.3972 8.50181 59.1203 8.08503 59.1203H5.77129L5.67711 59.1251C5.27802 59.1668 5 59.4733 5 59.8881V66.799L5.00225 66.9938C5.0908 70.3549 7.75404 72.942 11.1608 72.942L20.0486 72.942C23.228 72.942 25.6983 70.5561 25.8277 67.4161V61.3307C25.784 60.9344 25.4763 60.6576 25.0618 60.6576H18.1229L18.1196 60.6576H16.5655V57.8998C16.5655 56.8484 17.4424 55.9713 18.4936 55.9713H25.0569C25.549 55.9713 25.7394 55.207 25.4425 54.8142L23.9 52.5C23.6186 52.1272 22.8243 52.1143 22.3575 52.1143H18.4936C15.3143 52.1143 12.844 54.5003 12.7146 57.6402V63.8414ZM53.0782 82.1655C53.0364 81.768 52.7289 81.4915 52.3119 81.4915H49.6125L49.5183 81.4963C49.119 81.5379 48.8413 81.8441 48.8413 82.2593V84.563L48.8461 84.6568C48.8879 85.0544 49.1954 85.3308 49.6125 85.3308H52.3119L52.4061 85.326C52.8054 85.2844 53.0831 84.9783 53.0831 84.563V82.2593L53.0782 82.1655ZM71.3389 85.1556C71.7561 85.1556 72.0635 85.4321 72.1053 85.8296L72.1102 85.9235V88.2271C72.1102 88.6425 71.8326 88.9485 71.4332 88.9901L71.3389 88.9949H65.169C64.7518 88.9949 64.4444 88.7186 64.4026 88.3209L64.3977 88.2271V85.9235C64.3977 85.5082 64.6753 85.202 65.0747 85.1604L65.169 85.1556H71.3389ZM25.3088 106.85C25.267 106.453 24.9595 106.176 24.5425 106.176H22.228L22.1337 106.181C21.7345 106.223 21.4567 106.529 21.4567 106.944V109.248L21.4616 109.341C21.5034 109.739 21.8109 110.015 22.228 110.015H24.5425L24.6367 110.011C25.036 109.969 25.3137 109.663 25.3137 109.248V106.944L25.3088 106.85ZM76.1535 102.779L76.6732 103.53C76.8172 103.738 77.0543 103.862 77.3074 103.862H88.3456C89.4148 103.862 90.4205 103.59 91.2973 103.112L91.5868 103.53C91.7309 103.738 91.9679 103.862 92.221 103.862H109.01C112.418 103.862 115.181 101.099 115.181 97.6908V95.3766C115.181 91.9683 112.418 89.2054 109.01 89.2054C105.602 89.2054 102.839 91.9683 102.839 95.3766V97.6908C102.839 98.5091 102.998 99.2903 103.287 100.005H94.0682C94.3574 99.2903 94.5167 98.5091 94.5167 97.6908V93.0624C94.5167 92.6363 94.1714 92.291 93.7453 92.291H91.4312C91.0051 92.291 90.6598 92.6364 90.6598 93.0624V97.6908C90.6598 98.9688 89.6237 100.005 88.3456 100.005H78.3831C78.6724 99.2903 78.8317 98.5091 78.8317 97.6908V93.0624C78.8317 92.6363 78.4863 92.291 78.0603 92.291H75.7461C75.3201 92.291 74.9747 92.6364 74.9747 93.0624V97.6908C74.9747 98.9688 73.9386 100.005 72.6605 100.005H60.4028V93.9599C60.2734 90.82 57.8032 88.434 54.6238 88.434H49.6107C49.1439 88.434 48.3497 88.4469 48.0682 88.8197L46.5257 91.1339C46.2289 91.5267 46.4193 92.291 46.9114 92.291H54.6238C55.6751 92.291 56.5519 93.168 56.5519 94.2195V100.005H40.0703C40.3596 99.2903 40.5189 98.5091 40.5189 97.6908V93.0624C40.5189 92.6363 40.1735 92.291 39.7475 92.291H37.4333C37.0073 92.291 36.6619 92.6364 36.6619 93.0624V97.6908C36.6619 98.9688 35.6258 100.005 34.3477 100.005H12.3928C11.1148 100.005 10.0787 98.9688 10.0787 97.6908V93.0624C10.0787 92.6364 9.73329 92.291 9.30726 92.291H6.99307C6.56705 92.291 6.22168 92.6363 6.22168 93.0624V97.6908C6.22168 101.099 8.9846 103.862 12.3928 103.862H34.3775C35.8906 103.855 37.275 103.303 38.3448 102.393L39.1318 103.53C39.2759 103.738 39.5129 103.862 39.7661 103.862H59.6369C60.0515 103.862 60.3592 103.585 60.4028 103.189V102.22L61.3095 103.53C61.4536 103.738 61.6906 103.862 61.9438 103.862H72.6605C73.9571 103.862 75.1603 103.462 76.1535 102.779ZM106.696 97.6908C106.696 98.9688 107.732 100.005 109.01 100.005C110.288 100.005 111.324 98.9688 111.324 97.6908V95.3766C111.324 94.0985 110.288 93.0624 109.01 93.0624C107.732 93.0624 106.696 94.0985 106.696 95.3766V97.6908ZM87.0839 85.8296C87.0421 85.4321 86.7346 85.1556 86.3175 85.1556H83.6182L83.5239 85.1604C83.1246 85.202 82.8469 85.5082 82.8469 85.9235V88.2271L82.8518 88.3209C82.8936 88.7186 83.2011 88.9949 83.6182 88.9949H86.3175L86.4118 88.9901C86.811 88.9485 87.0888 88.6425 87.0888 88.2271V85.9235L87.0839 85.8296Z" fill="white"/>
      </svg>
    <img src="./public/images/shegeft-angizha/image/shegeft-montakhab/general.png" alt="" class="!w-[145px] !h-[145px]">
  </div>
</div>
`;
  document
    .querySelector(".shegeft-montakhab-picker")
    .insertAdjacentHTML("afterbegin", firstSlide);
};
let fetchEtmamSlider = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let slider = res.shegeftEtmam.map((elem) => {
    return `
    <div class="swiper-slide border-l border-[#e0e0e2]">
      <a href="#" class="p-2 flex justify-start flex-col gap-y-4 grow">
        <div><img src="./public/images/svg/pishnahad-shegeft.svg" alt="" class="!w-[116px] !h-[14px]"></div>
        <div class="flex justify-center">
          <img
          src=${elem.image}
          alt=""
          class="!w-[150px] !h-[150px]"
        /></div>
        <h3 class="h-[38px] text-neutral-700 font-bold text-[12px] line-clamp-2 text-ellipsis text-right">
          ${elem.productName}
        </h3>
        <div class="flex justify-start items-center gap-x-1">
          <img src="./public/images/svg/today-send.svg" alt="" class="!w-[18px] !h-[18px]">
          <p class="text-neutral-600 text-[11px]">ارسال امروز</p>
        </div>
        <div class="flex flex-col gap-x-1">
          <div class="flex items-center justify-between">
            <div
              class="bg-[#d32f2f] w-[35px] h-[20px] rounded-[16px] flex items-center justify-center"
            >
              <span class="text-white text-[12px] font-bold px-1"
                >${elem.off}</span
              >
            </div>
            <div class="flex items-center justify-end gap-x-1">
              <span
                class="text-neutral-700 text-[15px] font-bold font-digikala"
                >${elem.price}</span
              >
              <img src="./public/images/svg/تومان.svg" alt="" />
            </div>
          </div>
          <div class="w-full flex justify-end">
            <span class="text-neutral-300 ml-4 line-through text-[13px] font-digikala">${elem.discount}</span>
          </div>
          <div
            class="w-full h-1 mt-3 flex flex-row-reverse bg-slate-200 rounded"
          >
            <span
              class="w-[50%] h-inherit bg-red-500 rounded"
            ></span>
          </div>
        </div>
      </a>
    </div>`;
  });
  document
    .querySelector(".shegeft-etmam-picker")
    .insertAdjacentHTML("afterbegin", slider.join(""));
};
let fetchSerfareshiSlider = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let slider = res.shegeftSefareshi.map((elem) => {
    return `
    <div class="swiper-slide border-l border-[#e0e0e2]">
      <a href="#" class="p-2 flex justify-start flex-col gap-y-4 grow">
        <div><img src="./public/images/svg/shegeft-sefareshi.svg" alt="" class="!w-[116px] !h-[14px]"></div>
        <div class="flex justify-center">
          <img
          src=${elem.image}
          alt=""
          class="!w-[150px] !h-[150px]"
        /></div>
        <h3 class="h-[38px] text-neutral-700 font-bold text-[12px] line-clamp-2 text-ellipsis text-right">
          ${elem.productName}
        </h3>
        <div class="flex justify-start items-center gap-x-1">
          <img src="./public/images/svg/today-send.svg" alt="" class="!w-[18px] !h-[18px]">
          <p class="text-neutral-600 text-[11px]">ارسال امروز</p>
        </div>
        <div class="flex flex-col gap-x-1">
          <div class="flex items-center justify-between">
            <div
              class="bg-[#d32f2f] w-[35px] h-[20px] rounded-[16px] flex items-center justify-center"
            >
              <span class="text-white text-[12px] font-bold px-1"
                >${elem.off}</span
              >
            </div>
            <div class="flex items-center justify-end gap-x-1">
              <span
                class="text-neutral-700 text-[15px] font-bold font-digikala"
                >${elem.price}</span
              >
              <img src="./public/images/svg/تومان.svg" alt="" />
            </div>
          </div>
          <div class="w-full flex justify-end">
            <span class="text-neutral-300 ml-4 line-through text-[13px] font-digikala">${elem.discount}</span>
          </div>

        </div>
      </a>
    </div>`;
  });
  document
    .querySelector(".shegeft-order-picker")
    .insertAdjacentHTML("afterbegin", slider.join(""));
};
let fetchmainProducts = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.mainProducts.map((elem) => {
    return `
    <a href="#" class="z-0 p-2 flex justify-start flex-col gap-y-4 border border-neutral-100 grow hover:shadow-[0_1px_5px_rgba(0,0,0,0.2)] hover:z-[1]">
      <div><img src="./public/images/svg/pishnahad-shegeft.svg" alt="" class="!w-[116px] !h-[14px]"></div>
      <div class="flex justify-center">
        <img
        src="${elem.image}"
        alt=""
        class="!w-[240px] !h-[240px]"
      /></div>
      <h3 class="h-[38px] text-neutral-700 font-bold text-[12px] line-clamp-2 text-ellipsis text-right">
        ${elem.productName}
      </h3>
      <div class="flex justify-between items-center">
        <div class="flex gap-x-1">
          <img src="${elem.svg}" alt="" class="!w-[18px] !h-[18px]">
          <p class="text-neutral-600 text-[11px]">${elem.svgText}</p>
        </div>
        <div class="flex gap-x-1">
          <p class="text-neutral-600 text-[12px] font-bold">${elem.rating}</p>
          <img src="./public/images/svg/rating.svg" alt="" class="!w-[18px] !h-[18px]">
        </div>  
      </div>
      <div class="flex flex-col gap-x-1">
        <div class="flex items-center justify-between">
          <div
            class="bg-[#d32f2f] w-[35px] h-[20px] rounded-[16px] flex items-center justify-center"
          >
            <span class="text-white text-[12px] font-bold px-1"
              >${elem.off}</span
            >
          </div>
          <div class="flex items-center justify-end gap-x-1">
            <span
              class="text-neutral-700 text-[15px] font-bold font-digikala"
              >${elem.price}</span
            >
            <img src="./public/images/svg/تومان.svg" alt="" />
          </div>
        </div>
        <div class="w-full flex justify-end">
          <span class="text-neutral-300 ml-5 line-through text-[13px] font-digikala">${elem.discount}</span>
        </div>
      </div>
    </a>`;
  });
  document
    .querySelector(".main-product")
    .insertAdjacentHTML("afterbegin", product.join(""));
};
let fetchBrands = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let AllBrands = res.brands.map((elem) => {
    return `
    <li class="w-full flex justify-start px-4 py-3">
      <input type="checkbox" id=${elem.id} class="w-[18px] h-[18px] text-[#008eb2] bg-white border-neutral-950 rounded border-[2px] focus:ring-0 mt-[2px]">
      <label for=${elem.id} class="flex w-full items-center justify-between text-gray-700 mr-3 pb-4 border-b border-[#e0e0e2]">
        <p class="text-[14px] text-neutral-700">${elem.pName}</p>
        <p class="text-[11px] text-neutral-500">${elem.eName}</p>
      </label>
    </li>
    `;
  });
  document
    .querySelector(".brands-desktop")
    .insertAdjacentHTML("afterbegin", AllBrands.join(""));
  document
    .querySelector(".brands-mobile")
    .insertAdjacentHTML("afterbegin", AllBrands.join(""));
  document
    .querySelector(".brands-mobile-filter")
    .insertAdjacentHTML("afterbegin", AllBrands.join(""));
};
let fetchSellers = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let AllBrands = res.sellers.map((elem) => {
    return `
    <li class="w-full flex justify-start px-4 py-3">
      <input type="checkbox" id=${elem.labelId} class="w-[18px] h-[18px] text-[#008eb2] bg-white border-neutral-950 rounded border-[2px] focus:ring-0 mt-[2px]">
      <label for=${elem.labelId} class="flex w-full items-center justify-between text-gray-700 mr-3 pb-2 border-b border-[#e0e0e2]">
        <p class="text-[14px] text-neutral-700">${elem.pName}</p>
      </label>
    </li>
    `;
  });
  document
    .querySelector(".sellers-desktop")
    .insertAdjacentHTML("afterbegin", AllBrands.join(""));
  document
    .querySelector(".sellers-mobile")
    .insertAdjacentHTML("afterbegin", AllBrands.join(""));
  document
    .querySelector(".sellers-mobile-filter")
    .insertAdjacentHTML("afterbegin", AllBrands.join(""));
};

async function allData() {
  await fetchCategoryShopingSlider();
  await fetchMontakhabSlider();
  await fetchEtmamSlider();
  await fetchSerfareshiSlider();
  await fetchmainProducts();
  await fetchBrands();
  await fetchSellers();
  initSlider();
}
function initSlider() {
//Main Slider//
var swiper = new Swiper(".mySlider", {
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
//Main Slider//

//Category Shoping//  
function calculateSlidesPerViewMyGrouping() {
  const slideWidth = 130; 
  const width = window.innerWidth;
  return Math.max(1, Math.floor(width / slideWidth));
}

const myGroupingSwiper = new Swiper('.myGrouping', {
  slidesPerView: calculateSlidesPerViewMyGrouping(),
  navigation: {
    nextEl: '.swiper-button-next-category',
    prevEl: '.swiper-button-prev-category',
  },
});

window.addEventListener('resize', () => {
  const newSlidesPerViewMyGrouping = calculateSlidesPerViewMyGrouping();
  myGroupingSwiper.params.slidesPerView = newSlidesPerViewMyGrouping;
  myGroupingSwiper.update();
});
//Category Shoping//

//shegeft angiz haye montakhab//
function calculateSlidesPerViewMyMontakhab() {
  const slideWidth = 190; 
  const width = window.innerWidth;
  return Math.max(1, Math.floor(width / slideWidth));
}

const myMontakhabSwiper = new Swiper('.myMontakhab', {
  slidesPerView: calculateSlidesPerViewMyMontakhab(),
  spaceBetween: 5,
  navigation: {
    nextEl: '.swiper-button-next-montakhab',
    prevEl: '.swiper-button-prev-montakhab',
  },
});

window.addEventListener('resize', () => {
  const newSlidesPerViewMyMontakhab = calculateSlidesPerViewMyMontakhab();
  myMontakhabSwiper.params.slidesPerView = newSlidesPerViewMyMontakhab;
  myMontakhabSwiper.update();
});
//shegeft angiz haye montakhab//

// shegeft angiz haye ro be etmam//

function calculateSlidesPerViewMyShegeftEtmam() {
  const slideWidth = 208; 
  const width = window.innerWidth;
  return Math.max(1, Math.floor(width / slideWidth));
}

const myShegeftEtmamSwiper = new Swiper('.myShegeftEtmam', {
  slidesPerView: calculateSlidesPerViewMyShegeftEtmam(),
  spaceBetween: 0,
  navigation: {
    nextEl: '.swiper-button-next-Shegeft-etmam',
    prevEl: '.swiper-button-prev-Shegeft-etmam',
  },
});

window.addEventListener('resize', () => {
  const newSlidesPerViewMyShegeftEtmam = calculateSlidesPerViewMyShegeftEtmam();
  myShegeftEtmamSwiper.params.slidesPerView = newSlidesPerViewMyShegeftEtmam;
  myShegeftEtmamSwiper.update();
}); 
// shegeft angiz haye ro be etmam//

// shegeft angiz haye sefareshi//

function calculateSlidesPerViewMyShegeftSefareshi() {
  const slideWidth = 208;
  const width = window.innerWidth;
  return Math.max(1, Math.floor(width / slideWidth));
}

const myShegeftSefareshiSwiper = new Swiper('.myShegeftSefareshi', {
  slidesPerView: calculateSlidesPerViewMyShegeftSefareshi(),
  spaceBetween: 0,
  navigation: {
    nextEl: '.swiper-button-next-Shegeft-Sefareshi',
    prevEl: '.swiper-button-prev-Shegeft-Sefareshi',
  },
});

window.addEventListener('resize', () => {
  const newSlidesPerViewMyShegeftSefareshi = calculateSlidesPerViewMyShegeftSefareshi();
  myShegeftSefareshiSwiper.params.slidesPerView = newSlidesPerViewMyShegeftSefareshi;
  myShegeftSefareshiSwiper.update();
}); 
// shegeft angiz haye sefareshi// 

}
allData();
