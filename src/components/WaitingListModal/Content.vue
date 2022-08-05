<script lang="ts" setup>
import UiForm from "../UiForm/index.vue";
import UiInput from "../UiInput/index.vue";
import Button from "../Button/index.vue";
import UiSelect from "../UiSelect/index.vue";
import { reactive } from "vue";

const roomsSelect = [
  { label: "", value: "" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5 - 10", label: "5 - 10" },
  { value: "11 - 20", label: "11 - 20" },
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
      Join the waiting list
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
      />

      <UiInput
        v-model="formModel.email"
        label="Email"
        type="email"
        placeholder="markhillary@gmail.com"
      />

      <UiInput
        v-model="formModel.phone"
        label="Phone Number"
        placeholder="08000000000"
        type="tel"
      />

      <UiInput
        v-model="formModel.location"
        label="Apartment Location"
        placeholder="Lekki Phase 1"
      />

      <UiSelect
        v-model="formModel.rooms"
        label="Total Number of rooms"
        placeholder="5 - 10"
      >
        <template #options>
          <option
            v-for="option in roomsSelect"
            :key="option.value"
            :selected="formModel.rooms === option.value"
            :value="option.value"
            :label="option.label"
          >
            {{ option.label }}
          </option>
        </template>
      </UiSelect>

      <UiSelect
        v-model="formModel.availability"
        label="Avaible for Rent"
        placeholder="Available"
      >
        <template #options>
          <option
            v-for="option in availabilitySelect"
            :key="option.value"
            :selected="formModel.availability === option.value"
            :value="option.value"
            :label="option.label"
          >
            {{ option.label }}
          </option>
        </template>
      </UiSelect>

      <UiInput
        v-model="formModel.managerNumber"
        label="Landlords/Managers No."
        placeholder="08000000000"
        type="tel"
      />

      <Button type="submit" class="my-4"> Submit </Button>
    </UiForm>
  </section>
</template>
