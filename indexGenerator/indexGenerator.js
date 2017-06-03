
// prototype.js 와 jquery로 프로그래밍을 함께 병행할 때 충돌을 피하기 위해
// function ($){} 이 안에서만 jquery를 자유롭게 사용 가능
// 참고::http://captainyellow.tistory.com/125
!function ($) {
    //$(document).ready(function(){...}); 와 $(function(){...}); 는 동일한 의미이다
  $(function () {
    
    
    var bodySelector=".content";
    var navSelector=".nav";

    //문서가 완벽히 로드 되었을 때 초기화
    function initilizeAfterLoad()
    {
        
        var navContain = $(navSelector);
        var headings = $(bodySelector).children( "h1, h2, h3, h4, h5, h6" );        
        var headingCnt = headings.length;
        var headRegExp = /H([1-6]{1})$/;
        var navHtml = "";    
        
        //작성된 헤딩이 없으면 자동생성을 하지 않는다.
        if (headingCnt == 0 ) 
        {
            $(navSelector).html("작성된 헤딩이 없습니다.");
        }else{
            
            var currNum = 0;
            var nextNum = 0;
            var diff = 0;
            
            navHtml += "<ul>\n";

            for(var i=0;i<headingCnt;i++)
            {            
                currNum = headRegExp.exec(headings[i].tagName)[1];
                console.log(headings[i].innerHTML+","+i);
                
                navHtml += "<li><span>"+ headings[i].innerHTML +"</span>";

                if (headingCnt > i + 1)
                {   
                    
                    nextNum = headRegExp.exec(headings[i+1].tagName)[1];
                    
                    //대제목에서 소제목으로
                    if(currNum < nextNum)
                    {                      
                        navHtml += "<ul>\n"
                    }

                    //소제목에서 대제목으로
                    if(currNum > nextNum)
                    {
                        diff = currNum-nextNum;

                        for(var i2=0; i2<diff; i2++)
                        {
                            navHtml += "</ul></li>\n"    
                        }
                    }

                    if(currNum == nextNum) 
                    {
                        navHtml += "</li>\n"    
                    }
                }
                
            }
            
            navHtml += "</ul>\n";      
            $(navSelector).html(navHtml);
            console.log(navHtml);
            //$(bodySelector).remove();
       }
      
    }

    initilizeAfterLoad();


  })

}(jQuery);