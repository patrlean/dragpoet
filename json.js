// 变量定义
var wordSet = new Array();
var img = new Image();
var d = new Date();//获取系统当前时间
var year = d.getFullYear();
var month = d.getMonth() + 1;
var day = d.getDate();
var now = year + '/' + month + '/' + day;
var elem;
var loadingNum = 0;
// 设置文字初始行高
const yTextStart = 230;
// 设置行间距
const stepHeight = 45;
// 设置字体大小
var titleFontsize = 40;
var textFontsize = 25;
var textSmallFontsize = 20;
var footFontsize = 12;
wordSet.push('1');
var test = document.getElementById('文字卡片');
console.log(test);
// 函数
// 加入新词
function myFunction(obj) {
    var lastWord;
    var wordSetCopy = new Array();
    wordSetCopy = wordSet.slice(0);
    var wordSetThisLine = new Array();
    elem = document.getElementById(obj.id);
    // 搜索句子中“换行标志”的个数
    newWord = elem.innerText;
    if (elem.style.backgroundColor == "white"){
        // 判断是否能增加词汇行数
        var enterNum = wordSet.filter(function(res){
            return res == '1';
        });
        if ( enterNum.length > 8 ) {
            alert('句子太多啦，他们说有点挤');
            return;
        }
        // 判断是否能增加词汇个数
        wordSetCopy.push(newWord);
        while ((lastWord = wordSetCopy.pop()) != '1') {
            wordSetThisLine.push(lastWord);
        }
        
        var lineLenght = wordSetThisLine.join('').length;
        if (lineLenght > 18) {
            alert('这行字数太多辣，点击换行。对，就是那个变红的按钮');
            var btnEnter = document.getElementById('点我换行');
            btnEnter.style.backgroundColor = 'rgb(244, 171, 142)';
            return;
        }
        // 增加词汇
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
    // 判断是否为换行位置
        elem.style.background = "white";
        const index = wordSet.indexOf(newWord);
        if (index > -1) { // 移除找到的指定元素
        wordSet.splice(index, 2); // 移除元素
        }
    }
}

// 生成句子
function generateSentence() {
    let welcomeWord = '诗词拼贴';
    var sentence = new Array();
    // 为句子添加结束标签
    if (wordSet[wordSet.length-1] != '1') {
        wordSet.push('1');
    }
    wordNumWithOne = wordSet.join("").length;
    
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
    timeStamp = '创作于 ' + now;
    // 创建canvas绘图元素custom\
    const myFont = new FontFace("myYezi", 'url(./custom/YeZiGongChangYanShanTingXingKai-2.ttf)');

    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var ratio = window.devicePixelRatio || 1;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
    ctx.scale(ratio,ratio);
    

    var canvas = document.getElementById('myCanvas');
    

    var w = canvas.width;
    var h = canvas.height;
    canvas.width = w;
    canvas.height = h;
    // 设置背景颜色
    ctx.fillStyle = '#1b1c20';
    // ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 设置开头文字
    titleFontsize = titleFontsize*ratio;
    ctx.font= titleFontsize + "px myFont";
    ctx.fillStyle = "#ddd7b9";
    ctx.textAlign = "left";
    ctx.fillText(welcomeWord, 70*ratio, 120*ratio);

    
    // 设置背景文字
    // window.onload = () => {
    textFontsize =  textFontsize*ratio;
    for (var i = 0; i < sentence.length; i++) {   
        ctx.font= textFontsize + "px myFont";
        ctx.fillStyle = "#ddd7b9";
        ctx.textAlign = "left";
        ctx.fillText(sentence[i], 70*ratio, yTextStart*ratio + i*stepHeight*ratio);
    }   
    // }

    let lineHeight = 640*ratio;
    //开始一个新的绘制路径
    ctx.beginPath();
    //定义直线的起点坐标为(10,10)
    ctx.moveTo(65*ratio, lineHeight);
    //定义直线的终点坐标为(50,10)
    ctx.lineTo(535*ratio, lineHeight);
    //沿着坐标点顺序的路径绘制直线
    ctx.strokeStyle = "#ddd7b9"; 
    ctx.stroke();
    //关闭当前的绘制路径
    ctx.closePath();
    // 绘制时间戳
    textSmallFontsize = textSmallFontsize * ratio;
    ctx.font= textSmallFontsize + "px myFont";
    ctx.fillStyle = "#ddd7b9";
    ctx.fillText(timeStamp,70*ratio,700*ratio);
    // 累计创作 ？？ 行 ？？字
    wordsNum = wordNumWithOne - sentence.length;
    ctx.font= textSmallFontsize + "px myFont";
    ctx.fillStyle = "#ddd7b9";
    lineNum = sentence.length - 1;
    ctx.fillText('累计 '+ wordsNum +' 字' + ', 共 ' + lineNum + ' 行',70*ratio,670*ratio);

    // 扫码关注一点成电 扫码开始创作
    let footHeight = 770;
    footFontsize = footFontsize * ratio;
    ctx.font=footFontsize + "px myFont";
    ctx.fillStyle = "#ddd7b9";
    ctx.fillText('扫码关注一点成电', 335*ratio,footHeight*ratio);

    ctx.font= footFontsize + "px myFont";
    ctx.fillStyle = "#ddd7b9";
    ctx.fillText('扫码开始创作', 452*ratio,footHeight*ratio);

    // 绘制加载中页面
    // 开始加载
    var loadingInterval = setInterval( loadingCount, 1000);
    // 插入 QR code
    var img = new Image();

    // //绘制图片  
    // img.src = './image/webQRcode.png';
    img.crossOrigin="anonymous";
    img.onload = () => {
        clearInterval(loadingInterval); // 结束加载
        let loadingID = document.getElementById('加载中页面');
        loadingID.innerHTML = '';
        // Draw the image onto the context
        ctx.drawImage(img, 333*ratio, 650*ratio ,202*ratio , 102*ratio);
        // var imgTag = canvas.toDataURL('image/png',1.0);
        // document.getElementById("输出图像图像页面").src = imgTag;
        // 生成图像
        var dataImg = new Image();
        dataImg.src = canvas.toDataURL('image/png',1.0);
        // 固定图片大小
        imgPageSingle.innerHTML = '<img style="text-align: center;width: 300px;height: 400px;border-radius:15px;" src="' + dataImg.src + '" alt="拼贴诗词" width = "450px" height = "600px">';
    }
    img.src = 'https://raw.githubusercontent.com/patrlean/images/main/yidianQRwebQRspace.png';
    // img.src = 'https://img-blog.csdnimg.cn/a00bbd3cc2f74cc0b1f77e5e4ec67131.png';
    // 设置display变换
    var page = document.getElementById("拼词页面");
    page.style.display = "none";
    var imgPage = document.getElementById("输出图像页面");
    var imgPageSingle = document.getElementById("输出图像图像页面");
    imgPage.style.display = "block";
}
// width = "450px" height = "600px"

// 一点灵感
// 博尔赫斯
// 使他觉得遥远的不是时间长，而是两三件不可挽回的事 
// 世界会变，但是我始终如一。我带着悲哀的自负想到
// 一朵玫瑰正马不停蹄地成为另一朵玫瑰；你是云、是海、是忘却；你也是你曾失去的每一个自己
// 失眠是知道别人独睡时自己不该独醒， 是渴望进入梦境而又不能成眠 是对活着和还将继续活下去的恐惧， 是懵懵懂懂熬到天明。
function someMagic() {
    
}
// 返回页面
function back2page() {
    var page = document.getElementById("拼词页面");
    page.style.display = "block";
    var imgPage = document.getElementById("输出图像页面");
    imgPage.style.display = "none";
    javascript:location.reload();
}
// 换行
function newlineSentence() {
    if (wordSet[wordSet.length-1] != '1') {
        wordSet.push('1');
    }
    var temp = document.getElementById(elem.id);
    temp.style.background = "linear-gradient(to right, rgb(243, 236, 176) 70%, rgb(228, 207, 255) 30%)";
}

function loadingCount() {
    let loadingID = document.getElementById('加载中页面');
    if ((loadingNum % 3) == 0) {
        loadingID.innerHTML = '加载中.';
        
    }
    else if((loadingNum % 3) == 1) {
        loadingID.innerHTML = '加载中..';
    }
    else if((loadingNum % 3) == 2) {
        loadingID.innerHTML = '加载中...';
    }
    console.log(loadingNum);
    loadingNum = loadingNum + 1;
}