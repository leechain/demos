window.onload=function(){
	imgLocation("container","box")
	var imgData={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"}]}
	window.onscroll=function(){
		if(checkFlag()){
			var cparent=document.getElementById("container");
			for(var i=0;i<imgData.data.length;i++){
				var ccontent=document.createElement("div");
				ccontent.className="box";
				cparent.appendChild(ccontent);
				var boxing=document.createElement("div");
				boxing.className="box_img";
				ccontent.appendChild(boxing);
				var img=document.createElement("img");
				img.src="images/"+imgData.data[i].src;
				boxing.appendChild(img);
			}
			imgLocation("container","box");
		};
	}
}

function checkFlag(){
	var cparent=document.getElementById("container");
	var ccontent=getChildElement(cparent,"box");
	var lastContentHeight=ccontent[ccontent.length-1].offsetTop;
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
	if(lastContentHeight<scrollTop+pageHeight){
		return true;
	}
}

function imgLocation(parent,content){
	//将parent下所有的content全部取出
	var cparent=document.getElementById(parent);
	var ccontent=getChildElement(cparent,content);
	var imgWidth=ccontent[0].offsetWidth;
	var num=Math.floor(document.documentElement.clientWidth/imgWidth);
	cparent.style.cssText="width:"+ imgWidth*num+"px;margin:0 auto";
	
	var BoxHeightArr=[];
	for(var i=0;i<ccontent.length;i++){
		if(i<num){
			BoxHeightArr[i]=ccontent[i].offsetHeight;
		}else{
			var minHeight=Math.min.apply(null,BoxHeightArr);
			var minIndex=getminheightLocation(BoxHeightArr,minHeight);
			ccontent[i].style.position="absolute";
			ccontent[i].style.top=minHeight+"px";
			ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
			BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
		}
		
	}
}

function getminheightLocation(BoxHeightArr,minHeight){
	for(var i in BoxHeightArr){
		if(BoxHeightArr[i]==minHeight){
			return i;
		}
	}
	
}

function getChildElement(parent,content){
	var contentArr=[];
	var allcontent=parent.getElementsByTagName("*");
	for(var i=0;i<allcontent.length;i++){
		if(allcontent[i].className==content){
			contentArr.push(allcontent[i]);
		}
	}
	return contentArr;
}

　 /*  
	Math.floor()函数能够向下取整。


　　Math.min.apply(null,BoxHeightArr);函数能获得BoxHeightArr数组的最小值。


　　window.onscroll=function(){}；滑动页面的时候触发这个函数。


　　document.documentElement.clientHeight；浏览器显示出来的高度。


　　document.documentElement.scrollTop；滑动的距离。
	*/