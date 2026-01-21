<template>
  <div class="space-y-4">
    <!-- Saved Cards -->
    <div v-if="paymentStore.hasSavedCards" class="mb-6">
      <h4 class="text-sm font-medium text-gray-400 mb-3">Saved Cards</h4>
      <div class="space-y-2">
        <button
          v-for="card in paymentStore.savedCards"
          :key="card.id"
          @click="selectSavedCard(card)"
          :class="[
            'w-full flex items-center justify-between p-4 rounded-lg border transition-all',
            selectedCardId === card.id
              ? 'border-astro-purple bg-astro-purple/10'
              : 'border-white/10 bg-astro-bg hover:border-white/20'
          ]"
        >
          <div class="flex items-center gap-3">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
            <div class="text-left">
              <p class="text-white font-medium">{{ card.brand }} •••• {{ card.last4 }}</p>
              <p class="text-xs text-gray-500">Expires {{ card.expiryDate }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="card.isDefault" class="text-xs bg-astro-teal/20 text-astro-teal px-2 py-1 rounded">Default</span>
            <button
              @click.stop="removeSavedCard(card.id)"
              class="text-gray-500 hover:text-red-400 transition-colors p-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </button>
      </div>
      
      <button
        @click="useNewCard = !useNewCard"
        class="mt-3 text-sm text-astro-teal hover:text-astro-purple transition-colors"
      >
        {{ useNewCard ? '← Use saved card' : '+ Use new card' }}
      </button>
    </div>

    <!-- New Card Form -->
    <div v-if="!paymentStore.hasSavedCards || useNewCard" class="space-y-4">
      <!-- Card Number -->
      <div>
        <label class="block text-sm font-medium text-gray-400 mb-2">Card Number</label>
        <div class="relative">
          <input
            v-model="cardNumber"
            @input="handleCardNumberInput"
            type="text"
            maxlength="19"
            placeholder="1234 5678 9012 3456"
            class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-astro-purple transition-colors font-mono"
          />
          <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
          </div>
        </div>
        <p v-if="cardNumber && !paymentStore.isCardNumberValid" class="text-xs text-red-400 mt-1">
          Invalid card number
        </p>
      </div>

      <!-- Card Holder -->
      <div>
        <label class="block text-sm font-medium text-gray-400 mb-2">Card Holder Name</label>
        <input
          v-model="cardHolder"
          @input="handleCardHolderInput"
          type="text"
          placeholder="JOHN DOE"
          class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors uppercase"
        />
      </div>

      <!-- Expiry & CVV -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Expiry Date</label>
          <input
            v-model="expiryDate"
            @input="handleExpiryInput"
            type="text"
            maxlength="5"
            placeholder="MM/YY"
            class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors font-mono"
          />
          <p v-if="expiryDate && !paymentStore.isExpiryValid" class="text-xs text-red-400 mt-1">
            Invalid date
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">CVV</label>
          <input
            v-model="cvv"
            @input="handleCvvInput"
            type="text"
            maxlength="4"
            placeholder="123"
            class="w-full bg-astro-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-astro-purple transition-colors font-mono"
          />
          <p v-if="cvv && !paymentStore.isCvvValid" class="text-xs text-red-400 mt-1">
            Invalid CVV
          </p>
        </div>
      </div>

      <!-- Save Card Checkbox -->
      <div class="flex items-center gap-2">
        <input
          v-model="saveCard"
          @change="handleSaveCardChange"
          type="checkbox"
          id="save-card"
          class="w-4 h-4 rounded border-white/10 bg-astro-bg text-astro-purple focus:ring-astro-purple focus:ring-offset-0"
        />
        <label for="save-card" class="text-sm text-gray-400 cursor-pointer">
          Save card for future purchases
        </label>
      </div>
    </div>

    <!-- Security Notice -->
    <div class="mt-4 p-3 bg-astro-teal/10 border border-astro-teal/30 rounded-lg">
      <p class="text-astro-teal text-xs flex items-center gap-2">
        <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
        </svg>
        <span>Your payment information is encrypted and secure</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePaymentStore } from '~/stores/payment';
import { useToastStore } from '~/stores/toast';

const paymentStore = usePaymentStore();
const toastStore = useToastStore();

const useNewCard = ref(false);
const selectedCardId = ref<string | null>(null);

const cardNumber = computed({
  get: () => paymentStore.cardDetails.cardNumber,
  set: (value) => paymentStore.updateCardDetails({ cardNumber: value })
});

const cardHolder = computed({
  get: () => paymentStore.cardDetails.cardHolder,
  set: (value) => paymentStore.updateCardDetails({ cardHolder: value })
});

const expiryDate = computed({
  get: () => paymentStore.cardDetails.expiryDate,
  set: (value) => paymentStore.updateCardDetails({ expiryDate: value })
});

const cvv = computed({
  get: () => paymentStore.cardDetails.cvv,
  set: (value) => paymentStore.updateCardDetails({ cvv: value })
});

const saveCard = computed({
  get: () => paymentStore.cardDetails.saveCard,
  set: (value) => paymentStore.updateCardDetails({ saveCard: value })
});

const handleCardNumberInput = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const formatted = paymentStore.formatCardNumber(input.value);
  cardNumber.value = formatted;
};

const handleCardHolderInput = (e: Event) => {
  const input = e.target as HTMLInputElement;
  cardHolder.value = input.value.toUpperCase();
};

const handleExpiryInput = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const formatted = paymentStore.formatExpiryDate(input.value);
  expiryDate.value = formatted;
};

const handleCvvInput = (e: Event) => {
  const input = e.target as HTMLInputElement;
  cvv.value = input.value.replace(/\D/g, '');
};

const handleSaveCardChange = () => {
  // 可以在这里添加额外的逻辑
};

const selectSavedCard = (card: any) => {
  selectedCardId.value = card.id;
  useNewCard.value = false;
  
  // 填充卡片信息（除了CVV）
  paymentStore.updateCardDetails({
    cardNumber: `•••• •••• •••• ${card.last4}`,
    cardHolder: '',
    expiryDate: card.expiryDate,
    cvv: '',
    saveCard: false
  });
};

const removeSavedCard = (cardId: string) => {
  paymentStore.removeSavedCard(cardId);
  toastStore.success('Card removed successfully');
  
  if (selectedCardId.value === cardId) {
    selectedCardId.value = null;
    paymentStore.resetPayment();
  }
};
</script>
