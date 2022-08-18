<script lang="ts" setup>
import UiForm from "../UiForm/index.vue";
import UiInput from "../UiInput/index.vue";
import Button from "../Button/index.vue";
import UiSelect from "../UiSelect/index.vue";

import { reactive, defineComponent, onMounted, onUnmounted, ref } from "vue";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { MapboxSearch, SearchSession, MapboxAutofill, SessionToken } from '@mapbox/search-js-core';
import emailjs from '@emailjs/browser';

import firebaseApp from "../../../firebaseInit";

const PK = import.meta.env.VITE_MAPBOX_PK;
const SK = import.meta.env.VITE_MAPBOX_SK;
const PUBKEY =  import.meta.env.VITE_EMAILJS1_PUBKEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_WAITLIST_TEMPLATE_ID;

const emits = defineEmits(["form-submitted", "submit-error"]);

const autofill = new MapboxAutofill({ accessToken: PK });
const sessionToken = new SessionToken();

const db = getFirestore(firebaseApp);
const loading = ref(false);

const addToWaitlist = async () => {
  try {
    loading.value = true;

    const { name, email, location, availability, rooms, phone, managerNumber } =
      formModel;

    await addDoc(collection(db, "waitlist"), {
      name,
      email,
      location,
      availability,
      rooms,
      phone,
      managerNumber
    });
    emits("form-submitted");
    try {
      emailjs.send(SERVICE_ID, TEMPLATE_ID, formModel, PUBKEY)
        .then(function(response) {
        }, function(error) {
        });
    } catch(e) {
      emits('submit-error');
    }
  } catch (e) {
    emits("submit-error");
  } finally {
    loading.value = false;
    Object.assign(formModel, initialState);
  }
};

const roomsSelect = [
  { label: "", value: "" },
  { value: "studio", label: "Studio Apartment" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

const availabilitySelect = [
  { label: "", value: "" },
  { value: "not-available", label: "Not available" },
  { value: "available", label: "Available" },
];

const initialState = {
  name: "",
  email: "",
  phone: "",
  location: "",
  rooms: "",
  availability: "",
  managerNumber: "",
}

let formModel = reactive({ ...initialState });


const autocomplete = async () => {
    // const result = await search.suggest('Washington D.C', {sessionToken});
    const fillResult = await autofill.suggest('Washington D.C', {sessionToken});

    if (fillResult.suggestions.length === 0) {
      console.log('LENGTH: 0');
      console.log(formModel.location);
    }

    const suggestion = fillResult.suggestions[1];
    const { features } = await autofill.retrieve(suggestion, { sessionToken });
    console.log(features);

    /*const suggestion = result.suggestions[0];
    if(search.canRetrieve(suggestion)) {
      const { features } = await autofill.retrieve(suggestion, { sessionToken })
      console.log('FEATURES: ', features);
    } else if (search.canSuggest(suggestion)) {
      await search.suggest('New York City', { sessionToken });
    }*/
  }

onMounted(() => {
  var autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete") as HTMLInputElement
  );
})
</script>

<template>
  <section class="p-4 lg:p-8">
    <div class="lg:max-w-[min(33rem,55%)] order-2 lg:order-1 px-4 lg:px-0">
      <h2 class="text-primary-base dark:text-[#6489d0] font-bold text-lg lg:text-2xl mt-2 lg:mt-4">
        Count Me In!
      </h2>
      <h1 class="font-light text-lg lg:text-2xl lg:mt-1">
        Get early access, news & updates.
      </h1>
    </div>
    
    <UiForm
      v-slot="{submit}"
      name="joinList"
      action="."
      class="max-w-sm lg:max-w-lg mx-auto grid gap-y-5 lg:gap-y-8 mt-4 lg:mt-12"
      @submit-form="addToWaitlist"
    >
      <UiInput
        v-model="formModel.name"
        label="Full name"
        placeholder="Mark Hillary"
        required
      />

      <UiInput
        v-model="formModel.email"
        label="Email"
        type="email"
        required
        placeholder="markhillary@gmail.com"
      />

      <UiInput
        v-model="formModel.phone"
        label="Phone"
        placeholder="08000000000"
        type="tel"
        required
      />
      <!--<form>
        <input type="text" autocomplete="street-address" />
      </form>-->

      <UiInput
        id="autocomplete"
        v-model="formModel.location"
        @change="autocomplete()"
        label="Apartment Location"
        placeholder="Lekki Phase 1"
        required
      />

      <UiSelect
        v-model="formModel.rooms"
        label="Total Number of rooms"
        placeholder="Choose one"
        required
      >
        <template #options>
          <option
            v-for="option in roomsSelect"
            :key="option.value"
            :selected="formModel.rooms === option.value"
            :value="option.value"
            :label="option.label"
            :disabled="!option.value"
          >
            {{ option.label }}
          </option>
        </template>
      </UiSelect>

      <UiSelect
        v-model="formModel.availability"
        label="Available for Rent"
        placeholder="Choose one"
      >
        <template #options>
          <option
            v-for="option in availabilitySelect"
            :key="option.value"
            :selected="formModel.availability === option.value"
            :value="option.value"
            :disabled="!option.value"
            :label="option.label"
          >
            {{ option.label }}
          </option>
        </template>
      </UiSelect>

      <UiInput
        v-model="formModel.managerNumber"
        label="Landlord/Manager's Phone"
        placeholder="If you're referring a homeowner to us"
        type="tel"
      />

      <Button type="submit" class="my-4" :loading="loading" @click="submit">
         I'm in!
      </Button>
    </UiForm>
  </section>
</template>
