 // 首先要获得所有的按钮
 var box = document.getElementById('box');
 var btns = document.getElementsByTagName('button');
 var divs = box.getElementsByTagName('div');
 for(var i=0;i<btns.length;i++){
     var btn = btns[i];
     btn.index = i;// 给每个按钮添加一个自定义属性，用来存储当前的索引
     btn.onclick = function(){

         for(var j=0;j<btns.length;j++){
             btns[j].className = '';
         }
         this.className = 'current';
         for(var k = 0;k<divs.length;k++){
             divs[k].style.display = 'none';
         }
         divs[this.index].style.display = 'block';
     }
 }
