import Component from "../../modules/Component.mjs";

export default class MusespaceRoute extends Component {
    //#_project;
    resProject;
    user;
    constructor(){
        super();
    }
    onInit(){
        //this.#_project = this.querySelector(".blog2");

    }

    onSync(){
        this.resProject = Application.Modules.FireModule.projects;
        if (this.resProject && this.resProject.length>0){
            this.onUpdate('resProject', this.resProject,[this.creatResultProject])
        }
    }


    creatResultProject(){
        console.log(this.resProject);
        let _resProject = this.querySelector("#resProject");
        for(let res of this.resProject){
            let project = {
                name: res['data'].PName,
                private: res['data'].Private,
                pid: res['data'].pid
            };
            const setResPro = document.createElement("project-result");

            if(project.private === true){
                setResPro.setAttribute("access", 'private');

            }else{
                setResPro.setAttribute("access", 'public');
            }
            setResPro.setAttribute("porjectDisplay",project.name );
            setResPro.setAttribute('pid',project.pid);
            _resProject.appendChild(setResPro);
            console.log(project);

        }

    }
}