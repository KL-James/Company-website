window.onload = function () {
    var carousel = document.querySelector('.carousel');
    var carouselUl = carousel.querySelector('ul');
    var carouselLis = carouselUl.querySelectorAll('li');
    var points = carousel.querySelector('ol');
    // 屏幕的宽度
    var screenWidth = document.documentElement.offsetWidth;
    var timer = null;

    // 设置 ul 的高度
    carouselUl.style.height = carouselLis[0].offsetHeight + 'px';

    // 动态生成小圆点
    for (var i = 0; i < carouselLis.length; i++) {
      var li = document.createElement('li');
      
      if (i == 0) {
        li.classList.add('active');
      }
      points.appendChild(li);
      // 给每个li加上id
      $('li').each(function(index, item){
        $(item).attr('id', 'id-' + index);
        });
    }
    document.getElementById("id-4").innerHTML="销售人员抽奖活动";
    document.getElementById("id-5").innerHTML="1年至少两次团队旅游";
    document.getElementById("id-6").innerHTML="2019 冬至水饺宴";
    document.getElementById("id-7").innerHTML="年底聚会聚餐";
    // 初始三个固定的位置
    var left = carouselLis.length - 1;
    var center = 0;
    var right = 1;

    // 归位（多次使用，封装成函数）
    setTransform();

    // 调用定时器
    timer = setInterval(showNext, 2000);

    // 分别绑定touch事件
    var startX = 0; // 手指落点
    var startTime = null; // 开始触摸时间
    carouselUl.addEventListener('touchstart', touchstartHandler); // 滑动开始绑定的函数 touchstartHandler
    carouselUl.addEventListener('touchmove', touchmoveHandler); // 持续滑动绑定的函数 touchmoveHandler
    carouselUl.addEventListener('touchend', touchendHandeler); // 滑动结束绑定的函数 touchendHandeler

    // 轮播图片切换下一张
    function showNext() {
      // 轮转下标
      left = center;
      center = right;
      right++;
      //　极值判断
      if (right > carouselLis.length - 1) {
        right = 0;
      }
      //添加过渡（多次使用，封装成函数）
      setTransition(1, 1, 0);
      // 归位
      setTransform();
      // 自动设置小圆点
      setPoint();
    }

    // 轮播图片切换上一张
    function showPrev() {
      // 轮转下标
      right = center;
      center = left;
      left--;
      //　极值判断
      if (left < 0) {
        left = carouselLis.length - 1;
      }
      //添加过渡
      setTransition(0, 1, 1);
      // 归位
      setTransform();
      // 自动设置小圆点
      setPoint();
    }

    // 滑动开始
    function touchstartHandler(e) {
      // 清除定时器
      clearInterval(timer);
      // 记录滑动开始的时间
      startTime = Date.now();
      // 记录手指最开始的落点
      startX = e.changedTouches[0].clientX;
    }
    // 滑动持续中
    function touchmoveHandler(e) {
      // 获取差值 自带正负
      var dx = e.changedTouches[0].clientX - startX;
      // 干掉过渡
      setTransition(0, 0, 0);
      // 归位
      setTransform(dx);
    }
    //　滑动结束
    function touchendHandeler(e) {
      // 在手指松开的时候，要判断当前是否滑动成功
      var dx = e.changedTouches[0].clientX - startX;
      // 获取时间差
      var dTime = Date.now() - startTime;
      // 滑动成功的依据是滑动的距离（绝对值）超过屏幕的三分之一 或者滑动的时间小于300毫秒同时滑动的距离大于30
      if (Math.abs(dx) > screenWidth / 3 || (dTime < 300 && Math.abs(dx) > 30)) {
        // 滑动成功了
        // 判断用户是往哪个方向滑
        if (dx > 0) {
          // 往右滑 看到上一张
          showPrev();
        } else {
          // 往左滑 看到下一张
          showNext();
        }
      } else {
        // 添加上过渡
        setTransition(1, 1, 1);
        // 滑动失败了
        setTransform();
      }

      // 重新启动定时器
      clearInterval(timer);
      // 调用定时器
      timer = setInterval(showNext, 2000);
    }
    // 设置过渡
    function setTransition(a, b, c) {
      if (a) {
        carouselLis[left].style.transition = 'transform 1s';
      } else {
        carouselLis[left].style.transition = 'none';
      }
      if (b) {
        carouselLis[center].style.transition = 'transform 1s';
      } else {
        carouselLis[center].style.transition = 'none';
      }
      if (c) {
        carouselLis[right].style.transition = 'transform 1s';
      } else {
        carouselLis[right].style.transition = 'none';
      }
    }

    //　封装归位
    function setTransform(dx) {
      dx = dx || 0;
      carouselLis[left].style.transform = 'translateX(' + (-screenWidth + dx) + 'px)';
      carouselLis[center].style.transform = 'translateX(' + dx + 'px)';
      carouselLis[right].style.transform = 'translateX(' + (screenWidth + dx) + 'px)';
    }
    // 动态设置小圆点的active类
    var pointsLis = points.querySelectorAll('li');

    function setPoint() {
      for (var i = 0; i < pointsLis.length; i++) {
        pointsLis[i].classList.remove('active');
      }
      pointsLis[center].classList.add('active');
    }
  }