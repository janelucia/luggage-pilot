import type {Information} from "~/types/types";

export function useInformation() {
    const information = reactive<Information>({
        destination: '',
        duration: 7,
        travelDate: '',
        activities: [] as string[]
    })

    const isComplete = computed(() =>
        information.destination !== '' &&
        information.duration > 0 &&
        information.travelDate !== ''
    )

    const setInformation = (data: Information) => {
        Object.assign(information, data)
    }

    const resetInformation = () => {
        information.destination = ''
        information.duration = 7
        information.travelDate = ''
        information.activities = []
        localStorage.removeItem('travelInfo')
    }

    const loadFromLocalStorage = () => {
        if (import.meta.client) {
            const saved = localStorage.getItem('travelInfo')
            if (saved) setInformation(JSON.parse(saved))
        }
    }

    watch(information, () => {
        if (import.meta.client) {
            localStorage.setItem('travelInfo', JSON.stringify(information))
        }
    }, { deep: true })

    return {
        information,
        isComplete,
        setInformation,
        resetInformation,
        loadFromLocalStorage
    }
}
