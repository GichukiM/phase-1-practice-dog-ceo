// console.log('%c HI', 'color: firebrick')

// APIS used in the project
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

// Ensure JS runs after the HTML has loaded

document.addEventListener("DOMContentLoaded", () => {
  // CHALLENGE 1

  /* DELIVERABLES
        Fetch Images from the imgUrl defined above
        Add Images to the DOM by creating an Img tag and appending it to our provided image container
    */

  fetch(imgUrl)
    .then((resp) => resp.json())
    .then((images) => {
      const imageCont = document.getElementById("dog-image-container");
      images.message.forEach((dog) => {
        const imageEl = document.createElement("img");
        imageEl.src = dog;
        imageCont.appendChild(imageEl);
      });
    });

  // CHALLENGE 2, 3, and 4

  /* DELIVERABLES
        Fetch dog breeds from the breedUrl(API) defined above
        Adds the breeds to a list by manipulating the DOM creating lists and appending them to our existing dof-breeds container(ul)
            since our dog breeds are in form of objects keys, we iterate through the object key.
        Add an eventListener that changes the list color once clicked.
        If user selects "a" ie wants to know dog breeds that start with letter "a" the program is able to update to only breeds in that starting in letter.  
            We then have to remove the "letter not specific" list and update it with the "letter specific" one.
    */

  fetch(breedUrl)
    .then((resp) => resp.json())
    .then((breeds) => {
      const dogBreeds = document.getElementById("dog-breeds");
      const breedsObj = breeds.message;
      Object.keys(breedsObj).forEach((breed) => {
        const breedList = document.createElement("li");
        breedList.textContent = breed;
        dogBreeds.appendChild(breedList);
        breedList.addEventListener("click", () => {
          breedList.style.color = "green";
        });
        const breedDropdown = document.getElementById("breed-dropdown");
        breedDropdown.addEventListener("change", (e) => {
          const selectedValue = e.target.value;
          breedList.innerHTML = "";
          Object.keys(breedsObj).forEach((breed) => {
            if (breed.startsWith(selectedValue)) {
              const breedLetterSpecificList = document.createElement("li");
              breedLetterSpecificList.textContent = breed;
              breedList.appendChild(breedLetterSpecificList);
              breedList.addEventListener("click", () => {
                breedList.style.color = "green";
              });
            }
          });
        });
      });
    });
});
