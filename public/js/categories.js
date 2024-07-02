/////////Height Finder//////////
function updateWindowHeight() {
  document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
}
updateWindowHeight();
window.addEventListener('resize', updateWindowHeight);
/////////Height Finder//////////

/////////Page Reloder//////////
function handleResize() {
  if (window.innerWidth >= 1024) {
    const prevPage = sessionStorage.getItem('prevPage') || 'index.html';
    window.location.href = prevPage;
  }
}

window.addEventListener('resize', handleResize);
document.addEventListener('DOMContentLoaded', function() {
  handleResize();
});
/////////Page Reloder//////////

///////// Pop up search /////////
function openSearchPopup() {
  document.getElementById("searchPopup").classList.add("show");
  document.body.classList.add("overflow-hidden");
}

function closeSearchPopup() {
  document.getElementById("searchPopup").classList.remove("show");
  document.body.classList.remove("overflow-hidden");
}

function handleResizeSearch() {
  if (window.innerWidth >= 1024) {
    closeSearchPopup();
  }
}

window.addEventListener('resize', handleResizeSearch);

document.addEventListener('DOMContentLoaded', function() {
  handleResizeSearch(); 
});
///////// Pop up search /////////

///////// Showing and hidding categories /////////

const initializeCategoryEvents = () => {
  const divs = document.querySelectorAll(".category");
  let previousDiv = null;
  let previousDetails = [];

  divs.forEach((div) => {
    div.addEventListener("click", () => {
      const detailClass = div.getAttribute("data-detail-class");
      const detailElements = document.querySelectorAll(`.${detailClass}`);

      if (previousDiv) {
        previousDiv.classList.remove("bg-white");
        previousDiv.classList.add("border-l");
        previousDiv.querySelector("svg").style.fill = "";
        previousDiv.querySelector("a").style.color = "";
      }
      if (previousDetails.length > 0) {
        previousDetails.forEach((detail) => {
          detail.classList.remove("block");
          detail.classList.add("hidden");
        });
      }

      div.classList.add("bg-white");
      div.classList.remove("border-l");
      div.querySelector("svg").style.fill = "red";
      div.querySelector("a").style.color = "red";
      detailElements.forEach((detail) => {
        detail.classList.remove("hidden");
        detail.classList.add("block");
      });

      previousDiv = div;
      previousDetails = detailElements;
    });
  });

  if (divs.length > 0) {
    divs[0].click();
  }
};

///////// Showing and hidding categories /////////

function toggleSection(sectionId, sectionName) {
  var content = document.getElementById(
    "collapsibleContent-" + sectionName + "-" + sectionId
  );
  var icon = document.getElementById(
    "toggleIcon-" + sectionName + "-" + sectionId
  );
  if (content.classList.contains("hidden")) {
    content.classList.remove("hidden");
    icon.classList.remove("rotate-0");
    icon.classList.add("rotate-180");
  } else {
    content.classList.add("hidden");
    icon.classList.remove("rotate-180");
    icon.classList.add("rotate-0");
  }
}

const getNestedProperty = (obj, keys) => {
  return keys.reduce((nestedObj, key) => {
    return nestedObj && nestedObj[key] !== undefined
      ? nestedObj[key]
      : undefined;
  }, obj);
};
let fetchMobile = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.mobile.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    let sectionDetailsHTML = sectionDetails
      .map(
        (detail) => `
    <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
      <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
        <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
      </div>
      <p class="text-center text-[10px]">${detail.categoryName}</p>
    </a>
  `
      )
      .join("");

    return `
    <div class="mobile border-b border-[#e0e0e2] hidden">
      <div class="flex justify-between items-center py-4 cursor-pointer"
        onclick="toggleSection('${elem.id}','mobile')"
      >
        <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        <svg
          id="toggleIcon-mobile-${elem.id}"
          class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
      <div id="collapsibleContent-mobile-${elem.id}" class="hidden pb-4">
        <div class="grid grid-cols-3">
          ${sectionDetailsHTML}
            <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
              <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
              </div>
              <p class="text-center text-[10px]">همه کالاها</p>
            </a>
        </div>
      </div>
    </div>`;
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="mobile hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات موبایل</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};
let fetchDigitalProducts = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.digitalProducts.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    if (sectionDetails.length >> 0) {
      let sectionDetailsHTML = sectionDetails
        .map(
          (detail) => `
      <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
        <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
          <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
        </div>
        <p class="text-center text-[10px]">${detail.categoryName}</p>
      </a>
    `
        )
        .join("");
      return `
      <div class="digital-products border-b border-[#e0e0e2] hidden">
        <div class="flex justify-between items-center py-4 cursor-pointer"
          onclick="toggleSection('${elem.id}','digital-products')"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
          <svg
            id="toggleIcon-digital-products-${elem.id}"
            class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <div id="collapsibleContent-digital-products-${elem.id}" class="hidden pb-4">
          <div class="grid grid-cols-3">
            ${sectionDetailsHTML}
              <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
                <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                  <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
                </div>
                <p class="text-center text-[10px]">همه کالاها</p>
              </a>
          </div>
        </div>
      </div>`;
    } else {
      return `
      <div class="digital-products border-b border-[#e0e0e2] hidden">
        <a href="#" class="flex justify-start items-center py-4"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        </a>
      </div>`;
    }
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="digital-products hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات کالای دیجیتال</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};
let fetchhomeAndKitchen = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.homeAndKitchen.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    if (sectionDetails.length >> 0) {
      let sectionDetailsHTML = sectionDetails
        .map(
          (detail) => `
      <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
        <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
          <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
        </div>
        <p class="text-center text-[10px]">${detail.categoryName}</p>
      </a>
    `
        )
        .join("");
      return `
      <div class="home-and-kitchen border-b border-[#e0e0e2] hidden">
        <div class="flex justify-between items-center py-4 cursor-pointer"
          onclick="toggleSection('${elem.id}','home-and-kitchen')"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
          <svg
            id="toggleIcon-home-and-kitchen-${elem.id}"
            class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <div id="collapsibleContent-home-and-kitchen-${elem.id}" class="hidden pb-4">
          <div class="grid grid-cols-3">
            ${sectionDetailsHTML}
              <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
                <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                  <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
                </div>
                <p class="text-center text-[10px]">همه کالاها</p>
              </a>
          </div>
        </div>
      </div>`;
    } else {
      return `
      <div class="home-and-kitchen border-b border-[#e0e0e2] hidden">
        <a href="#" class="flex justify-start items-center py-4"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        </a>
      </div>`;
    }
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="home-and-kitchen hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات خانه و آشپزخانه</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};
let fetchAppliances = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.appliances.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    if (sectionDetails.length >> 0) {
      let sectionDetailsHTML = sectionDetails
        .map(
          (detail) => `
      <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
        <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
          <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
        </div>
        <p class="text-center text-[10px]">${detail.categoryName}</p>
      </a>
    `
        )
        .join("");
      return `
      <div class="appliances border-b border-[#e0e0e2] hidden">
        <div class="flex justify-between items-center py-4 cursor-pointer"
          onclick="toggleSection('${elem.id}','appliances')"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
          <svg
            id="toggleIcon-appliances-${elem.id}"
            class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <div id="collapsibleContent-appliances-${elem.id}" class="hidden pb-4">
          <div class="grid grid-cols-3">
            ${sectionDetailsHTML}
              <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
                <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                  <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
                </div>
                <p class="text-center text-[10px]">همه کالاها</p>
              </a>
          </div>
        </div>
      </div>`;
    } else {
      return `
      <div class="appliances border-b border-[#e0e0e2] hidden">
        <a href="#" class="flex justify-start items-center py-4"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        </a>
      </div>`;
    }
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="appliances hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات لوازم خانگی برقی</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};
let fetchFashion = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.fashion.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    if (sectionDetails.length >> 0) {
      let sectionDetailsHTML = sectionDetails
        .map(
          (detail) => `
      <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
        <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
          <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
        </div>
        <p class="text-center text-[10px]">${detail.categoryName}</p>
      </a>
    `
        )
        .join("");
      return `
      <div class="fashion border-b border-[#e0e0e2] hidden">
        <div class="flex justify-between items-center py-4 cursor-pointer"
          onclick="toggleSection('${elem.id}','fashion')"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
          <svg
            id="toggleIcon-fashion-${elem.id}"
            class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <div id="collapsibleContent-fashion-${elem.id}" class="hidden pb-4">
          <div class="grid grid-cols-3">
            ${sectionDetailsHTML}
              <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
                <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                  <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
                </div>
                <p class="text-center text-[10px]">همه کالاها</p>
              </a>
          </div>
        </div>
      </div>`;
    } else {
      return `
      <div class="fashion border-b border-[#e0e0e2] hidden">
        <a href="#" class="flex justify-start items-center py-4"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        </a>
      </div>`;
    }
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="fashion hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات مد و پوشاک</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};
let fetchJewelry = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.jewelry.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    if (sectionDetails.length >> 0) {
      let sectionDetailsHTML = sectionDetails
        .map(
          (detail) => `
      <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
        <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
          <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
        </div>
        <p class="text-center text-[10px]">${detail.categoryName}</p>
      </a>
    `
        )
        .join("");
      return `
      <div class="jewelry border-b border-[#e0e0e2] hidden">
        <div class="flex justify-between items-center py-4 cursor-pointer"
          onclick="toggleSection('${elem.id}','jewelry')"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
          <svg
            id="toggleIcon-jewelry-${elem.id}"
            class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <div id="collapsibleContent-jewelry-${elem.id}" class="hidden pb-4">
          <div class="grid grid-cols-3">
            ${sectionDetailsHTML}
              <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
                <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                  <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
                </div>
                <p class="text-center text-[10px]">همه کالاها</p>
              </a>
          </div>
        </div>
      </div>`;
    } else {
      return `
      <div class="jewelry border-b border-[#e0e0e2] hidden">
        <a href="#" class="flex justify-start items-center py-4"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        </a>
      </div>`;
    }
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="jewelry hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات ساعت، طلا و جواهرات</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};
let fetchCosmeticProducts = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.cosmeticProducts.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    let sectionDetailsHTML = sectionDetails
      .map(
        (detail) => `
    <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
      <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
        <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
      </div>
      <p class="text-center text-[10px]">${detail.categoryName}</p>
    </a>
  `
      )
      .join("");

    return `
    <div class="cosmetic-products border-b border-[#e0e0e2] hidden">
      <div class="flex justify-between items-center py-4 cursor-pointer"
        onclick="toggleSection('${elem.id}','cosmetic-products')"
      >
        <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        <svg
          id="toggleIcon-cosmetic-products-${elem.id}"
          class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
      <div id="collapsibleContent-cosmetic-products-${elem.id}" class="hidden pb-4">
        <div class="grid grid-cols-3">
          ${sectionDetailsHTML}
            <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
              <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
              </div>
              <p class="text-center text-[10px]">همه کالاها</p>
            </a>
        </div>
      </div>
    </div>`;
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="cosmetic-products hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات آرایشی بهداشتی</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};
let fetchHealthPoroducts = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.healthPoroducts.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    if (sectionDetails.length >> 0) {
      let sectionDetailsHTML = sectionDetails
        .map(
          (detail) => `
      <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
        <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
          <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
        </div>
        <p class="text-center text-[10px]">${detail.categoryName}</p>
      </a>
    `
        )
        .join("");
      return `
      <div class="health-products border-b border-[#e0e0e2] hidden">
        <div class="flex justify-between items-center py-4 cursor-pointer"
          onclick="toggleSection('${elem.id}','health-products')"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
          <svg
            id="toggleIcon-health-products-${elem.id}"
            class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <div id="collapsibleContent-health-products-${elem.id}" class="hidden pb-4">
          <div class="grid grid-cols-3">
            ${sectionDetailsHTML}
              <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
                <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                  <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
                </div>
                <p class="text-center text-[10px]">همه کالاها</p>
              </a>
          </div>
        </div>
      </div>`;
    } else {
      return `
      <div class="health-products border-b border-[#e0e0e2] hidden">
        <a href="#" class="flex justify-start items-center py-4"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        </a>
      </div>`;
    }
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="health-products hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات تجهیزات پزشکی و سلامت</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};
let fetchGiftCard = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.giftCard.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    if (sectionDetails.length >> 0) {
      let sectionDetailsHTML = sectionDetails
        .map(
          (detail) => `
      <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
        <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
          <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
        </div>
        <p class="text-center text-[10px]">${detail.categoryName}</p>
      </a>
    `
        )
        .join("");
      return `
      <div class="gift-card border-b border-[#e0e0e2] hidden">
        <div class="flex justify-between items-center py-4 cursor-pointer"
          onclick="toggleSection('${elem.id}','gift-card')"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
          <svg
            id="toggleIcon-gift-card-${elem.id}"
            class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <div id="collapsibleContent-gift-card-${elem.id}" class="hidden pb-4">
          <div class="grid grid-cols-3">
            ${sectionDetailsHTML}
              <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
                <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                  <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
                </div>
                <p class="text-center text-[10px]">همه کالاها</p>
              </a>
          </div>
        </div>
      </div>`;
    } else {
      return `
      <div class="gift-card border-b border-[#e0e0e2] hidden">
        <a href="#" class="flex justify-start items-center py-4"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        </a>
      </div>`;
    }
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="gift-card hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات کارت هدیه و گیفت کارت</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};
let fetchSuperMarketProducts = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.superMarketProducts.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    let sectionDetailsHTML = sectionDetails
      .map(
        (detail) => `
    <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
      <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
        <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
      </div>
      <p class="text-center text-[10px]">${detail.categoryName}</p>
    </a>
  `
      )
      .join("");

    return `
    <div class="super-market-products border-b border-[#e0e0e2] hidden">
      <div class="flex justify-between items-center py-4 cursor-pointer"
        onclick="toggleSection('${elem.id}','super-market-products')"
      >
        <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        <svg
          id="toggleIcon-super-market-products-${elem.id}"
          class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
      <div id="collapsibleContent-super-market-products-${elem.id}" class="hidden pb-4">
        <div class="grid grid-cols-3">
          ${sectionDetailsHTML}
            <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
              <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
              </div>
              <p class="text-center text-[10px]">همه کالاها</p>
            </a>
        </div>
      </div>
    </div>`;
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="super-market-products hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات کالاهای سوپرمارکتی</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};
let fetchArtProducts = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.artProducts.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    if (sectionDetails.length >> 0) {
      let sectionDetailsHTML = sectionDetails
        .map(
          (detail) => `
      <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
        <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
          <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
        </div>
        <p class="text-center text-[10px]">${detail.categoryName}</p>
      </a>
    `
        )
        .join("");
      return `
      <div class="art-products border-b border-[#e0e0e2] hidden">
        <div class="flex justify-between items-center py-4 cursor-pointer"
          onclick="toggleSection('${elem.id}','art-products')"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
          <svg
            id="toggleIcon-art-products-${elem.id}"
            class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <div id="collapsibleContent-art-products-${elem.id}" class="hidden pb-4">
          <div class="grid grid-cols-3">
            ${sectionDetailsHTML}
              <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
                <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                  <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
                </div>
                <p class="text-center text-[10px]">همه کالاها</p>
              </a>
          </div>
        </div>
      </div>`;
    } else {
      return `
      <div class="art-products border-b border-[#e0e0e2] hidden">
        <a href="#" class="flex justify-start items-center py-4"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        </a>
      </div>`;
    }
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="art-products hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات کتاب، لوازم تحریر و هنر</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};
let fetchToys = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.toys.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    if (sectionDetails.length >> 0) {
      let sectionDetailsHTML = sectionDetails
        .map(
          (detail) => `
      <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
        <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
          <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
        </div>
        <p class="text-center text-[10px]">${detail.categoryName}</p>
      </a>
    `
        )
        .join("");
      return `
      <div class="toys border-b border-[#e0e0e2] hidden">
        <div class="flex justify-between items-center py-4 cursor-pointer"
          onclick="toggleSection('${elem.id}','toys')"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
          <svg
            id="toggleIcon-toys-${elem.id}"
            class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <div id="collapsibleContent-toys-${elem.id}" class="hidden pb-4">
          <div class="grid grid-cols-3">
            ${sectionDetailsHTML}
              <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
                <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                  <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
                </div>
                <p class="text-center text-[10px]">همه کالاها</p>
              </a>
          </div>
        </div>
      </div>`;
    } else {
      return `
      <div class="toys border-b border-[#e0e0e2] hidden">
        <a href="#" class="flex justify-start items-center py-4"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        </a>
      </div>`;
    }
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="toys hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات اسباب بازی، کودک و نوزاد</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};
let fetchTools = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.tools.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    let sectionDetailsHTML = sectionDetails
      .map(
        (detail) => `
    <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
      <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
        <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
      </div>
      <p class="text-center text-[10px]">${detail.categoryName}</p>
    </a>
  `
      )
      .join("");

    return `
    <div class="tools border-b border-[#e0e0e2] hidden">
      <div class="flex justify-between items-center py-4 cursor-pointer"
        onclick="toggleSection('${elem.id}','tools')"
      >
        <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        <svg
          id="toggleIcon-tools-${elem.id}"
          class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
      <div id="collapsibleContent-tools-${elem.id}" class="hidden pb-4">
        <div class="grid grid-cols-3">
          ${sectionDetailsHTML}
            <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
              <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
              </div>
              <p class="text-center text-[10px]">همه کالاها</p>
            </a>
        </div>
      </div>
    </div>`;
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="tools hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات ابزار آلات و تجهیزات</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};
let fetchCarAndMotorcycle = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.carAndMotorcycle.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    if (sectionDetails.length >> 0) {
      let sectionDetailsHTML = sectionDetails
        .map(
          (detail) => `
      <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
        <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
          <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
        </div>
        <p class="text-center text-[10px]">${detail.categoryName}</p>
      </a>
    `
        )
        .join("");
      return `
      <div class="car-and-motorcycle border-b border-[#e0e0e2] hidden">
        <div class="flex justify-between items-center py-4 cursor-pointer"
          onclick="toggleSection('${elem.id}','car-and-motorcycle')"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
          <svg
            id="toggleIcon-car-and-motorcycle-${elem.id}"
            class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <div id="collapsibleContent-car-and-motorcycle-${elem.id}" class="hidden pb-4">
          <div class="grid grid-cols-3">
            ${sectionDetailsHTML}
              <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
                <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                  <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
                </div>
                <p class="text-center text-[10px]">همه کالاها</p>
              </a>
          </div>
        </div>
      </div>`;
    } else {
      return `
      <div class="car-and-motorcycle border-b border-[#e0e0e2] hidden">
        <a href="#" class="flex justify-start items-center py-4"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        </a>
      </div>`;
    }
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="car-and-motorcycle hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات خودرو و موتورسیکلت</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};
let fetchSportAndTravel = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.sportAndTravel.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    if (sectionDetails.length >> 0) {
      let sectionDetailsHTML = sectionDetails
        .map(
          (detail) => `
      <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
        <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
          <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
        </div>
        <p class="text-center text-[10px]">${detail.categoryName}</p>
      </a>
    `
        )
        .join("");
      return `
      <div class="sport-and-travel border-b border-[#e0e0e2] hidden">
        <div class="flex justify-between items-center py-4 cursor-pointer"
          onclick="toggleSection('${elem.id}','sport-and-travel')"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
          <svg
            id="toggleIcon-sport-and-travel-${elem.id}"
            class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <div id="collapsibleContent-sport-and-travel-${elem.id}" class="hidden pb-4">
          <div class="grid grid-cols-3">
            ${sectionDetailsHTML}
              <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
                <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                  <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
                </div>
                <p class="text-center text-[10px]">همه کالاها</p>
              </a>
          </div>
        </div>
      </div>`;
    } else {
      return `
      <div class="sport-and-travel border-b border-[#e0e0e2] hidden">
        <a href="#" class="flex justify-start items-center py-4"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        </a>
      </div>`;
    }
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="sport-and-travel hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات ورزش و سفر</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};
let fetchLocalProducts = async () => {
  let data = await fetch("./db.json");
  let res = await data.json();
  let product = res.localProducts.map((elem) => {
    let sectionDetails = getNestedProperty(elem, ["sectionDetails"]);
    if (sectionDetails.length >> 0) {
      let sectionDetailsHTML = sectionDetails
        .map(
          (detail) => `
      <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
        <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
          <img src="${detail.image}" alt="${detail.categoryName}" class="mix-blend-darken w-[45px] h-[45px]"/>
        </div>
        <p class="text-center text-[10px]">${detail.categoryName}</p>
      </a>
    `
        )
        .join("");
      return `
      <div class="local-products border-b border-[#e0e0e2] hidden">
        <div class="flex justify-between items-center py-4 cursor-pointer"
          onclick="toggleSection('${elem.id}','local-products')"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
          <svg
            id="toggleIcon-local-products-${elem.id}"
            class="w-4 h-4 text-gray-600 transform rotate-0 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <div id="collapsibleContent-local-products-${elem.id}" class="hidden pb-4">
          <div class="grid grid-cols-3">
            ${sectionDetailsHTML}
              <a href="#" class="p-2 w-full h-auto grow flex flex-col items-center gap-y-2">
                <div class="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-neutral-100">
                  <img src="./public/images/svg/all-products.svg" alt="همه کالاها" class="mix-blend-darken"/>
                </div>
                <p class="text-center text-[10px]">همه کالاها</p>
              </a>
          </div>
        </div>
      </div>`;
    } else {
      return `
      <div class="local-products border-b border-[#e0e0e2] hidden">
        <a href="#" class="flex justify-start items-center py-4"
        >
          <h5 class="text-[11px] font-bold text-gray-800">${elem.sectionName}</h5>
        </a>
      </div>`;
    }
  });
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", product.join(""));

  let upperText = `
      <div class="local-products hidden">
        <div class="flex items-center justify-start mt-2 mb-3">
          <a href="" class="flex items-center font-digikala">
            <p class="text-[#19bfd3] text-[11px]">همه محصولات محصولات بومی و محلی</p>
            <img src="/public/images/svg/left-blue.svg" alt="" class="w-[18px] h-[18px]">
          </a>
        </div>
      </div>
      `;
  document
    .querySelector(".categories")
    .insertAdjacentHTML("afterbegin", upperText);
};

async function allData() {
  await fetchMobile();
  await fetchDigitalProducts();
  await fetchhomeAndKitchen();
  await fetchAppliances();
  await fetchFashion();
  await fetchJewelry();
  await fetchCosmeticProducts();
  await fetchHealthPoroducts();
  await fetchGiftCard();
  await fetchSuperMarketProducts();
  await fetchArtProducts();
  await fetchToys();
  await fetchTools();
  await fetchCarAndMotorcycle();
  await fetchSportAndTravel();
  await fetchLocalProducts();
  initializeCategoryEvents();
}

allData();
