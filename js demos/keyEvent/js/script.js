var data=['IPhone7','Ipad','三星笔记本','佳能相机','惠普打印机','谢谢参与','50元充值卡','1000元超市购物券'],
    timer=null,
    flag=0;

window.onload=function(){
    var play=document.getElementById('play'),
        stop=document.getElementById('stop');

    // 开始抽奖
    play.onclick=playFun;
    stop.onclick=stopFun;

   // 键盘事件
   document.onkeyup=function(event){
      event = event || window.event;
	  //使用回车键进行触发，回车键的键码为13
      if(event.keyCode==13){
         if(flag==0){
           playFun();
           flag=1;
         }else{
           stopFun();
           flag=0;
         }
      }
   }
}

function playFun(){
	var title=document.getElementById('title');
	var play=document.getElementById('play');
	//每次点击“开始”按钮清除计时器
	clearInterval(timer);
	
	//设置定时器，每50毫秒产生一个随机数
	timer=setInterval(function(){
	   //获得0-7之间的随机数
	   var random=Math.floor(Math.random()*data.length);
	   title.innerHTML=data[random];
	},50);
	
	//改变”开始“按钮的背景颜色
    play.style.background='#999';
}

function stopFun(){
	//清除计数器，计数停止
	clearInterval(timer);
	
	//恢复”开始“按钮的背景颜色
	var play=document.getElementById('play');
	play.style.background='#036';
}