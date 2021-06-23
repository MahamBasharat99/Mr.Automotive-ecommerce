import firebase from "../../config/firebase";

const check_current_user = () => {
    return (dispatch) => {

        var user = firebase.auth().currentUser;
        if (user) {

            let dbRef = firebase.database().ref("users");
            dbRef.child(user.uid).get().then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch({ type: "currentUser", payload: snapshot.val() });
                    set_user_cart();
                }
            })
        }

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let dbRef = firebase.database().ref("users");
                dbRef.child(user.uid).get().then((snapshot) => {
                    if (snapshot.exists()) {
                        dispatch({ type: "currentUser", payload: snapshot.val() });
                        set_user_cart();
                    }
                })

            } else {
                dispatch({ type: "currentUser", payload: {} });
            }
        })
    }
}

const get_All_Products = () => {
    return (dispatch) => {
        firebase.database().ref('all_Products').on('child_added', (data) => {
            dispatch({ type: "get_All_Products", payload: data.val() })
        });
    }
};
const get_All_Orders = () => {
    let ord = [];
    return (dispatch) => {
        firebase.database().ref('orders').on('child_added', (data) => {
            ord.push(data.val());
            dispatch({ type: "get_All_Orders", payload: ord });

        });
    }
};

const set_user_cart = () => {
    var user = firebase.auth().currentUser;
    var dbProdRef = firebase.database().ref("all_Products/categories/");
    var db = firebase.database();
    let dbUser = {};
    let prd;
    let prddd = [];
    let cat = [];
    let id = [];
    let qtn = []
        // if (user) {
    return (dispatch) => {
            let dbRef = firebase.database().ref("users");
            dbRef.child(user.uid).get().then((snapshot) => {
                if (snapshot.exists()) {
                    dbUser = snapshot.val();
                    getUserFromDB();
                }
            })

            function getUserFromDB() {
                db.ref(`users/${dbUser.userUid}/cartItems`).once('value').then((data) => {
                    if (data) {
                        prd = data.val();
                        setUserCartToStroe();
                    }
                }).catch((error) => {
                    console.log(error.message)
                })
            }


            function setUserCartToStroe() {
                if (prd) {
                    Object.values(prd).map((v, i) => {
                        cat.push(v.cate)
                        id.push(v.productID);
                        qtn.push(v.qtn);
                    })
                    if (cat.length > 0) {
                        cat.map((ct, i) => {
                            dbProdRef
                                .child(ct).child(id[i])
                                .get().then((prod) => {
                                    if (prod.exists()) {
                                        prddd.push(prod.val())
                                        if (i === cat.length - 1) {
                                            dispatch({ type: "set_user_cart", payload: { prddd, qtn } })
                                        }
                                    }
                                })
                                .catch((error) => {
                                    console.log(error.message)
                                });
                        })
                    }
                }
            }

        }
        // }
};

const Emailsignup = (email, password, userName) => {
    return (dispatch) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                var user = result.user;
                let chkAdmin = user.uid === process.env.ADMIN_UID ? true : false;
                let create_user = {
                    userName: userName,
                    userEmail: user.email,
                    userUid: user.uid,
                    userProfile: "",
                    admin: chkAdmin,
                    address: "",
                    phone: "",
                    signMethod: "Email"
                }
                user.updateProfile({
                    displayName: userName,
                })
                firebase.database().ref('/').child(`users/${user.uid}`).set(create_user)
                    .then(() => {
                        alert(`${create_user.userName}, login Successfully!`)
                        check_current_user();
                    }).catch(function(error) {
                        alert("Some Error Occurred While adding user to database" + error.message)
                    })

            }).catch((error) => {
                console.log(error.message);
                alert(error.message)
            });

    }
}

const facebooklogin = () => {
    return (dispatch) => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {

            var user = result.user;
            let chkAdmin = user.uid === process.env.ADMIN_UID ? true : false;

            let dbRef = firebase.database().ref("users");
            dbRef
                .child(user.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        return true;
                    } else {

                        let create_user = {
                            userName: user.displayName,
                            address: "",
                            userEmail: user.email,
                            userProfile: result.user.photoURL,
                            phone: "",
                            admin: chkAdmin,
                            userUid: user.uid,

                            signMethod: "Facebook"
                        }
                        firebase.database().ref('/').child(`users/${user.uid}`).set(create_user)
                            .then(() => {
                                alert(`${user.displayName}, login Successfully!`);
                                check_current_user();
                            }).catch(function(error) {
                                alert("Some Error Occurred While adding user to database" + error.message)
                            })
                    }
                })
        }).catch(function(error) {
            alert(error.message)
        });
    }
}

const googleLogin = () => {
    return (dispatch) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {

                var user = result.user;
                let chkAdmin = user.uid === process.env.ADMIN_UID ? true : false;

                let dbRef = firebase.database().ref("users");
                dbRef
                    .child(user.uid)
                    .get()
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            return true;
                        } else {

                            let create_user = {
                                userName: user.displayName,
                                address: "",
                                userEmail: user.email,
                                userProfile: result.user.photoURL,
                                phone: "",
                                admin: chkAdmin,
                                userUid: user.uid,
                                phone: "",
                                signMethod: "Google"
                            }
                            firebase.database().ref('/').child(`users/${user.uid}`).set(create_user)
                                .then(() => {
                                    alert(`${create_user.userName}, Signup Successfully!`);
                                    check_current_user();
                                }).catch(function(error) {
                                    alert("Some Error Occurred While adding user to database" + error.message)
                                })
                        }
                    })
            }).catch((error) => {
                alert(error.message)
            });
    }
}


export { get_All_Products, Emailsignup, facebooklogin, googleLogin, check_current_user, set_user_cart, get_All_Orders };