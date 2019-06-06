import Component from "../../modules/Component.mjs";

export default class ProjectDisplayComponent extends Component {
    constructor(){
        super();
    }
    onInit(){
        let _pid = this.getAttribute('pid');
        this.querySelector(".p-name").innerText=this.getAttribute('porjectDisplay');
        this.querySelector(".status").innerText=this.getAttribute('accsess');
        this.querySelector(".enter").addEventListener('click',(event)=>{
            Application.Modules.RouterModule.redirect(`/project`,_pid);
        })
        
       
    }
    onSync(){

    }
}