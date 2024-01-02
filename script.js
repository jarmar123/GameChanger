$(document).ready(() => {

  let userName = null;
  let level = 0;
  let levelContainer = $('.game-stats .level span.val');
  let lifes = 3;
  let lifesContainer = $('.game-stats .lifes span.val');
  let gameBoard = $('svg #game-board');
  let gameBoardOption = $('svg #game-board .option');
  let colorArray = ['#1abc9c', '#16a085', '#27ae60', '#2ecc71', '#90C695', '#26A65B', '#66CC99', '#C8F7C5', '#2980b9', '#3498db', '#59ABE3', '#81CFE0', '#67809F', '#4B77BE', '#8e44ad', '#9b59b6', '#BF55EC', '#9B59B6', '#947CB0', '#2c3e50', '#34495e', '#E9D460', '#FDE3A7', '#F5AB35', '#F2784B', '#F9BF3B', '#f1c40f', '#f39c12', '#e67e22', '#e74c3c', '#d35400', '#c0392b', '#EC644B', '#D24D57', '#C0392B', '#DB0A5B', '#D2527F'];
  let currentBoard = null;
  let playNow = $('button.play-now');
  let startScreem = $('.start-screen');
  let reset = $('.new-board');
  let gameScreen = $('.game');
  let message = $('.message');
  let gameOverScreen = $('.game-over');
  let replay = $('.replay');

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

  function Board() {
    this.nOptions = gameBoardOption.length;
    this.selectedOption = rand(1, this.nOptions);
    this.selectedColor = rand(0, colorArray.length);
    this.dificulty = rand(2, 12) / 100;
    this.primaryColor = colorArray[this.selectedColor];
    this.secondaryColor = ColorLuminance(colorArray[this.selectedColor], this.dificulty);
  }

  function gameOver() {
    //gameBoardOption.unbind('click');
    if (gameScreen.hasClass('open')) {
      gameScreen.removeClass('open');
    }
    gameOverScreen.addClass('open');
    gameOverScreen.find('.score').html('<span>' + userName + '</span><span><i class="fa fa-star-o" aria-hidden="true"></i>' + level + '</span>');
  }

  function updateStats() {

    levelContainer.html(level);
    lifesContainer.html(lifes);

    if (lifes === 0) {
      gameOver();
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
    lifes = 3;
    level = 0;
    gameScreen.find('.user-name').text(userName);
    newBoard();
    console.log(userName);
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
    gameOverScreen.removeClass('open');
    startScreem.addClass('open');
  });

});