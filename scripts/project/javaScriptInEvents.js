

const scriptsInEvents = {

	async Main_Event2_Act1(runtime, localVars)
	{
		function loadScript(url) {
		  return new Promise((resolve, reject) => {
		    const script = document.createElement('script');
		    script.src = url;
		    script.onload = () => resolve();
		    script.onerror = () => reject(new Error('Falha ao carregar ' + url));
		    document.head.appendChild(script);
		  });
		}
		
		(async () => {
		  try {
		    // Carrega os scripts do Firebase
		    await loadScript('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
		    await loadScript('https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js');
		    await loadScript('https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js');
		
		    const firebaseConfig = {
		      apiKey: "AIzaSyD521T7eSh9IRBlf54sTkzoForl5vlVyfE",
		      authDomain: "wallet-8d246.firebaseapp.com",
		      databaseURL: "https://wallet-8d246-default-rtdb.firebaseio.com",
		      projectId: "wallet-8d246",
		      storageBucket: "wallet-8d246.firebasestorage.app",
		      messagingSenderId: "753514065210",
		      appId: "1:753514065210:web:88b04135e22a1d0dd0f403"
		    };
		
		    // Inicializa Firebase
		    firebase.initializeApp(firebaseConfig);
		    window.auth = firebase.auth();
		    window.database = firebase.database();
		    window.provider = new firebase.auth.GoogleAuthProvider();
		
		    // Tenta chamar função no Construct quando runtime estiver pronto
		    window.tentarAtualizar = function (email, tokens) {
		      if (window.runtime && typeof window.runtime.callFunction === "function") {
		        window.runtime.callFunction("atualizarUsuario", email, tokens);
		      } else {
		        setTimeout(() => window.tentarAtualizar(email, tokens), 100);
		      }
		    };
		
		    // Tenta limpar UI caso usuário não esteja logado
		    window.tentarLimparUI = function () {
		      if (window.runtime && typeof window.runtime.callFunction === "function") {
		        window.runtime.callFunction("limparUI");
		      } else {
		        setTimeout(window.tentarLimparUI, 100);
		      }
		    };
		
		    // Atualiza a UI com dados do banco
		    window.atualizarUIUsuario = function (user) {
		      const uid = user.uid;
		      const email = user.email;
		
		      const userRef = window.database.ref('users/' + uid);
		      userRef.once('value').then(snapshot => {
		        let tokens = 0;
		        if (snapshot.exists()) {
		          tokens = snapshot.val().tokens || 0;
		        } else {
		          userRef.set({ tokens: 0 });
		        }
		        window.tentarAtualizar(email, tokens);
		      }).catch(error => {
		        console.error("Erro ao buscar tokens:", error);
		      });
		    };
		
		    // Cria dados do usuário se ainda não existirem
		    window.carregarOuCriarUsuario = function (uid) {
		      const userRef = window.database.ref('users/' + uid);
		      userRef.once('value').then(snapshot => {
		        if (!snapshot.exists()) {
		          userRef.set({ tokens: 0 });
		        }
		      }).catch(error => {
		        console.error("Erro ao acessar dados do usuário:", error);
		      });
		    };
		
		    // Login com Google
		    window.loginWithGoogle = function () {
		      window.auth.signInWithPopup(window.provider)
		        .then(result => {
		          const user = result.user;
		          console.log("Usuário logado:", user.uid, user.email);
		          carregarOuCriarUsuario(user.uid);
		          atualizarUIUsuario(user);
		        })
		        .catch(error => {
		          console.error("Erro no login:", error);
		        });
		    };
		
		    // Observa estado do login
		    window.auth.onAuthStateChanged(user => {
		      if (user) {
		        console.log("Usuário já logado:", user.uid, user.email);
		        carregarOuCriarUsuario(user.uid);
		        atualizarUIUsuario(user);
		      } else {
		        console.log("Usuário não está logado");
		        window.tentarLimparUI();
		      }
		    });
		
		    console.log("Firebase carregado e pronto!");
		  } catch (err) {
		    console.error("Erro ao carregar Firebase:", err);
		  }
		})();
		
	},

	async Main_Event3_Act1(runtime, localVars)
	{
		loginWithGoogle();
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
