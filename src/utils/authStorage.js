class AuthStorage {
	static STORAGEKEY = {
		userData: "userData",
		access_token: "access_token",
		user_id: "user_id",
		name: "name",
	};

	static setStorageData(key, data, keepMeLoggedIn) {
		keepMeLoggedIn ? localStorage.setItem(key, data) : sessionStorage.setItem(key, data);
	}

	static setStorageJsonData(key, data, keepMeLoggedIn) {
		keepMeLoggedIn ? localStorage.setItem(key, JSON.stringify(data)) : sessionStorage.setItem(key, JSON.stringify(data));
	}

	static getStorageData(key) {
		return localStorage.getItem(key) ? localStorage.getItem(key) : sessionStorage.getItem(key);
	}

	static getStorageJsonData(key) {
		const data = localStorage.getItem(key) ? localStorage.getItem(key) : sessionStorage.getItem(key);
		return JSON.parse(data);
	}

	static getToken() {
		return localStorage.getItem(this.STORAGEKEY.access_token)
			? localStorage.getItem(this.STORAGEKEY.access_token)
			: sessionStorage.getItem(this.STORAGEKEY.access_token);
	}

	static getUserId() {
		return localStorage.getItem(this.STORAGEKEY.user_id)
			? localStorage.getItem(this.STORAGEKEY.user_id)
			: sessionStorage.getItem(this.STORAGEKEY.user_id);
	}

	static isUserAuthenticated() {
		return localStorage.getItem(this.STORAGEKEY.access_token) !== null || sessionStorage.getItem(this.STORAGEKEY.access_token) !== null;
	}

	static deauthenticateUser() {
        Object.keys(this.STORAGEKEY).forEach(key=>{
            this.deleteKey(key);
        })
	}

	static deleteKey(key) {
		localStorage.removeItem(key);
		sessionStorage.removeItem(key);
	}
}

export default AuthStorage;
