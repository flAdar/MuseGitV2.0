import Component from "../../modules/Component.mjs";

export default class ProjectDisplayComponent extends Component {
    constructor(){
        super();
    }
    onInit(){

        this.querySelector(".p-name").innerText=this.getAttribute('porjectDisplay');
        this.querySelector(".access").innerText=this.getAttribute('access');
        if(this.getAttribute('access')==='public'){
            $('.icon').html("lock_open");
        }


       
    }
    onSync(){

    }
}