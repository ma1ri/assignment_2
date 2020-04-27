
/**
 * fetches data from given url then cretes corresponding 
 * items to fethed data and adds to dom
 */

export class Search {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this.url = url;
    }


    /**
     * fetches data from given url 
     * returns array 
     */
    async search() {
        const responce = await fetch(this.url);
        const searchResult = await responce.json();
        return searchResult.data;
    }

    /**
     * adds foundObjects to dom 
     * @param {Array} foundObjects  data returned by search function
     * @param {string} parentName  parent item class name
     * @param {string} childName child item class name
     * @param {string} childText child text class name
     */
    displayFoundObjects(foundObjects, parentName, childName, childText) {

        const parent = document.getElementsByClassName(parentName)[0];
        if (parent) {
            parent.innerHTML = "";
        }
        const children = foundObjects.map((currentGif) => this._generateElement(currentGif, childName, childText));

        for (const elem of children) {
            parent.appendChild(elem);
        }

    }

    /**
     * 
     * @param {object} currentGif gif object 
     * @param {*} childName  class name of element that we create
     * @param {*} childText classname for child element's text
     * returns created gif node
     */
    _generateElement(currentGif, childName, childText) {
        const child = document.createElement("div");
        child.className = childName;
        const image = this._addGifElement(currentGif);
        const rating = this._addRating(currentGif, childText);
        child.appendChild(image);
        child.appendChild(rating);
        return child;
    }


    /**
     * 
     * @param {object} currentGif gif object used to create img element 
     */
    _addGifElement(currentGif) {
        const gifImage = document.createElement("img");
        gifImage.setAttribute("src", currentGif.images.fixed_height.url);
        return gifImage;
    }

    /**
     * 
     * @param {object} currentGif used to get rating of current gif
     * @param {string} childText classname for gif rating
     * return rating element
     */
    _addRating(currentGif, childText) {
        const rating = document.createElement("div");
        rating.className = childText;
        rating.innerHTML = "Rating: " + currentGif.rating;
        return rating;
    }


}