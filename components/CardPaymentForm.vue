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
            <div class="text-2xl">💳</div>
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
              🗑️
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
            <span v-if="paymentStore.cardBrand === 'Visa'">💳</span>
            <span v-else-if="paymentStore.cardBrand === 'Mastercard'">💳</span>
            <span v-else-if="paymentStore.cardBrand === 'Amex'">💳</span>
            <span v-else>💳</span>
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
        <span>🔒</span>
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
