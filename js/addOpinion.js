function urobFormular(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const image = document.getElementById("image").value.trim();
  const flewYes = document.getElementById("flewYes").checked;
  const flewnNo = document.getElementById("flewNo").checked;
  const flewAfraid = document.getElementById("flewAfraid").checked;
  const planeSmall = document.getElementById("planeSmall").checked;
  const planeBig = document.getElementById("planeBig").checked;
  const planeJet = document.getElementById("planeJet").checked;
  const tag = document.getElementById("form-tags").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name == "" || email == "" || tag == "") {
    window.alert("Enter your name, email and an appropriate tag, please");
    return;
  }

  const newOpinion = {
    name: name,
    email: email,
    image: image,
    flewYes: flewYes,
    flewnNo: flewnNo,
    flewAfraid: flewAfraid,
    planeSmall: planeSmall,
    planeBig: planeBig,
    planeJet: planeJet,
    tag: tag,
    message: message,
    created: new Date()
  };

  let opinions = [];

  if (localStorage.opinionStorage) {
    opinions = JSON.parse(localStorage.opinionStorage);
  } else {
    console.log("chyba1");
  }

  if (opinions.push(newOpinion)) {
    localStorage.opinionStorage = JSON.stringify(opinions);
  } else {
    console.log("chyba2");
  }

  window.location.hash = "#opinions";
}
