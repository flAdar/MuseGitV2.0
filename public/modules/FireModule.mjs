export default class FireModule {
    #USER;
    #EXPLORE_RESULT;
    #A_USER;


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
                    this.#USER = doc.data()
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

    get a_user(){
        return this.#A_USER;
    }

    set explore_result(result){
        this.#EXPLORE_RESULT = result;
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
                                photoURL: "",
                                coverURL: "",
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
                    this.db.collection('users').doc(doc.data()['AuthorID']).get().then((user)=>{
                        this.#EXPLORE_RESULT.push({type:'project', data:doc.data(),author:user.data()['displayName']});
                    })
                });

            })
        } else if (filters['type'] === 'artist') {
            const userRef = this.db.collection('users');
            userRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc)=>{
                    this.#EXPLORE_RESULT.push({type:'artist', data:doc.data()});
                });
        })
        }
    }

    follow(uid){
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

    joinProjectRequest(pid){
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

    queryUser(uid){
        console.log(uid);
        this.db.collection('user').doc(uid).get().then(doc=>{
            this.#A_USER = doc.data();
        })
    }


}

