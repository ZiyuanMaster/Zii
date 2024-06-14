let play = () => { return "running" };
let stop = () => { return "paused" };
let full = () => { return "1" };
let zero = () => { return "0" };
let show = () => { return "visible" };
let hide = () => { return "hidden" };
let dlOn = () => { return "all .35s .15s ease" };
let dlOf = () => { return "all .35s .0s ease" };

window.addEventListener("DOMContentLoaded", function() {
  loadOn();
  
  let data = JSON.parse(localStorage.getItem("data"));
  
  search.src = "https://www.dropbox.com/scl/fi/ibd8asd94tgpemwdy8lfr/search.png?rlkey=gnsczcu1qtn3r13xbne44c7n3&dl=1";
  searchInput.placeholder = "Cari Games... | © Zii 2024";
  gamesTxt.textContent = "Daftar Games";

  searchInput.addEventListener("input", searchGames);
  
  if (data) {
    localStorage.removeItem("data");
  }

  for (let i = 0; i < dataKeys.length; i++) {
    let a = document.createElement("div");
    let b = document.createElement("img");
    let c = document.createElement("p");
    let d = document.createElement("a");

    a.classList.add("gameCon");
    b.classList.add("gameIcn");
    c.classList.add("gameObj");

    b.src = appDir[i];
    b.setAttribute("Cache-Control", "max-age=10800");
    c.textContent = appObj[i];
    d.href = "#";
    
    a.setAttribute("Icns", b.src);
    a.setAttribute("Objs", c.textContent);
    a.setAttribute("Devs", appDev[i]);
    a.setAttribute("Lnks", linkOnPS[i]);
    a.setAttribute("Sers", isServer[i]);
    a.setAttribute("Typs", proTyp[i]);
    d.setAttribute("id", "toNext");

    gamesContents.appendChild(a);
    a.appendChild(b);
    a.appendChild(c);
    a.appendChild(d);

    b.onload = function() {
      if (b.complete) {
        setTimeout(loadOff, 300);
      }
    }
  }
  
  let gameCon = document.querySelectorAll(".gameCon");
  
  for (let i = 0; i < gameCon.length; i++) {
    gameCon[i].addEventListener("click", function() {
      loadOn();
      
      setTimeout(function() {
        let data = {
          "icon": gameCon[i].getAttribute("Icns"),
          "name": gameCon[i].textContent,
          "deve": gameCon[i].getAttribute("Devs"),
          "link": gameCon[i].getAttribute("Lnks"),
          "serv": gameCon[i].getAttribute("Sers"),
          "type": gameCon[i].getAttribute("Typs")
        }
        
        localStorage.setItem("data", JSON.stringify(data));
        
        window.location.replace("indexNext.html");
        
        if (window.location !== "http://localhost:7700/index.html") {
          setTimeout(loadOff, 500);
        }
      }, 300)
    })
  }
})

function searchGames() {
  let a = searchInput.value.toLowerCase();
  let b = document.querySelectorAll(".gameCon");

  b.forEach(function(obj) {
    if (obj.textContent.toLowerCase().includes(a)) {
      obj.style.display = "block";
    } else {
      obj.style.display = "none";
    }
  })
}

function loadOn() {
  return new Promise((resolve) => {
    loadCon.style.cssText += `
      opacity: 1; visibility: visible;
      transition-delay: 0s;
    `;
    spin.style.cssText += `
      opacity: 1; visibility: visible;
      transition-delay: .15s;
    `;

    loadCon.style.setProperty("--opc", full());
    loadCon.style.setProperty("--vsb", show());
    spin.style.setProperty("--aps", play());

    resolve();
  });
}

function loadOff() {
  loadCon.style.cssText += `
    opacity: 0; visibility: hidden;
    transition-delay: .15s;
  `;
  spin.style.cssText += `
    opacity: 0; visibility: hidden;
    transition-delay: 0s;
  `;

  loadCon.style.setProperty("--opc", zero());
  loadCon.style.setProperty("--vsb", hide());
  spin.style.setProperty("--aps", stop());
}