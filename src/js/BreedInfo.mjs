//These 7 functions will return text based off number values passed through breed info
function sheddingInfo(num){
    if(num === "1"){
        return "Doesn't shed at all"
    } else if(num === "2"){
        return "Sheds very little"
    } else if(num === "3"){
        return "Sheds an average amount"
    } else if(num === "4"){
        return "Sheds a great deal"
    } else if(num === "5"){
        return "Sheds more than most breeds"
    } else{
        return "Fact for shedding is unavailable"
    }
}

function barkingInfo(num){
    if(num === "1"){
        return "Tends to barely bark, if at all."
    } else if(num === "2"){
        return "Bark a small amount"
    } else if(num === "3"){
        return "Barks an average amount"
    } else if(num === "4"){
        return "Barks a large amount"
    } else if(num === "5"){
        return "Barks more than most breeds"
    } else{
        return "Fact for barking behavior is unavailable"
    }
}

function energyInfo(num){
    if(num === "1"){
        return "Lazier than most breeds"
    } else if(num === "2"){
        return "Not very active"
    } else if(num === "3"){
        return "Fairly active"
    } else if(num === "4"){
        return "Very active"
    } else if(num === "5"){
        return "More active than most breeds"
    } else{
        return "Fact for activity level is unavailable"
    }
}

function trainabilityInfo(num){
    if(num === "1"){
        return "Extremely difficult to train"
    } else if(num === "2"){
        return "Very difficult to train"
    } else if(num === "3"){
        return "moderately easy to train"
    } else if(num === "4"){
        return "Very easy to train"
    } else if(num === "5"){
        return "Easier to train than most breeds"
    } else{
        return "Fact for trainability is unavailable"
    }
}

function proctectivenessInfo(num){
    if(num === "1"){
        return "Not very likely to be alert to strangers"
    } else if(num === "2"){
        return "Has a small chance to be alert to strangers"
    } else if(num === "3"){
        return "Likely to be alert to strangers"
    } else if(num === "4"){
        return "Very likely to be alert to strangers"
    } else if(num === "5"){
        return "Extremely likely to be alert to strangers"
    } else{
        return "Fact for alertness is unavailable"
    }
}

function childrenInfo(num){
    if(num === "1"){
        return "Very bad with children"
    } else if(num === "2"){
        return "Not very good with children"
    } else if(num === "3"){
        return "Okay with children"
    } else if(num === "4"){
        return "Good with children"
    } else if(num === "5"){
        return "Great with children"
    } else{
        return "Fact for behavior around children is unavailable"
    }
}

function otherDogInfo(num){
    if(num === "1"){
        return "Very bad with other dogs"
    } else if(num === "2"){
        return "Not very good with other dogs"
    } else if(num === "3"){
        return "Okay with other dogs"
    } else if(num === "4"){
        return "Good with other dogs"
    } else if(num === "5"){
        return "Great with other dogs"
    } else{
        return "Fact for behavior around other dogs is unavailable"
    }
}

// Template for breed info obtained from NinjaApi
function breedInfoTemplate(breed){
    return `
    <h2>${breed.name}</h2>
    <img src="${breed.image_link}" alt="Picture of a ${breed.name}">
    <div id="factsContainer">
    <h3>Quick Facts</h3>
    <ul>
        <li>${sheddingInfo(String(breed.shedding))}</li>
        <li>${barkingInfo(String(breed.barking))}</li>
        <li>${energyInfo(String(breed.energy))}</li>
        <li>${trainabilityInfo(String(breed.trainability))}</li>
        <li>${proctectivenessInfo(String(breed.protectiveness))}</li> 
        <li>${childrenInfo(String(breed.good_with_children))}</li>
        <li>${otherDogInfo(String(breed.good_with_other_dogs))}</li> 
    </ul>
    </div>
    `

}

//Template for breed description from wikipedia api
function breedDescriptionTemplate(breedDescription){
    return `
    <h3>Description: <span>Courtesy of Wikipedia</span></h3>
    <p>${breedDescription}</p>
    `
}


//Class handles all api functionality to build the breed info page.
export default class BreedInfo {
    constructor(dataSource, breedName){
        this.breedName = breedName;
        this.breedInfo = {};
        this.breedDescription = null;
        this.dataSource = dataSource;
    }

    async init(){
        const result = await this.dataSource.getNinjaDogAPIdataByName(this.breedName);
        this.breedInfo = result[0];
        this.breedDescription = await this.dataSource.getWikiAPIdata(this.breedInfo.name);
        this.renderBreedInfo();
        this.renderBreedDescription()
    }
    //Inserts HTML generated by api data and a template for Breed Info
    renderBreedInfo(){
        const parentElement = document.querySelector("#breedInfoContainer");
        parentElement.insertAdjacentHTML("afterbegin", breedInfoTemplate(this.breedInfo))
    }
    //Inserts HTML generated by api data and a template for Breed Description
    renderBreedDescription(){
        const parentElement = document.querySelector("#breedDescriptionContainer");
        parentElement.insertAdjacentHTML("afterbegin", breedDescriptionTemplate(this.breedDescription))
    }
}


