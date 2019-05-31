import Component from "../../modules/Component.mjs";

export default class CollaboratorsRoute extends Component {
    constructor(){
        super();
    }
    onInit(){
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
}
