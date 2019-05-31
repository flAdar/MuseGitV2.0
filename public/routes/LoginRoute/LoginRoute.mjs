import Component from "../../modules/Component.mjs";

export default class LoginRoute extends Component {
    constructor(){
        super();
    }
    onInit(){
        const signin =this.querySelector('#signin');
        signin.addEventListener('submit',(event)=>{
            event.preventDefault();
            const form = event.target;
            const result = Application.Modules.FormsModule.formHandler(form);
            console.log(result);
            Application.Modules.FireModule.loginEmailAndPassword(result);
        });
    }
    onSync(){

    }
}