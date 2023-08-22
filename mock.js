if (!window.lightdm) {

	function Prompt(name) {
		this.type = name;
		this.func = null;
	}
	Prompt.prototype = {};
	Prompt.prototype.connect = function(func) {
		this.func = func;
	};
	Prompt.prototype.print = function(text, type) {
		switch (this.type) {
			case "show_prompt":
				show_prompt(text, type);
				break;
			case "show_error":
				show_error(text, type);
				break;
			case "authentication_complete":
				authentication_complete(text, type);
				break;
		}
	};
	

	window.lightdm = {};

	lightdm.hostname = "test-host";

	lightdm.sessions= [
		{ name: "GNOME", key: "gnome" },
		{ name: "Plasma (X11)", key: "plasma" },
		{ name: "Cinnamon", key: "cinnamon" },
		{ name: "Xfce Session", key: "xfce" },
		{ name: "MATE", key: "mate" }
	];

	lightdm.users = [
		{ username: "demo_user", display_name: "DemoUser", image :"images/default-profile.svg", session: 'cinnamon' },
		{ username: "user_2", display_name: "User2", image :"images/default-profile.svg", session: 'gnome' }
	];

	lightdm.show_prompt = new Prompt("show_prompt");
	lightdm.show_error = new Prompt("show_error");
	lightdm.authentication_complete = new Prompt("authentication_complete");

	lightdm.default_pw = "toor";
	lightdm.input = {};
	lightdm.authenticate = function() {
		lightdm.show_prompt.func("id", 0);
		lightdm.show_prompt.func("password", 1);
		lightdm.authentication_complete.func();
	};

	lightdm.respond = function(input) {
		if(lightdm.input.id) {
			lightdm.input.pw = input;
		} else {
			lightdm.input.id = input;
		}
	};

	lightdm.start_session = function(key) {
		if (lightdm.input.pw == lightdm.default_pw) {
			alert("Login Succeed.");
		} else {
			alert("Login Failed.");
		}
		lightdm.input = {};
	};
	

	lightdm.suspend = function() {
		alert("System Suspended.");
		document.location.reload(true);
	};

	lightdm.hibernate = function() {
		alert("System Hibernated.");
		document.location.reload(true);
	};

	lightdm.restart = function() {
		alert("System restart.");
		document.location.reload(true);
	};

	lightdm.shutdown = function() {
		alert("System Shutdown.");
		document.location.reload(true);
	};
}
