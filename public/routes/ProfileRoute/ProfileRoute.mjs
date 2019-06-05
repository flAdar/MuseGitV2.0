import Component from "../../modules/Component.mjs";

export default class ProfileRoute extends Component {
    #userInfo;
    #_updateProfileForm;
    #user;
    #follow;
    constructor(){
        super();
    }
    onInit(){
        this.#userInfo = {
            nickname: this.querySelector("#name"),
            bio: this.querySelector("#description"),
            img: this.querySelector("#profileImg"),
            cover: this.querySelector("#coverImg"),
            county: this.querySelector("#userCountry"),
            city: this.querySelector("#userCity")
        };
        this.#_updateProfileForm = this.querySelector('#updateProfile');

        // if(this.#user){
        //     this.renderProfile();
        //     this.renderProfileForm();
        // }
    }
    onSync(){
        this.#user = Application.Modules.FireModule.user;
        this.#follow = Application.Modules.FireModule.follow;
        this.onUpdate('user',this.#user,[this.renderProfile,this.renderProfileForm]);
        if(this.#follow && this.#follow.length>0){
            this.onUpdate('follow',this.#follow,[this.renderFollow]);
        }


    }

    renderProfile(){
        this.#userInfo.nickname.innerHTML = this.#user.displayName;
        this.#userInfo.bio.innerHTML = this.#user.Bio;
        this.#userInfo.county.innerHTML = this.#user.Country;
        this.#userInfo.city.innerHTML = this.#user.City;
        this.#userInfo.cover.src = `../assets/cover/${this.#user.CoverURL}.jpg`;
        this.#userInfo.img.src = `../assets/PNG/128x128/128_${this.#user.photoURL}.png`;
        const skills = this.querySelector('#skills');
        const genres = this.querySelector('#genres');
        if(skills.children.length !== this.#user.Skills.length){
            skills.innerHTML = '';
            this.#user.Skills.forEach((skill) => {
                this.querySelector('#skills').innerHTML += `<span class=\"badge badge-success\">${skill}</span>`;
            });
        }
        if(genres.children.length !== this.#user.Genres.length) {
            genres.innerHTML = '';
            this.#user.Genres.forEach((genre) => {
                genres.innerHTML += `<span class=\"badge badge-danger\">${genre}</span>`;
            });
        }
    }
    renderProfileForm(){
        this.#_updateProfileForm.onsubmit = (e)=>{
            e.preventDefault();
            const result = Application.Modules.FireModule.formHandler(e.target);
        };
        this.#_updateProfileForm.displayname.value = this.#user.displayName;
        this.#_updateProfileForm.firstname.value = this.#user.FirstName;
        this.#_updateProfileForm.lastname.value = this.#user.LastName;
        this.#_updateProfileForm.bio.value = this.#user.Bio;
        this.#_updateProfileForm.country.value = this.#user.Country;
        this.#_updateProfileForm.city.value = this.#user.City;
        // this.coverURL();
        // this.photoURL();
    }
    renderFollow(){
        console.log(this.#follow);
        let _followers = this.querySelector('#followers');
        let _followings = this.querySelector('#followings');
        this.#follow.forEach((fol)=>{
            let _follow = document.createElement('follow-user');
            _follow.setAttribute('uid',fol['data'].uid);
            _follow.setAttribute('name',fol['data'].displayName);
            _follow.setAttribute('img',fol['data'].photoURL);
            if(fol['type']==='follower'){
                _followers.appendChild(_follow);
            }
            else if(fol['type']==='following'){
                _followings.appendChild(_follow);
            }

        })

    }


}