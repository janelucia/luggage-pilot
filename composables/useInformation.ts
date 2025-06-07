import type {Information} from "~/types/types";

export function useInformation() {
    const information = reactive<Information>({
        destination: '',
        travelDate: {
            start: '',
            end: ''
        },
        activities: [] as string[]
    })

    const isComplete = computed(() =>
        information.destination !== '' &&
        information.travelDate.start !== undefined &&
        information.travelDate.end !== undefined &&
        information.activities.length > 0
    )

    const setInformation = (data: Information) => {
        Object.assign(information, data)
    }

    const resetInformation = () => {
        information.destination = ''
        information.travelDate = {
            start: '',
            end: ''
        }
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
