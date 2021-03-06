(function() {

  var botui = new BotUI('self-intro');

  // Initial message
  botui.message.add({
    content: "Hi! I'm haltaro!"
  }).then(showQuestions);


  // Show choices
  function showQuestions() {
    botui.message.add({
      delay:1500,
      content: "What shall I tell you about me?"
    }).then(function() {

      // Show bottun 
      return botui.action.button({
        autoHide: false,
        delay: 1500,
        action: [
          {icon: 'user-o', text: 'Carrier', value: 'carrier'},
          {icon: 'rocket', text: 'Hobbies', value: 'hobby'},
          {icon: 'pencil', text: 'This', value: 'memotaro'}]
      });
    }).then(function(res) {
      botui.action.hide();
      switch (res.value) {
        case 'carrier': showCarrier(); break;
        case 'hobby': showHobby(); break;
        case 'memotaro': showMemotaro(); break;
        default: end();
      }
    });
  }

  // Describe my carrier 
  function showCarrier() {
    botui.message.add({
      delay: 1500,
      content: "I received a master's degree in aerospace engineering. I proposed a new anormaly detection algorithm for GPS satellites based on machine learning and orbital mechanics."
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: 'After graduation, I worked at a telecom laboratories. I mainly focused on traffic engineering.'
      });
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: 'The last year in the labs, I was seconded to another laborories located in NJ, USA. It was one of the most valuable experiences in my carrier.'
      });
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: "Now I'm working as a data scientist at an advertising agency in Japan."
      });
    }).then(askEnd);
  }

  // Describe my hobbies.
  function showHobby() {
    botui.message.add({
      delay: 1500,
      content: "My hobby is running. I'd like to fully run 42km this year."
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: "Plus, I enjoy coding with C++, Python, JavaScript, and R." 
      });
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: "I'm interested in Machine learning, Marketing science, and Network engineering. Please refer to Projects page." 
      });
    }).then(askEnd);
  }

  // Introduce the website pages
  function showMemotaro() {
    botui.message.add({
      delay: 1500,
      content: "This website mainly includes my technical memorandoms."
    }).then(function(){
      return botui.message.add({
        delay: 2000,
        content: "The implied reader is myself."
      });
    }).then(function(){
      return botui.message.add({
        delay: 2000,
        content: "Categories includes articles list grouped by categories."
      });
    }).then(function(){
      return botui.message.add({
        delay: 2000,
        content: "Projects includes the projects I engaged in so far."
      });
    }).then(function(){
      return botui.message.add({
        delay: 2000,
        content: "Note that the contents on the website may change without prior notice."
      });
    }).then(askEnd);
  }

  // Ask whether end the session or not.
  function askEnd(){
    botui.message.add({
      delay:2000,
      content: 'Do you have any other questions?'
    }).then(function() {

      // Show button.
      return botui.action.button({
        delay: 1500,
        action: [
          {icon: 'circle-o', text: 'Yes', value: true},
          {icon: 'close', text: 'No', value: false}]
      });
    }).then(function(res) {
      res.value ? showQuestions() : end();
      });
  }

  // End the session.
  function end() {
    botui.message.add({
      delay: 1500,
      content: 'Thank you for talking with me.'
    }).then(function(){
      return botui.message.add({
        delay: 1500,
        content: 'See you next time!'
      });
    });
  }

})();
