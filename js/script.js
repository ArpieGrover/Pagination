let currentPage = 1;
let numOfUsersonOnePage = 10;

let numOfUsers = users.length;

// Calculating number of pages
let numOfPages = Math.ceil(numOfUsers/numOfUsersonOnePage);


// ADDING USERS TO UI
let userContainer = document.getElementsByClassName('contact-list')[0];

for (let i=0; i<numOfUsers;i++) {

    // creating page li
    let li = document.createElement("li");
    li.className = "contact-item cf"

    // creating div1
    let div1 = document.createElement("div");
    div1.className = "contact-details"
    
    // creating img
    let img = document.createElement("img");
    img.className = "avatar"
    img.src = users[i].image;

    // creating h3
    let h3 = document.createElement("h3");
    h3.innerHTML = users[i].name;

    // creating span
    let span = document.createElement("span");
    span.className = "email"
    let email = users[i].name.split(' ').join('.') + '@example.com';
    span.innerHTML = email;

    div1.appendChild(img);
    div1.appendChild(h3);
    div1.appendChild(span);   

    // creating div2
    let div2 = document.createElement("div");
    div2.className = "joined-details"

    // creating spanDate
    let spanDate = document.createElement("span");
    spanDate.className = "date"
    spanDate.innerHTML = "Joined " + users[i].joined;

    div2.appendChild(spanDate);

    // adding a as child element of li
    li.appendChild(div1);
    li.appendChild(div2);
    

    // adding created li to pagination ul
    userContainer.appendChild(li);
}



// PAGINATION
let pagination = document.getElementById('pagination');

// Adding Page Buttons
for (let i=1; i<=numOfPages;i++) {
    // creating page li
    let li = document.createElement("li");

    // creating a
    let a = document.createElement("a");
        a.href = "#";
        a.innerHTML = i;
        a.onclick = paginate;

    // adding a as child element of li
    li.appendChild(a);    

    // adding created li to pagination ul
    pagination.appendChild(li);
}


// Making first page active initially
pagination.children[currentPage-1].firstChild.classList.add("active");

let contactsOnScreen = document.getElementsByClassName('contact-item cf');


// Initially only showing first 10 contacts and hiding rest
hideAllContacts(numOfUsersonOnePage);

function hideAllContacts(index=0) {
    // Hiding all contacts initially if index = 0
    for (let i=index; i<numOfUsers;i++) {
        contactsOnScreen[i].style.display = "none";
    }
}

// Function that implements pagination
function paginate(e) {
    let pageNum = e.target.innerHTML;

    // Displaying elements based on page number
    let firstContact = numOfUsersonOnePage*(+pageNum-1);
    let lastContact;
    // adjusting for Last Page
    if (numOfUsers < firstContact+numOfUsersonOnePage) {
        lastContact=numOfUsers;
    } else {
        lastContact= firstContact+numOfUsersonOnePage;
    }

    // Hiding All contacts
    hideAllContacts();

    // Displaying contacts based on current Page number
    for (let i=firstContact;i<lastContact;i++) {
        contactsOnScreen[i].style.display = "block";
    }

    // Giving "active" class to active Page a
    pagination.children[currentPage-1].firstChild.classList.remove("active");
    currentPage = +pageNum;
    pagination.children[currentPage-1].firstChild.classList.add("active");
}

let totalNumberOfContactsOnScreen = document.getElementsByClassName('page-header cf')[0];
totalNumberOfContactsOnScreen.children[1].innerHTML = "Total: "+numOfUsers;