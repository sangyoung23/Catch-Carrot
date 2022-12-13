// 플레이 버튼을 누르면 필드 안에서 당근과 벌레가 랜덤으로 배치 됨
// 플레이와 동시에 타이머 작동
// 플레이 버튼이 네모로 변경됨
// 플레이와 동시에 스코어가 10으로 변하고 당근 클릭시 -1 , 벌레 클릭시 게임종료
// 벌레를 누르면 게임이 끝나고 YOU LOST 라는 문구가 뜸
// 벌레 누르면 플레이 버튼이 사리지고  You Lost 박스안에 리플에이 버튼이 들어있고 , 누르면 재시작
// 당근을 다 클릭하면 YOU WON 이라는 문구가 뜨고 게임 종료
// You Win 박스안에 리플레이 버튼이 있고 누르면 재시작 , 플레이 버튼이 사라짐

const gameBtn = document.querySelector(".start-btn");
const timer = document.querySelector(".timer");
const score = document.querySelector(".score");
const playGround = document.querySelector(".playground");
const playGroundRect = playGround.getBoundingClientRect();
const popUp = document.querySelector(".pop-up");
const reBtn = document.querySelector(".pop-up_refresh");
const popUpMessage = document.querySelector(".pop-up_message");
const bug = document.querySelector(".bug");
const carrot = document.querySelector(".carrot");

CARROTSIZE = 85;

function initGame() {
  // 게임시작될 때마다 당근과 벌레 리셋
  playGround.innerHTML = "";
  // 벌레와 당근을 생성한 뒤 playgorund에 추가해줌
  addItem("carrot", "5", "./img/carrot.png");
  addItem("bug", "5", "./img/bug.png");
}

// 당근과 벌레 생성과 포지션 지정 후 랜덤 배치
function addItem(className, num, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = playGroundRect.width - CARROTSIZE;
  const y2 = playGroundRect.height - CARROTSIZE;
  for (let i = 0; i < num; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    playGround.appendChild(item);
  }
}

function randomNumber(max, min) {
  return Math.random() * (max - min) + min;
}

// 타이머 초기 값
let count = 10;
// 점수 초기 값
let scores = 5;

let timers = undefined;

// 게임상태
let started = false;

// 당근 클릭 시 당근이 사라지며 , 스코어가 하나씩 줄어듬
// scores 가 0이 되면 타이머가 종료되고 게임승리 팝업창이 뜸
playGround.addEventListener("click", (e) => {
  if (e.target.className === "carrot") {
    e.target.style.visibility = "hidden";
    scores -= 1;
    score.innerHTML = scores;
    if (scores === 0) {
      popUp.classList.remove("pop-up_hide");
      popUpMessage.innerText = "YOU WON ✨";
      clearInterval(timers);
    }
  } else if (e.target.className === "bug") {
    finishGame();
    clearInterval(timers);
  }
});

// 시작버튼 클릭시
gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

// 게임시작
function startGame() {
  started = true;
  gameBtn.innerHTML = "STOP";
  initGame();
  startGameTimer();
  score.innerText = scores;
}

// 게임정지
function stopGame() {
  started = false;
  stopGameTimer();
  hideGameBtn();
  showPopupText();
}

// 게임 리셋
reBtn.addEventListener("click", () => {
  startGame();
  count = 10;
  timer.innerHTML = `0:${count}`;
  gameBtn.classList.remove("hide-game-btn");
  gameBtn.innerHTML = "STOP";
  popUp.classList.add("pop-up_hide");
  score.innerHTML = 5;
  scores = 5;
});

// 게임버튼을 숨겨줌
function hideGameBtn() {
  gameBtn.classList.add("hide-game-btn");
}

// 숨겨둔 팝업창을 보여줌
function showPopupText() {
  popUp.classList.remove("pop-up_hide");
  popUpMessage.innerText = "Reset Game ?";
}

// 타이머 시작
function startGameTimer() {
  timers = setInterval(() => {
    count -= 1;
    if (count >= 0) {
      timer.innerHTML = `0 : ${count}`;
    } else {
      clearInterval(timers);
      finishGame();
      return;
    }
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timers);
}

// LOST 팝업
function finishGame() {
  popUp.classList.remove("pop-up_hide");
  popUpMessage.innerText = "YOU LOST 💦";
}
