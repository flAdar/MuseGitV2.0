import Component from "../../modules/Component.mjs";

export default class FollowerComponent extends Component {
    _uid;
    constructor(){
        super();

    }
    onInit(){
        this._uid = this.getAttribute('uid');
        this.querySelector('.name').innerText = this.getAttribute('name');
        this.querySelector('.img').src = `../../assets/PNG/64x64/64_${this.getAttribute('img')}.png`;

        this.querySelector('.visit').addEventListener('click',(event)=>{
            Application.Modules.RouterModule.redirect(`/visitProfile`,this._uid)
        })

    }
    onSync(){



    }

}