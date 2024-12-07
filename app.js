let sendBtn = document.getElementById("sendBtn");
let selectedOption = document.getElementById("selectUser");
let chatText = document.getElementById("chatText");
let inputText = document.getElementById("textValue");
let errorText = document.getElementById("errorText");
var md = window.markdownit();

sendBtn.addEventListener("click", () => {
  if (selectedOption.value == 1) {
    errorText.innerHTML="";
    addText();
    inputText.value = "";
  }
});

function addText() {
  let element = `<div class=text-right><img src="./images/avatar1.png" class="my-image mb-2" alt="me"></br><h3>ME : ${inputText.value}</h3></div></br>`;
  fetchResponse(inputText.value);
  $("#chatText").append(element);
}

// Integrating Google AI

function fetchResponse(textValue) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: `${textValue}`,
          },
        ],
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD5wclcTj8NoxLUYnwVkhHEicGMzSikPvg",
    requestOptions
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong. Try again later!!!");
    })
    .then((result) => {
      {
        let element = `<div class=text-left><img src="./images/avatar2.png" class="my-image mb-2" alt="buds"></br><h3>Buds : ${md.render(
          result.candidates[0].content.parts[0].text
        )}</h3></div></br>`;
        $("#chatText").append(element);
      }
    })
    .catch((error) => {
        errorText.innerHTML=`${error}`
    });
}


