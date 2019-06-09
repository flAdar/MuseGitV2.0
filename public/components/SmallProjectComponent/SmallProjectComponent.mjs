import Component from "../../modules/Component.mjs";

export default class SmallProjectComponent extends Component {
    _uid;
    constructor(){
        super();

    }
    onInit(){
        this._pid = this.getAttribute('pid');
        this.querySelector('.song-name').innerText = this.getAttribute('name');
        this.querySelector('.album-cover').src = `../../assets/album/${this.getAttribute('img')}.jpg`;
        this.querySelector('.star').innerText= this.getAttribute('star');

        this.querySelector('.visit').addEventListener('click',(event)=>{
            Application.Modules.RouterModule.redirect(`/visitProject`,this._pid);
        })

    }
    onSync(){

    }

}