"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  let pickAdventure;
    switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      let pickAdventure = decideSearch();
      if (pickAdventure === "one"){
        searchResults = searchByTraits(people);
      } 
      else if (pickAdventure === "multiple"){
        //multiple search
      }
      else{
        alert("Invalid Response");
        decideSearch();
      }
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
  
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      alert("Gender: " + person[0].gender + " " +
      "DOB: " + person[0].dob + " " +
      "Height: " + person[0].height + " " +
      "Weight: " + person[0].weight + " " +
      "Eye Color: " + person[0].eyeColor + " " +
      "Occupation: " + person[0].occupation); 
    // TODO: get person's info
    break;
    case "family":
      let partner = people.filter(function(spouse){
        return (spouse.id === person[0].currentSpouse);
      }); 
      alert("Parents: " + person[0].parents); 
      alert("Spouse: " + partner[0].firstName + " " + partner[0].lastName + "Parents: " + person[0].parents);
    // TODO: get person's family
    break;
    case "descendants":
      let descendantResults = descendantRecursion(person[0], people); 
      function descendantRecursion(person, people){
        let foundDescendantArray = people
        foundDescendantArray = foundDescendantArray.filter(function(people){
          if (person.id == people.parents[0] || person.id == people.parents[1]){
            return true;
          }
          if(foundDescendantArray.length === 0){alert("No Descendants");}
        })
        let foundDescendantCat = foundDescendantArray
        for (let i=0; i < foundDescendantCat.length; i++){
          descendantRecursion(foundDescendantCat.concat(foundDescendantArray));
           
        }
        return foundDescendantCat
      }
      alert(foundDescendantArray);
        
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function searchByTraits(people){
  let foundPersonArray = people 
  let traitChoice = prompt("Select one criterion. gender, dob, height, weight, eye color, or occupation".trim());
  switch(traitChoice){
    case "gender":
      let userGenderInput = prompt("Please enter gender type. male or female")
      foundPersonArray = foundPersonArray.filter(function(person){
        if(userGenderInput === person.gender){
          return true;
        }
      })
      let genderResults = stringOfFire(foundPersonArray);
      alert(genderResults);
      if(foundPersonArray.length === 1){
        return foundPersonArray;
      }
      if(foundPersonArray.length === 0 || foundPersonArray.length > 1){
        if(foundPersonArray.length === 0){searchByTraits(people);}
        else{searchByTraits(foundPersonArray);}
      
      }
      //function check gender
    break;
    case "dob":
      let userDobInput = prompt("Please enter date of birth. mm/dd/yyyy")
      foundPersonArray = foundPersonArray.filter(function(person){
        if(userDobInput === person.dob){
          return true;
        }
      })
      let dobResults = stringOfFire(foundPersonArray);
      alert(dobResults);
      if(foundPersonArray.length === 1){
        return foundPersonArray;
      }
      if(foundPersonArray.length === 0 || foundPersonArray.length > 1){
        if(foundPersonArray.length === 0){searchByTraits(people);}
        else{searchByTraits(foundPersonArray);}
      
      }
      //function check dob
    break;
    case "height":
      let userHeightInput = parseInt(prompt("Please enter their height. Example 71"))
      foundPersonArray = foundPersonArray.filter(function(person){
        if(userHeightInput === person.height){
          return true;
        }
      })
      let heightResults = stringOfFire(foundPersonArray);
      alert(heightResults);
      if(foundPersonArray.length === 1){
        return foundPersonArray;
      }
      if(foundPersonArray.length === 0 || foundPersonArray.length > 1){
        if(foundPersonArray.length === 0){searchByTraits(people);}
        else{searchByTraits(foundPersonArray);}
      
      }
      //function check height
    break;
    case "weight":
      let userWeightInput = parseInt(prompt("Please enter their weight. Example 153"))
      foundPersonArray = foundPersonArray.filter(function(person){
        if(userWeightInput === person.weight){
          return true;
        }
      })
      let weightResults = stringOfFire(foundPersonArray);
      alert(weightResults);
      if(foundPersonArray.length === 1){
        return foundPersonArray;
      }
      if(foundPersonArray.length === 0 || foundPersonArray.length > 1){
        if(foundPersonArray.length === 0){searchByTraits(people);}
        else{searchByTraits(foundPersonArray);}
      
      }
      //function check weight
    break;
    case "eye color":
      let userEyeColorInput = prompt("Please enter their eye color. Example green")
      foundPersonArray = foundPersonArray.filter(function(person){
        if(userEyeColorInput === person.eyeColor){
          return true;
        }
      })
      let eyeColorResults = stringOfFire(foundPersonArray);
      alert(eyeColorResults);
      if(foundPersonArray.length === 1){
        return foundPersonArray;
      }
      if(foundPersonArray.length === 0 || foundPersonArray.length > 1){
        if(foundPersonArray.length === 0){searchByTraits(people);}
        else{searchByTraits(foundPersonArray);}
      
      }
      //function check eye color
    break;
    case "occupation":
      let userOccupationInput = prompt("Please enter their occupation. Example ")
      foundPersonArray = foundPersonArray.filter(function(person){
        if(userOccupationInput === person.occupation){
          return true;
        }
      })
      let occupationResults = stringOfFire(foundPersonArray);
      alert(occupationResults);
      if(foundPersonArray.length === 1){
        return foundPersonArray;
      }
      if(foundPersonArray.length === 0 || foundPersonArray.length > 1){
        if(foundPersonArray.length === 0){searchByTraits(people);}
        else{searchByTraits(foundPersonArray);}
      
      }
      //function check occupation
    break;
    default:
      app(people); // restart app
        break;
  }
  return foundPersonArray;
}

function stringOfFire(array){
  let foundPeopleString = "";
  for(let i = 0; i < array.length; i++){
    foundPeopleString += (array[i].firstName + " " + array[i].lastName) + "\n";
  }
  return foundPeopleString
}
function decideSearch(){
let pickAdventure = prompt("Would you like to search by one criterion or multiple?");
 if (pickAdventure === "one") {
   return pickAdventure;
 }
 else if (pickAdventure === "multiple"){
   return pickAdventure;
   // select multiple traits 
 }
}








