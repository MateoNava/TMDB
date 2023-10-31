function getGenres(arrGenres) {
  if (!arrGenres) return;
  let genres = arrGenres[0].name;
  if (arrGenres.length > 1) {
    for (let i = 1; i < arrGenres.length; i++) {
      genres += `, ${arrGenres[i].name}`;
    }
  }
  return genres;
}

function dateSetter(date) {
  let [year, month, day] = date.split("-");
  switch (month) {
    case "01":
      month = "January";
      break;
    case "02":
      month = "February";
      break;
    case "03":
      month = "March";
      break;
    case "04":
      month = "April";
      break;
    case "05":
      month = "May";
      break;
    case "06":
      month = "June";
      break;
    case "07":
      month = "July";
      break;
    case "08":
      month = "August";
      break;
    case "09":
      month = "September";
      break;
    case "10":
      month = "October";
      break;
    case "11":
      month = "November";
      break;
    case "12":
      month = "December";
      break;
    default:
      return;
  }
  if (day[0] === "0") day = day[1];
  return day + " " + month + ", " + year;
}

function scoreSetter(score) {
  var rounded = Math.round(score * 10) / 10;
  return `${rounded}/10`;
}

//Funcion para mostrar todos los actores si son menos de 7, o hasta 7 actores si son mas
function actorsSetter(arrActors) {
  if (arrActors[0].name) {
    let actors = arrActors[0].name;
    let numberOfActors = arrActors.length;
    if (numberOfActors > 7) numberOfActors = 7;
    if (arrActors.length > 1) {
      for (let i = 1; i < numberOfActors; i++) {
        actors += `, ${arrActors[i].name}`;
      }
    }
    return actors;
  }
}

function directorsSetter(arrCrew) {
  if (arrCrew[0].name) {
    let directors = arrCrew[0].name;
    let numberOfDirectors = arrCrew.length;
    if (numberOfDirectors > 7) numberOfDirectors = 7;
    if (arrCrew.length > 1) {
      for (let i = 1; i < numberOfDirectors; i++) {
        directors += `, ${arrCrew[i].name}`;
      }
    }
    return directors;
  }
}

module.exports = {
  getGenres,
  dateSetter,
  scoreSetter,
  actorsSetter,
  directorsSetter,
};
