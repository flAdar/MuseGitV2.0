export default class FireModule {
    #USER;
    #EXPLORE_RESULT;
    #A_USER={};
    #A_PROJECT;
    #FOLLOW=[];
    #CHANNELS = [];

    //Projects Vars
    #PROJECTS = [];


    constructor() {
        var config = {
            apiKey: "AIzaSyD0IixJ3b0kZtyfzD75iOQAlgL2RwBUdoU",
            authDomain: "musegit-2db76.firebaseapp.com",
            databaseURL: "https://musegit-2db76.firebaseio.com",
            projectId: "musegit-2db76",
            storageBucket: "musegit-2db76.appspot.com",
            messagingSenderId: "558523586770"
        };
        firebase.initializeApp(config);

        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.storage = firebase.storage();

        this.auth.onAuthStateChanged(this.defineUser())
    }

    defineUser() {
        return (user) => {
            if (user) {
                this.db.collection("users").doc(user.uid).onSnapshot((doc) => {
                    this.#USER = doc.data();
                    this.db.collection('projects').where('AuthorID', "==", doc.id)
                        .get().then((querySnapshot) => {
                        querySnapshot.forEach((pro_doc) => {
                            this.#PROJECTS.push({data: pro_doc.data()});
                        });
                    });
                    this.db.collection('following').where('followOn.userID','==',doc.id)
                        .get().then((querySnapshot)=>{
                        querySnapshot.forEach((fol_doc) => {
                            let followedBy = fol_doc.id.split('_')[3];
                            console.log(followedBy)
                            this.db.collection('users').doc(followedBy).get().then((user)=>{
                                this.#FOLLOW.push({type:"follower",data: user.data()});
                            })
                        });
                    });
                    this.db.collection('following').where('followedBy.userID','==',doc.id)
                        .get().then((querySnapshot)=>{
                        querySnapshot.forEach((fol_doc) => {
                            let followOn = fol_doc.id.split('_')[1];
                            console.log(followOn);
                            this.db.collection('users').doc(followOn).get().then((user)=>{
                                this.#FOLLOW.push({type:"following",data: user.data()});
                            })
                        });
                    });
                })
            } else {

            }
        }
    }

    get user() {
        return this.#USER;
    }

    get explore_result() {
        return this.#EXPLORE_RESULT;
    }

    get a_user() {
        return this.#A_USER;
    }

    get a_project(){
        return this.#A_PROJECT;
    }

    get channels(){
        return this.#CHANNELS;
    }

    get follow(){
        return this.#FOLLOW;
    }

    set a_user(result){
        this.#A_USER = result;
    }
    set explore_result(result) {
        this.#EXPLORE_RESULT = result;
    }

    //Projects code
    get projects() {
        return this.#PROJECTS;
    }

    signOut() {
        this.auth.signOut()
            .then(function (credential) {
                location.href = '/login'
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(`Error ${errorCode} : ${errorMessage} `)
            });
    }

    RegisterEmailAndPassword(result) {
        //--> email verification amd remember me will be here
        this.auth.createUserWithEmailAndPassword(result.email, result.password)
            .then((credential) => {
                credential.user.updateProfile({
                    displayName: result.email.split('@')[0]
                })
                    .then(() => {
                        let random =Math.floor(Math.random() * (+17 - +1)) + +1;

                        return this.db.collection("users").doc(credential.user.uid)
                            .set({
                                uid: credential.user.uid,
                                displayName: credential.user.displayName,
                                FirstName: "",
                                LastName: "",
                                Bio: "",
                                Country: "",
                                City: "",
                                Genres: [],
                                Skills: [],
                                photoURL: random,
                                CoverURL: random,
                                Projects: [],
                                Follower: [],
                                Following: [],
                                Collaborations: [],
                                Stars: []
                            });

                    })
                    .then(() => {
                        Application.Modules.RouterModule.redirect('/dashboard')
                    })
            }).catch(function (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error ${errorCode} : ${errorMessage} `);
            // ...
        });

    }

    loginEmailAndPassword(result) {
        this.auth.signInWithEmailAndPassword(result.email, result.password)
            .then(function (credential) {
                // application.getModule("RouterModule").redirect('/dashboard');
                Application.Modules.RouterModule.redirect('/dashboard')
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(`Error ${errorCode} : ${errorMessage} `)
                // ...
            });
    }

    queryFilters(filters) {
        this.#EXPLORE_RESULT = [];

        if (filters['type'] === 'project') {
            const projectRef = this.db.collection('projects').where('Private', '==', false).get();
            projectRef.then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    this.db.collection('users').doc(doc.data()['AuthorID']).get().then((user) => {
                        this.#EXPLORE_RESULT.push({
                            type: 'project',
                            data: doc.data(),
                            author: user.data()['displayName']
                        });
                    })
                });

            })
        } else if (filters['type'] === 'artist') {
            const userRef = this.db.collection('users');
            userRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.#EXPLORE_RESULT.push({type: 'artist', data: doc.data()});
                });
            })
        }
    }

    followUser(uid) {
        this.db.collection("following").doc(`on_${uid}_by_${this.user.uid}`)
            .set({
                followOn: {
                    userID: uid,
                    NickName: '',
                    imgURL: ''
                },
                followedBy: {
                    userID: this.user.uid,
                    NickName: '',
                    imgURL: ''
                }
            })
            .then(function () {
                alert(" Follow succeeded ");
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

    joinProjectRequest(pid) {
        return this.db.collection("collaboration").doc(`${this.user.uid}_${pid}`)
            .set({
                user: {
                    userID: this.user.uid,
                    NickName: '',
                    imgURL: ''
                },
                project: {
                    projectID: pid,
                    projectName: '',
                    imgURL: '',
                    fullTrackURL: ''
                },
                status: "pending"
            })
    }

    queryUser(uid) {
        this.#A_USER={};
        this.db.collection('users').doc(uid).get().then(doc => {
            this.#A_USER['data'] = doc.data();
            this.#A_USER['projects']=[];
            this.#A_USER['follow']=[];
            this.db.collection('projects').where('AuthorID', "==", doc.id)
                .get().then((querySnapshot) => {
                querySnapshot.forEach((pro_doc) => {
                    this.#A_USER['projects'].push({data: pro_doc.data()});
                });
            });
            this.db.collection('following').where('followOn.userID','==',doc.id)
                .get().then((querySnapshot)=>{
                querySnapshot.forEach((fol_doc) => {
                    let followedBy = fol_doc.id.split('_')[3];
                    console.log(followedBy)
                    this.db.collection('users').doc(followedBy).get().then((user)=>{
                        this.#A_USER['follow'].push({type:"follower",data: user.data()});
                    })
                });
            });
            this.db.collection('following').where('followedBy.userID','==',doc.id)
                .get().then((querySnapshot)=>{
                querySnapshot.forEach((fol_doc) => {
                    let followOn = fol_doc.id.split('_')[1];
                    console.log(followOn);
                    this.db.collection('users').doc(followOn).get().then((user)=>{
                        this.#A_USER['follow'].push({type:"following",data: user.data()});
                    })
                });
            });

        })
    }

    queryProject(pid){
        this.db.collection('projects').doc(pid).get().then(doc=>{
            this.#A_PROJECT = doc.data();
            this.#CHANNELS = doc.data().Channels;
            //console.dir(doc.data().Channels.data());
            // for(let s in doc.data().Channels){
            //     this.#CHANNELS.push(s);
            // }
            // console.log(this.#CHANNELS)
        })
    }

    updateProfile(info){
        let userDoc = this.db.collection("users").doc(this.#USER.uid);
        return userDoc.update({
            FirstName: info.firstname,
            LastName: info.lastname,
            displayName: info.displayname,
            Bio: info.bio,
            Country: info.country,
            City: info.city
            // Genres: info.Genres,
            // Skills: info.Skills,
            // ImgURL:info.ImgURL,
            // CoverURL: info.CoverURL
        })
            .then(function () {
                console.log("Document successfully updated!");
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);

            });


    }


    creatNewProject(Proinfo){

        this.db.collection("projects").add({

            Author : '/users/' + this.#USER.uid,
            AuthorID : this.#USER.uid,
            Description : '',
            Genres : '',
            imgURL : '',
            PName : Proinfo.Proname,
            Private : false,
            Stars: '0',
            StorageURK: "",
            pid: ''
        }).then(function () {
            console.log("Project successfully created!");
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error creating project: ", error);

        });


    }


}

