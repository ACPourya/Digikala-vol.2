///////// Footer Mobile /////////
let fetchStorySlider = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let AllStories = res.story.map((elem) => {
    return `
    <div class="swiper-slide">
    <div class="swiper-slide-content">
      <img
        src="${elem.image}"
        alt=""
        class="story-image"
      />
      <div class="story-text">${elem.storyTitle}</div>
    </div>
  </div>
    `;
  });
  document
    .querySelector(".story")
    .insertAdjacentHTML("afterbegin", AllStories.join(""));
};
let fetchAmazingSlider = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let lastSlide = `
  <div class="swiper-slide rounded-l-lg">
  <div class="h-[252px] flex flex-col justify-center gap-x-4">
    <div class="flex flex-col">
      <a
        href="./shegeftangizha.html"
        class="flex flex-col gap-x-2 items-center my-2"
      >
        <div
          class="w-[52px] h-[52px] rounded-full flex items-center justify-center border-[1px] border-[#19bfd3]"
        >
          <img
            src="./public/images/svg/مشاهده-همه-آبی.svg"
            alt=""
            class="!w-[26px] !h-[25px]"
          />
        </div>
        <span
          class="font-digikala text-[15px] text-neutral-700 mt-1 px-3"
          >مشاهده همه</span
        >
      </a>
    </div>
  </div>
</div>`
  document
.querySelector(".amazing-products")
.insertAdjacentHTML("afterbegin", lastSlide);
  let allAmazing = res.amazingOffer.map((elem) => {
    return `
    <div class="swiper-slide">
    <div class="w-inherit flex flex-col gap-y-5 p-2">
      <img
        src="${elem.image}"
        alt=""
        class="!w-[150px] !h-[150px] mx-auto"
      />
      <div class="flex flex-col gap-y-1 grow">
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
        <span
          class="flex justify-end ml-4 text-neutral-300 line-through text-[13px] font-digikala"
          >${elem.discount}</span
        >
        <div
          class="w-full h-1 mt-3 flex flex-row-reverse bg-slate-200 rounded"
        >
          <span
            class="w-[50%] h-inherit bg-red-500 rounded"
          ></span>
        </div>
      </div>
    </div>
  </div>
    `;
  });
  document
    .querySelector(".amazing-products")
    .insertAdjacentHTML("afterbegin", allAmazing.join(""));
  let firstSlide = `
  <div class="swiper-slide !bg-transparent">
  <div class="flex flex-col items-center gap-x-4">
    <img
      src="./public/images/svg/شگفت-انگیز.svg"
      alt=""
      class="!w-[80px] !h-[75px]"
    />
    <img
      src="./public/images/amazing/box.png"
      alt=""
      class="!w-[115px] !h-[105px]"
    />
    <div class="flex justify-center items-center">
      <a href="./shegeftangizha.html" class="text-white text-[15px] font-digikala">
        مشاهده همه
      </a>
      <img
        src="./public/images/svg/مشاهده-همه.svg"
        alt=""
        class="!w-[18px] !h-[18px]"
      />
    </div>
  </div>
  </div>
  `;
  document
  .querySelector(".amazing-products")
  .insertAdjacentHTML("afterbegin", firstSlide);    
};
let fetchBestBrandsSlider = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let lastBrand =  `
  <div class="swiper-slide">
    <a href="#" class="h-full px-4 py-1 overflow-hidden flex items-center justify-center">
      <div class="flex items-center justify-center ">
        <img src="./public/images/best-brands/b-12.png" alt="Samsung" class="!object-contain">
      </div>
    </a>
  </div>
  `
  document
.querySelector(".brand_slids")
.insertAdjacentHTML("afterbegin", lastBrand);
  let allBrands = res.bestBrands.map((elem) => {
    return `
    <div class="swiper-slide border-l border-[#f0f0f1]">
      <a href="#" class="h-full px-4 py-1 overflow-hidden flex items-center justify-center">
        <div class="flex items-center justify-center ">
          <img src="${elem.image}" alt="${elem.alt}" class="!object-contain">
        </div>
      </a>
    </div>
    `;
  });
  document
    .querySelector(".brand_slids")
    .insertAdjacentHTML("afterbegin", allBrands.join(""));
};
async function allData() {
    await fetchStorySlider();
    await fetchAmazingSlider();
    await fetchBestBrandsSlider();
    initSlider();
}

function initSlider() {
//Story//  
function calculateSlidesPerViewMyStory() {
  const width = window.innerWidth;
  return Math.max(1, Math.min(12.5, width / 100));
}

const myStorySwiper = new Swiper('.myStory', {
  slidesPerView: calculateSlidesPerViewMyStory(),
  spaceBetween: 2,
  navigation: {
    nextEl: '.swiper-button-next-story',
    prevEl: '.swiper-button-prev-story',
  },
});

window.addEventListener('resize', () => {
  const newSlidesPerViewMyStory = calculateSlidesPerViewMyStory();
  myStorySwiper.params.slidesPerView = newSlidesPerViewMyStory;
  myStorySwiper.update();
});
//Story//

//Amazing//
function calculateSlidesPerViewMyAmazing() {
  const slideWidth = 182; 
  const width = window.innerWidth;
  return Math.max(1, Math.floor(width / slideWidth));
}

const myAmazingSwiper = new Swiper('.myAmazing', {
  slidesPerView: calculateSlidesPerViewMyAmazing(),
  spaceBetween: 2,
  navigation: {
    nextEl: '.swiper-button-next-amazing',
    prevEl: '.swiper-button-prev-amazing',
  },
});

window.addEventListener('resize', () => {
  const newSlidesPerViewMyAmazing = calculateSlidesPerViewMyAmazing();
  myAmazingSwiper.params.slidesPerView = newSlidesPerViewMyAmazing;
  myAmazingSwiper.update();
});
//Amazing//

//Best Brands//
function calculateSlidesPerViewMyBestBrands() {
  const width = window.innerWidth;
  return Math.max(1, Math.min(9.5, width / 100));
}

const myBestBrandsSwiper = new Swiper('.myBestBrands', {
  slidesPerView: calculateSlidesPerViewMyBestBrands(),
  spaceBetween: 0,
  navigation: {
    nextEl: '.swiper-button-next-best-brands',
    prevEl: '.swiper-button-prev-best-brands',
  },
});

window.addEventListener('resize', () => {
  const newSlidesPerViewMyBestBrands = calculateSlidesPerViewMyBestBrands();
  myBestBrandsSwiper.params.slidesPerView = newSlidesPerViewMyBestBrands;
  myBestBrandsSwiper.update();
});
//Best Brands//

var swiper = new Swiper(".mySlider", {
  spaceBetween: 0,
  centeredSlides: true,
  loop: true,
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

//Recent Hottests//
function calculateSlidesPerViewMyRecentHottest() {
  const slideWidth = 334; 
  const width = window.innerWidth;
  return Math.max(1, Math.floor(width / slideWidth));
}
const myRecentHottestSwiper = new Swiper(".myRecentHottest", {
  slidesPerView: calculateSlidesPerViewMyRecentHottest(),
  spaceBetween: 0,
  navigation: {
    nextEl: ".swiper-button-next-recent-hottest",
    prevEl: ".swiper-button-prev-recent-hottest",
  },
});
window.addEventListener("resize", () => {
  const newSlidesPerViewMyRecentHottest =
    calculateSlidesPerViewMyRecentHottest();
  myRecentHottestSwiper.params.slidesPerView =
    newSlidesPerViewMyRecentHottest;
  myRecentHottestSwiper.update();
});
//Recent Hottests//

function calculateSlidesPerViewMyCategory() {
  const slideWidth = 182; 
  const width = window.innerWidth;
  return Math.max(1, Math.floor(width / slideWidth));
}

const myCategorySwiper = new Swiper(".myCategory", {
  slidesPerView: calculateSlidesPerViewMyCategory(),
  spaceBetween: 2,
  navigation: {
    nextEl: ".swiper-button-next-category",
    prevEl: ".swiper-button-prev-category",
  },
});

window.addEventListener("resize", () => {
  const newSlidesPerViewMyCategory = calculateSlidesPerViewMyCategory();
  myCategorySwiper.params.slidesPerView = newSlidesPerViewMyCategory;
  myCategorySwiper.update();
});
}
allData();