<template>
  <div class="body-container-with-nav user-account">
    <div class="user-account__initial">
      <b>{{userInitial}}</b>
    </div>

    <div class="user-account__info">
      <strong>{{userFirstName}} {{userLastName}}</strong>
      <br/>
      <p>{{userEmail}}</p>
      <hr />
      
      <h5 class="mt-5"><strong>Existing discount codes</strong></h5>
      <p>{{discountcode}}</p>

      <h5 class="mt-5"><strong>Existing Credit Cards</strong></h5>

      <div class="user-account__width-sm" v-if="newCard">
        <hr />
        <strong>{{newCard}}</strong>
        <img alt="credit-card" src="../../assets/icons/credit-card.png" />
        <b-icon-file-excel @click="deleteCard()" class="float-right delete-icon"></b-icon-file-excel>
        <hr />
      </div>

      <b-button squared variant="outline-secondary" @click="showModal=true">
        <b-icon-plus></b-icon-plus> Add a new Card
      </b-button>
    </div>

    <b-modal class="text-center" v-model="showModal" id="purchase" hide-footer hide-header centered>
      <NewCreditCard @add-clicked="addCard()" :addNew="true" />
    </b-modal>
    <router-view />
  </div>
</template>

<script>
import NewCreditCard from '@/components/payment/new-credit-card.vue';

export default {
  name: "user-account",
  data() {
    return {
      userInitial: null,
      userFirstName: null,
      userLastName: null,
      userEmail: null,
      showModal: false,
      newCard: null,
      discountcode: localStorage.discountCode ? localStorage.discountCode : '-'
    }
  },

  components: {
    NewCreditCard
  },

  methods: {
    addCard() {
      localStorage.setItem('newCreditCard', "**** **** **** 2222 08/24");
      this.newCard = localStorage.getItem('newCreditCard');
    },

    deleteCard() {
      localStorage.removeItem("newCreditCard");
      this.newCard = false;
    }
  },

  async created() {
    const userRes = await fetch("user.json");
    const user = JSON.parse(localStorage.getItem('newUserObject')) ? JSON.parse(localStorage.getItem('newUserObject')) : await userRes.json();
    this.userInitial = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
    this.userEmail = user.email;
    this.userFirstName = user.firstName;
    this.userLastName = user.lastName;
  }
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';

.user-account {
  margin: 1em;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
    margin: 2em;
  }
}

.user-account__initial {
    background-color: #F2E9FF;
    border-radius: 50%;
    padding: 1em 0.4em;
    font-size: 24px;
    width: 90px;
    text-transform: uppercase;
    text-align: center;
    margin: 0 auto;

    @media (min-width: 768px) {
      margin-left: 2.5em;
    }
}

.user-account__info {
  font-size: 22px;
  margin-top: 2em;

  @media (min-width: 768px) {
    margin-left: 2em;
  }
}

.user-account__width-sm {
  width: 100%;
  padding: 0 1em;

  @media (min-width: 768px) {
    width: 50%;
    padding: 0;
  }
}

.delete-icon:hover {
  cursor: pointer;
}
</style>