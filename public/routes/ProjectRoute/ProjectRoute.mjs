import Component from "../../modules/Component.mjs";

export default class ProjectRoute extends Component {
    #a_project;
    constructor(){
        super();
    }

    onInit(){
        Application.Modules.FireModule.queryProject(location.search.split('?')[1]);

        this._versions = document.getElementById('versions');
        this._collaborators = document.getElementById('collaborators');
        this._project = document.getElementById('project');

        this._project.onclick = ()=>{
            Application.Modules.RouterModule.redirect('/project');
        };

        this._versions.onclick = ()=>{
            Application.Modules.RouterModule.redirect('/versions');
        };

        this._collaborators.onclick = ()=>{
            Application.Modules.RouterModule.redirect('/collaborators');
        };
    }

    onSync(){
        this.#a_project = Application.Modules.FireModule.a_project;
        this.onUpdate('a_project', this.#a_project, [this.renderProject]);
    }

    renderProject(){
        console.log(this.#a_project);
    }
}