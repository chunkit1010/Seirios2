<template>
  <div class="body-container-with-nav">
    <div class="icon-container">
      <img class="icon-container__icon" alt="sign up" src="../../assets/svg/sign-up.svg" />
    </div>
    <div class="form-container">
      <form v-if="isForgotPassword">
          <h3>Forgotten your password?</h3>
          <b-container class="bv-example-row">
              <b-row>
                  <b-col md="12">
                    <p>Please enter your email address and we'll send you instructions to reset your password.</p>
                    <input type="email" 
                      v-model="forgotPasswordEmailInput"
                      placeholder="Email"
                      :class="['form-control form-control-lg form-control--no-border', {'is-invalid' : forgotPasswordErrorMessage}]" required />
                    <div class="invalid-feedback" v-if="forgotPasswordErrorMessage">{{forgotPasswordErrorMessage}}</div> 
                  </b-col>
              </b-row>
          </b-container>

          <button type="button" class="form-container__btn btn btn-primary btn-lg btn-block mt-4" @click="directToSignIn">Continue</button>

          <p class="mt-4 mb-5">
            <router-link class="form-container__link" to="/sign-in">back to Login!</router-link>
          </p>
      </form>
      <form v-else>
          <h3>Resgister to explore</h3>
          
          <b-container class="bv-example-row">
              <b-row>
                  <b-col md="6">
                      <input v-model="firstNameInput"
                        placeholder="First name"
                        class="form-control form-control-lg form-control--no-border" required />
                  </b-col>
                  <b-col md="6">
                      <input v-model="lastNameInput"
                        placeholder="Last name"
                        class="form-control form-control-lg form-control--no-border" required />
                  </b-col>
              </b-row>

              <b-row>
                  <b-col md="12">
                      <input v-model="emailInput"
                        type="email"
                        placeholder="Email"
                        class="form-control form-control-lg form-control--no-border" required />
                  </b-col>
              </b-row>

              <b-row>
                  <b-col md="6">
                      <input v-model="passwordInput"
                        type="password"
                        placeholder="Password"
                        :class="['form-control form-control-lg form-control--no-border', {'is-invalid' : signUpErrorMessage}]" required />
                      <div class="invalid-feedback">{{signUpErrorMessage}}</div>  
                  </b-col>
                  <b-col md="6">
                      <input v-model="confirmPasswordInput"
                        type="password"
                        placeholder="Confirm password"
                        :class="['form-control form-control-lg form-control--no-border', {'is-invalid' : signUpErrorMessage}]" required />
                      <div class="invalid-feedback" v-if="signUpErrorMessage">{{signUpErrorMessage}}</div> 
                  </b-col>
              </b-row>
          </b-container>


          <button type="submit" @click.prevent="continueBtnClicked()" class="form-container__btn btn btn-primary btn-lg btn-block mt-4">Continue</button>

          <p class="mt-4 mb-2">
            Already have an accont?
            <router-link class="form-container__link" to="/sign-in">Login!</router-link>
          </p>
          <router-link class="form-container__link mt-5 mb-2" :to="{ path: '/sign-up', query: { forgotPassword: true }}">Forgot my password</router-link>
      </form>
    </div>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "sign-up",
    data() {
        return {
          forgotPasswordEmailInput: null,
          firstNameInput: null,
          lastNameInput: null,
          emailInput: null,
          passwordInput: null,
          confirmPasswordInput: null,
          forgotPasswordError: null,
          signUpError: null
        }
    },

    computed: {
      signUpErrorMessage() {
        return this.signUpError;
      },

      forgotPasswordErrorMessage() {
        return this.forgotPasswordError;
      },

      isForgotPassword() {
        return this.$route.query.forgotPassword;
      }
    },

    methods: {
      continueBtnClicked() {
        if (this.confirmPasswordInput !== this.passwordInput) {
          this.signUpError = "Passwords do not match.";
        } else {
          const newUserObject = {firstName: this.firstNameInput, lastName: this.lastNameInput, email: this.emailInput, password: this.passwordInput, location: "Eltham, 3095", city: "Melbourne, 3000"};
          localStorage.setItem('newUserObject', JSON.stringify(newUserObject));
          localStorage.userName = this.firstNameInput;
          window.location.href = "/explore-splash-page";
        }
      },

      directToSignIn() {
        if (this.forgotPasswordEmailInput) {
          window.location.href = "/sign-in";
        } else {
          this.forgotPasswordError = "Please enter an email.";
        }
      }
    }
  }
</script>
<style lang="scss">
@import '../../scss/variables.scss';
</style>
