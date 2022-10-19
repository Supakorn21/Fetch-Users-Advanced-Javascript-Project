let URL = "https://randomuser.me/api/?results=24";
let userList = document.querySelector(".container__left--contact-lists-area");
let userDetail = document.querySelector(".container__right--active");
let input = document.querySelector(".container__left--search-input input");
let details = [];

input.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  const filterDetails = details.filter((detail) => {
    return (
      detail.name.first.toLowerCase().includes(searchString) ||
      detail.name.last.toLowerCase().includes(searchString) ||
      detail.email.toLowerCase().includes(searchString)
    );
  });

  displayDetails(filterDetails);
});

const loadUsers = async () => {
  try {
    details = await axios.get(URL).then((res) => {
      return res.data.results;
    });
    displayDetails(details);
  } catch (error) {}
};

const displayDetails = (details) => {
  const htmlString = details
    .map((detail) => {
      return `
        <div class="container__left--contact-user-box" onClick="(selectDetail(${detail.location.street.number}))">
            <div class="container__left--profile-img">
              <img src=${detail.picture.medium} alt="" />
            </div>
            <div class="container__left--profile-details">
              <div class="container__left--profile-name">${detail.name.title}. ${detail.name.first} ${detail.name.last}</div>
              <div class="container__left--profile-email">
                ${detail.email}
              </div>
            </div>
          </div>
        `;
    })
    .join("");
  userList.innerHTML = htmlString;
};

const selectDetail = (id) => {
  const streetNumber = id;
  const filterNew = details.filter(
    (detail) => detail.location.street.number === streetNumber
  );
  displayIndividual(filterNew);
};

const displayIndividual = (people) => {
  const htmlString = people.map((item) => {
    return `
  <div class="container__right--active-box">
          <div class="container__right--active-img">
            <img src=${item.picture.large} alt="" />
          </div>
          <div class="container__right--active--first-sentence">
           ${item.name.title}. ${item.name.first} ${item.name.last}
          </div>
          <div class="container__right--active--second-sentence">
            Gender: ${item.gender}, Age: ${item.dob.age}
          </div>
          <div class="container__right--active--second-sentence">
            Email: ${item.email}
          </div>
          <div class="container__right--active--second-sentence">
            ${item.phone}
          </div>
          <div class="container__right--active--second-sentence">
            ${item.location.city} ${item.location.state}, ${item.location.country}
          </div>
        </div>
  `;
  });

  userDetail.innerHTML = htmlString;
};

loadUsers();
