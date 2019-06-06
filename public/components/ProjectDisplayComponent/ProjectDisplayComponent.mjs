import Component from "../../modules/Component.mjs";

export default class ProjectDisplayComponent extends Component {
    constructor(){
        super();
    }
    onInit(){

        this.querySelector(".p-name").innerText=this.getAttribute('porjectDisplay');
        this.querySelector(".status").innerText=this.getAttribute('accsess');
       
    }
    onSync(){

    }
}