var lastScroll=0;function floatMainMenuOnScroll(){let scrollingUp=false;let currentScrollPos=window.pageYOffset||document.documentElement.scrollTop;if(currentScrollPos<lastScroll){scrollingUp=true;}
let headerBlock=document.getElementsByClassName('block-quartz-blocks-header')[0];if(!headerBlock){return;}
let rect=headerBlock.getBoundingClientRect();let belowHeaderBottom=rect.y+rect.height;let mainMenuSubContainer=document.getElementsByClassName('js-main-menu-sub-container')[0];let mobileMenuSubContainer=document.getElementsByClassName('js-mobile-menu-sub-container')[0];let mainWrapper=document.getElementsByClassName('layout-main-wrapper')[0];let belowMenu=belowHeaderBottom<20;if(!belowMenu){mainMenuSubContainer.classList.remove('show-menu');mainMenuSubContainer.classList.remove('hide-menu');mainMenuSubContainer.classList.remove('float-menu');mobileMenuSubContainer.classList.remove('show-menu');mobileMenuSubContainer.classList.remove('hide-menu');mobileMenuSubContainer.classList.remove('float-menu');mainWrapper.classList.remove('show-mobile-menu');}else if(belowMenu&&scrollingUp){mainMenuSubContainer.classList.add('show-menu');mainMenuSubContainer.classList.remove('hide-menu');mobileMenuSubContainer.classList.add('show-menu');mobileMenuSubContainer.classList.remove('hide-menu');mainWrapper.classList.add('show-mobile-menu');}else if(belowMenu&&!scrollingUp){mainMenuSubContainer.classList.add('float-menu');mainMenuSubContainer.classList.add('hide-menu');mainMenuSubContainer.classList.remove('show-menu');mobileMenuSubContainer.classList.add('float-menu');mobileMenuSubContainer.classList.add('hide-menu');mobileMenuSubContainer.classList.remove('show-menu');mainWrapper.classList.remove('show-mobile-menu');}
lastScroll=currentScrollPos;}
window.addEventListener('scroll',floatMainMenuOnScroll);function closeMobileSubNavs(){[].forEach.call(document.querySelectorAll('.header-dropdown .menu-item--expanded'),function(e){e.classList.remove('active');});[].forEach.call(document.querySelectorAll('.sub-nav-toggle'),function(e){e.classList.remove('active');});document.querySelector('.header__wrapper').classList.remove('active');}
var getClosest=function(elem,selector){if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(s){var matches=(this.document||this.ownerDocument).querySelectorAll(s),i=matches.length;while(--i>=0&&matches.item(i)!==this){}
return i>-1;};}
for(;elem&&elem!==document;elem=elem.parentNode){if(elem.matches(selector))return elem;}
return null;};document.addEventListener('click',function(event){let target=event.target;let body=document.querySelector('body');let headerToggle=document.querySelector('.header-toggle');let closedToggleIcon=document.querySelector('.toggle-icon.closed');let openToggleIcon=document.querySelector('.toggle-icon.open');let headerDropdown=document.querySelector('.header-dropdown');let headerWrapper=document.querySelector('.header__wrapper');let mobileNav=document.querySelector('.mobile-nav');if(target.tagName==='IMG'&&target.parentElement&&target.parentElement.classList.contains('mobile-menu-open')){target.parentElement.classList.remove('active');body.classList.add('hide-scrollbar');openToggleIcon.classList.add('active');headerWrapper.classList.add('active');mobileNav.classList.add('active');headerToggle.classList.add('active');headerDropdown.classList.add('active');}
if(target.tagName==='IMG'&&target.parentElement&&target.parentElement.classList.contains('mobile-menu-close')){target.parentElement.classList.remove('active');body.classList.remove('hide-scrollbar');closedToggleIcon.classList.add('active');headerWrapper.classList.remove('active');mobileNav.classList.remove('active');headerToggle.classList.remove('active');headerDropdown.classList.remove('active');closeMobileSubNavs();}
if(target&&target.classList.contains('sub-nav-toggle')){var list=getClosest(target,'.menu-item--expanded');if(!target.classList.contains('active')){target.classList.add('active');list.classList.add('active');}else{target.classList.remove('active');list.classList.remove('active');}}});document.addEventListener('DOMContentLoaded',function(){let mobileSubNav=document.querySelectorAll('.header-dropdown .menu-item--expanded');if(mobileSubNav){[].forEach.call(mobileSubNav,function(e){let subNavToggle=document.createElement('div');subNavToggle.classList.add('sub-nav-toggle');e.appendChild(subNavToggle);});}
[].forEach.call(document.querySelectorAll('.footer-menu .nav li.menu-item--expanded > a'),function(el){el.removeAttribute('href');});},false);