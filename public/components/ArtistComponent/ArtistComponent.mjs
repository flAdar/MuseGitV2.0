import Component from "../../modules/Component.mjs";

export default class ArtistComponent extends Component {
    constructor(){
        super();

    }
    onInit(){
        this.querySelector(".name").innerText=this.getAttribute('name');
        this.querySelector(".bio").innerText=this.getAttribute('bio');
    }
    onSync(){

    }
}