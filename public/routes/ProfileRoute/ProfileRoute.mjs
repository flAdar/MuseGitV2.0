import Component from "../../modules/Component.mjs";

export default class ProfileRoute extends Component {
    #userInfo;
    #_updateProfileForm;
    #user;
    #userState;
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
        this.onUpdate('user',this.#user,[this.renderProfile,this.renderProfileForm]);
    }

    renderProfile(){
        this.#userInfo.nickname.innerHTML = this.#user.displayName;
        this.#userInfo.bio.innerHTML = this.#user.Bio;
        this.#userInfo.county.innerHTML = this.#user.Country;
        this.#userInfo.city.innerHTML = this.#user.City;
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
    // // Define cover url and if it's not exist then leave it as it is
    // coverURL(){
    //     if (this.user.coverURL) {
    //         const covers = document.querySelectorAll('[data-type="cover"]');
    //         for (let cover of covers) {
    //             cover.style = `background-image: url("${this.user.coverURL}")`;
    //         }
    //     }
    // }
    // // Define photo url and if it's not exist then leave it as it is
    // photoURL() {
    //     if (this.user.photoURL) {
    //         const _photoURLs = document.querySelectorAll('[data-type="photo"]');
    //         for (let _photoURL of _photoURLs) {
    //             _photoURL.classList.add('photoURL');
    //             _photoURL.src = this.user.photoURL;
    //         }
    //     }
    // }

}