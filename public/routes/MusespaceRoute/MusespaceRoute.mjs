import Component from "../../modules/Component.mjs";

export default class MusespaceRoute extends Component {
    resProject;
    user;
    #_NewProjectFrom;
    
    
    constructor(){
        super();
    }

    onInit(){
        console.log('Enter');

        this.#_NewProjectFrom = this.querySelector('#New_Project_From');
       
        this.#_NewProjectFrom.addEventListener('submit', (event) => {
            event.preventDefault();
            const form = event.target;
            const result = this.creatNewProjectForm(form);
            console.log(result);
            const result_new = Application.Modules.FireModule.creatNewProject(result);
            const pid = result_new['_key']['path']['segments'][1];
            console.log(pid);
            Application.Modules.RouterModule.redirect(`/visitProject`,pid);
        });
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

    //Yaharin -> Creating New Project

    creatNewProjectForm(form){
        let result = {};
        for (let i = 0; i < form.length; i++) {
            const input = form[i];
            console.dir(`index: ${i} data: ${input.name}`);
            if(input.localName === 'input' || input.localName ==='textarea'){
                result[input.name] = input.value;
            }
        }

        console.log('RESULT' + result);
        return result;
    }
}