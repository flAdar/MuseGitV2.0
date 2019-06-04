import Component from "../../modules/Component.mjs";

export default class VisitProjectRoute extends Component {
    #a_project;

    constructor() {
        super();
    }

    onInit() {
        Application.Modules.FireModule.queryProject(location.search.split('?')[1]);
    }

    onSync() {
        this.#a_project = Application.Modules.FireModule.a_project;
        this.onUpdate('a_project', this.#a_project, [this.renderProject]);

    }
    renderProject(){
        console.log(this.#a_project);
    }




}