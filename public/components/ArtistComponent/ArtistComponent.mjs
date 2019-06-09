import Component from "../../modules/Component.mjs";

export default class ArtistComponent extends Component {
    constructor(){
        super();

    }
    onInit(){
        this._uid =this.getAttribute("uid");
        this.querySelector(".name").innerText=this.getAttribute('name');
        this.querySelector(".bio").innerText=this.getAttribute('bio');
        this.querySelector(".user-img").src=`../../assets/PNG/64x64/64_${this.getAttribute('img')}.png`;
        this.querySelector('.uid').addEventListener('click',(event)=>{
            this.follow(this._uid);

        });
        this.querySelector('.visit').addEventListener('click',(event)=>{
           Application.Modules.RouterModule.redirect(`/visitProfile`,this._uid)
        })
    }
    onSync(){

    }

    follow(uid) {
        console.log(uid);
        Application.Modules.FireModule.followUser(uid);
    }
}