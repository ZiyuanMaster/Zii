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

  toBack.src = "https://www.dropbox.com/scl/fi/lwmktbh1fiqukpf3bdrnt/close.png?rlkey=qwa8xz0yfj07frdwmsp7179x0&dl=1";
  linkTxt.textContent = "get this game on Play Store";
  dataHeaderTxt.textContent = "Masukkan User ID";
  toZiiDocs.textContent = "Lihat dokumentasi cara cek ID versi Zii Store disini"
  toZiiDocs.href = "/utilitiesHTML/Zii Docs - checkID.html";
  productType.textContent = "Pilih Nominal";
  payment.textContent = "Pilih Metode Pembayaran Disini";
  detailProduct.textContent = "Pilih nominal terlebih dulu";
  detailPrice.textContent = "Rp ";
  buy.textContent = "beli";
  buy.disabled = true;

  if (data) {
    let thisGame = gamesData[`${data.name}`];
    
    let denom = thisGame["Denom"];
    let isDenom2 = thisGame["Denom2"];
    let priceList = thisGame["Price"];
    let priceList2 = thisGame["Price2"]
    let serverList = thisGame["Server List"];

    selectedIcn.src = data.icon;
    copyright.textContent = `${data.name} | © Zii 2024`;
    selectedObj.textContent = data.name;
    selectedDev.textContent = data.deve;
    linkTxt.href = data.link;
    payInfo.textContent = "Menggunakan E-Wallet / Bank yang berbeda dengan Metode Pembayaran akan dikenakan biaya tambahan sebesar 1.000";

    selectedIcn.onload = function() {
      if (selectedIcn.complete) {
        setTimeout(loadOff, 300);
      }
    }

    for (let denoms in denom) {
      let a = document.createElement("button");
      a.classList.add("nominals");
      a.textContent = denom[denoms];

      if (a.textContent.includes("+")) {
        a.textContent = a.textContent.replace("+", ` ${data.type} + `)
      } else {
        a.textContent = a.textContent + ` ${data.type}`;
      }

      productContents.appendChild(a);
    }
    
    if (isDenom2 !== false) {
      let a = document.createElement("p");
      
      a.setAttribute("id", "subscriptionTxt");
      a.textContent = thisGame["type2"];
      
      productContents.appendChild(a);
      for (let i = 0; i < isDenom2.length; i++) {
        let b = document.createElement("button");
        
        b.classList.add("nominals");
        b.textContent = isDenom2[i];
        
        productContents.appendChild(b);
      }
      
      let nominals = document.querySelectorAll(".nominals");
      let pLength = priceList.length + priceList2.length;
      let pThisAll = [...priceList, ...priceList2];
      
      nominals.forEach((denom) => {
        denom.addEventListener("click", function() {
          for (let u = 0; u < pLength; u++) {
            nominals[u].style.cssText += `
              background: transparent;
              color: rgba(5, 5, 5, .55);
              border-color: rgba(5, 5, 5, .55);
            `;
  
            nominals[u].setAttribute("prices", pThisAll[u].toLocaleString("id-ID"));
          }
          
          denom.style.cssText += `
            background: rgba(0, 75, 150, .175);
            color: rgba(0, 75, 150, .8);
            border-color: rgba(0, 75, 150, .8);
          `;
  
          detailProduct.textContent = denom.textContent;
          detailPrice.textContent = `Rp ${denom.getAttribute("prices")}`;
  
          checkingPayment();
        })
      })
    } else {
      let nominals = document.querySelectorAll(".nominals");
      
      nominals.forEach((denom) => {
        denom.addEventListener("click", function() {
          for (let u = 0; u < nominals.length; u++) {
            nominals[u].style.cssText += `
              background: transparent;
              color: rgba(5, 5, 5, .55);
              border-color: rgba(5, 5, 5, .55);
            `;
  
            nominals[u].setAttribute("prices", priceList[u].toLocaleString("id-ID"));
          }
  
          denom.style.cssText += `
            background: rgba(0, 75, 150, .175);
            color: rgba(0, 75, 150, .8);
            border-color: rgba(0, 75, 150, .8);
          `;
  
          detailProduct.textContent = denom.textContent;
          detailPrice.textContent = `Rp ${denom.getAttribute("prices")}`;
  
          checkingPayment();
        })
      })
    }

    //let subscription = document.querySelectorAll(".subscription");

    if (data.serv === "false") {
      soloDataValue.style.display = "block";
      soloDataValue.addEventListener("input", function() {
        let typeID = gamesData[data.name]["idType"];
        
        if (typeID === "num") {
          this.value = this.value.replace(/[^0-9]/g, "")
        } else if (typeID === "mix") {
          this.value = this.value;
        }
        
        checkingPayment();
      })

      checkingPayment();
    } else if (data.serv === "input") {
      dualDataValue.style.display = "block";
      dualDataValue.addEventListener("input", function() {
        let typeID = gamesData[data.name]["idType"];
        
        if (typeID === "num") {
          this.value = this.value.replace(/[^0-9]/g, "")
        } else if (typeID === "mix") {
          this.value = this.value;
        }
        
        checkingPayment();
      })
      
      zoneDataValue.style.display = "block";
      zoneDataValue.addEventListener("input", function() {
        let typeID = gamesData[data.name]["idType"];
      
        if (typeID === "num") {
          this.value = this.value.replace(/[^0-9]/g, "")
        } else if (typeID === "mix") {
          this.value = this.value;
        }
      
        checkingPayment();
      })

      checkingPayment();
    } else if (data.serv === "option") {
      dualDataValue.style.display = "block";
      dualDataValue.addEventListener("input", function() {
        let typeID = gamesData[data.name]["idType"];
      
        if (typeID === "num") {
          this.value = this.value.replace(/[^0-9]/g, "")
        } else if (typeID === "mix") {
          this.value = this.value;
        }
      
        checkingPayment();
      })
      
      zonePickValue.style.display = "block";

      checkingPayment();

      zonePickValue.addEventListener("click", function() {
        optionContents.innerHTML = "";

        optionCon.style.cssText += `
          opacity: 1; visibility: visible;
          transition-delay: 0s;
        `;
        optionContents.style.cssText += `
          transform: scale(1);
          transition-delay: .1s;
        `;

        for (let u = 0; u < serverList.length; u++) {
          let a = document.createElement("button");

          a.classList.add("serverTxt");
          a.textContent = serverList[u];

          optionContents.appendChild(a);
        }

        let serverTxt = document.querySelectorAll(".serverTxt");

        serverTxt.forEach((srv) => {
          if (srv.textContent === zonePickValue.value) {
            srv.disabled = true;
          }

          srv.addEventListener("click", function() {
            optionCon.style.cssText += `
              opacity: 0; visibility: hidden;
              transition-delay: .1s;
            `;
            optionContents.style.cssText += `
              transform: scale(0);
              transition-delay: 0s;
            `;

            zonePickValue.value = srv.textContent;

            checkingPayment();
          })
        })

        checkingPayment();
      })
    }

    toBack.addEventListener("click", function() {
      history.back();
    })

    payment.addEventListener("click", function(event) {
      optionContents.innerHTML = "";

      optionCon.style.cssText += `
        opacity: 1; visibility: visible;
        transition-delay: 0s;
      `;
      optionContents.style.cssText += `
        transform: scale(1);
        transition-delay: .1s;
      `;

      for (let u = 0; u < paymentMethods.length; u++) {
        let a = document.createElement("button");
        a.classList.add("paymentTxt");
        a.textContent = paymentMethods[u];
        
        optionContents.appendChild(a);
      }

      let paymentTxt = document.querySelectorAll(".paymentTxt");

      paymentTxt.forEach((pay) => {
        let txt = payment.textContent.replace("Metode Pembayaran: ", "");
        
        if (pay.textContent === txt) {
          pay.disabled = true;
        }
        
        pay.addEventListener("click", function() {
          optionCon.style.cssText += `
              opacity: 0; visibility: hidden;
              transition-delay: .1s;
            `;
          optionContents.style.cssText += `
              transform: scale(0);
              transition-delay: 0s;
            `;

          payment.textContent = "Metode Pembayaran: " + pay.textContent;

          checkingPayment();
        })
      })
    })
    
    
    
    
    buy.addEventListener("click", function() {
      let a = "```";
      let method = payment.textContent.replace("Metode Pembayaran: ", "");
      
      if (method === "BRI") {
        method = method + " (060101033653503)";
      } else if (method === "Dana") {
        method = method + " (0895414824561)";
      } else if (method === "DOKU") {
        method = method + " (0895414824561)";
      } else if (method === "Flip") {
        method = method + " (0895414824561)";
      } else if (method === "Gopay") {
        method = method + " (0895414824561)";
      } else if (method === "Neobank") {
        method = method + " (5859459256046466)";
      } else if (method === "SeaBank") {
        method = method + " (901012281711)";
      } else if (method === "ShopeePay") {
        method = method + " (0895414824561)";
      } else if (method === "Superbank") {
        method = method + " (000003858719)";
      }
      
      let rawTxtA = `${a}Game${a}\n- ${selectedObj.textContent}\n${a}User ID${a}\n- ${soloDataValue.value}\n${a}Nominal${a}\n- ${detailProduct.textContent}\n${a}Price${a}\n- ${detailPrice.textContent}\n${a}Payment${a}\n- ${method}`;
      let rawTxtB = `${a}Game${a}\n- ${selectedObj.textContent}\n${a}User ID${a}\n- ${dualDataValue.value}(${zoneDataValue.value})\n${a}Nominal${a}\n- ${detailProduct.textContent}\n${a}Price${a}\n- ${detailPrice.textContent}\n${a}Payment${a}\n- ${method}`;
      let rawTxtC = `${a}Game${a}\n- ${selectedObj.textContent}\n${a}User ID${a}\n- ${dualDataValue.value}(${zonePickValue.value})\n${a}Nominal${a}\n- ${detailProduct.textContent}\n${a}Price${a}\n- ${detailPrice.textContent}\n${a}Payment${a}\n- ${method}`;
      
      let urlTxtA = encodeURIComponent(rawTxtA);
      let urlTxtB = encodeURIComponent(rawTxtB);
      let urlTxtC = encodeURIComponent(rawTxtC);
      
      if (soloDataValue.style.display === "block") {
        window.open("https://wa.me/62895414824561?text=" + urlTxtA);
      } else if (zoneDataValue.style.display === "block") {
        window.open("https://wa.me/62895414824561?text=" + urlTxtB);
      } else if (zonePickValue.style.display === "block") {
        window.open("https://wa.me/62895414824561?text=" + urlTxtC);
      }
    })
    
    
    
    
    
    
    window.onbeforeunload = function(event) {
      event.preventDefault();
      event.returnValue = "";
    }
    
  } else {
    window.location = "index.html";
  }
})

function checkingPayment() {
  let txt1 = "Pilih Metode Pembayaran Disini";
  let txt2 = "Pilih nominal terlebih dulu";

  if (soloDataValue.style.display === "block") {
    if (soloDataValue.value === "" ||
        payment.textContent === txt1 ||
        detailProduct.textContent === txt2) {
      buy.disabled = true;
    } else {
      buy.disabled = false;
    }
  } else if (zoneDataValue.style.display === "block") {
    if (dualDataValue.value == "" ||
        zoneDataValue.value === "" ||
        payment.textContent === txt1 ||
        detailProduct.textContent === txt2) {
      buy.disabled = true;
    } else {
      buy.disabled = false;
    }
  } else if (zonePickValue.style.display === "block") {
    if (dualDataValue.value == "" ||
        zonePickValue.value === "" ||
        payment.textContent === txt1 ||
        detailProduct.textContent === txt2) {
      buy.disabled = true;
    } else {
      buy.disabled = false;
    }
  }
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