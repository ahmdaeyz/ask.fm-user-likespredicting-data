/* eslint-disable no-console */
var repetator = setInterval(scroll,100);
function scroll(){ 
	var next = document.querySelector(".item-page-next");   
	if(next!=null){
		next.scrollIntoView();
	}else{
		clearInterval(repetator);
		//stores the answers in the page. 
		var answers = document.getElementsByClassName("streamItem-answer");
		var punctuationRegEx = /[!-/:-@[-`{-~¡-©«-¬®-±´¶-¸»¿×÷˂-˅˒-˟˥-˫˭˯-˿͵;΄-΅·϶҂՚-՟։-֊־׀׃׆׳-״؆-؏؛؞-؟٪-٭۔۩۽-۾܀-܍߶-߹।-॥॰৲-৳৺૱୰௳-௺౿ೱ-ೲ൹෴฿๏๚-๛༁-༗༚-༟༴༶༸༺-༽྅྾-࿅࿇-࿌࿎-࿔၊-၏႞-႟჻፠-፨᎐-᎙᙭-᙮᚛-᚜᛫-᛭᜵-᜶។-៖៘-៛᠀-᠊᥀᥄-᥅᧞-᧿᨞-᨟᭚-᭪᭴-᭼᰻-᰿᱾-᱿᾽᾿-῁῍-῏῝-῟῭-`´-῾\u2000-\u206e⁺-⁾₊-₎₠-₵℀-℁℃-℆℈-℉℔№-℘℞-℣℥℧℩℮℺-℻⅀-⅄⅊-⅍⅏←-⏧␀-␦⑀-⑊⒜-ⓩ─-⚝⚠-⚼⛀-⛃✁-✄✆-✉✌-✧✩-❋❍❏-❒❖❘-❞❡-❵➔➘-➯➱-➾⟀-⟊⟌⟐-⭌⭐-⭔⳥-⳪⳹-⳼⳾-⳿⸀-\u2e7e⺀-⺙⺛-⻳⼀-⿕⿰-⿻\u3000-〿゛-゜゠・㆐-㆑㆖-㆟㇀-㇣㈀-㈞㈪-㉃㉐㉠-㉿㊊-㊰㋀-㋾㌀-㏿䷀-䷿꒐-꓆꘍-꘏꙳꙾꜀-꜖꜠-꜡꞉-꞊꠨-꠫꡴-꡷꣎-꣏꤮-꤯꥟꩜-꩟﬩﴾-﴿﷼-﷽︐-︙︰-﹒﹔-﹦﹨-﹫！-／：-＠［-｀｛-･￠-￦￨-￮￼-�]|\ud800[\udd00-\udd02\udd37-\udd3f\udd79-\udd89\udd90-\udd9b\uddd0-\uddfc\udf9f\udfd0]|\ud802[\udd1f\udd3f\ude50-\ude58]|\ud809[\udc00-\udc7e]|\ud834[\udc00-\udcf5\udd00-\udd26\udd29-\udd64\udd6a-\udd6c\udd83-\udd84\udd8c-\udda9\uddae-\udddd\ude00-\ude41\ude45\udf00-\udf56]|\ud835[\udec1\udedb\udefb\udf15\udf35\udf4f\udf6f\udf89\udfa9\udfc3]|\ud83c[\udc00-\udc2b\udc30-\udc93]/g;
		var dataset = [];
		for(var i=0;i<answers.length;i++){
			var questionLength,answerLength,time,hasPic,hasYTLink,numOfLikes;
			//strips the question from punctuation marks splits it by space and return the length.
			questionLength = answers[i].getElementsByClassName("streamItem_header")[0].getElementsByTagName("h2")[0].innerText.replace("\n"," ").replace(punctuationRegEx, "").replace(/(\s){2,}/g, "$1").split(" ").length;
			//some answers don't have text 
			if(answers[i].getElementsByClassName("streamItem_content")[0]!=undefined){
				//strips the answer from punctuation marks splits it by space and returns the length.
				answerLength = answers[i].getElementsByClassName("streamItem_content")[0].innerText.replace("\n"," ").replace(punctuationRegEx, "").replace(/(\s){2,}/g, "$1").split(" ").length;        
			}else{
				answerLength = 0;
			}
			//checks if the answer has pic or not return 1 if so and 0 if not.
			if(answers[i].getElementsByClassName("streamItem_visual").length!=0){
				var visuals = answers[i].getElementsByClassName("streamItem_visual");
				for(var j = 0;j<visuals.length;j++){
					//some elements (like those with a YT link) are also considered visuals and has that class but pics don't 
					visuals[j].classList.length==1?hasPic=1:hasPic=0;
				}
			}else{
				hasPic=0;
			}
			// time of publishing the answer is negative if b4 midnight..
			time = answers[i].getElementsByTagName("time")[0].getAttribute("datetime");
			time = time.replace(time.substring(0,time.lastIndexOf("T")+1),"");
			time = parseInt(time.replace(time.substring(time.indexOf(":"),time.length),""));
			if(time>=12){
				time = time - 23;
			}
			//checks if the answer has a YT link 1 if so 0 if not.
			answers[i].getElementsByClassName("youtubeLink")[0]!=undefined?hasYTLink=1:hasYTLink=0;
			//bypasses answers that are polls 
			if(answers[i].getElementsByClassName("photopoll").length==0){
	            numOfLikes = parseInt(answers[i].getElementsByClassName("heartButton")[0].getElementsByClassName("counter")[0].innerText);
			}
			var example = {
				qLength : questionLength,
				ansLength : answerLength,
				time : time,
				pic : hasPic,
				YTLink : hasYTLink,
				likes : numOfLikes
			};
			dataset.push(example);
		}
		var dataAsString = "" ;
		for( var k = 0;k<dataset.length;k++){
			dataAsString+= dataset[k].qLength+ " " +dataset[k].ansLength + " " + dataset[k].time+ " " +dataset[k].pic+ " " +dataset[k].YTLink+ " " +dataset[k].likes+"\n";
		}
		console.log(dataAsString);
		//data outputs like ...
		// 5 3 -4 0 1 8
		// 10 44 -9 1 1 4
		// 7 9 11 0 0 0

	}
}

//element is an answer u want to get its features.
function getFeatures(element){
	var questionLength,answerLength,time,hasPic,hasYTLink;
	questionLength = element.getElementsByClassName("streamItem_header")[0].getElementsByTagName("h2")[0].innerText.replace("\n"," ").replace(punctuationRegEx, "").replace(/(\s){2,}/g, "$1").split(" ").length;
	if(element.getElementsByClassName("streamItem_content")[0]!=undefined){
		answerLength = element.getElementsByClassName("streamItem_content")[0].innerText.replace("\n"," ").replace(punctuationRegEx, "").replace(/(\s){2,}/g, "$1").split(" ").length;        
	}else{
		answerLength = 0;
	}
	if(element.getElementsByClassName("streamItem_visual").length!=0){
		var visuals = element.getElementsByClassName("streamItem_visual");
		for(var j = 0;j<visuals.length;j++){
			visuals[j].classList.length==1?hasPic=1:hasPic=0;
		}
	}else{
		hasPic=0;
	}
	time = element.getElementsByTagName("time")[0].getAttribute("datetime");
	time = time.replace(time.substring(0,time.lastIndexOf("T")+1),"");
	time = parseInt(time.replace(time.substring(time.indexOf(":"),time.length),""));
	if(time>=12){
		time = time - 23;
	}
	element.getElementsByClassName("youtubeLink")[0]!=undefined?hasYTLink=1:hasYTLink=0;
	var example = {
		qLength : questionLength,
		ansLength : answerLength,
		time : time,
		pic : hasPic,
		YTLink : hasYTLink,
	};
	return example;
}