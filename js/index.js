
function init() {
  var header = document.querySelector('header.postHeader')

  var bannerContainer = document.createElement('div');
  bannerContainer.id = 'bannerContainer'

  header.insertBefore(bannerContainer, header.firstChild)

  var h = vhtml

  bannerContainer.innerHTML = h(
    'div',
    { class: 'banner' },
    h('span', {}, 'We\'re still working on the docs, thanks!!') 
  )

  setTimeout(function () {
    bannerContainer.innerHTML = ''
  }, 5000);
} 

document.addEventListener('DOMContentLoaded', init, false);