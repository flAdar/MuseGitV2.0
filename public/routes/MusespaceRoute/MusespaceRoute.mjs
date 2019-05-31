import Component from "../../modules/Component.mjs";

export default class MusespaceRoute extends Component {
    #_project;
    constructor(){
        super();
    }
    onInit(){
        this.#_project = this.querySelector(".blog2");
        this.#_project.onclick = ()=>{
            Application.Modules.RouterModule.redirect('/project');
        }

    }
}