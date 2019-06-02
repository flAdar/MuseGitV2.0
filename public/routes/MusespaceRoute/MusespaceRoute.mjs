import Component from "../../modules/Component.mjs";

export default class MusespaceRoute extends Component {
    #_project;
    #resProject;
    user;
    constructor(){
        super();
    }
    onInit(){
        this.#_project = this.querySelector(".blog2");
        this.#_project.onclick = ()=>{
            Application.Modules.RouterModule.redirect('/project');
        }
       // Application.Modules.FireModule.queryProjects();

    }

    onSync(){
        this.user = Application.Modules.FireModule.user;
        if(this.user){
           this.onUpdate('user',this.user,[Application.Modules.FireModule.queryProjects]);
        }
        this.resProject = Application.Modules.FireModule.projects;
        if (this.resProject && this.resProject.length>0){
            this.onUpdate('resProject', this.resProject,[this.creatResultProject])
        }
    }

    creatResultProject(){
        let _resProject = this.querySelector("#resProject");
        console.log(this.resProject);
        for(let res of this.resProject){
            let project = {
                discription: res['data'].discription,
                private: res['data'].private,
            };
            console.log(project);
            const setResPro = document.createElement("res_Project");
            setResPro.setAttribute("porjectDisplay",project.discription );
            setResPro.setAttribute("access", project.private);
            _resProject.appendChild(setResPro);
        }

    }
}