<script lang="ts" setup>
import UiForm from "../UiForm/index.vue";
import UiInput from "../UiInput/index.vue";
import Button from "../Button/index.vue";
import UiSelect from "../UiSelect/index.vue";
import { reactive } from "vue";
import { 
  getFirestore, collection, addDoc
   } from "firebase/firestore";

import firebaseApp from "../../../firebaseInit";


const db = getFirestore(firebaseApp);

const addToWaitlist = async (
  name: string , email: string, location: string,
  availability: string, rooms: string, phone: string,
  managerNumber: string
) => {
  try {
    const docRef = await addDoc(collection(db, 'waitlist'), {
      name: name,
      email: email,
      location: location,
      availability: availability,
      rooms: rooms,
      phone: phone,
      managerNumber: managerNumber
    });
    alert("Submitted!");
  } catch(e) {
    alert("Failed to submit!")
  }
}

const roomsSelect = [
  { label: "", value: "" },
  { value: "studio", label: "Studio Apartment"},
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  // { value: "5 - 10", label: "5 - 10" },
  // { value: "11 - 20", label: "11 - 20" },
];

const availabilitySelect = [
  { label: "", value: "" },
  { value: "not-available", label: "Not available" },
  { value: "available", label: "Available" },
];

const formModel = reactive({
  name: "",
  email: "",
  phone: "",
  location: "",
  rooms: "",
  availability: "",
  managerNumber: "",
});
</script>

<template>
  <section class="p-4 lg:p-8">
    <h2 class="font-bold text-lg lg:text-2xl mt-2 lg:mt-4">
      Join the waitlist
    </h2>

    <UiForm
      name="joinList"
      action="."
      class="max-w-sm lg:max-w-lg mx-auto grid gap-y-5 lg:gap-y-8 mt-4 lg:mt-12"
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

      <Button type="submit" class="my-4" v-on:click="
        addToWaitlist(
        formModel.name,
        formModel.email,
        formModel.location,
        formModel.availability,
        formModel.rooms,
        formModel.phone,
        formModel.managerNumber
      )">
         Submit 
      </Button>
    </UiForm>
  </section>
</template>
