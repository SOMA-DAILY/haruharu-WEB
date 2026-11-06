// 하루하루 공식 사이트. 측정 코드는 넣지 않았다.
(function () {
  var d = document;

  // 머리말 아래 선
  var hd = d.querySelector('.hd');
  function stuck() { if (hd) hd.classList.toggle('is-stuck', window.scrollY > 4); }
  stuck();
  window.addEventListener('scroll', stuck, { passive: true });

  // "앱 다운로드" 단추: 폰에서는 맞는 스토어로 바로, 그 밖에는 다운로드 구역으로
  var ua = navigator.userAgent || '';
  var ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  var android = /Android/.test(ua);
  [].forEach.call(d.querySelectorAll('[data-smart-store]'), function (a) {
    var to = ios ? a.getAttribute('data-ios') : android ? a.getAttribute('data-android') : '';
    if (to) { a.href = to; a.target = '_blank'; a.rel = 'noopener'; }
  });

  // 스크롤하면 떠오르기
  var els = d.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) { [].forEach.call(els, function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (list) {
    list.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  [].forEach.call(els, function (e) { io.observe(e); });
})();
