<template>
  <thead>
    <tr>
      <th width="60%">Interface Display</th>
      <th>Interface Introduction</th>
    </tr>
  </thead>
  <tbody>
    <tr v-if="tab === 'tab3'">
      <td class="images">
        <img style="width: 50%" src="/images/Venology_11.png" />
        <img style="width: 50%" src="/images/Venology_12.png" />
      </td>
      <td>
        <b>Loading Page & Login Menu</b><br /><br />
        ◆ Flexible sign-in options: Choose from Email, Google, or Facebook login
        to access features quickly and securely<br />
      </td>
    </tr>
    <tr v-if="tab === 'tab3'">
      <td class="images">
        <img style="width: 50%" src="/images/Venology_7.png" />
        <img style="width: 50%" src="/images/Venology_8.png" />
      </td>
      <td>
        <b>Register Page & Login Page</b><br /><br />
        ◆ Record and store user information<br />
      </td>
    </tr>
    <tr v-if="tab === 'tab3'">
      <td class="images">
        <img style="width: 50%" src="/images/Venology_9.png" />
        <img style="width: 50%" src="/images/Venology_10.png" />
      </td>
      <td>
        <b>User Profile & Purchase History</b><br /><br />
        ◆ User can manage their personal information in User Profile Page,
        including their transaction history, mobile payment, online wallet, and
        more<br />
      </td>
    </tr>
    <tr v-if="tab === 'tab4'">
      <td class="images">
        <img style="width: 50%" src="/images/Venology_1.png" />
        <img style="width: 50%" src="/images/Venology_2.png" />
      </td>
      <td>
        <b>Vending Machine Map & Vending Machine Products</b><br /><br />
        ◆ On this page, user can use the map to locate vending machine and find
        those near them <br /><br />
        ◆ By clicking on a vending machine, they can view the products inside
        it, along with information about each product, such as inventory,
        prices, etc<br />
      </td>
    </tr>
    <tr v-if="tab === 'tab4'">
      <td class="images">
        <img style="width: 50%" src="/images/Venology_3.png" />
        <img style="width: 50%" src="/images/Venology_4.png" />
      </td>
      <td>
        <b>Mobile Payments & Online Wallet</b><br /><br />
        ◆ Venology App allows users to store online payment cards<br /><br />
        ◆ Users can also add funds to their online wallet<br /><br />
        ◆ Both can avoid situations where they do not have enough change or
        large bills that cannot be accpeted at vending machine<br />
      </td>
    </tr>
    <tr v-if="tab === 'tab5'">
      <td class="images">
        <img style="width: 50%" src="/images/Venology_5.png" />
        <img style="width: 50%" src="/images/Venology_6.png" />
      </td>
      <td>
        <b>New Arrivals & News</b><br /><br />
        ◆ Vending machine operators use Venology App to push the latest and
        promotional information to users, boosting vending machine sales<br />
      </td>
    </tr>
    <tr v-if="tab === 'tab5'">
      <td class="images">
        <img style="width: 50%" src="/images/Venology_13.png" />
        <img style="width: 50%" src="/images/Venology_14.png" />
      </td>
      <td>
        <b>System Annoucements & Contact Us</b><br /><br />
        ◆ System Announcements allow users to access the latest updates, such as notifications about specific machine maintenance or outages.<br /><br />
        ◆ Reach out for support, provide feedback, or ask any questions. Users' insights help operators identify areas for improvement<br />
      </td>
    </tr>
  </tbody>
</template>
<script>
export default {
  props: {
    tab: {
      type: String,
      required: true,
    },
  },
};
</script>
<style>
.background_info {
  border: 3px solid #6a3e37;
}
thead tr {
  background: #ead7c4;
}
.images {
  /* width: 100%; */
  display: flex;
  flex-direction: row;
}
.images img {
  border: 2px solid #6a3e37;
}
</style>
