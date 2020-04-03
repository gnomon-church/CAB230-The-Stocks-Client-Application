function searchBooks(library, authorName) {
  let tempArr = [];
  for (let i = 0; i < library.length; i++) {
    if (library[i].author === authorName) {
      tempArr.push(library[i].title);
    }
  }

  if (tempArr.length === 0) {
    arrString = "NOT FOUND";
  } else {
    arrString = tempArr.toString();
  }

  return arrString;
}

// library = [
//   {
//     author: "Bill Gates",
//     title: "The Road Ahead",
//     libraryID: 1254
//   },
//   {
//     author: "Bill Gates",
//     title: "The Road Ahead II",
//     libraryID: 1255
//   },
//   {
//     author: "Bill Gates",
//     title: "The Road Ahead III",
//     libraryID: 1256
//   },
//   {
//     author: "Jeff Bezos",
//     title: "The Everything Store",
//     libraryID: 1365
//   }
// ];

// console.log(searchBooks(library, "Jeff Bezos"));
