import{_ as c,g as l,o,c as r,a as e,h as s,b as d,w as g,F as p,i as S,s as D,t as x,e as a,n as h,f as b}from"./index-BOL9qK0c.js";const B="/hochi-s-portfolio/images/KoiBot.png",P="/hochi-s-portfolio/images/smartwatch.png",M="/hochi-s-portfolio/images/Musleep.png",T={},$={class:"background_info"};function I(n,t){const m=l("router-link");return o(),r("table",$,[t[15]||(t[15]=e("thead",null,[e("tr",null,[e("th",{width:"500px"},"Devices"),e("th",null,"Introduction")])],-1)),e("tbody",null,[t[13]||(t[13]=e("tr",null,[e("td",null,[e("img",{src:B})]),e("td",null,[e("b",null,"KoiBot Robot"),e("br"),e("br"),s(" ◆ Integrate various practical functionalities through APIs/SDKs"),e("br"),s(" ◆ Features a powerful built-in voice assistant"),e("br"),s(" ◆ Audio localization and automatic screen orientation adjustment"),e("br"),e("br"),e("a",{href:"https://www.qnap.com/en-as/news/2020/qnap-new-ai-commercial-robot-koibot-drives-modern-business-digital-transformation-with-feature-rich-applications",target:"_blank",rel:"noopener noreferrer"},[e("i",{class:"fa-solid fa-arrow-up-right-from-square"}),s("   Product Page")])])],-1)),t[14]||(t[14]=e("tr",null,[e("td",null,[e("img",{src:P})]),e("td",null,[e("b",null,"Samgsung Galaxy Watch Active2 "),e("br"),e("br"),s(" ◆ Provide official site for developers with guides, API references, and samples"),e("br"),s(" ◆ Using heart rate and triaxial sensors to determine whether the user is currently wearing the watch, and recording various sleep data based on the detected sleep states"),e("br"),e("br"),e("a",{href:"https://www.samsung.com/tw/business/watches/galaxy-watch-active/galaxy-watch-active2-r820-sm-r820nzsabri/",target:"_blank",rel:"noopener noreferrer"},[e("i",{class:"fa-solid fa-arrow-up-right-from-square"}),s("   Product Page")])])],-1)),e("tr",null,[t[12]||(t[12]=e("td",null,[e("img",{src:M}),e("p",{class:"fyi",style:{"font-size":"15px"}},"*musleep Homepage")],-1)),e("td",null,[t[2]||(t[2]=e("b",null,"Musleep Application ",-1)),t[3]||(t[3]=e("br",null,null,-1)),t[4]||(t[4]=e("br",null,null,-1)),t[5]||(t[5]=s(" ◆ Collects and analyzes users' sleep data, using visual charts to help users easily understand their sleep conditions")),t[6]||(t[6]=e("br",null,null,-1)),t[7]||(t[7]=s(" ◆ Guided by sleep education recommendations, the system provides personalized activity suggestions based on sleep diary, aiding users in developing good sleep habits and addressing sleep issues")),t[8]||(t[8]=e("br",null,null,-1)),t[9]||(t[9]=s(" ◆ Designed with a unique ")),d(m,{to:"/project/1/musleep/personal_music"},{default:g(()=>t[0]||(t[0]=[e("i",{class:"fa-solid fa-arrow-up-right-from-square"},null,-1),s("  music recommendation system ")])),_:1}),t[10]||(t[10]=e("br",null,null,-1)),t[11]||(t[11]=e("br",null,null,-1)),d(m,{to:"/project/1/musleep/system_display"},{default:g(()=>t[1]||(t[1]=[e("i",{class:"fa-solid fa-arrow-up-right-from-square"},null,-1),s("   System Display")])),_:1})])])])])}const C=c(T,[["render",I],["__scopeId","data-v-02304acb"]]),U="/hochi-s-portfolio/images/RWD.png",z="/hochi-s-portfolio/images/Firebase.png",A={};function F(n,t){return o(),r(p,null,[t[0]||(t[0]=e("thead",null,[e("tr",null,[e("th",{width:"60%"},"Diagram"),e("th",null,"Development Tools")])],-1)),t[1]||(t[1]=e("tbody",null,[e("tr",null,[e("td",null,[e("img",{src:U})]),e("td",null,[e("b",null,"Front-end"),e("br"),e("br"),s(" ◆ Adopts the concept of "),e("b",null,"cross-platform development"),s(", creating pure web pages but utilizing "),e("b",null,"Responsive Web Design (RWD)"),s(" to adapt to different screen sizes and UI interaction modes. This ensures that the Venology App is functional on various mobile devices."),e("br")])]),e("tr",null,[e("td",null,[e("img",{src:z})]),e("td",null,[e("b",null,"Back-end"),e("br"),e("br"),s(" ◆ Using "),e("b",null,"Firebase Realtime Database"),s(", a real-time, cloud-based NoSQL database that allows data to be synchronized in real-time across different clients, and uses "),e("b",null,"jQuery"),s(" to dynamically manipulate HTML content. This setup ensures information is transmitted and updated instantly to all users."),e("br")])])],-1))],64)}const j=c(A,[["render",F]]),q="/hochi-s-portfolio/images/MusicTags1.png",R="/hochi-s-portfolio/images/MusicTags2.png",N="/hochi-s-portfolio/images/MusicTags3.png",W={};function E(n,t){return t[0]||(t[0]=S('<h3>Recommendation System Based on Music Tag Analysis</h3><div class="scroll-container"><p> Each song in the database is tagged with the music tags it possesses. Based on the songs a user listens to each day within a week, a ranking is assigned correlating to the user&#39;s sleep efficiency for that day, and tags are scored accordingly. On the day when sleep efficiency is highest within the week, the tags of the songs listened to that day receive an additional +3 points; the second highest day&#39;s tags receive +2 points, and so forth, with the lowest sleep efficiency day&#39;s song tags receiving -3 points. Additionally, based on the user&#39;s personal preferences, tags of songs liked by the user are multiplied by 1.2, while those disliked are multiplied by 0.8. </p><img src="'+q+'" alt="Image 1" class="image" style="width:80%;height:auto;"><p class="fyi" style="font-size:15px;"> * Sleep Efficiency = (total sleep time / duration of the sleep episode) * 100 </p><p>Totaling the weekly scores for the song tags.</p><img src="'+R+'" alt="Image 2" class="image" style="width:90%;height:auto;"><p> Each song in the database is then scored based on the total tag scores divided by the total number of tags, yielding a song score. Once all songs have received their scores, they are standardized using the Z-score method. </p><img src="'+N+'" alt="Image 3" class="image" style="width:90%;height:auto;"></div>',2))}const H=c(W,[["render",E]]),K="/hochi-s-portfolio/images/UsersCF1.png",L="/hochi-s-portfolio/images/UsersCF2.png",O={};function G(n,t){return o(),r(p,null,[t[0]||(t[0]=e("h3",null,"User Collaborative Filtering for Sleep Music Recommendations",-1)),t[1]||(t[1]=e("div",{class:"scroll-container"},[e("p",null,[s(" Our system enhances sleep music recommendations by considering various factors including "),e("b",null,"users' pre-sleep behaviors"),s(" and employing user-based collaborative filtering. We integrate data from behaviors influencing sleep music outcomes, such as coffee intake and medication use, based on sleep diaries from institutions like NTU Hospital. "),e("br"),e("br"),s(" By standardizing user data and calculating similarities with "),e("b",null,"Cosine Similarity"),s(", we identify users with similar patterns and select the top five as recommenders. ")]),e("img",{src:K,alt:"Image 1",class:"image",style:{width:"650px"}}),e("p",null," The recommendation effectiveness is quantified by scoring the sleep music these recommenders listened to over the last week. The total score for each song reflects its recommendation strength within our algorithm. "),e("img",{src:L,alt:"Image 2",class:"image",style:{width:"650px"}})],-1))],64)}const Q=c(O,[["render",G]]),Z="/hochi-s-portfolio/images/sleepdata.mp4",J="/hochi-s-portfolio/images/sleepdiary.mp4",X="/hochi-s-portfolio/images/alarmsetting.mp4",Y="/hochi-s-portfolio/images/Bedtime.png",ee="/hochi-s-portfolio/images/VoiceAssistant.png",te="/hochi-s-portfolio/images/Wakeup.png",se="/hochi-s-portfolio/images/WakeupPage.jpg",oe={},ne={class:"system_display"};function ie(n,t){return o(),r("table",ne,t[0]||(t[0]=[e("thead",null,[e("tr",null,[e("th",{width:"500px"},"Interface Display"),e("th",null,"Interface Introduction")])],-1),e("tbody",null,[e("tr",null,[e("td",null,[e("video",{controls:""},[e("source",{src:Z,type:"video/mp4"})])]),e("td",null,[e("b",null,"Sleep Data Page"),e("br"),e("br"),s(" ◆ View sleep efficiency, sleep music, proportion of each sleep stage (awake, REM, light, and deep sleep)"),e("br"),s(" ◆ Choose the satisfaction level with sleep music"),e("br"),s(" ◆ View graphs of sleep efficiency changes over the past two weeks, average bedtime, average wake-up time, and average sleep duration"),e("br"),s(" ◆ Choose the period trend chart to view (two weeks, one month, three months) ")])]),e("tr",null,[e("td",null,[e("video",{controls:""},[e("source",{src:J,type:"video/mp4"})])]),e("td",null,[e("b",null,"Sleep Diary Page"),e("br"),e("br"),s(" ◆ Enter and Edit sleep diary (whether they woke up, napped, consumed caffeine, drank alcohol, took sleep aids, or exercised, helping them record daily sleep habits )"),e("br"),s(" ◆ View past sleep diary records ")])]),e("tr",null,[e("td",null,[e("video",{controls:""},[e("source",{src:X,type:"video/mp4"})])]),e("td",null,[e("b",null,"Schedule Setting Page"),e("br"),e("br"),s(" ◆ Setting wake-up and bedtime hours"),e("br"),s(" ◆ Reminding users when it's time to wake up and go to sleep ")])]),e("tr",null,[e("td",null,[e("img",{src:Y}),e("img",{src:ee}),e("p",{class:"fyi",style:{"font-size":"15px"}},"*KoiBot voice assistant page")]),e("td",null,[e("b",null,"Bedtime & Voice Assistant"),e("br"),e("br"),s(" ◆ Users can use voice commands to control the voice robot from bed to start playing sleep music"),e("br"),s(" ◆ During music playback, users can also use voice commands to pause, replay, or restart the music"),e("br"),s(" ◆ Using voice command control to prevent blue light exposure before sleep, thereby enhancing sleep quality ")])]),e("tr",null,[e("td",null,[e("img",{src:te}),e("img",{src:se})]),e("td",null,[e("b",null,"Wake-up Routine & Audio localization"),e("br"),e("br"),s(" ◆ By utilizing the audio localization feature of KoiBot and the alarm function of Musleep, users are required to get out of bed in the morning and walk to a specific location, causing KoiBot’s screen to rotate more than 100 degrees to stop the alarm"),e("br"),s(" ◆This method ensures that users actually get up, reduces time spent lying in bed, and improves sleep efficiency"),e("br"),e("br")])])],-1)]))}const re=c(oe,[["render",ie],["__scopeId","data-v-c1325f59"]]),ae="/hochi-s-portfolio/images/Venology_7.png",le="/hochi-s-portfolio/images/Venology_8.png",ce="/hochi-s-portfolio/images/Venology_1.png",de="/hochi-s-portfolio/images/Venology_2.png",ue="/hochi-s-portfolio/images/Venology_3.png",me="/hochi-s-portfolio/images/Venology_4.png",pe="/hochi-s-portfolio/images/Venology_5.png",ge="/hochi-s-portfolio/images/Venology_6.png",he="/hochi-s-portfolio/images/Venology_9.png",be="/hochi-s-portfolio/images/Venology_10.png",fe={};function ye(n,t){return o(),r(p,null,[t[0]||(t[0]=e("thead",null,[e("tr",null,[e("th",{width:"600px"},"Interface Display"),e("th",null,"Interface Introduction")])],-1)),t[1]||(t[1]=e("tbody",null,[e("tr",null,[e("td",{class:"images"},[e("img",{src:ae}),e("img",{src:le})]),e("td",null,[e("b",null,"Register Page & Login Page"),e("br"),e("br"),s(" ◆ Record and store user information"),e("br")])]),e("tr",null,[e("td",{class:"images"},[e("img",{src:ce}),e("img",{src:de})]),e("td",null,[e("b",null,"Vending Machine Map & Vending Machine Products"),e("br"),e("br"),s(" ◆ On this page, user can use the map to locate vending machine and find those near them "),e("br"),e("br"),s(" ◆ By clicking on a vending machine, they can view the products inside it, along with information about each product, such as inventory, prices, etc"),e("br")])]),e("tr",null,[e("td",{class:"images"},[e("img",{src:ue}),e("img",{src:me})]),e("td",null,[e("b",null,"Mobile Payments & Online Wallet"),e("br"),e("br"),s(" ◆ Venology App allows users to store online payment cards"),e("br"),e("br"),s(" ◆ Users can also add funds to their online wallet"),e("br"),e("br"),s(" ◆ Both can avoid situations where they do not have enough change or large bills that cannot be accpeted at vending machine"),e("br")])]),e("tr",null,[e("td",{class:"images"},[e("img",{src:pe}),e("img",{src:ge})]),e("td",null,[e("b",null,"New Arrivals & News"),e("br"),e("br"),s(" ◆ Vending machine operators use Venology App to push the latest and promotional information to users, boosting vending machine sales"),e("br")])]),e("tr",null,[e("td",{class:"images"},[e("img",{src:he}),e("img",{src:be})]),e("td",null,[e("b",null,"User Profile & Purchase History"),e("br"),e("br"),s(" ◆ User can manage their personal information in User Profile Page, including their transaction history, mobile payment, online wallet, and more"),e("br")])])],-1))],64)}const _e=c(fe,[["render",ye]]),ve={components:{SystemBg:C,SystemBgVenology:j,MusicTags:H,UsersCF:Q,SystemDisplay:re,SystemDisplayVenology:_e},props:{id:{type:Number,required:!0},demonstrateSlug:{type:String,required:!0}},computed:{project(){return D.projects.find(n=>n.id===this.id)},demonstrate(){return this.project.demonstrates.find(n=>n.slug===this.demonstrateSlug)},formattedDescription(){return this.demonstrate.description.replace(/\n/g,"<br>")}},data(){return{currentPage:1,tab:"tab1"}},methods:{changePage(n){this.currentPage=n},show(n){this.tab=n}}},we={class:"demonstrates"},ke=["src","alt"],Ve=["innerHTML"],Se={key:1,class:"background_information"},De={key:0},xe={key:1},Be={key:2,class:"personal_music"},Pe={style:{border:"3px solid #6a3e37"}},Me={key:3,class:"system_display"},Te={key:0},$e={key:1};function Ie(n,t,m,Ce,u,i){const f=l("SystemBg"),y=l("SystemBgVenology"),_=l("MusicTags"),v=l("UsersCF"),w=l("SystemDisplay"),k=l("SystemDisplayVenology");return o(),r("section",we,[e("h1",null,x(i.demonstrate.title),1),i.demonstrate.image?(o(),r("img",{key:0,src:`/hochi-s-portfolio/images/${i.demonstrate.image}`,alt:i.demonstrate.name},null,8,ke)):a("",!0),e("p",{innerHTML:i.formattedDescription},null,8,Ve),i.demonstrate.name==="Background Information"?(o(),r("div",Se,[i.project.id===1?(o(),r("div",De,[d(f)])):a("",!0),i.project.id===2?(o(),r("div",xe,[d(y)])):a("",!0)])):a("",!0),i.demonstrate.name==="Personal Music"?(o(),r("div",Be,[e("button",{onClick:t[0]||(t[0]=V=>i.show("tab1")),class:h({active:u.tab==="tab1"})}," Music Tag Analysis ",2),e("button",{onClick:t[1]||(t[1]=V=>i.show("tab2")),class:h({active:u.tab==="tab2"})}," User Collaborative Filtering ",2),e("div",Pe,[u.tab==="tab1"?(o(),b(_,{key:0})):a("",!0),u.tab==="tab2"?(o(),b(v,{key:1})):a("",!0)])])):a("",!0),i.demonstrate.name==="System Display"?(o(),r("div",Me,[i.project.id===1?(o(),r("div",Te,[d(w)])):a("",!0),i.project.id===2?(o(),r("div",$e,[d(k)])):a("",!0)])):a("",!0)])}const ze=c(ve,[["render",Ie]]);export{ze as default};
