<template>
  <div class="min-h-screen bg-base-200 flex flex-col items-center justify-start px-4 py-10">
    <div class="text-center mb-10">
      <h1 class="text-4xl font-bold mb-2">Willkommen 👋</h1>
      <p class="text-base-content text-lg max-w-xl mx-auto">
        Wir erstellen deine Packliste basierend auf deinen Angaben zur Reise. Füll einfach das Formular aus – wir kümmern uns um den Rest ✈️🧳
      </p>
    </div>

    <div class="w-full max-w-xl space-y-6">
      <div class="form-control">
        <label class="label mb-2">
          <span class="label-text font-semibold">🌍 Wohin geht die Reise?</span>
        </label>
        <input v-model="information.destination" type="text" class="input input-bordered w-full" placeholder="z. B. Norwegen" />
      </div>

      <div class="form-control">
        <label class="label mb-2">
          <span class="label-text font-semibold">🗓️ Reisezeitraum</span>
        </label>
        <div class="flex flex-row gap-2">
          <input v-model="information.travelDate.start" type="date" class="input input-bordered w-full" />
          <input v-model="information.travelDate.end" type="date" class="input input-bordered w-full" />
        </div>
      </div>

      <div class="form-control">
        <label class="label mb-2">
          <span class="label-text font-semibold">🏞️ Was wirst du dort machen?</span>
        </label>
        <div class="flex flex-wrap gap-2">
          <label
              v-for="option in activityOptions"
              :key="option"
              class="btn btn-sm btn-outline"
          >
            <input type="checkbox" v-model="information.activities" :value="option" class="hidden" />
            <span :class="{ 'font-bold underline': information.activities.includes(option) }">
              {{ option }}
            </span>
          </label>
        </div>
      </div>

      <div class="pt-4">
        <button class="btn btn-primary w-full" @click="goToPackList">Packliste generieren</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInformation } from '@/composables/useInformation'
const emit = defineEmits<{
  (e: 'generated'): void
}>()

const { information, resetInformation } = useInformation()

const activityOptions = [
  'Wandern',
  'Stadtbesichtigung',
  'Strand',
  'Sport',
  'Arbeit',
  'Feiern',
  'Relaxen'
]

const goToPackList = () => {
  if (!information.destination || !information.travelDate.start || !information.travelDate.end || information.activities.length === 0) {
    alert('Bitte fülle alle Pflichtfelder aus.')
    return
  }

  emit('generated')
}

onMounted(() => {
  resetInformation()
})
</script>
