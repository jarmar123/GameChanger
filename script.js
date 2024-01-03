$(document).ready(() => {

  let userName = null;
  let level = 0;
  let levelContainer = $('.game-stats .level span.val');
  let lifes = 1;
  let lifesContainer = $('.game-stats .lifes span.val');
  let gameBoard = $('svg #game-board');
  let gameBoardOption = $('svg #game-board .option');
  let colorArray = ['#696D86','#CEDDDF','#EEECE1','#988B90','#8D887A','#2F3E3E','#B86D52','#FDC8B6','#EFDFCC','#EEE3A4'];
  let colorArray2 = ['#5B6D92','#CBDDE2','#EFEEE5','#9B8E9C','#8B8A7B','#364042','#C06A46','#F4C3B2','#F0E2D2','#EFD99A'];  
  //let colorArray2 = ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF'];  
  let currentBoard = null;
  let playNow = $('button.play-now');
  let startScreem = $('.start-screen');
  let reset = $('.new-board');
  let gameScreen = $('.game');
  let message = $('.message');
  let gameOverScreen = $('.game-over');
  let gameOverWinScreen = $('.game-over-win');
  let gameOverLoseScreen = $('.game-over-lose');										
  let replay = $('.replay');
  let randomIndexArr = generateRandomArray(colorArray.length - 1);

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function ColorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;
    // convert to decimal and change luminosity
    let rgb = "#",c,i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
      rgb += ("00" + c).substr(c.length);
    }
    return rgb;
  }
  
  function generateRandomArray(n) {
	//var nums = [1,2,3,4,5,6,7,8,9,10],
	const nums = Array.from({ length: n + 1 }, (_, index) => index);
	  
    ranNums = [],
    i = nums.length,
    j = 0;

	while (i--) {
    j = Math.floor(Math.random() * (i+1));
    ranNums.push(nums[j]);
	console.log("ranNum: "+nums[j]);
    nums.splice(j,1);
	}
	return ranNums;
  }
  // function generateRandomArray(n) {
	  // if (n < 0) {
		// console.error("Invalid input: n should be a non-negative number.");
		// return [];
	  // }

	  // // Create an array from 0 to n
	  // const originalArray = Array.from({ length: n + 1 }, (_, index) => index);

	  // // Shuffle the array using the Fisher-Yates algorithm
	  // for (let i = originalArray.length - 1; i > 0; i--) {
		// const j = Math.floor(Math.random() * (i + 1));
		// console.log("j: "+j);
		// [originalArray[i], originalArray[j]] = [originalArray[j], originalArray[i]];
	  // }

	  // // Return the first n elements of the shuffled array
	  // return originalArray.slice(0, n);
// }
  
  function ColorLuminance2(index) {
    // validate hex string
    // hex = String(hex).replace(/[^0-9a-f]/gi, '');
    // if (hex.length < 6) {
      // hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    // }
    // lum = lum || 0;
    // // convert to decimal and change luminosity
    // let rgb = "#",c,i;
    // for (i = 0; i < 3; i++) {
      // c = parseInt(hex.substr(i * 2, 2), 16);
      // c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
      // rgb += ("00" + c).substr(c.length);
    // }
    // return rgb;
	
	return colorArray2[index];
  }

  function Board() {
    this.nOptions = gameBoardOption.length;
    this.selectedOption = rand(1, this.nOptions);
    this.selectedColor = rand(0, colorArray.length);
    this.dificulty = rand(2, 12) / 100;
	
	let s = randomIndexArr[0];
	randomIndexArr.splice(0, 1);
	
	this.primaryColor = colorArray[s];
    this.secondaryColor = ColorLuminance2(s);
	
	console.log("primaryColor: "+this.primaryColor);
	console.log("secondaryColor: "+this.secondaryColor);	
	
    // this.primaryColor = colorArray[this.selectedColor];
    // this.secondaryColor = ColorLuminance2(this.selectedColor);
  }

  function gameOver() {
    //gameBoardOption.unbind('click');
    if (gameScreen.hasClass('open')) {
      gameScreen.removeClass('open');
    }
    gameOverScreen.addClass('open');
    gameOverScreen.find('.score').html('<span>' + userName + '</span><span><i class="fa fa-star-o" aria-hidden="true"></i>' + level + '</span>');
  }

  function gameOverWin() {
    if (gameScreen.hasClass('open')) {
      gameScreen.removeClass('open');
    }
    gameOverWinScreen.addClass('open');
    gameOverWinScreen.find('.score').html('<span>' + userName + '</span><span><i class="fa fa-star-o" aria-hidden="true"></i>' + level + '</span>');
  }

  function gameOverLose() {
    if (gameScreen.hasClass('open')) {
      gameScreen.removeClass('open');
    }
    gameOverLoseScreen.addClass('open');
    gameOverLoseScreen.find('.score').html('<span>' + userName + '</span><span><i class="fa fa-star-o" aria-hidden="true"></i>' + level + '</span>');
  }
  function updateStats() {

    levelContainer.html(level);
    lifesContainer.html(lifes);

    if (level === 10) {
      gameOverWin();
    }
    else
    if (lifes === 0) {
      gameOverLose();
    }

  }

  function updateBoard() {
    console.log(currentBoard.nOptions);
    if (gameBoard.hasClass('open')) {
      gameBoard.removeClass('open');
    }

    for (let i = 0; i < currentBoard.nOptions; i++) {
      if (i === currentBoard.selectedOption) {
        gameBoardOption.eq(i).attr('fill', currentBoard.secondaryColor);
      } else {
        gameBoardOption.eq(i).attr('fill', currentBoard.primaryColor);
      }
    }

    setTimeout(function () {
      gameBoard.addClass('open');
    }, 400);

  }

  function newBoard() {
    updateStats();
    console.log(lifes);
    if (lifes > 0) {
      console.log('new board');
      currentBoard = new Board();
      updateBoard();
      console.log(currentBoard);
    }
  }


  gameBoardOption.bind('click', function () {

    let fill = $(this).attr('fill');
    if (fill === currentBoard.secondaryColor) {
      level++;
    } else {
      lifes--;
    }
	
	// if(level == 10){
				// alert("Success! You have received a BM promocode!");
				// gameOver();
	  // }

    newBoard();

  });

  playNow.bind('click', function () {
    startScreem.removeClass('open');
    gameScreen.addClass('open');
    if ($('input#name').val() != '') {
      userName = $('input#name').val();
    } else {
      userName = 'Player';
    }
    lifes = 1;
    level = 0;
    gameScreen.find('.user-name').text(userName);
    newBoard();
    console.log(userName);
    console.log("play-now");
	randomIndexArr = generateRandomArray(colorArray.length - 1);
  });

  reset.bind('click', function () {
    if (level > 0) {
      level--;
      newBoard();
    } else {
      message.html('Your level is to low,<br/>level up to be able to use this.');
      message.addClass('open');
      setTimeout(function () {
        message.removeClass('open').html('');
      }, 5000);
    }
  });

  replay.bind('click', function () {
	  console.log("replay bind click");
    if (gameOverScreen.hasClass('open')) {
      gameOverScreen.removeClass('open');
    }
    if (gameOverWinScreen.hasClass('open')) {
      gameOverWinScreen.removeClass('open');
    }
    if (gameOverLoseScreen.hasClass('open')) {
      gameOverLoseScreen.removeClass('open');
    } 
    startScreem.addClass('open');
  });

});
