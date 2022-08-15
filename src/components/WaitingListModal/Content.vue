<script lang="ts" setup>
import UiForm from "../UiForm/index.vue";
import UiInput from "../UiInput/index.vue";
import Button from "../Button/index.vue";
import UiSelect from "../UiSelect/index.vue";

import { reactive, defineComponent, onMounted, onUnmounted, ref } from "vue";

import { getFirestore, collection, addDoc } from "firebase/firestore";
import VueGoogleAutocomplete from "vue-google-autocomplete";

import firebaseApp from "../../../firebaseInit";

const emits = defineEmits(["form-submitted", "submit-error"]);

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

onMounted(() => {
  var autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete") as HTMLInputElement
  );
})
</script>

<script lang="ts">
  export default defineComponent({
    components: { VueGoogleAutocomplete },

    data: function() {
      return {
        address: null,
      };
    },
    onMounted() {
      (this.$refs.address as HTMLElement).focus();
    },
    methods: {
      /**
         * When the location found
         * @param {Object} addressData Data of the found location
         * @param {Object} placeResultData PlaceResult object
         * @param {String} id Input container ID
         */
      getAddressData: ((addressData: HTMLElement, placeResultData: any, id: any) => {
        // @ts-ignore
        this.address = addressData;
      })
    }
  })
</script>

<template>
  <section class="p-4 lg:p-8">
    <h2 class="font-bold text-lg lg:text-2xl mt-2 lg:mt-4">
    </h2>
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

      <UiInput
        id="autocomplete"
        v-model="formModel.location"
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
         Submit 
      </Button>
    </UiForm>
  </section>
</template>
