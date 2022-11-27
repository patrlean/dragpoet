// 变量定义
var wordSet = new Array();
var img = new Image();
const wordNON = ['量子力学','品学楼','他','她','我','ta','小狗','故事'];
const wordCONJ = ['是','在','有','能'];
const wordSTATE = ['让我们在一起'];
var d = new Date();//获取系统当前时间
var year = d.getFullYear();
var month = d.getMonth() + 1;
var day = d.getDay();
var now = year + '/' + month + '/' + day;
var elem;
// 函数
// 加入新词
function myFunction(obj) {
    
    elem = document.getElementById(obj.id);
    // console.log(elem.id)

    newWord = elem.innerText;
    // console.log(elem.style.backgroundColor);
    if (elem.style.backgroundColor == "white"){
        elem.style.backgroundColor = "rgb(243, 236, 176)";
        wordSet.push(newWord);
    }
    else if( elem.style.backgroundColor == "rgb(243, 236, 176)") {
        elem.style.backgroundColor = "white";
        const index = wordSet.indexOf(newWord);
        if (index > -1) { // 移除找到的指定元素
        wordSet.splice(index, 1); // 移除元素
        }
    }
    else {
    console.log(wordSet)
    // 判断是否为换行位置
    
        elem.style.background = "white";
        const index = wordSet.indexOf(newWord);
        if (index > -1) { // 移除找到的指定元素
        wordSet.splice(index, 2); // 移除元素
        }
    }
    console.log(wordSet)
}

// 生成句子
function generateSentence() {
    var sentence = new Array()
    // 为句子添加结束标签
    if (wordSet[wordSet.length-1] != '1') {
        wordSet.push('1');
    }
    // 搜索句子中“换行标志”的个数
    var enterNum = wordSet.filter(function(res){
		return res == '1';
	});
	// 组合句子
    // 每行句子放在一个sentence小标中间
    for (var i = 0; i < enterNum.length; i++) {
        enterPosition = wordSet.indexOf('1');
        sentence[i] = wordSet.splice(0,enterPosition).join("");
        wordSet.splice(0,1);
    }
    timeStamp = '制作于' + now;
    // alert(sentence);
    // 创建canvas绘图元素
    const myFont = new FontFace("myYezi", 'url(./custom/YEFONTYanShanTinXinKai-Regylar.woff2)');

    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var ratio = window.devicePixelRatio || 1;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
    ctx.scale(ratio,ratio);

    // var canvas = document.getElementById('myCanvas');
    // console.log(sentence[0])

    // var w = canvas.width;
    // var h = canvas.height;
    // canvas.width = w;
    // canvas.height = h;
    // 设置背景颜色
    ctx.fillStyle = '#1b1c20';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    var yTextStart = 130;
    var stepHeight = 40;
    // 设置背景文字
    for (var i = 0; i < sentence.length; i++) {
        ctx.font="22px myFont";
        ctx.fillStyle = "#ddd7b9";
        ctx.textAlign = "left";
        ctx.fillText(sentence[i], 70, yTextStart + i*stepHeight);
        console.log(i)
        console.log(sentence[i])
    }   

    let lineHeight = 660;
    //开始一个新的绘制路径
    ctx.beginPath();
    //定义直线的起点坐标为(10,10)
    ctx.moveTo(65, lineHeight);
    //定义直线的终点坐标为(50,10)
    ctx.lineTo(535, lineHeight);
    //沿着坐标点顺序的路径绘制直线
    ctx.strokeStyle = "#ddd7b9"; 
    ctx.stroke();
    //关闭当前的绘制路径
    ctx.closePath();
    // 绘制时间戳
    ctx.font="16px myFont";
    ctx.fillStyle = "#ddd7b9";
    ctx.fillText(timeStamp,70,700);

    // window.onload = function () {
    // var canvas = document.getElementById("myCanvas");
    // var ctx = canvas.getContext("2d");
    // ctx.font = "30px myYezi";
    // ctx.fillText("文本内容文本内容", 0, 30);
    // <img src="https://raw.githubusercontent.com/patrlean/images/main/webQRcode.png"/>
    // 插入二维码
    // var imgQR = new Image();
    // imgQR.src = "https://raw.githubusercontent.com/patrlean/images/main/webQRcode.png";
    // //待图片加载完后，将其显示在canvas上
    // imgQR.onload = function(){
    //         var ctx = canvas.getContext('2d');
    //         ctx.drawImage(imgQR, 0, 0);
    // }
    var imgQRone = document.getElementById("imgQRoneUESTCer");
    imgQRone.onload = function() {
        ctx.drawImage(imgQRone,500,400);
    }
    // 生成图像
    var dataImg = new Image()
    dataImg.src = canvas.toDataURL('image/png',1.0);
    // 设置display变换
    var page = document.getElementById("拼词页面");
    page.style.display = "none";
    var imgPage = document.getElementById("输出图像");
    var imgPageSingle = document.getElementById("输出图像单独图像");
    imgPage.style.display = "block";
    // 固定图片大小
    imgPageSingle.innerHTML = '<img style="text-align: center;width: 300px;height: 400px;border-radius:15px;" src="' + dataImg.src + '" alt="拼贴诗词" width = "450px" height = "600px" >';
    // width = "300px" height = "400px"
    // 自适应图片大小
    // imgPageSingle.innerHTML = '<img style="text-align: center;width: '+ canvas.width + 'px;height:'+ canvas.height +'px" src="' + dataImg.src + '" alt="">';
}

// 一点灵感
// 博尔赫斯
// 使他觉得遥远的不是时间长，而是两三件不可挽回的事 
// 世界会变，但是我始终如一。我带着悲哀的自负想到
// 一朵玫瑰正马不停蹄地成为另一朵玫瑰；你是云、是海、是忘却；你也是你曾失去的每一个自己
// 失眠是知道别人独睡时自己不该独醒， 是渴望进入梦境而又不能成眠 是对活着和还将继续活下去的恐惧， 是懵懵懂懂熬到天明。
function someMagic() {
    
}
// Converts canvas to an image
function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}
// 返回页面
function back2page() {
    var page = document.getElementById("拼词页面");
    page.style.display = "block";
    var imgPage = document.getElementById("输出图像");
    imgPage.style.display = "none";
    javascript:location.reload();
}
// 换行
function newlineSentence() {
    if (wordSet[wordSet.length-1] != '1') {
        wordSet.push('1');
    }
    var temp = document.getElementById(elem.id);
    console.log(elem)
    console.log(temp)
    temp.style.background = "linear-gradient(to right, rgb(243, 236, 176) 70%, rgb(228, 207, 255) 30%)";
    // rgb(243, 236, 176)
}
