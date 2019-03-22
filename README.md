# nodejs-passport-local
To understanding passport authentication

I'm a newbie in nodejs. This code is made for understanding "nodejs-express-passport_local".
There were a lot of examples using mongodb as a result google.But
I just want to use passport and understanding passport work flow with simple code, except mongodb. 


<hr/>

전 nodejs 를 공부하기 시작한지 일주일도 채 안되는 사람입니다.  
이 코드는 nodejs express passport-local 동작의 원리를 이해하려는 목적으로 작성하였습니다.  
검색해 보니 mongodb 를 포함한 예제가 많았는데 저의 경우는 mongo를 사용하지 않고 순수하게  
passport-local 의 동작 흐름만 이해하고 싶었고 route 부분도 최소한의 코드로 passport 의 동작을 이해하는데  
불필요한 코드는 최대한 배제하려고 노력했습니다.    

특히 require 로 선언되는 라이브러리나 config 들이 어떤 용도로 사용되고 왜 필요한지를 이해하고 싶었습니다.  
현재시점(2019-03-22)에서 최신의 라이브러리 버전을 사용하려고 노력했습니다.  

추신  
=====
실제 진행하는 과정에서 flash 메시지를 express 버전에 따라 달라져서 혼돈이 있었고 
passort 와는 전혀 상관없어 보이는 require("body-parser") 이런 라이브러리들도 
있어야 동작하는 사실에 맨붕이 왔습니다. session 을 config 하는 부분에서도 해당 설정의 의미가 이해가 안되고 
하나라도 빠지면 정상적인 로그인이 안되서 시간을 소요했고 실제 안되는 과정에서는 아무런 로그 메시지도 확인이 안되는 사실이 너무 답답했습니다.  
그래서 저와 같은 분을 위해 이 코드가 현시점에서의 최신의 라이브러리로 구성된  passport-local 의 동작을 이해하는데 도움이 되길바랍니다. 

<pre><code>
npm install
node app.js
</code></pre>
