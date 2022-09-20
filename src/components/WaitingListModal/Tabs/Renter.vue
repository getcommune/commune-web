<script lang="ts" setup>
import UiForm from "../../UiForm/index.vue";
import UiInput from "../../UiInput/index.vue";
import Button from "../../Button/index.vue";

import axios from "axios";
import { reactive, ref, watch } from "vue";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import firebaseApp from "../../../../firebaseInit";
import RadioGroup from "../../RadioGroup/index.vue";
import Radio from "../../Radio/index.vue";

const PUBKEY = import.meta.env.VITE_EMAILJS1_PUBKEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_WAITLIST_TEMPLATE_ID;
const ZEPTO_TEMPLATE_KEY = import.meta.env.VITE_MAIL_TEMPLATE_KEY;

const emits = defineEmits(["form-submitted", "submit-error"]);

const db = getFirestore(firebaseApp);
const loading = ref(false);
const $toast = useToast();
const radioGroup = ref<["true" | "false"]>(["true"]);

const initialState = {
  name: "",
  email: "",
  phone: "",
  managerNumber: "",
};

const formModel = reactive({ ...initialState });

const addToRenterWaitlist = async () => {
  try {
    loading.value = true;

    const { name, email, phone, managerNumber } =
      formModel;

    const radioGroupValue = radioGroup.value[0] === "true";
    const url = "https://zepto-commune.herokuapp.com/api/send_welcome_mail";

    await addDoc(collection(db, "renter_waitlist"), {
      name,
      email,
      phone,
      managerNumber,
    });
    emits("form-submitted");
    $toast.success("You're in!", {
      position: "top",
      duration: 5000,
    });

    const data = {
      bounce_address: "welcome@bounce.getcommune.co",
      mail_template_key: ZEPTO_TEMPLATE_KEY,
      from_address: "archibong@getcommune.co",
      from_name: "Charles Effiom",
      to_address: email,
      to_name: name,
    };

    axios
      .post(url, data)
      .then(() => {}) // TODO
      .catch(() => {});

    try {
      emailjs.send(SERVICE_ID, TEMPLATE_ID, formModel, PUBKEY).then(
        function (response) {},
        function (error) {}
      );
    } catch (e) {
      emits("submit-error");
    }
  } catch (e) {
    emits("submit-error");
  } finally {
    loading.value = false;
    Object.assign(formModel, initialState);
  }
};
</script>

<template>
  <section class="p-4 lg:p-8 pt-2 lg:pt-4">
    <UiForm
      v-slot="{ submit }"
      name="joinList"
      action="."
      class="max-w-sm lg:max-w-lg mx-auto grid gap-y-5 lg:gap-y-8 mt-4 lg:mt-4 min-w-[100%]"
      @submit-form="addToRenterWaitlist"
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
        v-model="formModel.managerNumber"
        label="Landlord/Manager's Phone"
        placeholder="Refer a homeowner"
        type="tel"
      />

      <div>
        <legend
          class="font-semibold mb-3 mt-2 text-l lg:text-1xl lg:mt-0 opacity-70"
        >
          Would you like to receive email alerts from us?
        </legend>

        <RadioGroup
          v-model="radioGroup"
          :option="['true', 'false']"
          #default="{ items }"
          :initial="'true'"
          tag="ul"
          class="grid gap-y-4"
        >
          <li
            v-for="({ attrs, item }, index) in items"
            :key="item"
            class="flex items-center space-x-4"
          >
            <Radio v-bind="attrs">
              <template #append="{ id }">
                <label :for="id">
                  {{
                    index === 0
                      ? "Yes, please"
                      : "No, I don't want to receive emails"
                  }}
                </label>
              </template>

              <template #default="{ active, id, item }">
                <div
                  class="fill-before relative before:bg-primary-base dark:before:bg-primary-base-d rounded-full h-3 w-3 transition-shadow before:transition-transform ring-offset-1 dark:ring-offset-surface-d"
                  :class="{
                    'ring-black/40 dark:ring-white/40 ring-1 before:scale-0':
                      !active,
                    'ring-2 ring-primary-base/80 dark:ring-primary-base-d/80':
                      active,
                  }"
                >
                  <input
                    :id="id"
                    type="radio"
                    :checked="active"
                    class="sr-only"
                    :value="item === 'true' ? 'Accept' : 'Decline'"
                  />
                </div>
              </template>
            </Radio>
          </li>
        </RadioGroup>
      </div>
      <Button type="submit" class="my-4" :loading="loading" @click="submit">
        Sign Up
      </Button>
    </UiForm>
  </section>
</template>