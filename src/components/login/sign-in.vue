<template>
  <div class="body-container-with-nav">
    <div class="icon-container">
      <img class="icon-container__icon" alt="login" src="assets/svg/login.svg" />
    </div>
    <div class="form-container">
      <form>
          <h3>Sign In</h3>

          <b-container class="bv-example-row">
            <b-row>
              <b-col md="12">
                <input v-model="userNameInput"
                  type="email"
                  placeholder="Email"
                  :class="['form-control form-control-lg form-control--no-border', {'is-invalid' : signInErrorMessage}]" required />
                <div class="invalid-feedback" v-if="signInErrorMessage">{{signInErrorMessage}}</div>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="12">
                <input v-model="passwordInput"
                  type="password"
                  placeholder="Password"
                  :class="['form-control form-control-lg form-control--no-border', {'is-invalid' : signInErrorMessage}]" required />
                <div class="invalid-feedback" v-if="signInErrorMessage">{{signInErrorMessage}}</div>
              </b-col>
            </b-row>
          </b-container>

          <button type="button" @click="signInClicked()" class="form-container__btn btn btn-primary btn-lg btn-block mt-4">Sign In</button>

          <p class="mt-4 mb-2">
            Don’t have an account?
            <router-link class="form-container__link" to="/sign-up">Create one!</router-link>
          </p>
          <router-link class="form-container__link mt-5" :to="{ path: '/sign-up', query: { forgotPassword: true }}">Forgot my password</router-link>
      </form>
    </div>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "sign-in",
    data() {
      return {
        userNameInput: null,
        passwordInput: null,
        error: false
      }
    },

    computed: {
      signInErrorMessage() {
        return this.error ? "Invalid email or password. Please try again!" : null;
      }
    },

    methods: {
      signInClicked() {
        const newUserAccount = JSON.parse(localStorage.getItem('newUserObject'));
        if ((newUserAccount && this.userNameInput === newUserAccount.email && this.passwordInput === newUserAccount.password) ||
            (this.userNameInput === this.user[0].email && this.passwordInput === this.user[0].password)) {
          window.location.href = "/explore-splash-page";
          localStorage.userName = newUserAccount !== null ? newUserAccount.firstName : this.user[0].firstName;
        } else {
          this.error = true;
        }

        return false;
      },
      async fetchUserDetails () {
        const userRes = await fetch("user.json");
        this.user = await userRes.json();
      }
    },
    created() {
      this.fetchUserDetails();
    }
  }
</script>
<style lang="scss">
@import '../../scss/variables.scss';

.icon-container {
  text-align: right;

  @media (min-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.icon-container__icon {
  width: 60%;

  @media (min-width: 768px) {
    width: 100%;
  }
}

.form-container {
  width: 100%;
  padding-bottom: 1em;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 35%;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    padding-bottom: 0;
  }
}

.form-container__btn {
  width: 60%;
}

.form-container__link {
  text-decoration: underline;
  font-weight: bold;
  color: black;
  margin: 0 0.5em;
  padding-top: 1em;
  cursor: pointer;
}
</style>