document.getElementById('categories-link').addEventListener('click', function(event) {
  if (window.innerWidth >= 1024) {
    event.preventDefault();
    alert('Categories page is only available on mobile view.');
  } else {
    sessionStorage.setItem('prevPage', window.location.href);
  }
});
///////////Hiding nav bar by scrolling///////////
function handleScrollForLargeScreens() {
    let lastScrollTop = 0;
    const navbar = document.getElementById('header__bottom');
    const header = document.getElementById('header');
    let navbarHeight = navbar.offsetHeight;
    let headerHeight = header.offsetHeight;
  
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        let scrollDirection = currentScroll > lastScrollTop ? 'down' : 'up';
  
        if (scrollDirection === 'down' && currentScroll > navbarHeight) {
            navbar.style.top = `-${navbarHeight}px`;
            navbar.style.zIndex = '-1';
            header.style.height = '70px';
        } else {
            navbar.style.top = '0';
            navbar.style.zIndex = 'initial';
            header.style.height = '110px';
        }
  
        lastScrollTop = currentScroll;
    });
  }
  
  function checkScreenSize() {
    if (window.matchMedia("(min-width: 1024px)").matches) {
        handleScrollForLargeScreens();
    }
  }
  
  checkScreenSize();
  
  window.addEventListener('resize', checkScreenSize);
  
  ///////////Hiding nav bar by scrolling///////////
  
  ///////////Scroll top///////////
  window.addEventListener('scroll', function() {
      var scrollToTopBtn = document.getElementById('scrollToTopBtn');
    });
    
    document.getElementById('scrollToTopBtn').addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  ///////////Scroll top///////////
  
  ///////////Read more - Read less///////////
  
  let more = document.getElementById('show-more');
  more.addEventListener('click',function (){
    let container = document.getElementById('container');
    let text = document.getElementById('text');
    if (container.offsetHeight === 125) {
      container.style.height = 'auto';
      container.classList.add('before:hidden');
      container.classList.remove('before:block');
      text.textContent  = 'بستن';
    }else{
      container.style.height = '125px';
      container.classList.remove('before:hidden');
      container.classList.add('before:block');
      text.textContent  = 'مشاهده بیشتر';
    }
  });
  
  /////////Read more - Read less/////////
  
  ///////// Pop up search /////////
  function openSearchPopup() {
    document.getElementById('searchPopup').classList.add('show');
    document.body.classList.add('overflow-hidden');
  }
  
  function closeSearchPopup() {
    document.getElementById('searchPopup').classList.remove('show');
    document.body.classList.remove('overflow-hidden');
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
  
  ///////// Mobile be hover as soon as categories hovered /////////
  document.addEventListener('DOMContentLoaded', () => {
    const mainCategory = document.getElementById('category-main');
    const subMobile = document.getElementById('sub-mobile');
    const subMobileSvg = document.getElementById('sub-mobile-svg');
    const subMobileDetails = document.getElementById('sub-mobile-details');
    const otherCategories = document.querySelectorAll('#category-others');
  
    mainCategory.addEventListener('mouseenter', () => {
      console.log('main category selected with mobile');
      subMobile.classList.add('bg-white', 'text-[#ef394e]', 'block');
      subMobileSvg.classList.add('fill-[#ef394e]');
      subMobileDetails.classList.remove('hidden');
      subMobileDetails.classList.add('block');
    });
  
    mainCategory.addEventListener('mouseleave', () => {
      console.log('main category unselected');
      subMobile.classList.remove('bg-white', 'text-[#ef394e]', 'block');
      subMobileSvg.classList.remove('fill-[#ef394e]');
      subMobileDetails.classList.remove('block');
      subMobileDetails.classList.add('hidden');
    });
  
    otherCategories.forEach(category => {
      category.addEventListener('mouseenter', () => {
        console.log('other categories selected');
        subMobile.classList.remove('bg-white', 'text-[#ef394e]', 'block');
        subMobileSvg.classList.remove('fill-[#ef394e]');
        subMobileDetails.classList.remove('block');
        subMobileDetails.classList.add('hidden');
      });
  
      category.addEventListener('mouseleave', () => {
        console.log('other categories unselected');
        if (mainCategory.matches(':hover')) {
          subMobile.classList.add('bg-white', 'text-[#ef394e]', 'block');
          subMobileSvg.classList.add('fill-[#ef394e]');
          subMobileDetails.classList.remove('hidden');
          subMobileDetails.classList.add('block');
        }
      });
    });
  });
  ///////// Mobile be hover as soon as categories hovered /////////
  
  ///////// Footer Mobile /////////
  function toggleSection(sectionId) {
    var content = document.getElementById('collapsibleContent-' + sectionId);
    var icon = document.getElementById('toggleIcon-' + sectionId);
    console.log(sectionId);
    if(sectionId === 'section5'){
      if (content.classList.contains('hidden')) {
        document.getElementById('section5-parent').classList.remove('px-5');
        document.getElementById('toggle-section5').classList.add('px-5');
        content.classList.remove('hidden');
        content.classList.add('h-[360px]');
        content.classList.add('overflow-y-auto');
        icon.classList.remove('rotate-0');
        icon.classList.add('rotate-180');
      } 
      else {
          document.getElementById('section5-parent').classList.add('px-5');
          document.getElementById('toggle-section5').classList.remove('px-5');
          content.classList.add('hidden');
          content.classList.remove('h-[360px]');
          content.classList.remove('overflow-y-auto');
          icon.classList.remove('rotate-180');
          icon.classList.add('rotate-0');
      }
    }
    else{
      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.remove('rotate-0');
        icon.classList.add('rotate-180');
        if(content.id === 'collapsibleContent-section4'){
          content.classList.remove('pb-4');
        }
        if(content.id ==='collapsibleContent-section7'){
          document.getElementById('side-bar').classList.remove('top-16');
          document.getElementById('side-bar').classList.add('-top-24');
        }
    } else {
      if(content.id === 'collapsibleContent-section4'){
        content.classList.add('pb-4');
      }
      if(content.id ==='collapsibleContent-section7'){
        document.getElementById('side-bar').classList.add('top-16');
        document.getElementById('side-bar').classList.remove('-top-24');
      }
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
        icon.classList.add('rotate-0');
    }
    }

  }