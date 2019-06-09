import Component from "../../modules/Component.mjs";

export default class ProjectDisplayComponent extends Component {
    constructor(){
        super();
        // this.classList.add("card bg-light mb-3 text-center")
    }
    onInit(){
        let _pid = this.getAttribute('pid');
        this.querySelector(".p-name").innerText=this.getAttribute('porjectDisplay');
        this.querySelector(".access").innerText=this.getAttribute('access');
        if(this.getAttribute('access')==='public'){
            this.querySelector('.icon').innerHTML='lock_open';
        }
        else
        if(this.getAttribute('access')==='private'){
            this.querySelector('.icon').innerHTML='lock';
        }
        this.querySelector(".enter").addEventListener('click',(event)=>{
            Application.Modules.RouterModule.redirect(`/project`,_pid);
        })
        

       
    }
    onSync(){

    }
}