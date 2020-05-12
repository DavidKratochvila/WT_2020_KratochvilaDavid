export default [
  {
    hash: "welcome",
    target: "router-view",
    getTemplate: targetElm =>
      (document.getElementById(targetElm).innerHTML = document.getElementById(
        "template-welcome"
      ).innerHTML)
  },
  {
    hash: "articles",
    target: "router-view",
    getTemplate: createHtml4Main
  },
  {
    hash: "opinions",
    target: "router-view",
    getTemplate: createHtml4opinions
  },
  {
    hash: "addOpinion",
    target: "router-view",
    getTemplate: targetElm =>
      (document.getElementById(targetElm).innerHTML = document.getElementById(
        "template-addOpinion"
      ).innerHTML)
  }
];

function createHtml4opinions(targetElm) {
  const opinionsFromStorage = localStorage.opinionStorage;
  let opinions = [];

  if (opinionsFromStorage) {
    opinions = JSON.parse(opinionsFromStorage);
    opinions.forEach(opinion => {
      if (opinion.flewYes) opinion.flew = "Has flown before";
      else if (opinion.flewnNo) opinion.flew = "Hasn't flown before";
      else opinion.flew = "Is too afraid to fly";

      if (opinion.planeSmall) opinion.planeSmall = "Has flown in a small plane";
      if (opinion.planeBig) opinion.planeBig = "Has flown in a big plane";
      if (opinion.planeJet) opinion.planeJet = "Has flown in a jet plane";
    });
  }

  document.getElementById(targetElm).innerHTML = render(
    document.getElementById("template-opinions").innerHTML,
    opinions
  );
}

function fetchAndDisplayArticles(targetElm) {
  const url = "https://wt.kpi.fei.tuke.sk/api/article";
  let articleID = 12400;

  fetch(`${url}/${articleID}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(
          new Error(
            `Server answered with ${response.status}: ${response.statusText}.`
          )
        );
      }
    })
    .then(responseJSON => {
      console.log(responseJSON);
      document.getElementById(targetElm).innerHTML = render(
        document.getElementById("template-articles").innerHTML,
        responseJSON
      );
    })
    .catch(error => {
      const errMsgObj = { errMessage: error };
      document.getElementById(targetElm).innerHTML = render(
        document.getElementById("template-articles-error").innerHTML,
        errMsgObj
      );
    });
}

function createHtml4Main(targetElm, current, totalCount) {
  fetchAndDisplayArticles(targetElm);

  // current = parseInt(current);
  // totalCount = parseInt(totalCount);
  // const data4rendering = {
  //     currPage: current,
  //     pageCount: totalCount
  // };
  //
  // if (current > 1) {
  //     data4rendering.prevPage = current - 1;
  // }
  //
  // if (current < totalCount) {
  //     data4rendering.nextPage = current + 1;
  // }

  document.getElementById(targetElm).innerHTML = render(
    document.getElementById("template-articles").innerHTML
  );
}
