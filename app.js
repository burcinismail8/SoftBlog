function solve() {
  function createsElements(type, text, attributes = []) {
    let element = document.createElement(type);
    element.innerHTML = text;

    attributes.forEach((arr) => {
      let newArr = arr.split("=");
      element.setAttribute(newArr[0], newArr[1]);
    });
    return element;
  }
  function createFunc() {
    titlesArchiveArray.push(title.value);
    let mainArticle = createsElements("article", "", []);

    let h1TitleElement = createsElements("h1", title.value, []);
    mainArticle.appendChild(h1TitleElement);

    let categoryStrong = createsElements("strong", category.value, []);
    let categoryParagraph = createsElements("p", "Category: ", []);
    categoryParagraph.appendChild(categoryStrong);
    mainArticle.appendChild(categoryParagraph);

    let creatorStrong = createsElements("strong", author.value, []);
    let creatorParagraph = createsElements("p", "Creator: ", []);
    creatorParagraph.appendChild(creatorStrong);
    mainArticle.appendChild(creatorParagraph);

    let contentParagraph = createsElements("p", content.value, []);
    mainArticle.appendChild(contentParagraph);

    let divForButtons = createsElements("div", "", ["class=buttons"]);
    let deleteButton = createsElements("button", "Delete", [
      "class=btn delete",
    ]);
    let archiveButton = createsElements("button", "Archive", [
      "class=btn archive",
    ]);
    divForButtons.appendChild(deleteButton);
    divForButtons.appendChild(archiveButton);
    mainArticle.appendChild(divForButtons);

    sectionForArticle.appendChild(mainArticle);
  }
  function archiveFunc(e) {
    titlesArchiveArray.sort((a, b) => a.localeCompare(b));
    archiveSection.innerHTML = "";
    titlesArchiveArray.forEach((title) => {
      let currLi = createsElements("li", title, []);
      archiveSection.appendChild(currLi);
    });
    e.target.parentElement.parentElement.remove();
  }
  function deleteFunc(e) {
    let currArticle = e.target.parentElement.parentElement;
    let titleToDelete = currArticle.querySelector("h1").innerHTML;
    let indexOfDeleteTitle = titlesArchiveArray.findIndex((element) => {
      element === titleToDelete;
    });
    titlesArchiveArray.splice(indexOfDeleteTitle, 1);
    currArticle.remove();
  }
  let mainDiv = document.querySelector(".site");
  let inputs = document.querySelectorAll("input");
  let title = inputs[1];
  let author = inputs[0];
  let category = inputs[2];
  let content = document.querySelector("textarea");
  let titlesArchiveArray = [];
  let sectionForArticle = document.querySelector(".site-content section");
  let archiveSection = document.querySelector(".archive-section ol");

  mainDiv.addEventListener("click", function (e) {
    if (e.target.innerText === "Create") {
      e.preventDefault();
      createFunc();
    } else if (e.target.innerText === "Delete") {
      deleteFunc(e);
    } else if (e.target.innerText === "Archive") {
      archiveFunc(e);
    }
  });
}
//Unexpected error: expected '<h2>Archive</h2><ol><li>Arrays</li><li>Arrays2</li><li>MyArticle</li><li>Objects</li></ol>' to equal '<h2>Archive</h2><ol><li>Arrays</li><li>MyArticle</li></ol>'
