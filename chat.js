var bio = [
  ["firstname", "first name", true],
  ["lastname", "last name", false],
  ["occupation", "past work experience", false],
  ["situation", "current situation", false],
  ["disability", "disability status", false],
  ["income", "sources of income", false],
  ["hobbies", "hobbies", false],
  ["residence", "living location", false],
  ["", "", "end"]
];

window.onload = function(){



  activate();

  $("#begin_container").click(function(){
    hideAndShow(0);
    springboardSpeak("Hi! I'm Springboard. I want to help you find some work nearby and need to know a couple things about you. First off, what's your first name?");
  });

  $("#sendButton").click(function(){

    userSpeak($("#messageHolder").val());

    for(var i = 0; i < bio.length; i++){
      if(bio[i][2] == true){
        bio[i][2] = $("#messageHolder").val();

        if(i+1 < bio.length){

          if(bio[i+1][2] != "end"){
            springboardSpeak(newQuestion(bio[i+1][1]));
            bio[i+1][2] = true;
          }else {
            springboardSpeak("Awesome! Thanks for all that information. Click the green button below so we can continue!");
          
            $("#enter-message").html('<button class="btn btn-success col-md-8 col-md-offset-2" id="medical_clinic_button">Next Step</button>')
          
            $("#medical_clinic_button").click(function(){
                hideAndShow(1);
                $("#medicalChatHolder").html('<div class="message-box left-img animated fadeIn"><div class="picture"><img src="assets/logo.png" title="user name"/></div><div class="message"><span>Springboard</span><p>I found a health clinic near you! Please go visit and ask for a "Verification of Medical Health" clearance form from the receptionist. Hit the green button below after that is done! </p></div></div>' + $("#medicalChatHolder").html());
                responsiveVoice.speak('I found a health clinic near you! Please go visit and ask for a "Verification of Medical Health" clearance form from the receptionist. Hit the green button below after that is done!', "Australian Female");
              
                $("#skills_button").click(function(){
                    hideAndShow(2);
                    $("#skillsChatHolder").html('<div class="message-box left-img animated fadeIn"><div class="picture"><img src="assets/logo.png" title="user name"/></div><div class="message"><span>Springboard</span><p>I found some skills that you might have! Please confirm for me. This is your last step!</p></div></div>' + $("#skillsChatHolder").html());
                    responsiveVoice.speak('I found some skills that you might have! Please confirm for me. This is your last step!', "Australian Female");
       
                    $('.alert-link').click(function(){
                       $(this).parent().parent().remove();
                    });

                    $("#findJobs").click(function(){
                      responsiveVoice.speak('Awesome! Great news, I found some jobs for you. Loading them up now!', "Australian Female")
                      
                                              $("#skills_container").html("<img src='assets/loading.gif' class='col-md-10 col-md-offset-1'></img>");

                      var loadingSymbol = setTimeout(function() {

                            window.location = "job.html";


                      }, 4500);

                    })

                })


            });
          }
        }
        break;
      }     
    }  

  $("#messageHolder").val("");

  });
}

function newQuestion(str){
    var num = Math.random() * 100;
    if(num < 30){
        return "Sweet! Can you tell me about your " + str + "?";
    } else if (num < 60) {
      return "Great! Thanks. Also, can you tell me about " + str + "?"
    } else {
      return "I understand " + bio[0][2] + "! Next up, what is your " + str + "?";
    }
}

function activate(){
  springboardSpeak("Hello! This is Springboard. Click the screen to begin using.");
}

function springboardSpeak(str){
 
  responsiveVoice.speak(str, "Australian Female");

  $("#chatHolder").html($("#chatHolder").html().replaceAll("animated fadeIn", "") + 
      '<div class="message-box left-img animated fadeIn"><div class="picture">'+
      '<img src="assets/logo.png" title="user name"/></div><div class="message">'+
      '<span>Springboard</span><p>' + str + '</p></div></div>');
}

function userSpeak(str){
  $("#chatHolder").html($("#chatHolder").html().replaceAll("animated fadeIn", "") +
    '<div class="message-box right-img animated fadeIn"><div class="picture">' + 
    '<img src="http://3b9svs2dfskd3fzwfu347pov.wpengine.netdna-cdn.com/wp-content/uploads/2016/06/blank-user-male-01.jpg"'+
    ' title="user name"/></div><div class="message"><span class="username">User</span>'+
    '<p>' + str + '</p></div></div>')
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function hideAndShow(index){
  var arr = [$("#chat_container"), $("#health_clinic"), $("#skills_container"), $("#begin_container")];

  for(var i = 0; i < arr.length; i++){
    if(i == index){
      arr[i].show();
    } else {
      arr[i].hide();
    }
  }
}








