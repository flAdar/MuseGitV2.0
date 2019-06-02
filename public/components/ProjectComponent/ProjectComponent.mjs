import Component from "../../modules/Component.mjs";

export default class ProjectComponent extends Component {
    constructor(){
        super();
    }
    onInit(){
        this.querySelector(".p-name").innerText=this.getAttribute('name');
        this.querySelector(".author").innerText=this.getAttribute('author');
        this.querySelector(".star").innerText=this.getAttribute('stars');
        this.querySelector(".join").addEventListener('click',(event)=>{
            this.askToJoin(this.getAttribute('pid'));
        })
    }
    onSync(){

    }

    askToJoin(pid) {
        console.log(pid);
        Application.Modules.FireModule.joinProjectRequest(pid);
    }
}