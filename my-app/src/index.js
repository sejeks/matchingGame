window.onload = function () {
  let side = 0,
    container = document.getElementsByClassName("container")[0],
    numbers = [],
    countOfShown = 0,
    numberOfFirst = 0,
    numberOfSecond = 0,
    count = 0,
    process = 0;

  function initMap() {
    count = side * side;
    process = count;
    const widthOfContainer = 84 * side;
    //seting of container sizes
    container.style.width = widthOfContainer + "px";
    container.style.height = widthOfContainer + "px";

    //maybe need to add timer
    //maybe need to add scores
    //need to limit of guesses
    //
    for (let i = 1; i <= count; i += 2) {
      numbers[i - 1] = (i + 1) / 2;
      numbers[i] = (i + 1) / 2;
    }

    let mixedNumbers = mix(numbers);
    while (count !== 0) {
      let divBlock = document.createElement("div");
      divBlock.className = "block-invisible";
      divBlock.number = mixedNumbers[count - 1];
      count--;
      container.appendChild(divBlock);
    }

  }


  function addStartButton() {
    let start = document.createElement("button");
    start.className = "startButton";
    start.textContent = "START";
    start.addEventListener("click", verifySide);
    container.appendChild(start);
  }


  function verifySide() {
    side = prompt("Choose the size of one side(it should be even integer number that more than zero)");
    if (!(side % 2) && side > 0 && side !== 0) {
      let start = document.querySelector(".startButton");
      start.parentNode.removeChild(start);
      initMap();
      activateBlocks(true);
    } else {
      verifySide();
    }

  }


  function hideShownBlocks() {
    let blocksVisible = document.querySelectorAll(".block");
    for (let i = 0; i < blocksVisible.length; i++) {
      blocksVisible[i].className = "block-invisible";
    }
    countOfShown = 0;
  }


  function activateBlocks(bool) {
    let blocks = document.getElementsByClassName("block-invisible");
    for (let i = 0; i < blocks.length; i++) {
      if (bool) {
        blocks[i].addEventListener("click", showBlock);
      } else {
        blocks[i].removeEventListener("click", showBlock);
      }
    }
  }

  function removeOldBlocks(bool) {
    let blocks = container.getElementsByTagName("div");
    //join shown blocks
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].parentNode.removeChild(blocks[i]);
    }
    if(blocks.length !== 0) removeOldBlocks();
  }


  function mix(mixArray) {
    let index, valueIndex;
    for (let i = 0; i <= mixArray.length - 1; i++) {
      index = Math.floor(Math.random() * i);
      valueIndex = mixArray[index];
      mixArray[index] = mixArray[i];
      mixArray[i] = valueIndex;
    }
    return mixArray;
  }


  function checkCountOfOpenBlocks(e) {
    if (countOfShown === 2) {
      activateBlocks(false);
      setTimeout(function (e) {
        hideShownBlocks();
      }, 1000);
    }
    activateBlocks(true);
  }


  function showBlock(e) {
    e.target.className = "block";
    countOfShown++;
    checkCountOfOpenBlocks(e);
    if (countOfShown === 1) {
      numberOfFirst = e.target;
      numberOfFirst.removeEventListener("click", showBlock);
      numberOfFirst.textContent = numberOfFirst.number;
    }
    if (countOfShown === 2) {
      numberOfSecond = e.target;
      numberOfSecond.removeEventListener("click", showBlock);
      numberOfSecond.textContent = numberOfSecond.number;
      if (numberOfFirst.number === numberOfSecond.number) {
        let blocksVisible = document.querySelectorAll(".block");
        for (let i = 0; i < blocksVisible.length; i++) {
          blocksVisible[i].className = "block-static";
        }
        process -= 2;
        if (process === count) {
            alert("congrats");
            removeOldBlocks();
            addStartButton();
          //need to add button that restarts the game
        }
      } else {
        setTimeout(function () {
          numberOfFirst.textContent = null;
          numberOfSecond.textContent = null;
          numberOfFirst.addEventListener("click", showBlock);
          numberOfSecond.addEventListener("click", showBlock);
          numberOfFirst = 0;
          numberOfSecond = 0;
        }, 1000)
      }
    }
  }

  addStartButton();

}
