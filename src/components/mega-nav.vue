<template>
  <div class="mega-nav">
    <div class="logo-container">
      <img class="logo" alt="logo" src="../../public/assets/icons/logo.png" />
    </div>

    <b-nav vertical class="mega-nav__container w-25">
      <b-nav-item class="mega-nav__item mega-nav__item--first" to="/explore">
        <div class="mega-nav__item-content-info">
          <b-icon icon="compass" class="mega-nav__item-icon"></b-icon>
          <span class="mega-nav__item-text">Explore</span>
        </div>
      </b-nav-item>
      <b-nav-item class="mega-nav__item" to="/vouchers">
        <div class="mega-nav__item-content-info">
          <b-icon-file-medical class="mega-nav__item-icon"></b-icon-file-medical>
          <span class="mega-nav__item-text">Vouchers</span>
        </div>
      </b-nav-item>
      <b-nav-item class="mega-nav__item" to="/updates">
        <div class="mega-nav__item-content-info">
          <b-icon-bell-fill class="mega-nav__item-icon"></b-icon-bell-fill>
          <span class="mega-nav__item-text">Updates</span>
        </div>
      </b-nav-item>
      <b-nav-item class="mega-nav__item" :to="accountLink">
        <div class="mega-nav__item-content-info">
          <b-icon-file-person class="mega-nav__item-icon"></b-icon-file-person>
          <span class="mega-nav__item-text">{{accountTitle}}</span>
        </div>
      </b-nav-item>

      <b-nav-item class="mega-nav__item mega-nav__item--last-item" v-if="isUserLoggedIn">
        <div class="mega-nav__item-content-info" @click="logout()">
          <b-icon-door-open class="mega-nav__item-icon"></b-icon-door-open>
          <span class="mega-nav__item-text">Log out</span>
        </div>
      </b-nav-item>
    </b-nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "mega-nav",
  data() {
    return {
      isUserLoggedIn: localStorage.userName ? true : false
    }
  },

  computed: {
    accountTitle() {
      return localStorage.userName ? localStorage.userName : 'Account';
    },
    accountLink() {
      return localStorage.userName ? '/user-account' : '/sign-in';
    }
  },

  methods: {
    logout() {
      localStorage.removeItem("userName");
      window.location.href = '/sign-in';
    }
  }
};
</script>

<style lang="scss" scoped>
.logo-container {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  background-color: white;
  width: 100%;
  z-index: 100;

  @media (min-width: 768px) {
    width: 16%;
  }
}

.logo {
  float: left;
  margin-left: 0.5em;

  @media (min-width: 1200px) {
    position: absolute;
    left: 1.5em;
    margin-bottom: 3em;
    top: 0.5em;
    width: 140px;
  }

  @media (min-width: 1400px) {
    left: 3em;
  }
}

.mega-nav__container {
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.1em 0;
  background-color: black;
  width: 100% !important;
  flex-wrap: nowrap;
  flex-direction: row !important;
  font-size: 1.2em;
  z-index: 100;

  @media (min-width: 768px) {
    flex-flow: column;
    width: 200px;
    margin-right: 85%;
    height: 100%;
    transition: all 0.3s;
    width: 16% !important;
    flex-wrap: wrap;
    flex-direction: column !important;
    background-color: rgba(114, 34, 245, 0.03);
    font-size: 1.1em;
  }
}

.mega-nav__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  text-align: center;

  @media (min-width: 768px) {
    flex-grow: unset;
    padding: 0.5em 0;
    text-align: left;
  }

  &:hover {
    .nav-link {
      @media (min-width: 768px) {
        margin-right: 2em;
        background-color: #F2E9FF;
      }
    }
  }

  &--first {
    @media (min-width: 768px) {
      padding-top: 5em;
    }
  }

  &--last-item {
    @media (min-width: 768px) {
      position: absolute;
      bottom: 0;
      right: 0;

      &:hover {
        .nav-link {
          margin: 0;
        }
      }
    }
  }
}

.router-link-exact-active {
  @media (min-width: 768px) {
    margin-right: 2em;
    background-color: #F2E9FF;
  }

  .mega-nav__item-icon,
  .mega-nav__item-text {
    color: white;
    display: block;

    @media (min-width: 768px) {
      color: #421EB7;
    }
  }
}

.mega-nav__item-content-info {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    margin-left: 0.4em;
    padding: 0.5em 0;
  }
}

.mega-nav__item-icon,
.mega-nav__item-text {
  color:rgba(255, 255, 255, 0.5);
  margin: 0 auto 0.4em;

  @media (min-width: 768px) {
    color: #00160A;
    margin: unset;
  }
}

.mega-nav__item-text {
  display: none;
  font-size: 0.7em;

  @media (min-width: 768px) {
    margin-left: 10px;
    display: block;
    font-size: 1.1em;
    transform: translateY(-4px);
  }
}
</style>
