class Main{
  constructor(players){
    this.players = players;
    this.playerStatus = []; // true == alive  false == dead
    for (let i = 0; i<this.players.length; i++){
      this.playerStatus.push(true);
    }
    this.skills = []; // list of snapshots in order
    this._mode = null;

    this.ppos = 0; // currentPlayerIndex

    this.directions = document.getElementById("directionsText");
    this.queList = document.getElementById("queListReal");

  }
  get mode(){ return this._mode;}
  set mode(val){
    this._mode = val;
    switch(val){
      case null:
        document.getElementById("fast_fwd_button").style.filter = "brightness(120%)";
        document.getElementById("stop").style.filter = "brightness(80%)";
        document.getElementById("record").style.filter = "brightness(80%)";
        break;
      case "record":
        document.getElementById("fast_fwd_button").style.filter = "brightness(80%)";
        document.getElementById("stop").style.filter = "brightness(80%)";
        document.getElementById("record").style.filter = "brightness(120%)";
        break;
      case "playRoutine":
        document.getElementById("fast_fwd_button").style.filter = "brightness(80%)";
        document.getElementById("stop").style.filter = "brightness(120%)";
        document.getElementById("record").style.filter = "brightness(80%)";
        break;
      case "preformRoutine":
        document.getElementById("fast_fwd_button").style.filter = "brightness(800%)";
        document.getElementById("stop").style.filter = "brightness(80%)";
        document.getElementById("record").style.filter = "brightness(120%)";
        break;
    }
    // highlight a different button
  }
  get currentPlayer(){ // currentPlayerIndex
    return this.ppos;
  }
  set incrementPlayer(n = 1){ // move to the next player
    this.ppos = (this.ppos + n) % this.players.length;
  }
  get isWinner(){ // checks if the game is over
    let count = 0;
    for(let i=0;i<this.players.length;i++){
      if(this.playerStatus[i]){
        count++;
      }
    }
    return (count<=1) ;
  }
  get winner(){
    if(this.isWinner()){
      let winner = [];
      for(let i=0;i<this.players.length;i++){
        if(this.playerStatus[i]){
          winner.push(i);
        }
      }
      if(winner.length == 1){
        return winner[0];
      }
      else return "someone";
    } else return "no one";
  }
/*
  start(){ // loops through the players
    while(this.isWinner()){
      this.tontour(this.currentPlayer);
      this.incrementPlayer();
    }
    alert("Hooray Someone won!");
  }*/
  tontour(){ // NOTE: a mirror-like video will always be streaming
    if(this.mode != null){
      console.error("tontour called but mode != null");
      return false;
    }

    // highlight the next player in the player profile container

    this.incrementPlayer();

    if(this.isWinner()){
      alert("Hooray " + winner + " won!");
    }
    this.mode = "record";
    return this.isWinner();
  }
  record(){
    if(this.mode != "record"){
      if(this.mode == "playRoutine"){
        this.skills.splice(this.skills.length - 1, 1);
      } else {
        console.error("record called but mode != record");
        return false;
      }
    }
    // countdown 3 seconds
        // call a recursive timed function in one second
        // the function will count down one from the timer
    for(let i = 3; i>0; i--){
      setTimeout(
        function() {
          this.directions.value = "A snapshot of your sick move will be recorded in " + i;
          // change visible counter =====>< front end
          console.log(i);
        }, 1000);
    }


    // take snapshot
    // add clip to skills[]
    this.skills.push(this.takeSnapShot());

    this.mode = "playRoutine";
  }
  playRoutine(){
    if(this.mode != "playRoutine"){
      console.error("playRoutine called but mode != playRoutine");
      return false;
    }
    // *** once only
    for(i=0;i<this.skills.length;i++){
      this.picLoop();
    }
    this.mode = "preformRoutine";
  }
  picLoop(i=0){
    // show the picture skills[i]

    if(i > this.skills.length){
      return true;
    }
    
    setTimeout(
      function() {
        this.picLoop(i+1);
      }, 1000);
  }
  preformRoutine(){
    if(this.mode != "preformRoutine"){
      console.error("preformRoutine called but mode != preformRoutine");
      return false;
    }
    // press button
    // record routine
    // evaluate midroutine & update skills que list

    let currentSkill = 0;
    while(currentSkill < this.skills.length && suckerCounter<5){
      let suckerCounter = 0; // lose if this gets to 4 seconds

      // empty que list
      for(let i=0; i<this.queList.children.length;i++){
        this.queList.children[i].remove();
      }
      // create ques
      for(let i=0; i<this.skills.length;i++){
        let el = document.createElement("li");
        el.className = "skillQue";
        el.innerHTML = "Skill #"+i;
        this.queList.append(el);
      }

      setTimeout(
        function() {
          if(this.ckeckMatch(currentSkill)){
            currentSkill++;
            suckerCounter=0;
            // remove a que
            this.queList.children[0].remove();
          }
          else{suckerCounter++;}
        }, 1000);
    }


    this.mode = null;
  }
  takeSnapShot(){
    return 1;
    // return img
  }
  checkMatch(currentSkillIndex){
    let tPic = this.takeSnapShot();
    let sPic = this.skills[currentSkillIndex];

    // get skeleton for tPic
    // get skeleton for sPic

    // compare skeletons
    return (Math.random()*100 < 50);
    // return true if the avg joint angle difference between those of tPic & sPic is less than some elvaluator constant c
  }

}
